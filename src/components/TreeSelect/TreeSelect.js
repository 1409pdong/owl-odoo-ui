import { Component, xml, useState, useRef, onMounted, onWillUnmount, onWillUpdateProps, useSubEnv } from "@odoo/owl";
import { TreeNode } from "./TreeNode.js";

export class TreeSelect extends Component {
    static components = { TreeNode };
    static template = xml`
        <div class="o-select o-tree-select" t-att-class="selectClasses" t-ref="root" t-on-click="toggleDropdown">
            <div class="o-select-selector">
                
                <t t-if="isMultiple">
                    <t t-foreach="selectedNodesInfo" t-as="opt" t-key="opt.value">
                        <span class="o-select-tag">
                            <span class="o-select-tag-content" t-esc="opt.label"/>
                            <span class="o-select-tag-close" t-on-click.stop="() => this.removeTag(opt.value)"><i class="fa fa-times"/></span>
                        </span>
                    </t>
                </t>

                <t t-if="!isMultiple and !isEmpty">
                    <span class="o-select-selection-item" t-att-style="(props.showSearch and state.isOpen) ? 'opacity: 0.4;' : ''" t-esc="singleDisplayLabel"/>
                </t>

                <input t-if="props.showSearch"
                       type="text" class="o-select-search-input"
                       t-att-class="{'o-select-search-single': !isMultiple, 'o-select-search-hidden': !isMultiple and !state.isOpen}"
                       t-att-placeholder="isEmpty ? (props.placeholder || 'Select...') : ''"
                       t-att-value="state.searchValue" t-att-disabled="props.disabled"
                       t-on-input="onSearchInput" t-ref="searchInput" />
                
                <span t-if="isEmpty and !props.showSearch" class="o-select-placeholder"><t t-esc="props.placeholder || 'Select...'"/></span>
            </div>

            <span class="o-select-clear" t-att-class="{'show': !isEmpty and props.allowClear and !props.disabled}" t-on-click.stop="clearSelection">
                <i class="fa fa-times-circle"/>
            </span>
            <span class="o-select-arrow"><i t-attf-class="fa {{ state.isOpen ? 'fa-angle-up' : 'fa-angle-down' }}"/></span>

            <div t-if="state.isOpen and !props.disabled" class="o-tree-select-dropdown" t-on-click.stop="">
                <t t-if="filteredTreeData.length > 0">
                    <t t-foreach="filteredTreeData" t-as="node" t-key="node.value">
                        <TreeNode node="node" 
                                  level="0"
                                  expandedKeys="state.expandedKeys"
                                  selectedValues="selectedValuesArray"
                                  searchValue="state.searchValue" />
                    </t>
                </t>
                <t t-else=""><div class="o-tree-empty">Không có dữ liệu</div></t>
            </div>
        </div>
    `;

    static props = {
        treeData: { type: Array },
        value: { type: [String, Number, Array], optional: true },
        defaultValue: { type: [String, Number, Array], optional: true },
        multiple: { type: Boolean, optional: true },
        treeCheckable: { type: Boolean, optional: true },
        placeholder: { type: String, optional: true },
        disabled: { type: Boolean, optional: true },
        size: { type: String, optional: true },
        variant: { type: String, optional: true },
        allowClear: { type: Boolean, optional: true },
        showSearch: { type: Boolean, optional: true },
        onChange: { type: Function, optional: true }
    };

    static defaultProps = { multiple: false, treeCheckable: false, size: 'medium', variant: 'outlined', disabled: false, allowClear: false, showSearch: false };

    setup() {
        this.rootRef = useRef("root");
        this.searchInputRef = useRef("searchInput");

        const initVal = this.props.value !== undefined ? this.props.value : (this.props.defaultValue || (this.isMultiple ? [] : ''));
        
        this.state = useState({
            internalValue: initVal,
            isOpen: false,
            searchValue: '',
            expandedKeys: [] 
        });

        // Chỉ truyền Hàm và Config tĩnh qua Env, Data động đi đường Props
        useSubEnv({
            treeProps: this.props,
            toggleExpand: this.toggleExpand.bind(this),
            selectNode: this.selectNode.bind(this)
        });

        this.onWindowClick = this.onWindowClick.bind(this);
        onMounted(() => window.addEventListener('click', this.onWindowClick));
        onWillUnmount(() => window.removeEventListener('click', this.onWindowClick));

        onWillUpdateProps((nextProps) => {
            if ('value' in nextProps && nextProps.value !== this.state.internalValue) {
                this.state.internalValue = nextProps.value;
            }
        });
    }

    get isMultiple() { return this.props.multiple || this.props.treeCheckable; }
    get currentValue() { return this.state.internalValue; }
    
    // Tự động generate array mới để kích hoạt Prop Change
    get selectedValuesArray() { return this.isMultiple ? (this.currentValue || []) : [this.currentValue]; }

    get isEmpty() {
        if (this.isMultiple) return !this.currentValue || this.currentValue.length === 0;
        return this.currentValue === undefined || this.currentValue === null || this.currentValue === '';
    }

    get selectClasses() {
        let classes = [`o-select-${this.props.size}`, `o-select-variant-${this.props.variant}`];
        if (this.state.isOpen) classes.push('o-select-focused');
        if (this.props.disabled) classes.push('o-select-disabled');
        return classes.join(' ');
    }

    findNodeByValue(nodes, value) {
        for (let node of nodes) {
            if (node.value === value) return node;
            if (node.children) {
                const found = this.findNodeByValue(node.children, value);
                if (found) return found;
            }
        }
        return null;
    }

    get singleDisplayLabel() {
        const found = this.findNodeByValue(this.props.treeData, this.currentValue);
        return found ? found.label : this.currentValue;
    }

    get selectedNodesInfo() {
        return this.selectedValuesArray.map(val => {
            const node = this.findNodeByValue(this.props.treeData, val);
            return { value: val, label: node ? node.label : val };
        });
    }

    filterTree(nodes, search) {
        if (!search) return nodes;
        const lowerSearch = search.toLowerCase();
        
        return nodes.reduce((acc, node) => {
            const matchSelf = node.label.toLowerCase().includes(lowerSearch);
            let filteredChildren = [];
            
            if (node.children) {
                filteredChildren = this.filterTree(node.children, search);
            }
            
            if (matchSelf || filteredChildren.length > 0) {
                const newNode = { ...node };
                if (filteredChildren.length > 0) newNode.children = filteredChildren;
                acc.push(newNode);
            }
            return acc;
        }, []);
    }

    get filteredTreeData() {
        return this.filterTree(this.props.treeData, this.state.searchValue);
    }

    toggleExpand(key) {
        // RÚT GỌN LẠI VÀ CHỈNH SỬA MẢNG ĐỂ ÉP RE-RENDER
        if (this.state.expandedKeys.includes(key)) {
            this.state.expandedKeys = this.state.expandedKeys.filter(k => k !== key);
        } else {
            this.state.expandedKeys = [...this.state.expandedKeys, key];
        }
    }

    selectNode(node) {
        if (this.isMultiple) {
            let newVals = [...this.selectedValuesArray];
            if (newVals.includes(node.value)) {
                newVals = newVals.filter(v => v !== node.value);
            } else {
                newVals.push(node.value);
            }
            this.updateValue(newVals);
            
            this.state.searchValue = '';
            if (this.props.showSearch && this.searchInputRef.el) {
                this.searchInputRef.el.focus();
            }
        } else {
            this.updateValue(node.value);
            this.state.isOpen = false;
            this.state.searchValue = '';
        }
    }

    removeTag(val) {
        if (this.props.disabled) return;
        const newVals = this.selectedValuesArray.filter(v => v !== val);
        this.updateValue(newVals);
    }

    clearSelection() {
        this.updateValue(this.isMultiple ? [] : '');
        this.state.searchValue = '';
    }

    toggleDropdown() {
        if (this.props.disabled) return;
        this.state.isOpen = !this.state.isOpen;
        if (this.state.isOpen && this.props.showSearch && this.searchInputRef.el) {
            setTimeout(() => this.searchInputRef.el.focus(), 0);
        }
    }

    onSearchInput(ev) { this.state.searchValue = ev.target.value; }

    onWindowClick(ev) {
        if (this.state.isOpen && this.rootRef.el && !this.rootRef.el.contains(ev.target)) {
            this.state.isOpen = false;
            this.state.searchValue = '';
        }
    }

    updateValue(val) {
        if (this.props.value === undefined) this.state.internalValue = val;
        if (this.props.onChange) this.props.onChange(val);
    }
}