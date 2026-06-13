import { Component, xml } from "@odoo/owl";
import spacingTokens from "../../scss/tokens/_export_spacing.module.scss";

export class SpacingDoc extends Component {
    setup() {
        this.spacings = this.parseSpacings();
    }

    parseSpacings() {
        const list = [];
        if (!spacingTokens) return list;

        // Ánh xạ ngữ cảnh thực tế của Odoo ERP
        const contexts = {
            'space-none': {
                desc: 'Xóa bỏ hoàn toàn khoảng cách (0px).',
                odoo: 'Reset margin/padding mặc định của các thẻ HTML.'
            },
            'space-100': {
                desc: 'Khoảng cách siêu nhỏ (Micro).',
                odoo: 'Khoảng đệm giữa Icon và Chữ trong cùng 1 Button (VD: icon [Lưu] và chữ Lưu).'
            },
            'space-200': {
                desc: 'Khoảng cách hẹp (Tight).',
                odoo: 'Khe hở giữa các Nút bấm kề nhau trên thanh Control Panel, hoặc padding ô dữ liệu trong Data Table.'
            },
            'space-300': {
                desc: 'Khoảng cách vừa.',
                odoo: 'Khoảng cách giữa Label và Input field trong một Form View.'
            },
            'space-400': {
                desc: 'Mốc tiêu chuẩn (Base).',
                odoo: 'Padding lề tiêu chuẩn bên trong Kanban Card, Sheet Form (o_form_sheet) hoặc Notebook (Tab).'
            },
            'space-500': {
                desc: 'Khoảng cách rộng.',
                odoo: 'Khoảng cách giữa 2 cột Form (Cột trái/phải) hoặc khoảng nghỉ giữa các Section nhóm dữ liệu.'
            },
            'space-600': {
                desc: 'Khoảng cách rất rộng.',
                odoo: 'Khoảng đệm lề ngoài cùng (Container margin) đẩy nội dung vào giữa màn hình.'
            },
            'space-800': {
                desc: 'Khoảng cách cực lớn.',
                odoo: 'Dùng để phân tách các khu vực layout lõi (Top Header, Main Content, Footer).'
            }
        };

        for (const [key, value] of Object.entries(spacingTokens)) {
            let tokenName = key.replace('space', 'space-').toLowerCase();
            const pxValue = parseInt(value) || 0;
            const remValue = pxValue === 0 ? '0' : (pxValue / 16) + 'rem';
            const contextInfo = contexts[tokenName] || { desc: '', odoo: '' };

            list.push({
                token: tokenName,
                px: pxValue + 'px',
                rem: remValue,
                value: pxValue,
                desc: contextInfo.desc,
                odoo: contextInfo.odoo,
                isBase: tokenName === 'space-400'
            });
        }
        return list.sort((a, b) => a.value - b.value);
    }

    static template = xml`
        <div class="o_doc_container py-3">
            <h1 class="fw-bold text-dark mb-2">Spacing System</h1>
            <p class="text-muted mb-4">Hệ thống khoảng cách dòng, phân tách khối layout và lưới dữ liệu (Grid Margin/Padding).</p>

            <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">Quy chuẩn &amp; Ứng dụng Odoo</h2>

            <div class="card border border-light shadow-sm rounded mb-4 bg-white">
                <div class="card-body p-0">
                    <t t-foreach="spacings" t-as="item" t-key="item.token">
                        
                        <div class="row m-0 px-2 py-3 border-bottom align-items-center">
                            
                            <div class="col-2 pe-3">
                                <div class="text-dark fw-bold" style="font-size: 16px;">
                                    <t t-esc="item.px"/>
                                    <span t-if="item.isBase" class="badge ms-2" style="font-size: 10px; background-color: #714b67; color: white;">BASE</span>
                                </div>
                                <div style="font-size: 11px; color: #714b67;" class="fw-bold mt-1">
                                    <t t-esc="item.rem"/>
                                </div>
                                <div class="mt-2"><code class="text-primary bg-light px-1 py-0.5 rounded" style="font-size: 11px;">$<t t-esc="item.token"/></code></div>
                            </div>

                            <div class="col-3 border-start px-3">
                                <div class="text-dark" style="font-size: 13px; line-height: 1.4;"><t t-esc="item.desc"/></div>
                            </div>

                            <div class="col-4 border-start px-3">
                                <div class="text-muted small" style="line-height: 1.5; font-size: 12px;">
                                    <strong style="color: #714b67;">Ví dụ:</strong> <t t-esc="item.odoo"/>
                                </div>
                            </div>

                            <div class="col-3 border-start ps-3 d-flex align-items-center justify-content-center">
                                <t t-if="item.value > 0">
                                    <div class="d-flex align-items-center justify-content-center bg-light border rounded shadow-sm" style="height: 60px; width: 100%;">
                                        <div class="rounded-1" style="width: 30px; height: 24px; background-color: #cbd5e1;"></div>
                                        
                                        <div class="d-flex align-items-center justify-content-center" 
                                             t-att-style="'width: ' + item.value + 'px; height: 100%; position: relative;'">
                                            <div t-att-style="'width: 100%; height: 12px; background-color: #fca5a5; border-radius: 2px;'"></div>
                                        </div>
                                        
                                        <div class="rounded-1" style="width: 40px; height: 24px; background-color: #94a3b8;"></div>
                                    </div>
                                </t>
                                <t t-else="">
                                    <span class="text-muted small" style="font-family: monospace;">Không khoảng cách</span>
                                </t>
                            </div>

                        </div>
                    </t>
                </div>
            </div>
        </div>
    `;
}