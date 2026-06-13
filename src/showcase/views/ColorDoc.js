import { Component, xml, useState } from "@odoo/owl";
import colorTokens from "../../scss/tokens/_export_colors.module.scss";

export class ColorDoc extends Component {
    setup() {
        this.state = useState({ copiedHex: null });

        this.palettes = [
            { name: "Primary", id: "primary", description: "Màu thương hiệu chính, dùng cho CTA, Button lưu, Link và các hành động quan trọng.", colors: this.extractColorPalette('primary') },
            { name: "Neutral", id: "neutral", description: "Hệ thống màu xám dùng cho nền (Background), viền (Border) và hệ thống chữ (Text).", colors: this.extractColorPalette('neutral') },
            { name: "Success", id: "success", description: "Trạng thái thành công, hoàn thành tiến trình hoặc các thông báo tích cực.", colors: this.extractColorPalette('success') },
            { name: "Error", id: "error", description: "Trạng thái lỗi, cảnh báo nguy hiểm, nút xóa hoặc từ chối chứng từ.", colors: this.extractColorPalette('error') },
            { name: "Warning", id: "warning", description: "Trạng thái cảnh báo, chờ duyệt, hoặc các thông báo cần sự lưu ý.", colors: this.extractColorPalette('warning') },
            { name: "Info", id: "info", description: "Trạng thái thông tin bổ sung, nhãn xanh lam hoặc trạng thái đang xử lý.", colors: this.extractColorPalette('info') }
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
        <div class="p-2">

            <div class="mb-4">
                <h2 class="h4 fw-bold">ColorSystem</h2>
                <p class="text-muted">Chi tiết quy chuẩn màu sắc cho hệ thống.</p>
            </div>

            <div class="card shadow-sm border-0 rounded-lg overflow-hidden bg-white">
                <div class="card-body p-0">
                    <t t-foreach="palettes" t-as="palette" t-key="palette.id">
                        <div class="d-flex flex-column px-4 py-4 border-bottom position-relative">
                            
                            <div class="d-flex align-items-start mb-3">
                                <div style="width: 180px; flex-shrink: 0;" class="pe-3">
                                    <div class="text-dark fw-bold" style="font-size: 16px;"><t t-esc="palette.name"/></div>
                                    <div class="text-muted mt-1"><code class="text-dark bg-light px-1 py-0.5 rounded" style="font-size: 10px;">$<t t-esc="palette.id"/>-*</code></div>
                                </div>
                                <div class="flex-grow-1 border-start ps-3 pe-4">
                                    <div class="text-muted small" style="line-height: 1.5;"><t t-esc="palette.description"/></div>
                                </div>
                            </div>

                            <div class="d-flex gap-2 mt-2 w-100">
                                <t t-foreach="palette.colors" t-as="color" t-key="color.weight">
                                    <div class="flex-fill" t-on-click="() => this.copyHex(color.hex)" style="cursor: pointer;" title="Click to copy">
                                        <div class="rounded-top w-100" t-att-style="'height: 40px; background-color: ' + color.hex + '; border: 1px solid rgba(0,0,0,0.05); border-bottom: none;'"></div>
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