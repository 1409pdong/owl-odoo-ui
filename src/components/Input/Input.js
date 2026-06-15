import { Component, xml, useState, onWillUpdateProps, useRef } from "@odoo/owl";

export class Input extends Component {
    static template = xml`
        <div t-att-class="props.search ? 'o-input-search-wrapper' : 'o-input-container'" t-att-style="!props.search ? 'display: contents;' : ''">
            
            <div class="o-input-wrapper" t-att-class="wrapperClasses">
                
                <span t-if="props.slots and props.slots.prefix" class="o-input-prefix">
                    <t t-slot="prefix"/>
                </span>
                
                <input class="o-input-core"
                       t-ref="input"
                       t-att-type="inputType"
                       t-att-value="state.value"
                       t-att-placeholder="props.placeholder"
                       t-att-disabled="props.disabled"
                       t-att-maxlength="props.maxLength"
                       t-on-input="onInput"
                       t-on-focus="onFocus"
                       t-on-blur="onBlur"
                       t-on-keydown="onKeyDown" />
                
                <span t-if="props.allowClear and state.value and !props.disabled" class="o-input-clear" t-on-click="onClear">
                    <i class="fa fa-times-circle"/>
                </span>
                
                <span t-if="props.type === 'password'" class="o-input-password-toggle" t-on-click="togglePassword">
                    <i t-attf-class="fa {{ state.passwordVisible ? 'fa-eye' : 'fa-eye-slash' }}"/>
                </span>
                
                <span t-if="props.slots and props.slots.suffix" class="o-input-suffix">
                    <t t-slot="suffix"/>
                </span>
                
                <span t-if="props.showCount" class="o-input-count">
                    <t t-esc="state.value.length"/><t t-if="props.maxLength"> / <t t-esc="props.maxLength"/></t>
                </span>
            </div>

            <button t-if="props.search" class="btn btn-primary o-input-search-btn" t-on-click="onSearchClick" t-att-disabled="props.disabled">
                <t t-if="props.enterButtonText"><t t-esc="props.enterButtonText"/></t>
                <t t-else=""><i class="fa fa-search"/></t>
            </button>

        </div>
    `;

    static props = {
        value: { type: String, optional: true },
        defaultValue: { type: String, optional: true },
        type: { type: String, optional: true }, // 'text', 'password', 'number', 'email'...
        placeholder: { type: String, optional: true },
        disabled: { type: Boolean, optional: true },
        size: { type: String, optional: true }, // 'large' | 'medium' | 'small'
        variant: { type: String, optional: true }, // 'outlined' | 'filled' | 'borderless' | 'underlined'
        status: { type: String, optional: true }, // 'error' | 'warning'
        maxLength: { type: Number, optional: true },
        showCount: { type: Boolean, optional: true },
        allowClear: { type: Boolean, optional: true },
        search: { type: Boolean, optional: true },
        enterButtonText: { type: String, optional: true },
        onChange: { type: Function, optional: true },
        onPressEnter: { type: Function, optional: true },
        onSearch: { type: Function, optional: true },
        slots: { type: Object, optional: true }
    };

    static defaultProps = {
        type: 'text', size: 'medium', variant: 'outlined', disabled: false, showCount: false, allowClear: false, search: false
    };

    setup() {
        this.inputRef = useRef("input");
        this.state = useState({
            value: this.props.value || this.props.defaultValue || '',
            isFocused: false,
            passwordVisible: false
        });

        // Bắt sự kiện cập nhật giá trị từ Component cha (như Odoo Field Models)
        onWillUpdateProps((nextProps) => {
            if ('value' in nextProps && nextProps.value !== this.state.value) {
                this.state.value = nextProps.value || '';
            }
        });
    }

    get wrapperClasses() {
        let classes = [`o-input-${this.props.size}`, `o-input-variant-${this.props.variant}`];
        if (this.state.isFocused) classes.push('o-input-focused');
        if (this.props.disabled) classes.push('o-input-disabled');
        if (this.props.status) classes.push(`o-input-status-${this.props.status}`);
        return classes.join(' ');
    }

    get inputType() {
        if (this.props.type === 'password') {
            return this.state.passwordVisible ? 'text' : 'password';
        }
        return this.props.type;
    }

    onInput(ev) {
        this.state.value = ev.target.value;
        if (this.props.onChange) this.props.onChange(this.state.value, ev);
    }

    onFocus() { this.state.isFocused = true; }
    onBlur() { this.state.isFocused = false; }

    onKeyDown(ev) {
        if (ev.key === 'Enter') {
            if (this.props.onPressEnter) this.props.onPressEnter(this.state.value, ev);
            if (this.props.search && this.props.onSearch) this.props.onSearch(this.state.value);
        }
    }

    onClear() {
        this.state.value = '';
        if (this.inputRef.el) this.inputRef.el.focus();
        if (this.props.onChange) this.props.onChange('');
    }

    togglePassword() {
        this.state.passwordVisible = !this.state.passwordVisible;
        if (this.inputRef.el) this.inputRef.el.focus();
    }

    onSearchClick() {
        if (this.props.onSearch) this.props.onSearch(this.state.value);
    }
}