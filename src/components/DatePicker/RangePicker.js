import { Component, xml, useState, useRef, onMounted, onWillUnmount } from "@odoo/owl";

export class RangePicker extends Component {
    static template = xml`
        <div class="o-picker o-picker-range" t-att-class="pickerClasses" t-ref="root" t-on-click="togglePopup">
            <div class="o-picker-input">
                <input t-att-placeholder="props.placeholder[0]" t-att-value="state.startStr" readonly="readonly" t-att-disabled="props.disabled"/>
            </div>
            <div class="o-picker-range-separator"><i class="fa fa-long-arrow-right"/></div>
            <div class="o-picker-input">
                <input t-att-placeholder="props.placeholder[1]" t-att-value="state.endStr" readonly="readonly" t-att-disabled="props.disabled"/>
                <span class="o-picker-clear" t-att-class="{'show': (state.startStr or state.endStr) and props.allowClear and !props.disabled}" t-on-click.stop="clearDate"><i class="fa fa-times-circle"/></span>
                <span class="o-picker-suffix"><i class="fa fa-calendar"/></span>
            </div>

            <div t-if="state.isOpen and !props.disabled" class="o-picker-dropdown" t-att-class="props.placement === 'bottomRight' ? 'o-picker-placement-bottomRight' : ''" t-on-click.stop="">
                <div class="o-picker-panel-container">
                    
                    <div class="o-picker-presets" t-if="props.presets and props.presets.length">
                        <ul>
                            <t t-foreach="props.presets" t-as="preset" t-key="preset_index">
                                <li t-on-click="() => this.applyPreset(preset)"><t t-esc="preset.label"/></li>
                            </t>
                        </ul>
                    </div>

                    <div class="o-picker-panel">
                        <div class="o-picker-header">
                            <button t-on-click="() => this.changeMonth(-1)"><i class="fa fa-angle-left"/></button>
                            <div class="o-picker-header-view"><t t-esc="monthNames[state.viewMonth]"/> <t t-esc="state.viewYear"/></div>
                            <button t-on-click="() => this.changeMonth(1)"><i class="fa fa-angle-right"/></button>
                        </div>
                        <table class="o-picker-content">
                            <thead><tr><th>Su</th><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th></tr></thead>
                            <tbody>
                                <t t-foreach="calendarGrid" t-as="week" t-key="week_index">
                                    <tr>
                                        <t t-foreach="week" t-as="day" t-key="day.dateStr">
                                            <td t-att-class="getCellClasses(day)" t-on-mouseenter="() => this.onHoverDay(day)">
                                                <div class="o-picker-cell-inner" t-on-click="() => this.selectDate(day)"><t t-esc="day.date"/></div>
                                            </td>
                                        </t>
                                    </tr>
                                </t>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;

    static props = {
        size: { type: String, optional: true },
        variant: { type: String, optional: true }, 
        placement: { type: String, optional: true },
        disabled: { type: Boolean, optional: true },
        disabledDate: { type: Function, optional: true },
        placeholder: { type: Array, optional: true },
        allowClear: { type: Boolean, optional: true },
        presets: { type: Array, optional: true }, // Mảng cấu hình: [{label: 'Today', value: ['2026-06-14', '2026-06-14']}]
        onChange: { type: Function, optional: true }
    };

    static defaultProps = { size: 'medium', variant: 'outlined', placement: 'bottomLeft', disabled: false, placeholder: ['Start date', 'End date'], allowClear: true };

    setup() {
        this.root = useRef("root");
        this.monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        const now = new Date();
        this.state = useState({
            isOpen: false,
            startStr: '', endStr: '', hoverStr: '',
            selecting: 'start',
            viewMonth: now.getMonth(), viewYear: now.getFullYear()
        });

        this.onWindowClick = this.onWindowClick.bind(this);
        onMounted(() => window.addEventListener('click', this.onWindowClick));
        onWillUnmount(() => window.removeEventListener('click', this.onWindowClick));
    }

    get pickerClasses() {
        let classes = [`o-picker-${this.props.size}`, `o-picker-${this.props.variant}`];
        if (this.state.isOpen) classes.push('o-picker-focused');
        if (this.props.disabled) classes.push('o-picker-disabled');
        return classes.join(' ');
    }

    get calendarGrid() {
        const year = this.state.viewYear, month = this.state.viewMonth;
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        const grid = []; let currentWeek = [];
        
        const pushDay = (d, isCur, mOffset) => {
            const dateObj = new Date(year, month + mOffset, d);
            const dateStr = this.formatDate(dateObj);
            const isDisabled = this.props.disabledDate ? this.props.disabledDate(dateObj) : false;
            currentWeek.push({ date: d, isCurrentMonth: isCur, dateStr, isDisabled });
            if (currentWeek.length === 7) { grid.push(currentWeek); currentWeek = []; }
        };

        for (let i = firstDay - 1; i >= 0; i--) pushDay(daysInPrevMonth - i, false, -1);
        for (let i = 1; i <= daysInMonth; i++) pushDay(i, true, 0);
        
        let nextDay = 1;
        while (currentWeek.length > 0 && currentWeek.length < 7) pushDay(nextDay++, false, 1);
        
        return grid;
    }

    formatDate(d) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }

    getCellClasses(day) {
        let classes = [];
        if (!day.isCurrentMonth) classes.push('o-picker-cell-out-view');
        if (day.isDisabled) classes.push('o-picker-cell-disabled');
        
        const isStart = day.dateStr === this.state.startStr;
        const isEnd = day.dateStr === this.state.endStr;
        if (isStart || isEnd) classes.push('o-picker-cell-selected');

        if (this.state.startStr && !day.isDisabled) {
            let compareEnd = this.state.endStr || (this.state.selecting === 'end' ? this.state.hoverStr : null);
            if (compareEnd) {
                const dDate = new Date(day.dateStr).getTime();
                const sDate = new Date(this.state.startStr).getTime();
                const eDate = new Date(compareEnd).getTime();
                const min = Math.min(sDate, eDate);
                const max = Math.max(sDate, eDate);

                if (dDate >= min && dDate <= max) {
                    classes.push('o-picker-cell-in-range');
                    if (dDate === min) classes.push('o-picker-cell-range-start');
                    if (dDate === max) classes.push('o-picker-cell-range-end');
                }
            }
        }
        return classes.join(' ');
    }

    onWindowClick(ev) { if (this.state.isOpen && this.root.el && !this.root.el.contains(ev.target)) this.state.isOpen = false; }
    
    togglePopup() { 
        if (!this.props.disabled) {
            this.state.isOpen = !this.state.isOpen; 
            if (this.state.isOpen) this.state.selecting = this.state.startStr && !this.state.endStr ? 'end' : 'start';
        }
    }
    
    changeMonth(delta) {
        let m = this.state.viewMonth + delta; let y = this.state.viewYear;
        if (m < 0) { m = 11; y--; } else if (m > 11) { m = 0; y++; }
        this.state.viewMonth = m; this.state.viewYear = y;
    }

    onHoverDay(day) { if (this.state.selecting === 'end' && this.state.startStr && !day.isDisabled) this.state.hoverStr = day.dateStr; }

    selectDate(day) {
        if (day.isDisabled) return;
        if (this.state.selecting === 'start' || (this.state.startStr && new Date(day.dateStr) < new Date(this.state.startStr))) {
            this.state.startStr = day.dateStr;
            this.state.endStr = '';
            this.state.selecting = 'end';
        } else {
            this.state.endStr = day.dateStr;
            this.state.isOpen = false;
            this.state.selecting = 'start';
            if (this.props.onChange) this.props.onChange([this.state.startStr, this.state.endStr]);
        }
    }

    applyPreset(preset) {
        if (preset.value && preset.value.length === 2) {
            this.state.startStr = preset.value[0];
            this.state.endStr = preset.value[1];
            this.state.isOpen = false;
            this.state.selecting = 'start';
            if (this.props.onChange) this.props.onChange([this.state.startStr, this.state.endStr]);
            
            // Đẩy view lịch về tháng của ngày bắt đầu
            const d = new Date(this.state.startStr);
            this.state.viewMonth = d.getMonth();
            this.state.viewYear = d.getFullYear();
        }
    }

    clearDate(ev) {
        this.state.startStr = ''; this.state.endStr = ''; this.state.hoverStr = '';
        this.state.selecting = 'start';
        if (this.props.onChange) this.props.onChange([]);
    }
}