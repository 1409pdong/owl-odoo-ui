import { Component, xml } from "@odoo/owl";
import typoTokens from "../../scss/tokens/_export_typography.module.scss";

export class TypographyDoc extends Component {
    setup() {
        this.typographyScales = [
            { name: "Display", token: "$text-display-size", size: typoTokens.sizeDisplay || "40px", weight: typoTokens.weightBold || "700", family: typoTokens.fontFamilyDisplay || "'Poppins', sans-serif", description: "Dùng cho tiêu đề siêu lớn, banner hoặc các con số highlight trên Dashboard tổng quan." },
            { name: "Heading", token: "$text-heading-size", size: typoTokens.sizeHeading || "28px", weight: typoTokens.weightSemibold || "600", family: typoTokens.fontFamilyDisplay || "'Poppins', sans-serif", description: "Dùng cho tiêu đề chính của các trang chức năng hoặc các phân đoạn (section) lớn trong hệ thống." },
            { name: "Title", token: "$text-title-size", size: typoTokens.sizeTitle || "18px", weight: typoTokens.weightSemibold || "600", family: typoTokens.fontFamilyBase || "'Inter', sans-serif", description: "Tiêu đề của các khối thành phần nhỏ hơn như Card Component, tiêu đề bộ lọc hoặc Pop-up modal." },
            { name: "Body", token: "$text-body-size", size: typoTokens.sizeBody || "14px", weight: typoTokens.weightRegular || "400", family: typoTokens.fontFamilyBase || "'Inter', sans-serif", description: "Tiêu chuẩn vàng cho dữ liệu lưới (Data Table), văn bản nội dung chính và các trường nhập liệu." },
            { name: "Caption", token: "$text-caption-size", size: typoTokens.sizeCaption || "12px", weight: typoTokens.weightMedium || "500", family: typoTokens.fontFamilyBase || "'Inter', sans-serif", description: "Sử dụng cho các ghi chú phụ, nhãn tiến độ (label), timestamp (thời gian) hoặc text trạng thái đi kèm." },
            { name: "Mono", token: "$text-mono-size", size: typoTokens.sizeMono || "12px", weight: typoTokens.weightRegular || "400", family: typoTokens.fontFamilyMono || "'Consolas', monospace", description: "Hiển thị chuyên biệt cho mã code, mã chứng từ hệ thống, số tài khoản hoặc dữ liệu log thô cần đối soát." }
        ];
    }

    static template = xml`
        <div class="p-2">

            <div class="mb-4">
                <h2 class="h4 fw-bold">Typography System</h2>
                <p class="text-muted">Chi tiết quy chuẩn kiểu chữ cho hệ thống.</p>
            </div>

            <div class="card shadow-sm border-0 rounded-lg overflow-hidden bg-white">
                <div class="card-body p-0">
                    <t t-foreach="typographyScales" t-as="scale" t-key="scale.name">
                        <div class="d-flex align-items-center px-4 py-4 border-bottom position-relative">
                            
                            <div style="width: 180px; flex-shrink: 0;" class="pe-3">
                                <div class="text-dark fw-bold" style="font-size: 16px;"><t t-esc="scale.size"/></div>
                                <div style="font-size: 11px; color: #7b4cf6;" class="fw-bold mt-1 text-uppercase">
                                    w<t t-esc="scale.weight"/> • <span class="text-muted" style="font-size: 10px;"><t t-esc="scale.name"/></span>
                                </div>
                                <div class="mt-2"><code class="text-dark bg-light px-1 py-0.5 rounded" style="font-size: 10px;"><t t-esc="scale.token"/></code></div>
                            </div>

                            <div style="width: 320px; flex-shrink: 0;" class="pe-4 border-start ps-3">
                                <div class="text-muted small" style="line-height: 1.5; text-align: justify;"><t t-esc="scale.description"/></div>
                            </div>

                            <div class="flex-grow-1 ps-3 text-truncate">
                                <div t-att-style="'font-family: ' + scale.family + '; font-size: ' + scale.size + '; font-weight: ' + scale.weight + '; line-height: 1.2; white-space: nowrap;'" class="text-dark">
                                    <t t-esc="scale.name"/> - Hệ thống ERP thiết kế tinh chuẩn
                                </div>
                            </div>
                        </div>
                    </t>
                </div>
            </div>
        </div>
    `;
}