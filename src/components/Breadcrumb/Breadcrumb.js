import { Component, xml } from "@odoo/owl";

export class Breadcrumb extends Component {
    static template = xml`
        <nav class="o-breadcrumb" aria-label="breadcrumb">
            <ol class="o-breadcrumb-list">
                <t t-foreach="props.items" t-as="item" t-key="item.key || item_index">
                    <li class="o-breadcrumb-item" t-att-class="{'o-breadcrumb-item-active': item_last}">
                        
                        <t t-if="!item_last and item.href">
                            <a t-att-href="item.href" class="o-breadcrumb-link" t-on-click="(ev) => this.handleClick(ev, item)">
                                <i t-if="item.icon" t-attf-class="fa fa-fw {{item.icon}} me-1"/>
                                <t t-esc="item.title"/>
                            </a>
                        </t>
                        
                        <t t-else="">
                            <span class="o-breadcrumb-text">
                                <i t-if="item.icon" t-attf-class="fa fa-fw {{item.icon}} me-1"/>
                                <t t-esc="item.title"/>
                            </span>
                        </t>

                        <span class="o-breadcrumb-separator" t-if="!item_last">
                            <t t-if="props.separator">
                                <t t-esc="props.separator"/>
                            </t>
                            <t t-else="">
                                /
                            </t>
                        </span>

                    </li>
                </t>
            </ol>
        </nav>
    `;

    static props = {
        items: { type: Array },
        separator: { type: String, optional: true },
        onClick: { type: Function, optional: true }
    };

    static defaultProps = {
        separator: '/'
    };

    handleClick(ev, item) {
        if (this.props.onClick) {
            ev.preventDefault();
            this.props.onClick(ev, item);
        }
    }
}