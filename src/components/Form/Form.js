import { Component, xml, useSubEnv } from "@odoo/owl";

export class Form extends Component {
    static template = xml`
        <form class="o-form" t-att-class="formClasses" t-on-submit.prevent="onSubmit">
            <t t-slot="default"/>
        </form>
    `;

    static props = {
        layout: { type: String, optional: true },
        variant: { type: String, optional: true }, // MỚI: 'outlined' | 'filled' | 'borderless' | 'underlined'
        disabled: { type: Boolean, optional: true },
        onSubmit: { type: Function, optional: true },
        slots: { type: Object, optional: true }
    };

    static defaultProps = {
        layout: 'horizontal',
        variant: 'outlined',
        disabled: false
    };

    setup() {
        useSubEnv({
            getOFormConfig: () => ({
                layout: this.props.layout || 'horizontal',
                disabled: this.props.disabled || false
            })
        });
    }

    get formClasses() {
        let classes = [`o-form-${this.props.layout}`];
        classes.push(`o-form-variant-${this.props.variant}`);
        if (this.props.disabled) classes.push('o-form-disabled');
        return classes.join(' ');
    }

    onSubmit(ev) {
        if (this.props.onSubmit) {
            this.props.onSubmit(ev);
        }
    }
}