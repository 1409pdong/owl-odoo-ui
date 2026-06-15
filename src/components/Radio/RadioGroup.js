import { Component, xml, useState, useSubEnv } from "@odoo/owl";
import { Radio } from "./Radio.js";

export class RadioGroup extends Component {
    static components = { Radio };
    static template = xml`
        <div t-att-class="groupClasses">
            <t t-if="props.options">
                <t t-foreach="normalizedOptions" t-as="opt" t-key="opt.value">
                    <Radio value="opt.value" disabled="props.disabled or opt.disabled" label="opt.label"/>
                </t>
            </t>
            
            <t t-if="props.slots and props.slots.default">
                <t t-slot="default"/>
            </t>
        </div>
    `;

    static props = {
        options: { type: Array, optional: true },
        value: { type: [String, Number, Boolean], optional: true },
        defaultValue: { type: [String, Number, Boolean], optional: true },
        disabled: { type: Boolean, optional: true },
        name: { type: String, optional: true },
        direction: { type: String, optional: true }, // 'horizontal' | 'vertical'
        optionType: { type: String, optional: true }, // 'default' | 'button'
        buttonStyle: { type: String, optional: true }, // 'outline' | 'solid'
        size: { type: String, optional: true }, // 'large' | 'medium' | 'small'
        onChange: { type: Function, optional: true },
        slots: { type: Object, optional: true }
    };

    static defaultProps = {
        direction: 'horizontal', optionType: 'default', buttonStyle: 'outline', disabled: false, size: 'medium'
    };

    setup() {
        this.state = useState({
            value: this.props.defaultValue !== undefined ? this.props.defaultValue : null
        });

        this.name = this.props.name || `radio-group-${Math.random().toString(36).substr(2, 9)}`;

        useSubEnv({
            getRadioGroupContext: () => ({
                value: this.currentValue,
                name: this.name,
                disabled: this.props.disabled,
                optionType: this.props.optionType,
                onChange: this.handleChange.bind(this)
            })
        });
    }

    get currentValue() {
        return this.props.value !== undefined ? this.props.value : this.state.value;
    }

    get normalizedOptions() {
        return (this.props.options || []).map(opt => {
            if (typeof opt === 'string' || typeof opt === 'number') return { label: String(opt), value: opt };
            return opt;
        });
    }

    get groupClasses() {
        let classes = ['o-radio-group'];
        
        if (this.props.optionType === 'button') {
            classes.push('o-radio-group-button');
            classes.push(`o-radio-group-${this.props.size}`);
            if (this.props.buttonStyle === 'solid') classes.push('o-radio-group-solid');
        } else {
            if (this.props.direction === 'vertical') classes.push('o-radio-group-vertical');
        }
        
        return classes.join(' ');
    }

    handleChange(val, ev) {
        if (this.props.value === undefined) {
            this.state.value = val;
        }
        if (this.props.onChange) {
            this.props.onChange(val, ev);
        }
    }
}