import { Component, xml } from "@odoo/owl";

export class CollapsePanel extends Component {
    static template = xml`
        <div class="o-collapse-panel" t-att-class="classes">
            <div class="o-collapse-header" t-on-click="onClickHeader">
                
                <div class="o-collapse-expand-icon" t-if="props.showArrow">
                    <i class="fa fa-angle-right"/>
                </div>
                
                <div class="o-collapse-header-text">
                    <t t-if="props.header"><t t-esc="props.header"/></t>
                    <t t-elif="props.slots and props.slots.header"><t t-slot="header"/></t>
                </div>
                
                <div class="o-collapse-extra" t-if="props.slots and props.slots.extra" t-on-click.stop="">
                    <t t-slot="extra"/>
                </div>

            </div>
            
            <div class="o-collapse-content" t-if="isActive">
                <div class="o-collapse-content-box">
                    <t t-slot="default"/>
                </div>
            </div>
        </div>
    `;

    static props = {
        name: { type: [String, Number] }, // Thay cho `key` bị OWL reserve
        header: { type: String, optional: true },
        disabled: { type: Boolean, optional: true },
        showArrow: { type: Boolean, optional: true },
        slots: { type: Object, optional: true }
    };

    static defaultProps = { disabled: false, showArrow: true };

    get ctx() { return this.env.getCollapseCtx ? this.env.getCollapseCtx() : null; }
    
    get isActive() { 
        return this.ctx && this.ctx.activeKeys.includes(this.props.name); 
    }
    
    get classes() {
        let cls = [];
        if (this.isActive) cls.push('o-collapse-panel-active');
        if (this.props.disabled) cls.push('o-collapse-panel-disabled');
        return cls.join(' ');
    }

    onClickHeader() {
        if (!this.props.disabled && this.ctx) {
            this.ctx.togglePanel(this.props.name);
        }
    }
}