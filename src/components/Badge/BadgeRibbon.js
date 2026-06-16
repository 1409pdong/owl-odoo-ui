import { Component, xml } from "@odoo/owl";

export class BadgeRibbon extends Component {
    static template = xml`
        <div class="o-badge-ribbon-wrapper">
            <t t-slot="default"/>
            
            <div class="o-badge-ribbon" t-att-class="ribbonClasses">
                <span t-esc="props.text"/>
                <div class="o-badge-ribbon-corner"></div>
            </div>
        </div>
    `;

    static props = {
        text: { type: String },
        status: { type: String, optional: true }, // 'primary' | 'success' | 'error' | 'warning'
        slots: { type: Object, optional: true }
    };

    static defaultProps = { status: 'primary' };

    get ribbonClasses() {
        return `o-badge-ribbon-${this.props.status}`;
    }
}