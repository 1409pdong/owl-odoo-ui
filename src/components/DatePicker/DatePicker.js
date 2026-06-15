import { Component, xml, useState, useRef, onMounted, onWillUnmount } from "@odoo/owl";

export class DatePicker extends Component {
    static template = xml`
        <div class="o-picker" t-att-class="pickerClasses" t-ref="root" t-on-click="togglePopup">
            <div class="o-picker-input">
                <span class="o-picker-prefix" t-if="props.slots and props.slots.prefix">
                    <t t-slot="prefix"/>
                </span>
                
                <input t-att-placeholder="props.placeholder || 'Select date'" 
                       t-att-value="displayValue" 
                       readonly="readonly" 
                       t-att-disabled="props.disabled"/>
                       
                <span class="o-picker-clear" t-att-class="{'show': displayValue and props.allowClear and !props.disabled}" t-on-click.stop="clearDate">
                    <i class="fa fa-times-circle"/>
                </span>
                
                <span class="o-picker-suffix">
                    <t t-if="props.slots and props.slots.suffix"><t t-slot="suffix"/></t>
                    <t t-else=""><i class="fa fa-calendar"/></t>
                </span>
            </div>

            <div t-if="state.isOpen and !props.disabled" class="o-picker-dropdown" t-att-class="props.placement === 'bottomRight' ? 'o-picker-placement-bottomRight' : ''" t-on-click.stop="">
                <div class="o-picker-panel-container">
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
                                            <td t-att-class="{
                                                'o-picker-cell-in-view': day.isCurrentMonth, 
                                                'o-picker-cell-out-view': !day.isCurrentMonth, 
                                                'o-picker-cell-selected': day.dateStr === state.selectedDateStr, 
                                                'o-picker-cell-today': day.isToday,
                                                'o-picker-cell-disabled': day.isDisabled
                                            }">
                                                <div class="o-picker-cell-inner" t-on-click="() => this.selectDate(day)"><t t-esc="day.date"/></div>
                                            </td>
                                        </t>
                                    </tr>
                                </t>
                            </tbody>
                        </table>
                    </div>

                    <div t-if="props.showTime" class="o-picker-time-panel">
                        <div class="o-picker-time-column">
                            <ul><t t-foreach="timeOptions.hours" t-as="h" t-key="h"><li t-att-class="{'o-picker-time-cell-selected': state.selectedHour === h}" t-on-click="() => this.selectTime('hour', h)"><t t-esc="h"/></li></t></ul>
                        </div>
                        <div class="o-picker-time-column">
                            <ul><t t-foreach="timeOptions.minutes" t-as="m" t-key="m"><li t-att-class="{'o-picker-time-cell-selected': state.selectedMinute === m}" t-on-click="() => this.selectTime('minute', m)"><t t-esc="m"/></li></t></ul>
                        </div>
                    </div>
                </div>
                
                <div class="o-picker-footer">
                    <div class="o-picker-footer-extra"><t t-if="props.slots and props.slots.extraFooter"><t t-slot="extraFooter"/></t></div>
                    <div class="d-flex gap-2 align-items-center">
                        <a href="#" t-on-click.prevent="selectToday">Today</a>
                        <button t-if="props.showTime" class="btn btn-sm btn-primary py-0 px-2" t-on-click.stop="confirmSelection">OK</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    static props = {
        value: { type: String, optional: true },
        defaultValue: { type: String, optional: true },
        placeholder: { type: String, optional: true },
        size: { type: String, optional: true },
        variant: { type: String, optional: true }, // 'outlined' | 'borderless' | 'filled' | 'underlined'
        placement: { type: String, optional: true }, // 'bottomLeft' | 'bottomRight'
        disabled: { type: Boolean, optional: true },
        disabledDate: { type: Function, optional: true },
        allowClear: { type: Boolean, optional: true },
        showTime: { type: Boolean, optional: true },
        onChange: { type: Function, optional: true },
        slots: { type: Object, optional: true }
    };

    static defaultProps = { size: 'medium', variant: 'outlined', placement: 'bottomLeft', disabled: false, allowClear: true, showTime: false };

    setup() {
        this.root = useRef("root");
        const initVal = this.props.value || this.props.defaultValue;
        const initParsed = initVal ? new Date(initVal) : new Date();

        this.monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        let initialDateStr = '';
        if (initVal) initialDateStr = this.formatDate(initParsed);

        this.state = useState({
            isOpen: false,
            finalValue: initVal || '',
            selectedDateStr: initialDateStr,
            selectedHour: initParsed.getHours().toString().padStart(2, '0'),
            selectedMinute: initParsed.getMinutes().toString().padStart(2, '0'),
            viewMonth: initParsed.getMonth(),
            viewYear: initParsed.getFullYear()
        });

        this.timeOptions = {
            hours: Array.from({length: 24}, (_, i) => String(i).padStart(2, '0')),
            minutes: Array.from({length: 60}, (_, i) => String(i).padStart(2, '0'))
        };

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

    get displayValue() { return this.props.value !== undefined ? this.props.value : this.state.finalValue; }

    get calendarGrid() {
        const year = this.state.viewYear, month = this.state.viewMonth;
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        const grid = []; let currentWeek = [];
        const todayStr = this.formatDate(new Date());

        const pushDay = (d, isCur, mOffset) => {
            const dateObj = new Date(year, month + mOffset, d);
            const dateStr = this.formatDate(dateObj);
            const isDisabled = this.props.disabledDate ? this.props.disabledDate(dateObj) : false;
            currentWeek.push({ date: d, isCurrentMonth: isCur, dateStr, isToday: dateStr === todayStr, isDisabled });
            if (currentWeek.length === 7) { grid.push(currentWeek); currentWeek = []; }
        };

        for (let i = firstDay - 1; i >= 0; i--) pushDay(daysInPrevMonth - i, false, -1);
        for (let i = 1; i <= daysInMonth; i++) pushDay(i, true, 0);
        
        let nextDay = 1;
        while (currentWeek.length > 0 && currentWeek.length < 7) pushDay(nextDay++, false, 1);
        
        return grid;
    }

    formatDate(d) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }

    onWindowClick(ev) { if (this.state.isOpen && this.root.el && !this.root.el.contains(ev.target)) this.state.isOpen = false; }
    togglePopup() { if (!this.props.disabled) this.state.isOpen = !this.state.isOpen; }
    
    changeMonth(delta) {
        let m = this.state.viewMonth + delta; let y = this.state.viewYear;
        if (m < 0) { m = 11; y--; } else if (m > 11) { m = 0; y++; }
        this.state.viewMonth = m; this.state.viewYear = y;
    }

    selectDate(day) {
        if (day.isDisabled) return;
        this.state.selectedDateStr = day.dateStr;
        if (!this.props.showTime) {
            this.state.finalValue = day.dateStr;
            this.state.isOpen = false;
            if (this.props.onChange) this.props.onChange(this.state.finalValue);
        }
    }

    selectTime(type, val) {
        if (type === 'hour') this.state.selectedHour = val;
        else this.state.selectedMinute = val;
    }

    confirmSelection() {
        if (!this.state.selectedDateStr) this.state.selectedDateStr = this.formatDate(new Date());
        this.state.finalValue = `${this.state.selectedDateStr} ${this.state.selectedHour}:${this.state.selectedMinute}:00`;
        this.state.isOpen = false;
        if (this.props.onChange) this.props.onChange(this.state.finalValue);
    }

    selectToday() {
        const todayObj = new Date();
        if (this.props.disabledDate && this.props.disabledDate(todayObj)) return; // Khóa chức năng chọn Today nếu Today bị vô hiệu hóa
        this.selectDate({ dateStr: this.formatDate(todayObj), isDisabled: false });
        if (this.props.showTime) this.confirmSelection();
    }

    clearDate(ev) {
        this.state.finalValue = ''; this.state.selectedDateStr = ''; this.state.isOpen = false;
        if (this.props.onChange) this.props.onChange('');
    }
}