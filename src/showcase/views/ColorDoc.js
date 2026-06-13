import { Component, xml, useState } from "@odoo/owl";
import colorTokens from "../../scss/tokens/_export_colors.module.scss";

export class ColorDoc extends Component {
    setup() {
        this.state = useState({ copiedHex: null });

        this.palettes = [
            { name: "Primary", id: "primary", description: "Màu thương hiệu chính, dùng cho CTA, Nút bấm hành động chính (Save, Edit) và liên kết quan trọng.", colors: this.extractColorPalette('primary') },
            { name: "Neutral", id: "neutral", description: "Hệ thống màu trung tính dùng cho nền hệ thống (Background), đường phân cách (Border) và màu chữ (Text).", colors: this.extractColorPalette('neutral') },
            { name: "Success", id: "success", description: "Biểu thị trạng thái hoàn thành, thành công của luồng nghiệp vụ hoặc thông báo tích cực.", colors: this.extractColorPalette('success') },
            { name: "Error", id: "error", description: "Biểu thị lỗi hệ thống, cảnh báo nguy hiểm, nút hành động hủy bỏ hoặc xóa dữ liệu.", colors: this.extractColorPalette('error') },
            { name: "Warning", id: "warning", description: "Cảnh báo luồng nghiệp vụ, trạng thái chờ phê duyệt, chứng từ nháp hoặc cần lưu ý.", colors: this.extractColorPalette('warning') },
            { name: "Info", id: "info", description: "Thông tin bổ sung, trạng thái đang xử lý hoặc các nhãn thông tin nội bộ.", colors: this.extractColorPalette('info') }
        ];
    }

    extractColorPalette(prefix) {
        const colors = [];
        if (!colorTokens) return colors;
        for (const [key, value] of Object.entries(colorTokens)) {
            if (key.startsWith(prefix)) {
                const weight = key.replace(prefix, '');
                colors.push({ weight: weight, hex: value, isBase: weight === '500' });
            }
        }
        return colors.sort((a, b) => parseInt(a.weight) - parseInt(b.weight));
    }

    async copyHex(hex) {
        try {
            await navigator.clipboard.writeText(hex);
            this.state.copiedHex = hex;
            setTimeout(() => {
                if (this.state.copiedHex === hex) this.state.copiedHex = null;
            }, 1500);
        } catch (err) { console.error('Failed to copy!', err); }
    }

    static template = xml`
        <div class="o_doc_container py-3">
            <h1 class="fw-bold text-dark mb-2">Color System</h1>
            <p class="text-muted mb-4">Quy chuẩn bảng màu hệ thống phục vụ cấu trúc giao diện Odoo ERP backend.</p>

            <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">Color Palettes</h2>
            
            <div class="card border border-light shadow-sm rounded mb-4 bg-white">
                <div class="card-body p-0">
                    <t t-foreach="palettes" t-as="palette" t-key="palette.id">
                        <div class="d-flex flex-column px-4 py-3 border-bottom position-relative">
                            
                            <div class="d-flex align-items-start mb-3">
                                <div style="width: 200px; flex-shrink: 0;" class="pe-3">
                                    <div class="text-dark fw-bold" style="font-size: 15px;"><t t-esc="palette.name"/></div>
                                    <div class="text-muted mt-1"><code class="text-primary bg-light px-1 py-0.5 rounded" style="font-size: 11px;">$<t t-esc="palette.id"/>-*</code></div>
                                </div>
                                <div class="flex-grow-1 border-start ps-3">
                                    <div class="text-muted small" style="line-height: 1.5;"><t t-esc="palette.description"/></div>
                                </div>
                            </div>

                            <div class="d-flex gap-2 mt-1 w-100">
                                <t t-foreach="palette.colors" t-as="color" t-key="color.weight">
                                    <div class="flex-fill" t-on-click="() => this.copyHex(color.hex)" style="cursor: pointer;" title="Click to copy">
                                        <div class="rounded-top w-100" t-att-style="'height: 36px; background-color: ' + color.hex + '; border: 1px solid rgba(0,0,0,0.05); border-bottom: none;'"></div>
                                        <div class="border border-top-0 rounded-bottom p-2 bg-light text-center">
                                            <div class="small fw-bold" t-att-class="color.isBase ? 'text-primary' : 'text-dark'" style="font-size: 11px;">
                                                <t t-esc="color.weight"/>
                                            </div>
                                            <div t-if="state.copiedHex === color.hex" class="text-success fw-bold mt-1" style="font-size: 9px;">COPIED</div>
                                            <div t-else="" class="text-muted mt-1" style="font-size: 9px;"><t t-esc="color.hex"/></div>
                                        </div>
                                    </div>
                                </t>
                            </div>

                        </div>
                    </t>
                </div>
            </div>
        </div>
    `;
}