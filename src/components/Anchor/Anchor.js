import { Component, xml, useState, onMounted, onWillUnmount } from "@odoo/owl";

export class Anchor extends Component {
    static template = xml`
        <div class="o-anchor" t-att-class="{'o-anchor-horizontal': props.direction === 'horizontal', 'o-anchor-affix': props.affix}">
            <div class="o-anchor-ink"></div>
            <div class="o-anchor-list">
                <t t-foreach="props.items" t-as="item" t-key="item.key">
                    <div class="o-anchor-link" t-att-class="{'o-anchor-link-active': state.activeLink === item.href}">
                        <a t-att-href="item.href" 
                           class="o-anchor-link-title" 
                           t-att-title="item.title"
                           t-on-click="(ev) => this.handleClick(ev, item)">
                            <t t-esc="item.title"/>
                        </a>
                        
                        <t t-if="item.children">
                            <t t-foreach="item.children" t-as="subItem" t-key="subItem.key">
                                <div class="o-anchor-link" t-att-class="{'o-anchor-link-active': state.activeLink === subItem.href}">
                                    <a t-att-href="subItem.href" 
                                       class="o-anchor-link-title" 
                                       t-att-title="subItem.title"
                                       t-on-click="(ev) => this.handleClick(ev, subItem)">
                                        <t t-esc="subItem.title"/>
                                    </a>
                                    
                                    <t t-if="subItem.children">
                                        <t t-foreach="subItem.children" t-as="grandSubItem" t-key="grandSubItem.key">
                                            <div class="o-anchor-link" t-att-class="{'o-anchor-link-active': state.activeLink === grandSubItem.href}">
                                                <a t-att-href="grandSubItem.href" 
                                                   class="o-anchor-link-title" 
                                                   t-att-title="grandSubItem.title"
                                                   t-on-click="(ev) => this.handleClick(ev, grandSubItem)">
                                                    <t t-esc="grandSubItem.title"/>
                                                </a>
                                            </div>
                                        </t>
                                    </t>
                                </div>
                            </t>
                        </t>
                    </div>
                </t>
            </div>
        </div>
    `;

    static props = {
        items: { type: Array },
        direction: { type: String, optional: true },
        affix: { type: Boolean, optional: true },
        offsetTop: { type: Number, optional: true },
        containerSelector: { type: String, optional: true },
    };

    static defaultProps = {
        direction: 'vertical',
        affix: true,
        offsetTop: 0,
        containerSelector: 'window',
    };

    setup() {
        this.state = useState({ activeLink: '' });
        this.handleScroll = this.handleScroll.bind(this);

        onMounted(() => {
            const container = this.getContainer();
            if (container) {
                container.addEventListener('scroll', this.handleScroll, { passive: true });
            }
            setTimeout(() => this.handleScroll(), 100); 
        });

        onWillUnmount(() => {
            const container = this.getContainer();
            if (container) {
                container.removeEventListener('scroll', this.handleScroll);
            }
        });
    }

    getContainer() {
        if (this.props.containerSelector && this.props.containerSelector !== 'window') {
            return document.querySelector(this.props.containerSelector);
        }
        return window;
    }

    extractHrefs(items) {
        let hrefs = [];
        for (const item of items) {
            hrefs.push(item.href);
            if (item.children) {
                hrefs = hrefs.concat(this.extractHrefs(item.children));
            }
        }
        return hrefs;
    }

    handleScroll() {
        const container = this.getContainer();
        if (!container) return;

        const hrefs = this.extractHrefs(this.props.items);
        let currentActive = this.state.activeLink;
        const offset = this.props.offsetTop || 0;
        
        for (const href of hrefs) {
            try {
                const target = document.querySelector(href);
                if (target) {
                    const targetRect = target.getBoundingClientRect();
                    const containerRect = container === window ? { top: 0 } : container.getBoundingClientRect();
                    const relativeTop = targetRect.top - containerRect.top;

                    if (relativeTop <= offset + 120) {
                        currentActive = href;
                    }
                }
            } catch(e) {}
        }

        if (currentActive !== this.state.activeLink) {
            this.state.activeLink = currentActive;
        }
    }

    handleClick(ev, item) {
        ev.preventDefault();
        this.state.activeLink = item.href;
        
        try {
            const target = document.querySelector(item.href);
            const container = this.getContainer();
            
            if (target && container) {
                const offset = this.props.offsetTop || 0;
                if (container === window) {
                    const targetTop = target.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({ top: targetTop - offset, behavior: 'smooth' });
                } else {
                    const targetTop = target.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
                    container.scrollTo({ top: targetTop - offset, behavior: 'smooth' });
                }
            }
        } catch(e) {
            console.warn("Anchor navigation error:", e);
        }
    }
}