import { Component, xml, useState, useSubEnv } from "@odoo/owl";
import { Checkbox } from "./Checkbox.js";

export class CheckboxGroup extends Component {
    static components = { Checkbox };
    static template = xml`
        <div class="o-checkbox-group" t-att-class="{'o-checkbox-group-vertical': props.direction === 'vertical'}">
            
            <t t-if="props.options">
                <t t-foreach="normalizedOptions" t-as="opt" t-key="opt.value">
                    <Checkbox 
                        label="opt.label" 
                        value="opt.value"
                        disabled="opt.disabled" 
                    />
                </t>
            </t>
            
            <t t-if="props.slots and props.slots.default">
                <t t-slot="default"/>
            </t>

        </div>
    `;

    static props = {
        options: { type: Array, optional: true },
        value: { type: Array, optional: true },
        defaultValue: { type: Array, optional: true },
        disabled: { type: Boolean, optional: true },
        direction: { type: String, optional: true },
        name: { type: String, optional: true },
        onChange: { type: Function, optional: true },
        slots: { type: Object, optional: true }
    };

    static defaultProps = {
        direction: 'horizontal',
        disabled: false
    };

    setup() {
        this.state = useState({
            value: this.props.defaultValue || []
        });

        // TẠO CONTEXT: Chia sẻ State và hàm xử lý xuống mọi Checkbox con nằm bên trong nó
        useSubEnv({
            checkboxGroup: {
                getValue: () => this.selectedValues,
                toggleOption: this.handleChange.bind(this),
                disabled: this.props.disabled,
                name: this.props.name
            }
        });
    }

    get normalizedOptions() {
        return (this.props.options || []).map(opt => {
            if (typeof opt === 'string') return { label: opt, value: opt };
            return opt;
        });
    }

    get selectedValues() {
        return this.props.value !== undefined ? this.props.value : this.state.value;
    }

    handleChange(optValue, isChecked) {
        let newValues = [...this.selectedValues];
        if (isChecked) {
            if (!newValues.includes(optValue)) newValues.push(optValue);
        } else {
            newValues = newValues.filter(v => v !== optValue);
        }
        
        if (this.props.value === undefined) {
            this.state.value = newValues;
        }
        
        if (this.props.onChange) {
            this.props.onChange(newValues);
        }
    }
}