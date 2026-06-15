import { Component, xml, useState, useSubEnv, onWillUpdateProps } from "@odoo/owl";

export class Collapse extends Component {
    static template = xml`
        <div class="o-collapse" t-att-class="classes">
            <t t-slot="default"/>
        </div>
    `;

    static props = {
        activeKey: { type: [String, Array, Number], optional: true },
        defaultActiveKey: { type: [String, Array, Number], optional: true },
        accordion: { type: Boolean, optional: true },
        bordered: { type: Boolean, optional: true },
        ghost: { type: Boolean, optional: true },
        onChange: { type: Function, optional: true },
        slots: { type: Object, optional: true }
    };

    static defaultProps = { accordion: false, bordered: true, ghost: false };

    setup() {
        let initial = this.props.activeKey !== undefined ? this.props.activeKey : (this.props.defaultActiveKey || []);
        if (!Array.isArray(initial)) initial = initial ? [initial] : [];

        this.state = useState({ activeKeys: initial });

        // Truyền State xuống CollapsePanel qua Env (Proxy để tự động Re-render)
        useSubEnv({
            getCollapseCtx: () => ({
                activeKeys: this.currentActiveKeys,
                togglePanel: this.togglePanel.bind(this)
            })
        });

        onWillUpdateProps((nextProps) => {
            if ('activeKey' in nextProps && nextProps.activeKey !== undefined) {
                let nextKeys = Array.isArray(nextProps.activeKey) ? nextProps.activeKey : [nextProps.activeKey];
                this.state.activeKeys = nextKeys;
            }
        });
    }

    get currentActiveKeys() {
        let keys = this.props.activeKey !== undefined ? this.props.activeKey : this.state.activeKeys;
        return Array.isArray(keys) ? keys : (keys ? [keys] : []);
    }

    get classes() {
        let cls = [];
        if (!this.props.bordered) cls.push('o-collapse-borderless');
        if (this.props.ghost) cls.push('o-collapse-ghost');
        return cls.join(' ');
    }

    togglePanel(key) {
        let current = [...this.currentActiveKeys];
        
        if (this.props.accordion) {
            // Mở 1 panel duy nhất
            current = current.includes(key) ? [] : [key];
        } else {
            // Mở nhiều panel
            if (current.includes(key)) {
                current = current.filter(k => k !== key);
            } else {
                current.push(key);
            }
        }

        if (this.props.activeKey === undefined) {
            this.state.activeKeys = current;
        }

        if (this.props.onChange) {
            this.props.onChange(this.props.accordion ? (current.length ? current[0] : null) : current);
        }
    }
}