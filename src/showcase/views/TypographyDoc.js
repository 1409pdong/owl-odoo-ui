import { Component, xml } from "@odoo/owl";
import typoTokens from "../../scss/tokens/_export_typography.module.scss";

export class TypographyDoc extends Component {
    setup() {
        this.typographyScales = [
            { name: "Display", token: "$text-display-size", size: typoTokens.sizeDisplay || "40px", weight: typoTokens.weightBold || "700", family: typoTokens.fontFamilyDisplay || "'Poppins', sans-serif", description: "Sử dụng cho tiêu đề lớn, các chỉ số quan trọng (KPI metric) trên màn hình Dashboard tổng quan nghiệp vụ." },
            { name: "Heading", token: "$text-heading-size", size: typoTokens.sizeHeading || "28px", weight: typoTokens.weightSemibold || "600", family: typoTokens.fontFamilyDisplay || "'Poppins', sans-serif", description: "Tiêu đề chính của các phân hệ chức năng hoặc các phân đoạn (section) lớn trong cấu trúc view." },
            { name: "Title", token: "$text-title-size", size: typoTokens.sizeTitle || "18px", weight: typoTokens.weightSemibold || "600", family: typoTokens.fontFamilyBase || "'Inter', sans-serif", description: "Sử dụng cho tiêu đề khối thành phần con (Card, KanBan Header, Form Section title) hoặc Pop-up modal." },
            { name: "Body", token: "$text-body-size", size: typoTokens.sizeBody || "14px", weight: typoTokens.weightRegular || "400", family: typoTokens.fontFamilyBase || "'Inter', sans-serif", description: "Kích thước tiêu chuẩn (Base) cho toàn bộ lưới dữ liệu (Data Table), văn bản nội dung và các thẻ Label nhập liệu ERP." },
            { name: "Caption", token: "$text-caption-size", size: typoTokens.sizeCaption || "12px", weight: typoTokens.weightMedium || "500", family: typoTokens.fontFamilyBase || "'Inter', sans-serif", description: "Dùng cho văn bản phụ trợ, chú thích mã chứng từ, ghi chú mốc thời gian (timestamp) hoặc thông tin lịch sử." },
            { name: "Mono", token: "$text-mono-size", size: typoTokens.sizeMono || "12px", weight: typoTokens.weightRegular || "400", family: typoTokens.fontFamilyMono || "'Consolas', monospace", description: "Hiển thị mã code, mã định danh tài khoản, cấu hình tham số hệ thống hoặc log thô cần kiểm tra đối soát." }
        ];
    }

    static template = xml`
        <div class="o_doc_container py-3">
            <h1 class="fw-bold text-dark mb-2">Typography System</h1>
            <p class="text-muted mb-4">Quy chuẩn kiểu chữ, trọng số và phân bậc font chữ phục vụ phân hệ giao diện ERP.</p>

            <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">Typography Scales</h2>

            <div class="card border border-light shadow-sm rounded mb-4 bg-white">
                <div class="card-body p-0">
                    <t t-foreach="typographyScales" t-as="scale" t-key="scale.name">
                        <div class="d-flex align-items-center px-4 py-3 border-bottom position-relative">
                            
                            <div style="width: 200px; flex-shrink: 0;" class="pe-3">
                                <div class="text-dark fw-bold" style="font-size: 16px;"><t t-esc="scale.size"/></div>
                                <div style="font-size: 11px; color: #714b67;" class="fw-bold mt-1 text-uppercase">
                                    w<t t-esc="scale.weight"/> • <span class="text-muted" style="font-size: 10px;"><t t-esc="scale.name"/></span>
                                </div>
                                <div class="mt-2"><code class="text-primary bg-light px-1 py-0.5 rounded" style="font-size: 11px;"><t t-esc="scale.token"/></code></div>
                            </div>

                            <div style="width: 340px; flex-shrink: 0;" class="pe-4 border-start ps-3">
                                <div class="text-muted small" style="line-height: 1.5; text-align: justify;"><t t-esc="scale.description"/></div>
                            </div>

                            <div class="flex-grow-1 ps-3 text-truncate">
                                <div t-att-style="'font-family: ' + scale.family + '; font-size: ' + scale.size + '; font-weight: ' + scale.weight + '; line-height: 1.2; white-space: nowrap;'" class="text-dark">
                                    <t t-esc="scale.name"/> - Odoo ERP Interface Styling
                                </div>
                            </div>
                        </div>
                    </t>
                </div>
            </div>
        </div>
    `;
}