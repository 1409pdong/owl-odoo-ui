import { Component, xml } from "@odoo/owl";

export class FormItem extends Component {
    static template = xml`
        <div class="o-form-item" t-att-class="itemClasses">
            
            <div t-if="props.label" class="o-wrap-label">
                <label class="o-form-label" t-att-class="{'o-form-label-required': props.required}">
                    <t t-esc="props.label"/>
                </label>
            </div>
            
            <div class="o-cell">
                <div class="o-cell-content">
                    <t t-slot="default"/>
                </div>
                
                <div t-if="props.help" class="o-form-help"><t t-esc="props.help"/></div>
                <div t-if="props.error" class="o-form-error"><t t-esc="props.error"/></div>
            </div>
            
        </div>
    `;

    static props = {
        label: { type: String, optional: true },
        required: { type: Boolean, optional: true },
        help: { type: String, optional: true },
        error: { type: String, optional: true },
        slots: { type: Object, optional: true }
    };

    static defaultProps = {
        required: false
    };

    get config() {
        return this.env.getOFormConfig ? this.env.getOFormConfig() : { layout: 'horizontal', disabled: false };
    }

    get itemClasses() {
        let classes = [];
        classes.push(`o-form-item-${this.config.layout}`);
        if (this.props.error) classes.push('o-has-error');
        return classes.join(' ');
    }
}