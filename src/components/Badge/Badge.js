import { Component, xml } from "@odoo/owl";

export class Badge extends Component {
    static template = xml`
        <t t-if="props.status">
            <span class="o-badge-status-container">
                <span class="o-badge-status-dot" t-att-class="statusDotClasses"></span>
                <span t-if="props.text" class="o-badge-status-text" t-esc="props.text"/>
            </span>
        </t>

        <t t-else="">
            <span class="o-badge-container">
                <t t-if="props.slots and props.slots.default">
                    <t t-slot="default"/>
                </t>

                <span t-if="shouldShow" class="o-badge" t-att-class="badgeClasses">
                    <t t-if="!props.dot">
                        <t t-esc="displayCount"/>
                    </t>
                </span>
            </span>
        </t>
    `;

    static props = {
        count: { type: [Number, String], optional: true },
        dot: { type: Boolean, optional: true },
        overflowCount: { type: Number, optional: true },
        showZero: { type: Boolean, optional: true },
        size: { type: String, optional: true },   // 'medium' | 'small'
        status: { type: String, optional: true }, // 'default' | 'success' | 'error' | 'warning' | 'processing' | 'primary'
        text: { type: String, optional: true },   // Đi kèm với status
        slots: { type: Object, optional: true }
    };

    static defaultProps = { dot: false, overflowCount: 99, showZero: false, size: 'medium' };

    get isStandalone() {
        return !(this.props.slots && this.props.slots.default);
    }

    get shouldShow() {
        if (this.props.dot) return true;
        if (this.props.count === 0 || this.props.count === '0') {
            return this.props.showZero;
        }
        return this.props.count !== undefined && this.props.count !== null && this.props.count !== '';
    }

    get displayCount() {
        const countNum = Number(this.props.count);
        if (!isNaN(countNum) && countNum > this.props.overflowCount) {
            return `${this.props.overflowCount}+`;
        }
        return this.props.count;
    }

    get badgeClasses() {
        let cls = [];
        cls.push(`o-badge-${this.props.size}`);
        if (this.props.dot) cls.push('o-badge-dot');
        if (this.isStandalone) cls.push('o-badge-standalone');
        return cls.join(' ');
    }

    get statusDotClasses() {
        return `o-badge-status-dot o-badge-status-${this.props.status}`;
    }
}