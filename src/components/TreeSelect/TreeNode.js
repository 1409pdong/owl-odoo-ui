import { Component, xml } from "@odoo/owl";

export class TreeNode extends Component {
    static template = xml`
        <div class="o-tree-node-wrapper">
            <div class="o-tree-node-content" t-att-style="'padding-left: ' + (props.level * 16) + 'px'">
                
                <span class="o-tree-switcher" t-on-click.stop="toggleExpand">
                    <i t-if="hasChildren" t-attf-class="fa {{ isExpanded ? 'fa-caret-down' : 'fa-caret-right' }}"/>
                    <i t-else="" class="fa fa-fw"/> 
                </span>

                <span t-if="isCheckable" class="o-tree-checkbox" t-on-click.stop="selectNode">
                    <span class="o-checkbox-inner" t-att-class="{'checked': isSelected}"/>
                </span>

                <span class="o-tree-title" t-att-class="{'selected': isSelected and !isCheckable, 'disabled': props.node.disabled}" t-on-click.stop="selectNode">
                    <t t-esc="props.node.label"/>
                </span>
            </div>

            <div t-if="hasChildren and isExpanded" class="o-tree-node-children">
                <t t-foreach="props.node.children" t-as="child" t-key="child.value">
                    <TreeNode node="child" 
                              level="props.level + 1"
                              expandedKeys="props.expandedKeys"
                              selectedValues="props.selectedValues"
                              searchValue="props.searchValue" />
                </t>
            </div>
        </div>
    `;

    /* BỔ SUNG PROPS ĐỘNG ĐỂ BẮT REACTIVITY */
    static props = {
        node: { type: Object },
        level: { type: Number },
        expandedKeys: { type: Array },
        selectedValues: { type: Array },
        searchValue: { type: String, optional: true }
    };

    static get components() {
        return { TreeNode };
    }

    get hasChildren() { return this.props.node.children && this.props.node.children.length > 0; }
    get isCheckable() { return this.env.treeProps.treeCheckable; }

    /* Đọc trực tiếp từ Props thay vì State ẩn */
    get isSelected() {
        return this.props.selectedValues.includes(this.props.node.value);
    }
    
    get isExpanded() { 
        if (this.props.searchValue && this.hasChildren) return true;
        return this.props.expandedKeys.includes(this.props.node.value); 
    }

    toggleExpand() {
        if (this.hasChildren) {
            this.env.toggleExpand(this.props.node.value);
        }
    }

    selectNode() {
        if (!this.props.node.disabled) {
            this.env.selectNode(this.props.node);
        }
    }
}