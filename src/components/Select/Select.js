import { Component, xml, useState, useRef, onMounted, onWillUnmount, onWillUpdateProps } from "@odoo/owl";

export class Select extends Component {
    static template = xml`
        <div class="o-select" t-att-class="selectClasses" t-ref="root" t-on-click="toggleDropdown">
            <div class="o-select-selector">
                
                <t t-if="props.mode === 'multiple'">
                    <t t-foreach="selectedOptions" t-as="opt" t-key="opt.value">
                        <span class="o-select-tag">
                            <span class="o-select-tag-content" t-esc="opt.label"/>
                            <span class="o-select-tag-close" t-on-click.stop="() => this.removeTag(opt.value)">
                                <i class="fa fa-times"/>
                            </span>
                        </span>
                    </t>
                </t>

                <t t-if="props.mode === 'default' and !props.showSearch and !isEmpty">
                    <span class="o-select-selection-item" t-esc="singleDisplayLabel"/>
                </t>

                <input t-if="props.showSearch"
                       type="text"
                       class="o-select-search-input"
                       t-att-placeholder="isEmpty ? (props.placeholder || 'Select option') : ''"
                       t-att-value="state.searchValue"
                       t-att-disabled="props.disabled"
                       t-on-input="onSearchInput"
                       t-ref="searchInput"
                       t-att-style="props.mode === 'default' and !isEmpty and !state.isOpen ? 'position:absolute; opacity:0;' : ''" />
                
                <span t-if="props.showSearch and props.mode === 'default' and !isEmpty and !state.isOpen" class="o-select-selection-item" t-esc="singleDisplayLabel"/>

                <span t-if="isEmpty and !props.showSearch" class="o-select-placeholder">
                    <t t-esc="props.placeholder || 'Select option'"/>
                </span>

            </div>

            <span class="o-select-clear" t-att-class="{'show': !isEmpty and props.allowClear and !props.disabled}" t-on-click.stop="clearSelection">
                <i class="fa fa-times-circle"/>
            </span>
            <span class="o-select-arrow">
                <i t-attf-class="fa {{ state.isOpen ? 'fa-angle-up' : 'fa-angle-down' }}"/>
            </span>

            <div t-if="state.isOpen and !props.disabled" class="o-select-dropdown" t-on-click.stop="">
                <t t-if="filteredOptions.length > 0">
                    <t t-foreach="filteredOptions" t-as="item" t-key="item.value">
                        <div class="o-select-item" 
                             t-att-class="{
                                'o-select-item-selected': isOptionSelected(item.value),
                                'o-select-item-disabled': item.disabled
                             }"
                             t-on-click="() => this.selectOption(item)">
                            <span t-esc="item.label"/>
                            <i t-if="isOptionSelected(item.value) and props.mode === 'multiple'" class="fa fa-check small text-primary"/>
                        </div>
                    </t>
                </t>
                <t t-else="">
                    <div class="o-select-dropdown-empty">Không tìm thấy dữ liệu</div>
                </t>
            </div>
        </div>
    `;

    static props = {
        options: { type: Array },
        value: { type: [String, Number, Array], optional: true },
        defaultValue: { type: [String, Number, Array], optional: true },
        mode: { type: String, optional: true }, // 'default' | 'multiple'
        placeholder: { type: String, optional: true },
        disabled: { type: Boolean, optional: true },
        size: { type: String, optional: true }, // 'large' | 'medium' | 'small'
        variant: { type: String, optional: true }, // 'outlined' | 'filled' | 'borderless' | 'underlined'
        status: { type: String, optional: true }, // 'error' | 'warning'
        allowClear: { type: Boolean, optional: true },
        showSearch: { type: Boolean, optional: true },
        onChange: { type: Function, optional: true }
    };

    static defaultProps = { mode: 'default', size: 'medium', variant: 'outlined', disabled: false, allowClear: false, showSearch: false };

    setup() {
        this.rootRef = useRef("root");
        this.searchInputRef = useRef("searchInput");

        const initValue = this.props.value !== undefined 
            ? this.props.value 
            : (this.props.defaultValue !== undefined ? this.props.defaultValue : (this.props.mode === 'multiple' ? [] : ''));

        this.state = useState({
            internalValue: initValue,
            isOpen: false,
            searchValue: ''
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

    get currentValue() { return this.state.internalValue; }

    get isEmpty() {
        if (this.props.mode === 'multiple') return !this.currentValue || this.currentValue.length === 0;
        return this.currentValue === undefined || this.currentValue === null || this.currentValue === '';
    }

    get selectClasses() {
        let classes = [`o-select-${this.props.size}`, `o-select-variant-${this.props.variant}`];
        if (this.state.isOpen) classes.push('o-select-focused');
        if (this.props.disabled) classes.push('o-select-disabled');
        if (this.props.status) classes.push(`o-select-status-${this.props.status}`);
        return classes.join(' ');
    }

    get filteredOptions() {
        if (!this.props.showSearch || !this.state.searchValue) return this.props.options;
        const searchLower = this.state.searchValue.toLowerCase();
        return this.props.options.filter(opt => opt.label.toLowerCase().includes(searchLower));
    }

    get selectedOptions() {
        if (this.props.mode !== 'multiple') return [];
        return this.props.options.filter(opt => (this.currentValue || []).includes(opt.value));
    }

    get singleDisplayLabel() {
        const found = this.props.options.find(opt => opt.value === this.currentValue);
        return found ? found.label : '';
    }

    onWindowClick(ev) {
        if (this.state.isOpen && this.rootRef.el && !this.rootRef.el.contains(ev.target)) {
            this.state.isOpen = false;
            this.state.searchValue = '';
        }
    }

    toggleDropdown() {
        if (this.props.disabled) return;
        this.state.isOpen = !this.state.isOpen;
        if (this.state.isOpen && this.props.showSearch && this.searchInputRef.el) {
            setTimeout(() => this.searchInputRef.el.focus(), 0);
        } else {
            this.state.searchValue = '';
        }
    }

    isOptionSelected(val) {
        if (this.props.mode === 'multiple') return (this.currentValue || []).includes(val);
        return this.currentValue === val;
    }

    selectOption(item) {
        if (item.disabled) return;

        if (this.props.mode === 'multiple') {
            let newValue = [...(this.currentValue || [])];
            if (newValue.includes(item.value)) {
                newValue = newValue.filter(v => v !== item.value);
            } else {
                newValue.push(item.value);
            }
            this.updateValue(newValue);
        } else {
            this.updateValue(item.value);
            this.state.isOpen = false;
            this.state.searchValue = '';
        }
    }

    removeTag(val) {
        if (this.props.disabled) return;
        const newValue = (this.currentValue || []).filter(v => v !== val);
        this.updateValue(newValue);
    }

    clearSelection() {
        const cleared = this.props.mode === 'multiple' ? [] : '';
        this.updateValue(cleared);
        this.state.searchValue = '';
    }

    onSearchInput(ev) {
        this.state.searchValue = ev.target.value;
    }

    updateValue(val) {
        if (this.props.value === undefined) this.state.internalValue = val;
        if (this.props.onChange) this.props.onChange(val);
    }
}