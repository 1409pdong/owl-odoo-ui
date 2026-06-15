import { Component, xml, useState } from "@odoo/owl";

export class Radio extends Component {
    static template = xml`
        <label t-att-class="wrapperClasses">
            
            <input type="radio" class="o-radio-input" 
                   t-att-name="inputName" 
                   t-att-value="props.value" 
                   t-att-checked="isChecked" 
                   t-att-disabled="isDisabled" 
                   t-on-change="onChange" />
                   
            <t t-if="isButton">
                <span class="o-radio-button-text">
                    <t t-if="props.label !== undefined"><t t-esc="props.label"/></t>
                    <t t-elif="props.slots and props.slots.default"><t t-slot="default"/></t>
                </span>
            </t>
            
            <t t-else="">
                <span class="o-radio" t-att-class="radioClasses">
                    <span class="o-radio-inner"></span>
                </span>
                <span class="o-radio-text" t-if="props.label !== undefined or (props.slots and props.slots.default)">
                    <t t-if="props.label !== undefined"><t t-esc="props.label"/></t>
                    <t t-elif="props.slots and props.slots.default"><t t-slot="default"/></t>
                </span>
            </t>
            
        </label>
    `;

    static props = {
        label: { type: [String, Number], optional: true },
        value: { type: [String, Number, Boolean], optional: true },
        checked: { type: Boolean, optional: true },
        defaultChecked: { type: Boolean, optional: true },
        disabled: { type: Boolean, optional: true },
        name: { type: String, optional: true },
        onChange: { type: Function, optional: true },
        slots: { type: Object, optional: true }
    };

    static defaultProps = { disabled: false };

    setup() {
        this.state = useState({
            checked: this.props.defaultChecked || false
        });
    }

    get ctx() {
        return this.env.getRadioGroupContext ? this.env.getRadioGroupContext() : null;
    }

    get isButton() { return this.ctx && this.ctx.optionType === 'button'; }

    get isChecked() {
        if (this.ctx && this.props.value !== undefined) {
            return this.ctx.value === this.props.value;
        }
        return this.props.checked !== undefined ? this.props.checked : this.state.checked;
    }

    get isDisabled() { return (this.ctx && this.ctx.disabled) || this.props.disabled; }
    
    get inputName() { return this.ctx ? this.ctx.name : this.props.name; }

    get wrapperClasses() {
        if (this.isButton) {
            let classes = ['o-radio-button-wrapper'];
            if (this.isChecked) classes.push('o-radio-button-checked');
            if (this.isDisabled) classes.push('o-radio-button-disabled');
            return classes.join(' ');
        } else {
            let classes = ['o-radio-wrapper'];
            if (this.isChecked) classes.push('o-radio-wrapper-checked');
            if (this.isDisabled) classes.push('o-radio-wrapper-disabled');
            return classes.join(' ');
        }
    }

    get radioClasses() {
        let classes = [];
        if (this.isChecked) classes.push('o-radio-checked');
        if (this.isDisabled) classes.push('o-radio-disabled');
        return classes.join(' ');
    }

    onChange(ev) {
        if (this.isDisabled) return;
        
        // BUG FIX: Phân biệt giá trị số 0, false và undefined (tránh lỗi OR Operator `||`)
        let payload = this.props.value !== undefined ? this.props.value : ev.target.checked;
        
        if (this.ctx && this.props.value !== undefined) {
            this.ctx.onChange(payload, ev);
        } else {
            if (this.props.checked === undefined) {
                this.state.checked = ev.target.checked;
            }
            if (this.props.onChange) {
                this.props.onChange(payload, ev);
            }
        }
    }
}