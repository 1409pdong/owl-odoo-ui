import { Component, xml } from "@odoo/owl";
import spacingTokens from "../../scss/tokens/_export_spacing.module.scss";

export class SpacingDoc extends Component {
    setup() {
        this.spacings = this.parseSpacings();
    }

    parseSpacings() {
        const list = [];
        if (!spacingTokens) return list;

        const descriptions = {
            'space-none': 'Reset toàn bộ khoảng cách về 0.',
            'space-100': 'Khoảng cách siêu nhỏ (Micro), dùng đệm giữa icon và chữ.',
            'space-200': 'Khoảng cách hẹp (Tight), dùng làm padding nội bộ của Button hoặc Input.',
            'space-300': 'Khoảng cách vừa, dùng giữa các thành phần liền kề trong form.',
            'space-400': 'Khoảng cách tiêu chuẩn (Base), dùng để tách biệt các cụm layout hoặc Card.',
            'space-500': 'Khoảng cách rộng, dùng tạo khoảng nghỉ giữa các Section.',
            'space-600': 'Khoảng cách rất rộng, dùng cho Container hoặc khoảng cách khối lớn.',
            'space-800': 'Khoảng cách khổng lồ, dùng định hình cấu trúc trang tổng thể.'
        };

        for (const [key, value] of Object.entries(spacingTokens)) {
            let tokenName = key.replace('space', 'space-').toLowerCase();
            const pxValue = parseInt(value) || 0;
            const remValue = pxValue === 0 ? '0' : (pxValue / 16) + 'rem';

            list.push({
                token: tokenName,
                px: pxValue + 'px',
                rem: remValue,
                value: pxValue,
                description: descriptions[tokenName] || 'Khoảng cách hệ thống.',
                isBase: tokenName === 'space-400'
            });
        }
        return list.sort((a, b) => a.value - b.value);
    }

    static template = xml`
        <div class="p-2">

            <div class="mb-4">
                <h2 class="h4 fw-bold">Spacing System</h2>
                <p class="text-muted">Chi tiết quy chuẩn khoảng cách cho hệ thống.</p>
            </div>

            <div class="card shadow-sm border-0 rounded-lg overflow-hidden bg-white">
                <div class="card-body p-0">
                    <t t-foreach="spacings" t-as="item" t-key="item.token">
                        <div class="d-flex align-items-center px-4 py-4 border-bottom position-relative">
                            
                            <div style="width: 180px; flex-shrink: 0;" class="pe-3">
                                <div class="text-dark fw-bold" style="font-size: 16px;">
                                    <t t-esc="item.px"/>
                                    <span t-if="item.isBase" class="badge bg-info ms-2" style="font-size: 10px;">BASE</span>
                                </div>
                                <div style="font-size: 11px; color: #7b4cf6;" class="fw-bold mt-1">
                                    <t t-esc="item.rem"/>
                                </div>
                                <div class="mt-2"><code class="text-dark bg-light px-1 py-0.5 rounded" style="font-size: 10px;">$<t t-esc="item.token"/></code></div>
                            </div>

                            <div style="width: 320px; flex-shrink: 0;" class="pe-4 border-start ps-3">
                                <div class="text-muted small" style="line-height: 1.5; text-align: justify;"><t t-esc="item.description"/></div>
                            </div>

                            <div class="flex-grow-1 ps-3 d-flex align-items-center">
                                <div t-if="item.value > 0" 
                                     style="background-color: #e9ecef; border: 1px dashed #adb5bd;" 
                                     class="d-flex align-items-center justify-content-center rounded-sm"
                                     t-att-style="'height: 32px; width: ' + item.value + 'px;'">
                                </div>
                                <span t-else="" class="text-muted small" style="font-family: var(--bs-font-monospace);">N/A</span>
                            </div>
                        </div>
                    </t>
                </div>
            </div>
        </div>
    `;
}