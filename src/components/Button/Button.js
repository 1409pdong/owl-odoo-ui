import { Component, xml } from "@odoo/owl";

export class Button extends Component {
    static template = xml`
        <button 
            t-att-class="buttonClass"
            t-att-disabled="props.disabled"
            t-on-click="onClick">
            
            <t t-if="props.type === 'stat'">
                <i t-if="props.icon" t-attf-class="fa fa-fw o_button_icon {{props.icon}}"/>
                <div class="o_stat_info">
                    <span class="o_stat_text"><t t-esc="props.statText"/></span>
                    <span class="o_stat_value"><t t-esc="props.statValue"/></span>
                </div>
            </t>
            
            <t t-else="">
                <i t-if="props.icon" t-attf-class="fa fa-fw {{props.icon}} {{ props.slots and props.slots.default ? 'o-btn-icon-with-text' : '' }}"/>
                
                <t t-if="props.slots and props.slots.default">
                    <t t-slot="default"/>
                </t>
            </t>
        </button>
    `;

    static props = {
        type: { type: String, optional: true },
        size: { type: String, optional: true },
        disabled: { type: Boolean, optional: true },
        className: { type: String, optional: true },
        onClick: { type: Function, optional: true },
        slots: { type: Object, optional: true },
        
        icon: { type: String, optional: true },
        danger: { type: Boolean, optional: true },
        ghost: { type: Boolean, optional: true },
        block: { type: Boolean, optional: true },
        
        isButtonIcon: { type: Boolean, optional: true },
        statValue: { type: [String, Number], optional: true },
        statText: { type: String, optional: true },
    };

    static defaultProps = {
        type: 'default',
        size: 'middle',
        disabled: false,
        danger: false,
        ghost: false,
        block: false,
        isButtonIcon: false,
    };

    get buttonClass() {
        let classes = ['o-btn'];
        classes.push(`o-btn-${this.props.type}`);
        
        if (this.props.type !== 'stat' && this.props.size !== 'middle') {
            classes.push(`o-btn-${this.props.size}`);
        }
        
        if (this.props.isButtonIcon) {
            classes.push('o_button_icon');
        }

        if (this.props.danger) classes.push('o-btn-danger');
        if (this.props.ghost) classes.push('o-btn-ghost');
        if (this.props.block) classes.push('o-btn-block');

        if (this.props.icon && (!this.props.slots || !this.props.slots.default) && this.props.type !== 'stat') {
            classes.push('o-btn-icon-only');
        }

        if (this.props.className) {
            classes.push(this.props.className);
        }
        return classes.join(' ');
    }

    onClick(ev) {
        if (!this.props.disabled && this.props.onClick) {
            this.props.onClick(ev);
        }
    }
}