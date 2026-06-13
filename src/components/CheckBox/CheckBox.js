import { Component, xml } from "@odoo/owl";

export class CheckBox extends Component {
    static template = xml`
        <div class="form-check cursor-pointer">
            <input type="checkbox"
                   class="form-check-input cursor-pointer"
                   t-att-id="props.id"
                   t-att-checked="props.value"
                   t-att-disabled="props.disabled"
                   t-on-change="onChange"/>
            <label class="form-check-label cursor-pointer user-select-none" 
                   t-att-for="props.id">
                <t t-if="props.label" t-esc="props.label"/>
            </label>
        </div>
    `;

    static props = {
        id: { type: String },
        value: { type: Boolean },
        label: { type: String, optional: true },
        disabled: { type: Boolean, optional: true },
        onChange: { type: Function },
    };

    onChange() {
        if (!this.props.disabled) {
            this.props.onChange(!this.props.value);
        }
    }
}