import { Component, xml, useState, useRef, onMounted, onPatched } from "@odoo/owl";

export class Tabs extends Component {
    static template = xml`
        <div class="o-tabs" t-att-class="tabsClasses">
            <div class="o-tabs-nav" t-att-class="navClasses">
                <t t-if="props.slots and props.slots.extraLeft">
                    <div class="o-tabs-extra-content-left"><t t-slot="extraLeft"/></div>
                </t>
                
                <div class="o-tabs-nav-wrap">
                    <div class="o-tabs-nav-list" t-ref="navList">
                        <t t-foreach="props.items" t-as="item" t-key="item.key">
                            <div class="o-tabs-tab" t-att-class="getTabClasses(item)" t-on-click="(ev) => this.onTabClick(item, ev)">
                                <div class="o-tabs-tab-btn" role="tab" t-att-aria-selected="activeKey === item.key">
                                    <i t-if="item.icon" t-attf-class="fa fa-fw {{item.icon}} o-tabs-tab-icon"/>
                                    <span t-esc="item.label"/>
                                </div>
                                <t t-if="isClosable(item)">
                                    <div class="o-tabs-tab-remove" t-on-click.stop="(ev) => this.onRemove(item, ev)">
                                        <i class="fa fa-times"/>
                                    </div>
                                </t>
                            </div>
                        </t>
                        <t t-if="props.type === 'editable-card'">
                            <div class="o-tabs-nav-add" t-on-click="onAdd">
                                <i class="fa fa-plus"/>
                            </div>
                        </t>
                        <div t-if="props.type === 'line'" class="o-tabs-ink-bar" t-att-class="inkBarClasses" t-att-style="inkBarStyle"></div>
                    </div>
                </div>

                <t t-if="props.slots and props.slots.extraRight">
                    <div class="o-tabs-extra-content-right"><t t-slot="extraRight"/></div>
                </t>
            </div>
            
            <div class="o-tabs-content-holder">
                <div class="o-tabs-content" t-att-class="contentClasses">
                    <t t-foreach="props.items" t-as="item" t-key="item.key">
                        <t t-if="activeKey === item.key or !props.destroyInactiveTabPane">
                            <div class="o-tabs-tabpane" 
                                 t-att-class="{'o-tabs-tabpane-active': activeKey === item.key}" 
                                 t-att-style="activeKey !== item.key ? 'display: none;' : ''">
                                <t t-if="item.content">
                                    <t t-esc="item.content"/>
                                </t>
                                <t t-elif="props.slots and props.slots[item.key]">
                                    <t t-slot="item.key"/>
                                </t>
                            </div>
                        </t>
                    </t>
                </div>
            </div>
        </div>
    `;

    static props = {
        items: { type: Array },
        type: { type: String, optional: true },
        size: { type: String, optional: true },
        placement: { type: String, optional: true },
        centered: { type: Boolean, optional: true },
        activeKey: { type: String, optional: true },
        defaultActiveKey: { type: String, optional: true },
        onChange: { type: Function, optional: true },
        onEdit: { type: Function, optional: true },
        destroyInactiveTabPane: { type: Boolean, optional: true },
        slots: { type: Object, optional: true }
    };

    static defaultProps = {
        type: 'line',
        size: 'medium',
        placement: 'top',
        centered: false,
        destroyInactiveTabPane: false
    };

    setup() {
        const initialKey = this.props.activeKey !== undefined 
            ? this.props.activeKey 
            : (this.props.defaultActiveKey || (this.props.items && this.props.items.length > 0 ? this.props.items[0].key : ''));

        this.state = useState({ internalActiveKey: initialKey });
        this.inkStyle = useState({ left: '0px', width: '0px', top: '0px', height: '0px' });
        this.navListRef = useRef("navList");

        onMounted(() => setTimeout(() => this.updateInkBar(), 0));
        onPatched(() => this.updateInkBar());
    }

    get activeKey() {
        return this.props.activeKey !== undefined ? this.props.activeKey : this.state.internalActiveKey;
    }

    get tabsClasses() {
        let classes = ['o-tabs', `o-tabs-${this.props.placement}`, `o-tabs-${this.props.type}`, `o-tabs-${this.props.size}`];
        if (this.props.centered) classes.push('o-tabs-centered');
        return classes.join(' ');
    }

    get navClasses() { return ''; }
    get contentClasses() { return ''; }

    getTabClasses(item) {
        let classes = [];
        if (this.activeKey === item.key) classes.push('o-tabs-tab-active');
        if (item.disabled) classes.push('o-tabs-tab-disabled');
        if (this.isClosable(item)) classes.push('o-tabs-tab-with-remove');
        return classes.join(' ');
    }

    get inkBarStyle() {
        if (this.props.placement === 'start' || this.props.placement === 'end') {
            return `top: ${this.inkStyle.top}; height: ${this.inkStyle.height};`;
        }
        return `left: ${this.inkStyle.left}; width: ${this.inkStyle.width};`;
    }

    get inkBarClasses() {
        return 'o-tabs-ink-bar-animated';
    }

    isClosable(item) {
        if (this.props.type === 'editable-card') {
            return item.closable !== false;
        }
        return false;
    }

    updateInkBar() {
        if (this.props.type !== 'line') return;
        const navList = this.navListRef.el;
        if (!navList) return;
        
        const activeTab = navList.querySelector('.o-tabs-tab-active');
        if (activeTab) {
            if (this.props.placement === 'start' || this.props.placement === 'end') {
                const top = `${activeTab.offsetTop}px`;
                const height = `${activeTab.offsetHeight}px`;
                if (this.inkStyle.top !== top || this.inkStyle.height !== height) {
                    this.inkStyle.top = top;
                    this.inkStyle.height = height;
                }
            } else {
                const left = `${activeTab.offsetLeft}px`;
                const width = `${activeTab.offsetWidth}px`;
                if (this.inkStyle.left !== left || this.inkStyle.width !== width) {
                    this.inkStyle.left = left;
                    this.inkStyle.width = width;
                }
            }
        }
    }

    onTabClick(item, ev) {
        if (item.disabled) return;
        const newKey = item.key;
        
        if (this.props.activeKey === undefined) {
            this.state.internalActiveKey = newKey;
        }
        
        if (this.props.onChange && this.activeKey !== newKey) {
            this.props.onChange(newKey);
        }
    }

    onRemove(item, ev) {
        if (this.props.onEdit) this.props.onEdit('remove', item.key);
    }

    onAdd(ev) {
        if (this.props.onEdit) this.props.onEdit('add', null);
    }
}