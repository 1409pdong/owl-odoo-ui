import { Component, xml, useState, onMounted, onWillUnmount } from "@odoo/owl";

export class FloatButton extends Component {
    static template = xml`
        <div t-att-class="floatButtonClass" 
             t-att-style="props.style"
             t-on-click="onClick"
             t-on-mouseenter="onMouseEnter"
             t-on-mouseleave="onMouseLeave"
             t-att-title="props.tooltip">
             
            <span t-if="props.badge" class="o-float-btn-badge">
                <t t-esc="props.badge"/>
            </span>
            
            <div class="o-float-btn-body">
                <i t-if="props.icon" t-attf-class="fa {{props.icon}} o-float-btn-icon"/>
                <span t-if="props.shape === 'square' and props.description" class="o-float-btn-desc">
                    <t t-esc="props.description"/>
                </span>
            </div>

            <div t-if="props.isGroup and state.isOpen" t-attf-class="o-float-btn-menu o-float-btn-menu-{{props.placement}}">
                <t t-slot="default"/>
            </div>
        </div>
    `;

    static props = {
        type: { type: String, optional: true },
        shape: { type: String, optional: true },
        icon: { type: String, optional: true },
        description: { type: String, optional: true },
        tooltip: { type: String, optional: true },
        badge: { type: [String, Number], optional: true },
        onClick: { type: Function, optional: true },
        backTop: { type: Boolean, optional: true },
        visibilityHeight: { type: Number, optional: true },
        style: { type: String, optional: true },
        isGroup: { type: Boolean, optional: true },
        trigger: { type: String, optional: true },
        placement: { type: String, optional: true },
        slots: { type: Object, optional: true },
    };

    static defaultProps = {
        type: 'default',
        shape: 'circle',
        backTop: false,
        visibilityHeight: 200,
        isGroup: false,
        trigger: 'click',
        placement: 'top',
    };

    setup() {
        this.state = useState({
            visible: !this.props.backTop,
            isOpen: false,
        });

        if (this.props.backTop) {
            const handleScroll = () => {
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                this.state.visible = scrollTop >= this.props.visibilityHeight;
            };
            onMounted(() => {
                window.addEventListener('scroll', handleScroll);
                handleScroll();
            });
            onWillUnmount(() => {
                window.removeEventListener('scroll', handleScroll);
            });
        }
    }

    get floatButtonClass() {
        let classes = ['o-float-btn'];
        classes.push(`o-float-btn-${this.props.type}`);
        classes.push(`o-float-btn-${this.props.shape}`);
        
        if (!this.state.visible) classes.push('o-float-btn-hidden');
        if (this.props.isGroup) {
            classes.push('o-float-btn-group-trigger');
            if (this.state.isOpen) classes.push('o-float-btn-open');
        }
        return classes.join(' ');
    }

    onClick(ev) {
        if (this.props.isGroup && this.props.trigger === 'click') {
            this.state.isOpen = !this.state.isOpen;
        }
        if (this.props.backTop) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (this.props.onClick) {
            this.props.onClick(ev);
        }
    }

    onMouseEnter() {
        if (this.props.isGroup && this.props.trigger === 'hover') {
            this.state.isOpen = true;
        }
    }

    onMouseLeave() {
        if (this.props.isGroup && this.props.trigger === 'hover') {
            this.state.isOpen = false;
        }
    }
}