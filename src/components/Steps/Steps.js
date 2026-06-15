import { Component, xml } from "@odoo/owl";

export class Steps extends Component {
    static template = xml`
        <div class="o-steps" t-att-class="stepsClasses">
            <t t-foreach="props.items" t-as="item" t-key="item_index">
                <div class="o-step-item" 
                     t-att-class="getStepClasses(item, item_index)"
                     t-on-click="(ev) => this.handleStepClick(item_index, item, ev)">
                    
                    <t t-if="props.type !== 'navigation'">
                        
                        <div class="o-step-icon">
                            <t t-if="item.icon"><i t-attf-class="fa fa-fw {{item.icon}}"/></t>
                            <t t-elif="getStepStatus(item, item_index) === 'finish' and props.type !== 'dot'">
                                <i class="fa fa-check"/>
                            </t>
                            <t t-elif="getStepStatus(item, item_index) === 'error' and props.type !== 'dot'">
                                <i class="fa fa-times"/>
                            </t>
                            <t t-elif="props.type !== 'dot'">
                                <t t-esc="item_index + 1"/>
                            </t>
                        </div>
                        
                        <div class="o-step-content">
                            <div class="o-step-title">
                                <t t-esc="item.title"/>
                                <span t-if="item.subTitle" class="o-step-subtitle"><t t-esc="item.subTitle"/></span>
                            </div>
                            <div t-if="item.description" class="o-step-description">
                                <t t-esc="item.description"/>
                            </div>
                        </div>

                        <t t-if="props.type !== 'panel'">
                            <div t-if="item_index !== props.items.length - 1" class="o-step-tail"></div>
                        </t>
                    </t>
                    
                    <t t-if="props.type === 'navigation'">
                        <t t-esc="item.title"/>
                    </t>

                </div>
            </t>
        </div>
    `;

    static props = {
        items: { type: Array },
        current: { type: Number, optional: true },
        type: { type: String, optional: true }, // 'default' | 'dot' | 'navigation' | 'panel'
        direction: { type: String, optional: true }, // 'horizontal' | 'vertical'
        size: { type: String, optional: true }, // 'default' | 'small'
        status: { type: String, optional: true }, // 'wait' | 'process' | 'finish' | 'error'
        onChange: { type: Function, optional: true }
    };

    static defaultProps = {
        current: 0,
        type: 'default',
        direction: 'horizontal',
        size: 'default',
        status: 'process'
    };

    get stepsClasses() {
        let classes = [`o-steps-${this.props.type}`];
        if (this.props.direction === 'vertical') classes.push('o-steps-vertical');
        if (this.props.size === 'small') classes.push('o-steps-small');
        return classes.join(' ');
    }

    getStepStatus(item, index) {
        if (item.status) return item.status; 
        
        const current = this.props.current;
        if (index < current) return 'finish';
        if (index === current) return this.props.status || 'process';
        return 'wait';
    }

    getStepClasses(item, index) {
        let classes = [`o-step-item-${this.props.type}`];
        classes.push(`o-step-item-${this.getStepStatus(item, index)}`);
        if (item.disabled) classes.push('o-step-item-disabled');
        if (this.props.onChange && !item.disabled) classes.push('cursor-pointer');
        return classes.join(' ');
    }

    handleStepClick(index, item, ev) {
        if (item.disabled || !this.props.onChange) return;
        this.props.onChange(index, item);
    }
}