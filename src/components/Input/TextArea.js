import { Component, xml, useState, onWillUpdateProps } from "@odoo/owl";

export class TextArea extends Component {
    static template = xml`
        <div class="o-input-wrapper o-textarea-wrapper" t-att-class="wrapperClasses">
            <textarea class="o-input-core"
                      t-att-value="state.value"
                      t-att-placeholder="props.placeholder"
                      t-att-disabled="props.disabled"
                      t-att-maxlength="props.maxLength"
                      t-att-rows="props.rows"
                      t-on-input="onInput"
                      t-on-focus="onFocus"
                      t-on-blur="onBlur" />
            
            <span t-if="props.showCount" class="o-textarea-count">
                <t t-esc="state.value.length"/><t t-if="props.maxLength"> / <t t-esc="props.maxLength"/></t>
            </span>
        </div>
    `;

    static props = {
        value: { type: String, optional: true },
        defaultValue: { type: String, optional: true },
        placeholder: { type: String, optional: true },
        disabled: { type: Boolean, optional: true },
        variant: { type: String, optional: true },
        status: { type: String, optional: true },
        rows: { type: Number, optional: true },
        maxLength: { type: Number, optional: true },
        showCount: { type: Boolean, optional: true },
        onChange: { type: Function, optional: true }
    };

    static defaultProps = { variant: 'outlined', disabled: false, showCount: false, rows: 3 };

    setup() {
        this.state = useState({
            value: this.props.value || this.props.defaultValue || '',
            isFocused: false
        });

        onWillUpdateProps((nextProps) => {
            if ('value' in nextProps && nextProps.value !== this.state.value) {
                this.state.value = nextProps.value || '';
            }
        });
    }

    get wrapperClasses() {
        let classes = [`o-input-variant-${this.props.variant}`];
        if (this.state.isFocused) classes.push('o-input-focused');
        if (this.props.disabled) classes.push('o-input-disabled');
        if (this.props.status) classes.push(`o-input-status-${this.props.status}`);
        return classes.join(' ');
    }

    onInput(ev) {
        this.state.value = ev.target.value;
        if (this.props.onChange) this.props.onChange(this.state.value, ev);
    }
    onFocus() { this.state.isFocused = true; }
    onBlur() { this.state.isFocused = false; }
}