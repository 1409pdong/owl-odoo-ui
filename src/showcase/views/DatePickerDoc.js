import { Component, xml, useState } from "@odoo/owl";
import { DatePicker } from "../../components/DatePicker/DatePicker.js";
import { RangePicker } from "../../components/DatePicker/RangePicker.js";

export class DatePickerDoc extends Component {
    static components = { DatePicker, RangePicker };

    setup() {
        this.state = useState({
            selectedDate: '2026-06-14',
            rangeDates: [],
            momentDate: ''
        });

        // Hàm chặn chọn ngày trong quá khứ
        this.disablePastDates = (date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date < today;
        };

        // Cấu hình Preset cho RangePicker
        const todayStr = this.formatDate(new Date());
        const last7DaysStr = this.formatDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
        
        this.rangePresets = [
            { label: 'Hôm nay', value: [todayStr, todayStr] },
            { label: '7 Ngày qua', value: [last7DaysStr, todayStr] }
        ];
    }

    formatDate(d) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }

    static template = xml`
        <div class="o_doc_container py-3">
            <h1 class="fw-bold text-dark mb-2">DatePicker Component</h1>
            <p class="text-muted mb-4">Lựa chọn hoặc nhập dữ liệu ngày tháng. Phiên bản đầy đủ tính năng chuẩn 100% Ant Design / Odoo.</p>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">1. Cơ bản &amp; Variants (Biến thể)</h2>
                <div class="card border border-light shadow-sm rounded mb-4 bg-white p-4">
                    <p class="text-muted small mb-3">Hỗ trợ 4 kiểu Render khung viền khác nhau (Outlined, Filled, Borderless, Underlined).</p>
                    <div class="d-flex flex-column gap-3" style="max-width: 300px;">
                        <DatePicker placeholder="'Outlined (Mặc định)'"/>
                        <DatePicker variant="'filled'" placeholder="'Filled Variant'"/>
                        <DatePicker variant="'borderless'" placeholder="'Borderless Variant'"/>
                        <DatePicker variant="'underlined'" placeholder="'Underlined Variant'"/>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">2. Select a Moment &amp; Disable Dates</h2>
                <div class="card border border-light shadow-sm rounded mb-4 bg-white p-4">
                    <div class="mb-4">
                        <div class="fw-bold text-dark mb-2 small">Chọn Ngày Giờ (ShowTime)</div>
                        <DatePicker showTime="true" placeholder="'Chọn ngày giờ cụ thể'" />
                    </div>
                    
                    <div class="pt-3 border-top">
                        <div class="fw-bold text-dark mb-2 small">Chặn ngày quá khứ (Disabled Dates)</div>
                        <p class="text-muted small mb-2">Dùng hàm JS <code>(date) => boolean</code> để quyết định ngày nào bị mờ đi.</p>
                        <DatePicker disabledDate="disablePastDates" placeholder="'Thử chọn ngày hôm qua'" />
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">3. Range Picker &amp; Presets (Lối tắt)</h2>
                <div class="card border border-light shadow-sm rounded mb-4 bg-white p-4">
                    <p class="text-muted small mb-3">Tích hợp thanh Shortcut bên trái giúp User chọn nhanh các bộ lọc Báo Cáo kinh điển.</p>
                    <div style="max-width: 400px;">
                        <RangePicker presets="rangePresets" onChange="(vals) => this.state.rangeDates = vals"/>
                    </div>
                    <div class="mt-3 text-muted small">
                        Dữ liệu xuất ra: 
                        <span class="fw-bold text-dark"><t t-esc="state.rangeDates[0]"/></span> -> 
                        <span class="fw-bold text-dark"><t t-esc="state.rangeDates[1]"/></span>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">4. Custom Footer &amp; Prefix/Suffix Slots</h2>
                <div class="card border border-light shadow-sm rounded mb-4 bg-white p-4">
                    <div style="max-width: 300px;">
                        <DatePicker placeholder="'Tùy chỉnh thành phần phụ'">
                            <t t-set-slot="prefix"><i class="fa fa-user me-2"></i></t>
                            <t t-set-slot="extraFooter">
                                <span class="text-success fw-bold"><i class="fa fa-info-circle me-1"></i> Dự án A</span>
                            </t>
                        </DatePicker>
                    </div>
                </div>
            </div>
            
            <div style="height: 300px;"></div>
        </div>
    `;
}