import { Component, xml, useState } from "@odoo/owl";
import { Collapse } from "../../components/Collapse/Collapse.js";
import { CollapsePanel } from "../../components/Collapse/CollapsePanel.js";
import { Button } from "../../components/Button/Button.js";

export class CollapseDoc extends Component {
    static components = { Collapse, CollapsePanel, Button };

    setup() {
        this.state = useState({
            accordionActiveKey: '1'
        });
    }

    static template = xml`
        <div class="o_doc_container py-3">
            <h1 class="fw-bold text-dark mb-2">Collapse Component</h1>
            <p class="text-muted mb-4">Các tấm Panel có thể gập mở (Accordion). Dùng để gom nhóm và thu gọn lượng lớn thông tin trong Odoo Form View.</p>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">1. Cơ bản (Basic)</h2>
                <div class="card border border-light shadow-sm rounded mb-4 bg-white p-4">
                    <p class="text-muted small mb-3">Mặc định, bạn có thể mở nhiều Panel cùng lúc.</p>
                    <Collapse defaultActiveKey="['1']">
                        <CollapsePanel name="'1'" header="'Cài đặt Tên miền (Domain)'">
                            <p class="mb-0">Hệ thống Odoo cho phép trỏ tên miền tùy chỉnh vào Website để tối ưu SEO. Bạn có thể thiết lập SSL miễn phí.</p>
                        </CollapsePanel>
                        <CollapsePanel name="'2'" header="'Tính năng Nâng cao'">
                            <p class="mb-0">Các tính năng phát triển chuyên sâu liên quan đến API và Webhooks.</p>
                        </CollapsePanel>
                        <CollapsePanel name="'3'" header="'Panel bị Khóa (Disabled)'" disabled="true">
                            <p class="mb-0">Bạn không thể đọc tôi.</p>
                        </CollapsePanel>
                    </Collapse>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">2. Chế độ Accordion (Chỉ mở 1 Panel)</h2>
                <div class="card border border-light shadow-sm rounded mb-4 bg-white p-4">
                    <p class="text-muted small mb-3">Thêm thuộc tính <code>accordion="true"</code>. Tính năng thường thấy ở các menu Hướng dẫn (FAQ).</p>
                    <Collapse accordion="true" activeKey="state.accordionActiveKey" onChange="(key) => this.state.accordionActiveKey = key">
                        <CollapsePanel name="'1'" header="'Thanh toán qua VNPAY'">
                            <p class="mb-0">Quét mã QR Code trực tiếp từ App ngân hàng để thanh toán nhanh.</p>
                        </CollapsePanel>
                        <CollapsePanel name="'2'" header="'Thanh toán qua thẻ Tín dụng (Stripe)'">
                            <p class="mb-0">Bảo mật giao dịch bằng Stripe Gateway. Hỗ trợ VISA, Master Card.</p>
                        </CollapsePanel>
                        <CollapsePanel name="'3'" header="'Chuyển khoản thủ công'">
                            <p class="mb-0">Thông tin chuyển khoản sẽ được gửi qua Email sau khi bạn chốt đơn.</p>
                        </CollapsePanel>
                    </Collapse>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">3. Lồng ghép (Nested)</h2>
                <div class="card border border-light shadow-sm rounded mb-4 bg-white p-4">
                    <Collapse defaultActiveKey="['1']">
                        <CollapsePanel name="'1'" header="'Thông tin Khu vực'">
                            <Collapse defaultActiveKey="['1-1']" bordered="false">
                                <CollapsePanel name="'1-1'" header="'Miền Nam'">
                                    TP. Hồ Chí Minh, Bình Dương, Đồng Nai.
                                </CollapsePanel>
                                <CollapsePanel name="'1-2'" header="'Miền Bắc'">
                                    Hà Nội, Hải Phòng, Quảng Ninh.
                                </CollapsePanel>
                            </Collapse>
                        </CollapsePanel>
                    </Collapse>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">4. Extra Node &amp; Ghost Variant</h2>
                <div class="card border border-light shadow-sm rounded mb-4 bg-white p-4">
                    <p class="text-muted small mb-3">Giao diện trong suốt <code>ghost="true"</code> và truyền Nút bấm vào phía bên phải bằng <code>t-set-slot="extra"</code>.</p>
                    
                    <div class="bg-light p-3 rounded">
                        <Collapse ghost="true" defaultActiveKey="['1']">
                            <CollapsePanel name="'1'" header="'Cấu hình Database'">
                                <t t-set-slot="extra">
                                    <Button size="'small'" type="'primary'">Sao lưu</Button>
                                </t>
                                <p class="mb-0 text-muted">Dữ liệu nằm trên Cloud Odoo.SH. Backup mỗi 24 giờ.</p>
                            </CollapsePanel>
                            <CollapsePanel name="'2'" header="'Lịch sử truy cập'">
                                <t t-set-slot="extra">
                                    <Button size="'small'" danger="true">Xóa log</Button>
                                </t>
                                <p class="mb-0 text-muted">Chưa có nhật ký truy cập tuần này.</p>
                            </CollapsePanel>
                        </Collapse>
                    </div>

                </div>
            </div>

            <div style="height: 100px;"></div>
        </div>
    `;
}