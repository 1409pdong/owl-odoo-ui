import { Component, xml, useState, useRef, useExternalListener } from "@odoo/owl";

export class OTP extends Component {
    static template = xml`
        <div class="o-otp-wrapper" t-att-class="wrapperClasses" t-on-paste="onPaste">
            <t t-foreach="state.values" t-as="val" t-key="val_index">
                <div class="o-input-wrapper" t-att-class="{'o-input-focused': state.focusedIndex === val_index, 'o-input-disabled': props.disabled, 'o-input-status-error': props.status === 'error'}">
                    <input class="o-input-core"
                           t-att-value="val"
                           t-att-disabled="props.disabled"
                           maxlength="1"
                           t-on-input="(ev) => this.onInput(val_index, ev)"
                           t-on-keydown="(ev) => this.onKeyDown(val_index, ev)"
                           t-on-focus="() => this.state.focusedIndex = val_index"
                           t-on-blur="() => this.state.focusedIndex = null"
                           t-ref="otpInput_{{val_index}}" />
                </div>
            </t>
        </div>
    `;

    static props = {
        length: { type: Number, optional: true },
        size: { type: String, optional: true },
        disabled: { type: Boolean, optional: true },
        status: { type: String, optional: true },
        onChange: { type: Function, optional: true }
    };

    static defaultProps = { length: 6, size: 'medium', disabled: false };

    setup() {
        this.state = useState({
            values: Array(this.props.length).fill(''),
            focusedIndex: null
        });
        
        // Tạo Refs động
        this.inputRefs = [];
        for (let i = 0; i < this.props.length; i++) {
            this.inputRefs.push(useRef(`otpInput_${i}`));
        }
    }

    get wrapperClasses() {
        return `o-otp-${this.props.size}`;
    }

    triggerChange() {
        if (this.props.onChange) {
            this.props.onChange(this.state.values.join(''));
        }
    }

    onInput(index, ev) {
        const val = ev.target.value;
        this.state.values[index] = val.slice(-1); // Chỉ lấy ký tự cuối
        if (val && index < this.props.length - 1) {
            this.inputRefs[index + 1].el.focus();
        }
        this.triggerChange();
    }

    onKeyDown(index, ev) {
        if (ev.key === 'Backspace' && !this.state.values[index] && index > 0) {
            this.inputRefs[index - 1].el.focus();
        }
    }

    onPaste(ev) {
        ev.preventDefault();
        const pasteData = ev.clipboardData.getData('text').slice(0, this.props.length);
        for (let i = 0; i < pasteData.length; i++) {
            this.state.values[i] = pasteData[i];
        }
        const focusIndex = Math.min(pasteData.length, this.props.length - 1);
        this.inputRefs[focusIndex].el.focus();
        this.triggerChange();
    }
}