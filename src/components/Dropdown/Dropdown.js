import { Component, xml, useState, useRef, onMounted, onWillUnmount } from "@odoo/owl";

export class Dropdown extends Component {
    static template = xml`
        <div class="o-dropdown" t-ref="root" t-on-mouseleave="onMouseLeave">
            <div class="o-dropdown-trigger" 
                 t-on-click="toggleDropdown" 
                 t-on-mouseenter="onMouseEnter">
                <t t-slot="default"/>
            </div>

            <div t-if="state.isOpen" 
                 class="o-dropdown-menu" 
                 t-att-class="props.placement === 'bottomRight' ? 'o-dropdown-placement-bottomRight' : ''">
                
                <t t-foreach="props.items" t-as="item" t-key="item.key || item_index">
                    <t t-if="item.type === 'divider'">
                        <div class="o-dropdown-divider"></div>
                    </t>
                    
                    <t t-else="">
                        <div class="o-dropdown-item" 
                             t-att-class="{
                                'o-dropdown-item-disabled': item.disabled,
                                'o-dropdown-item-danger': item.danger
                             }"
                             t-on-click="(ev) => this.handleSelect(ev, item)">
                            
                            <i t-if="item.icon" t-attf-class="fa fa-fw o-dropdown-icon {{item.icon}}"/>
                            <span class="o-dropdown-text"><t t-esc="item.title"/></span>
                        </div>
                    </t>
                </t>
                
            </div>
        </div>
    `;

    static props = {
        slots: { type: Object },
        items: { type: Array },
        trigger: { type: String, optional: true }, // 'click' | 'hover'
        placement: { type: String, optional: true }, // 'bottomLeft' | 'bottomRight'
        onSelect: { type: Function, optional: true }
    };

    static defaultProps = {
        trigger: 'click',
        placement: 'bottomLeft'
    };

    setup() {
        this.root = useRef("root");
        this.state = useState({ isOpen: false });
        this.onWindowClick = this.onWindowClick.bind(this);

        onMounted(() => {
            window.addEventListener('click', this.onWindowClick);
        });

        onWillUnmount(() => {
            window.removeEventListener('click', this.onWindowClick);
        });
    }

    onWindowClick(ev) {
        // Đóng menu nếu click bên ngoài component
        if (this.state.isOpen && this.root.el && !this.root.el.contains(ev.target)) {
            this.state.isOpen = false;
        }
    }

    toggleDropdown(ev) {
        if (this.props.trigger === 'click') {
            this.state.isOpen = !this.state.isOpen;
        }
    }

    onMouseEnter() {
        if (this.props.trigger === 'hover') {
            this.state.isOpen = true;
        }
    }

    onMouseLeave() {
        if (this.props.trigger === 'hover') {
            this.state.isOpen = false;
        }
    }

    handleSelect(ev, item) {
        ev.stopPropagation(); // Ngăn sự kiện nổi bọt lên trigger
        if (item.disabled) return;
        
        if (this.props.onSelect) {
            this.props.onSelect(item);
        }
        this.state.isOpen = false; // Tự động đóng sau khi chọn
    }
}