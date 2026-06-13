import { Component, xml, useState } from "@odoo/owl";
import { Button } from "../../components/Button/Button.js";

export class ButtonDoc extends Component {
    static components = { Button };

    setup() {
        this.state = useState({ 
            deliveryCount: 0,
            viewMode: 'form',
            records: []
        });
    }

    actionCreateDelivery() {
        const newRecordId = `WH/OUT/2026/${(this.state.records.length + 1).toString().padStart(4, '0')}`;
        const currentDate = new Date().toLocaleDateString('vi-VN');
        
        this.state.records.push({ id: newRecordId, date: currentDate, status: 'Ready' });
        this.state.deliveryCount = this.state.records.length;
    }

    openDeliveryRecords() {
        if (this.state.deliveryCount > 0) {
            this.state.viewMode = 'list';
        }
    }

    backToForm() {
        this.state.viewMode = 'form';
    }

    static template = xml`
        <div class="o_doc_container py-3">
            <h1 class="fw-bold text-dark mb-2">Button Component</h1>
            <p class="text-muted mb-4">Thành phần nút bấm kích hoạt thao tác. Thiết kế tuân thủ Odoo ERP Standard: Định hướng hành động và ngăn ngừa thao tác lỗi.</p>

            <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">Core Button Types</h2>

            <div class="card border border-light shadow-sm rounded mb-4 bg-white">
                <div class="card-body p-4">
                    <div class="fw-bold text-dark mb-2" style="font-size: 15px;">1. Phân loại cơ bản </div>
                    <ul class="text-muted small mb-4 ps-3" style="line-height: 1.6;">
                        <li><code>primary</code>: Hành động trọng tâm đẩy luồng nghiệp vụ đi tiếp (Ví dụ: Xác nhận, Lưu, Thanh toán). <b>Tối đa 1 nút/nhóm.</b></li>
                        <li><code>default</code>: Hành động an toàn, thao tác phụ hoặc lùi lại (Ví dụ: Hủy bỏ, Sửa, Bỏ qua). Nếu không chắc chắn, hãy dùng Default.</li>
                        <li><code>dashed</code>: Odoo ít dùng, thường xuất hiện khi cần "Thêm dòng mới" (Add a line) trong lưới One2many.</li>
                        <li><code>text</code>: Dùng trên thanh Control Panel, các thao tác hàng loạt hoặc lồng trong Table để giảm tải thị giác.</li>
                        <li><code>link</code>: Dùng để điều hướng người dùng rời khỏi View hiện tại sang một liên kết nội bộ/bên ngoài khác. Kèm hiệu ứng gạch chân khi trỏ chuột.</li>
                    </ul>
                    <div class="d-flex flex-wrap gap-2">
                        <Button type="'primary'">Xác nhận (Primary)</Button>
                        <Button>Sửa (Default)</Button>
                        <Button type="'dashed'">Thêm dòng mới</Button>
                        <Button type="'text'">Mở rộng</Button>
                        <Button type="'link'">Xem báo cáo</Button>
                    </div>
                </div>
            </div>

            <div class="card border border-light shadow-sm rounded mb-4 bg-white">
                <div class="card-body p-4">
                    <div class="fw-bold text-dark mb-2" style="font-size: 15px;">2. Icon Button &amp; Bổ trợ ngữ nghĩa</div>
                    <p class="text-muted small mb-3">
                        Khoảng cách giữa Icon và Text luôn tuân thủ nghiêm ngặt biến <code>$space-100 (4px)</code> để đảm bảo sự gắn kết thị giác.
                    </p>
                    <div class="d-flex flex-wrap align-items-center gap-3">
                        <div class="d-flex gap-2">
                            <Button type="'primary'" icon="'fa-search'"/>
                            <Button icon="'fa-cog'"/>
                        </div>
                        <div class="border-start ps-3 d-flex gap-2">
                            <Button type="'primary'" icon="'fa-download'">Tải xuống</Button>
                            <Button icon="'fa-upload'">Tải lên</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card border border-light shadow-sm rounded mb-4 bg-white">
                <div class="card-body p-4">
                    <div class="fw-bold text-dark mb-2" style="font-size: 15px;">3. Quy chuẩn Kích thước (Size &amp; Spacing)</div>
                    <p class="text-muted small mb-3">Hệ thống kích thước được thiết kế để bao phủ mọi không gian mật độ dữ liệu trong ERP.</p>
                    
                    <div class="table-responsive mb-4">
                        <table class="table table-bordered table-sm small mb-0">
                            <thead class="table-light">
                                <tr><th>Size Token</th><th>Chiều cao</th><th>Ngữ cảnh ứng dụng </th></tr>
                            </thead>
                            <tbody>
                                <tr><td><code>small</code></td><td>24px</td><td>Dùng trong các dòng Data Table, Kanban Card hoặc không gian siêu hẹp.</td></tr>
                                <tr><td><code>middle (base)</code></td><td>32px</td><td>Kích thước tiêu chuẩn cho mọi Control Panel, Header và Form nội bộ.</td></tr>
                                <tr><td><code>large</code></td><td>40px</td><td>Dùng cho Call to Action chính hoặc các màn hình Welcome / Landing.</td></tr>
                                <tr><td><code>stat</code></td><td>48px</td><td>Chuyên biệt cho Khối thống kê Smart Button (oe_button_box).</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="d-flex flex-wrap align-items-center gap-3">
                        <Button type="'primary'" size="'large'" icon="'fa-download'">Large (40px)</Button>
                        <Button type="'primary'" icon="'fa-download'">Middle (32px)</Button>
                        <Button type="'primary'" size="'small'" icon="'fa-download'">Small (24px)</Button>
                    </div>
                </div>
            </div>

            <div class="card border border-light shadow-sm rounded mb-4 bg-white">
                <div class="card-body p-4">
                    <div class="fw-bold text-dark mb-2" style="font-size: 15px;">4. Danger Button (Ngăn ngừa thao tác lỗi)</div>
                    <p class="text-muted small mb-3">Kế thừa mốc màu hệ thống <code>$error-500</code> nhằm áp dụng cho các tác vụ mang tính rủi ro cao.</p>
                    <div class="d-flex flex-wrap gap-2">
                        <Button type="'primary'" danger="true">Xóa dữ liệu (Primary)</Button>
                        <Button danger="true">Hủy bỏ (Default)</Button>
                        <Button type="'text'" danger="true">Text Danger</Button>
                    </div>
                </div>
            </div>

            <div class="row mb-4">
                <div class="col-md-6">
                    <div class="card border border-light shadow-sm rounded h-100 bg-white">
                        <div class="card-body p-4">
                            <div class="fw-bold text-dark mb-2" style="font-size: 15px;">5. Ghost Button</div>
                            <p class="text-muted small mb-3">Nền trong suốt phục vụ hiển thị trên các khối diện tích tối màu.</p>
                            <div class="p-4 rounded" style="background-color: #374151;">
                                <div class="d-flex gap-2">
                                    <Button type="'primary'" ghost="true">Primary Ghost</Button>
                                    <Button ghost="true">Default Ghost</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card border border-light shadow-sm rounded h-100 bg-white">
                        <div class="card-body p-4">
                            <div class="fw-bold text-dark mb-2" style="font-size: 15px;">6. Call to Action (Block)</div>
                            <p class="text-muted small mb-3">Trải rộng toàn bộ bề ngang (100% width) nhằm chốt luồng form.</p>
                            <Button type="'primary'" block="true">Call to Action Mở rộng</Button>
                            <div class="mt-2"></div>
                            <Button block="true">Hành động phụ</Button>
                        </div>
                    </div>
                </div>
            </div>

            <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mt-5 mb-3">Interactive Smart Button (Odoo Flow)</h2>
            <div class="card border border-light shadow-sm rounded mb-4 bg-white">
                <div class="card-body p-0"> <t t-if="state.viewMode === 'form'">
                        <div class="bg-white overflow-hidden mx-auto">
                            
                            <div class="d-flex justify-content-between align-items-stretch bg-light border-bottom" style="height: 48px;">
                                <div class="ps-3 d-flex align-items-center text-muted small fw-bold text-uppercase">Form Sheet Layout</div>
                                
                                <div class="oe_button_box m-0 border-0 border-start rounded-0" style="background: transparent;">
                                    <Button type="'stat'" 
                                            icon="'fa-truck'" 
                                            statValue="state.deliveryCount" 
                                            statText="'Vehicle Contracts'" 
                                            onClick="() => this.openDeliveryRecords()" />
                                            
                                    <Button type="'stat'" icon="'fa-usd'" statValue="'$ 24,000'" statText="'Sales'" />
                                </div>
                            </div>

                            <div class="p-4">
                                <div class="mb-4">
                                    <span class="badge bg-success mb-2">Đơn hàng bán</span>
                                    <h3 class="fw-bold text-dark mb-0">SO-2026-0001</h3>
                                </div>
                                
                                <div class="d-flex gap-2">
                                    <Button type="'primary'" icon="'fa-plus'" onClick="() => this.actionCreateDelivery()">
                                        Xác nhận Hợp đồng
                                    </Button>
                                    <Button danger="true">Hủy đơn</Button> 
                                </div>
                            </div>
                        </div>
                    </t>

                    <t t-else="">
                        <div class="bg-white overflow-hidden mx-auto" style="min-height: 240px;">
                            <div class="p-3 bg-light border-bottom d-flex align-items-center">
                                <Button type="'text'" icon="'fa-arrow-left'" onClick="() => this.backToForm()">
                                    Quay lại Đơn hàng
                                </Button>
                                <h5 class="mb-0 ms-3 fw-bold text-primary">Danh sách Vehicle Contracts</h5>
                            </div>
                            <div class="p-0">
                                <table class="table table-hover mb-0">
                                    <thead class="table-light">
                                        <tr><th class="px-4">Mã tham chiếu</th><th>Ngày tạo</th><th>Trạng thái</th></tr>
                                    </thead>
                                    <tbody>
                                        <t t-foreach="state.records" t-as="record" t-key="record.id">
                                            <tr>
                                                <td class="px-4 text-primary fw-bold"><t t-esc="record.id"/></td>
                                                <td><t t-esc="record.date"/></td>
                                                <td><span class="badge bg-info"><t t-esc="record.status"/></span></td>
                                            </tr>
                                        </t>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </t>
                </div>
            </div>

        </div>
    `;
}