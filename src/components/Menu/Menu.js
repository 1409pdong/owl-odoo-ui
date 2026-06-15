import { Component, xml, useState, useRef, onMounted, onWillUnmount } from "@odoo/owl";

export class Menu extends Component {
    static template = xml`
        <ul class="o-menu" t-att-class="menuClasses" t-ref="root">
            
            <t t-foreach="props.items" t-as="lvl1" t-key="lvl1.key">
                
                <t t-if="lvl1.type === 'group'">
                    <li class="o-menu-item-group">
                        <div class="o-menu-item-group-title"><t t-esc="lvl1.label"/></div>
                        <ul class="o-menu-item-group-list">
                            <t t-foreach="lvl1.children" t-as="lvl2" t-key="lvl2.key">
                                <li class="o-menu-item" 
                                    t-att-class="{'o-menu-item-selected': state.selectedKey === lvl2.key, 'o-menu-item-disabled': lvl2.disabled}"
                                    t-on-click="(ev) => this.handleSelect(ev, lvl2)">
                                    <div class="o-menu-title-content">
                                        <i t-if="lvl2.icon" t-attf-class="fa fa-fw {{lvl2.icon}} o-menu-icon"/>
                                        <t t-esc="lvl2.label"/>
                                    </div>
                                </li>
                            </t>
                        </ul>
                    </li>
                </t>

                <t t-elif="lvl1.type === 'divider'">
                    <li class="o-menu-item-divider"></li>
                </t>

                <t t-elif="lvl1.children">
                    <li class="o-menu-submenu" t-att-class="{
                            'o-menu-submenu-open': state.openKeys.includes(lvl1.key),
                            'o-menu-submenu-scrollable': lvl1.scrollable
                        }">
                        <div class="o-menu-submenu-title" t-on-click="(ev) => this.toggleSubmenu(ev, lvl1.key, 1)">
                            <div class="o-menu-title-content">
                                <i t-if="lvl1.icon" t-attf-class="fa fa-fw {{lvl1.icon}} o-menu-icon"/>
                                <t t-esc="lvl1.label"/>
                            </div>
                            <i class="fa fa-angle-down o-menu-submenu-arrow ms-2" t-if="props.mode === 'inline' or props.mode === 'horizontal'"/>
                        </div>
                        
                        <ul class="o-menu-submenu-content">
                            <t t-foreach="lvl1.children" t-as="lvl2" t-key="lvl2.key">
                                
                                <t t-if="lvl2.type === 'group'">
                                    <li class="o-menu-item-group">
                                        <div class="o-menu-item-group-title"><t t-esc="lvl2.label"/></div>
                                        <ul class="o-menu-item-group-list">
                                            <t t-foreach="lvl2.children" t-as="lvl3" t-key="lvl3.key">
                                                <li class="o-menu-item" 
                                                    t-att-class="{'o-menu-item-selected': state.selectedKey === lvl3.key, 'o-menu-item-disabled': lvl3.disabled}"
                                                    t-on-click="(ev) => this.handleSelect(ev, lvl3)">
                                                    <div class="o-menu-title-content">
                                                        <i t-if="lvl3.icon" t-attf-class="fa fa-fw {{lvl3.icon}} o-menu-icon"/>
                                                        <t t-esc="lvl3.label"/>
                                                    </div>
                                                </li>
                                            </t>
                                        </ul>
                                    </li>
                                </t>

                                <t t-elif="lvl2.children">
                                    <li class="o-menu-submenu o-menu-submenu-flyout" t-att-class="{'o-menu-submenu-open': state.openKeys.includes(lvl2.key)}">
                                        <div class="o-menu-submenu-title" t-on-click="(ev) => this.toggleSubmenu(ev, lvl2.key, 2)">
                                            <div class="o-menu-title-content">
                                                <i t-if="lvl2.icon" t-attf-class="fa fa-fw {{lvl2.icon}} o-menu-icon"/>
                                                <t t-esc="lvl2.label"/>
                                            </div>
                                            <i t-attf-class="fa ms-2 o-menu-submenu-arrow {{ props.mode === 'horizontal' ? 'fa-angle-right' : 'fa-angle-down' }}" />
                                        </div>
                                        <ul class="o-menu-submenu-content">
                                            <t t-foreach="lvl2.children" t-as="lvl3" t-key="lvl3.key">
                                                <li class="o-menu-item" 
                                                    t-att-class="{'o-menu-item-selected': state.selectedKey === lvl3.key, 'o-menu-item-disabled': lvl3.disabled}"
                                                    t-on-click="(ev) => this.handleSelect(ev, lvl3)">
                                                    <div class="o-menu-title-content">
                                                        <i t-if="lvl3.icon" t-attf-class="fa fa-fw {{lvl3.icon}} o-menu-icon"/>
                                                        <t t-esc="lvl3.label"/>
                                                    </div>
                                                </li>
                                            </t>
                                        </ul>
                                    </li>
                                </t>

                                <t t-else="">
                                    <li class="o-menu-item" 
                                        t-att-class="{'o-menu-item-selected': state.selectedKey === lvl2.key, 'o-menu-item-disabled': lvl2.disabled}"
                                        t-on-click="(ev) => this.handleSelect(ev, lvl2)">
                                        <div class="o-menu-title-content">
                                            <i t-if="lvl2.icon" t-attf-class="fa fa-fw {{lvl2.icon}} o-menu-icon"/>
                                            <t t-esc="lvl2.label"/>
                                        </div>
                                    </li>
                                </t>

                            </t>
                        </ul>
                    </li>
                </t>

                <t t-else="">
                    <li class="o-menu-item" 
                        t-att-class="{'o-menu-item-selected': state.selectedKey === lvl1.key, 'o-menu-item-disabled': lvl1.disabled}"
                        t-on-click="(ev) => this.handleSelect(ev, lvl1)">
                        <div class="o-menu-title-content">
                            <i t-if="lvl1.icon" t-attf-class="fa fa-fw {{lvl1.icon}} o-menu-icon"/>
                            <t t-esc="lvl1.label"/>
                        </div>
                    </li>
                </t>

            </t>
        </ul>
    `;

    static props = {
        items: { type: Array },
        mode: { type: String, optional: true }, 
        theme: { type: String, optional: true }, 
        defaultSelectedKey: { type: String, optional: true },
        defaultOpenKeys: { type: Array, optional: true },
        onSelect: { type: Function, optional: true }
    };

    static defaultProps = {
        mode: 'inline',
        theme: 'light',
        defaultOpenKeys: []
    };

    setup() {
        this.rootRef = useRef("root");
        this.state = useState({
            selectedKey: this.props.defaultSelectedKey || '',
            openKeys: [...(this.props.defaultOpenKeys || [])]
        });

        this.onWindowClick = this.onWindowClick.bind(this);
        onMounted(() => window.addEventListener('click', this.onWindowClick));
        onWillUnmount(() => window.removeEventListener('click', this.onWindowClick));
    }

    onWindowClick(ev) {
        if (this.props.mode === 'horizontal' && this.rootRef.el && !this.rootRef.el.contains(ev.target)) {
            this.state.openKeys = [];
        }
    }

    get menuClasses() {
        let classes = [`o-menu-${this.props.mode}`, `o-menu-${this.props.theme}`];
        return classes.join(' ');
    }

    toggleSubmenu(ev, key, level = 1) {
        ev.stopPropagation(); 

        const index = this.state.openKeys.indexOf(key);
        
        if (this.props.mode === 'horizontal') {
            if (level === 1) {
                if (index > -1) {
                    this.state.openKeys = []; 
                } else {
                    this.state.openKeys = [key]; 
                }
            }
        } else {
            if (index > -1) {
                this.state.openKeys.splice(index, 1);
            } else {
                this.state.openKeys.push(key);
            }
        }
    }

    handleSelect(ev, item) {
        ev.stopPropagation();
        if (item.disabled) return;
        
        this.state.selectedKey = item.key;
        
        if (this.props.mode === 'horizontal') {
            this.state.openKeys = []; 
        }

        if (this.props.onSelect) {
            this.props.onSelect(item.key, item);
        }
    }
}