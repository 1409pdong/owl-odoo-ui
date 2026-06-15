import { Component, xml, useState } from "@odoo/owl";

export class Checkbox extends Component {
    static template = xml`
        <label class="o-checkbox-wrapper" t-att-class="wrapperClasses">
            <span class="o-checkbox" t-att-class="checkboxClasses">
                <input type="checkbox" 
                       class="o-checkbox-input" 
                       t-att-checked="isChecked" 
                       t-att-disabled="isDisabled" 
                       t-att-name="inputName"
                       t-att-value="props.value"
                       t-on-change="onChange" />
                <span class="o-checkbox-inner"></span>
            </span>
            <span class="o-checkbox-text" t-if="props.label or (props.slots and props.slots.default)">
                <t t-if="props.label"><t t-esc="props.label"/></t>
                <t t-elif="props.slots and props.slots.default"><t t-slot="default"/></t>
            </span>
        </label>
    `;

    static props = {
        label: { type: String, optional: true },
        value: { type: [String, Number, Boolean], optional: true }, // Add value prop
        checked: { type: Boolean, optional: true },
        defaultChecked: { type: Boolean, optional: true },
        disabled: { type: Boolean, optional: true },
        indeterminate: { type: Boolean, optional: true },
        onChange: { type: Function, optional: true },
        slots: { type: Object, optional: true }
    };

    static defaultProps = {
        disabled: false,
        indeterminate: false
    };

    setup() {
        this.state = useState({
            checked: this.props.defaultChecked || false
        });
    }

    // Đọc Context từ CheckboxGroup (nếu có)
    get checkboxGroup() { return this.env.checkboxGroup; }

    get isChecked() {
        if (this.checkboxGroup && this.props.value !== undefined) {
            return this.checkboxGroup.getValue().includes(this.props.value);
        }
        return this.props.checked !== undefined ? this.props.checked : this.state.checked;
    }

    get isDisabled() {
        if (this.checkboxGroup && this.checkboxGroup.disabled) {
            return true;
        }
        return this.props.disabled;
    }

    get inputName() {
        return this.checkboxGroup ? this.checkboxGroup.name : undefined;
    }

    get wrapperClasses() {
        return {
            'o-checkbox-wrapper-disabled': this.isDisabled,
            'o-checkbox-wrapper-checked': this.isChecked
        };
    }

    get checkboxClasses() {
        return {
            'o-checkbox-checked': this.isChecked && !this.props.indeterminate,
            'o-checkbox-indeterminate': this.props.indeterminate,
            'o-checkbox-disabled': this.isDisabled
        };
    }

    onChange(ev) {
        if (this.isDisabled) return;
        const newValue = ev.target.checked;
        
        // Nếu nằm trong Group, báo cáo sự thay đổi lên Group
        if (this.checkboxGroup && this.props.value !== undefined) {
            this.checkboxGroup.toggleOption(this.props.value, newValue);
        } else {
            // Nếu đứng độc lập
            if (this.props.checked === undefined) {
                this.state.checked = newValue;
            }
            if (this.props.onChange) {
                this.props.onChange(newValue, ev);
            }
        }
    }
}