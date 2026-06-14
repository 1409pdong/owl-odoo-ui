import { Component, xml } from "@odoo/owl";
import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb.js";
import { Button } from "../../components/Button/Button.js";

export class BreadcrumbDoc extends Component {
    static components = { Breadcrumb, Button };

    setup() {
        this.basicItems = [
            { key: '1', title: 'Home', href: '#' },
            { key: '2', title: 'Application Center', href: '#' },
            { key: '3', title: 'Application List', href: '#' },
            { key: '4', title: 'An Application' }
        ];

        this.iconItems = [
            { key: '1', title: 'Trang chủ', href: '#', icon: 'fa-home' },
            { key: '2', title: 'Quản trị viên', href: '#', icon: 'fa-user' },
            { key: '3', title: 'Thiết lập', icon: 'fa-cog' }
        ];

        this.odooItems = [
            { key: '1', title: 'Đơn hàng bán', href: '#' },
            { key: '2', title: 'SO-2026-0001' } 
        ];

        this.handleBreadcrumbClick = this.handleBreadcrumbClick.bind(this);
    }

    handleBreadcrumbClick(ev, item) {
        console.log("Breadcrumb clicked:", item.title);
        // Ngăn chặn chuyển trang thực sự trong môi trường test
    }

    static template = xml`
        <div class="o_doc_container py-3">
            <h1 class="fw-bold text-dark mb-2">Breadcrumb Component</h1>
            <p class="text-muted mb-4">Hiển thị vị trí hiện tại trong hệ thống phân cấp. Cho phép người dùng dễ dàng chuyển hướng trở lại các trạng thái cấp cao hơn trong phân hệ.</p>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">1. Quy chuẩn &amp; Ứng dụng</h2>
                <div class="card border border-light shadow-sm rounded mb-4 bg-white">
                    <div class="card-body p-4">
                        <div class="fw-bold text-dark mb-2" style="font-size: 15px;">Khi nào nên áp dụng?</div>
                        <ul class="text-muted small mb-0 ps-3" style="line-height: 1.6;">
                            <li>Sử dụng mặc định trên thanh Control Panel của mọi màn hình Form View trong Odoo.</li>
                            <li>Hệ thống có nhiều hơn hai cấp độ (Ví dụ: Danh sách -> Hồ sơ cha -> Chi tiết con).</li>
                            <li>Chỉ những thẻ cấp trên (không phải thẻ cuối cùng) mới có thể click. Cấp hiện tại (thẻ cuối) sẽ được in đậm (Bold) để xác định vị trí.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">2. Phân loại cốt lõi</h2>
                
                <div class="card border border-light shadow-sm rounded mb-4 bg-white">
                    <div class="card-body p-4">
                        <div class="fw-bold text-dark mb-3" style="font-size: 15px;">Basic (Cơ bản)</div>
                        <div class="p-4 bg-light rounded border border-light">
                            <Breadcrumb items="basicItems" onClick="handleBreadcrumbClick"/>
                        </div>
                    </div>
                </div>

                <div class="card border border-light shadow-sm rounded mb-4 bg-white">
                    <div class="card-body p-4">
                        <div class="fw-bold text-dark mb-3" style="font-size: 15px;">With Icon (Kèm biểu tượng)</div>
                        <div class="p-4 bg-light rounded border border-light">
                            <Breadcrumb items="iconItems" onClick="handleBreadcrumbClick"/>
                        </div>
                    </div>
                </div>

                <div class="card border border-light shadow-sm rounded mb-4 bg-white">
                    <div class="card-body p-4">
                        <div class="fw-bold text-dark mb-3" style="font-size: 15px;">Configuring the Separator (Tùy chỉnh Dấu phân cách)</div>
                        <p class="text-muted small mb-3">Odoo mặc định sử dụng dấu <code>/</code>, nhưng có thể truyền property <code>separator="&gt;"</code> để đổi sang dạng mũi tên.</p>
                        <div class="p-4 bg-light rounded border border-light">
                            <Breadcrumb items="basicItems" separator="'>'" onClick="handleBreadcrumbClick"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">3. Biểu mẫu thực tế (Odoo Flow)</h2>
                <p class="text-muted small mb-3">Bối cảnh xuất hiện của Breadcrumb tại Control Panel chuẩn của Odoo ERP.</p>
                
                <div class="border rounded bg-white shadow-sm overflow-hidden mb-4">
                    <div class="border-bottom p-3 bg-white">
                        <div class="mb-3">
                            <Breadcrumb items="odooItems" onClick="handleBreadcrumbClick"/>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex gap-2">
                                <Button type="'primary'">Xác nhận</Button>
                                <Button>Hủy</Button>
                            </div>
                            <div class="d-flex gap-2">
                                <Button type="'text'" icon="'fa-chevron-left'"></Button>
                                <Button type="'text'" icon="'fa-chevron-right'"></Button>
                            </div>
                        </div>
                    </div>
                    <div class="bg-light p-4" style="min-height: 150px;">
                        <div class="bg-white p-4 rounded shadow-sm border">
                            <h2 class="h4 fw-bold text-dark">Nội dung Form</h2>
                            <p class="text-muted">Đây là vùng nội dung chi tiết của bản ghi SO-2026-0001.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">4. Thông số thuộc tính (API)</h2>
                <div class="card border border-light shadow-sm rounded bg-white p-0">
                    <div class="table-responsive">
                        <table class="table table-bordered table-sm small mb-0">
                            <thead class="table-light">
                                <tr>
                                    <th class="px-3 py-2">Thuộc tính</th>
                                    <th class="py-2">Mô tả tác vụ</th>
                                    <th class="py-2">Định dạng kiểu dữ liệu</th>
                                    <th class="py-2">Giá trị mặc định</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="px-3 py-2"><code>items</code></td>
                                    <td>Mảng danh sách các mục điều hướng. Mỗi phần tử là Object chứa: <code>{key, title, href, icon}</code>.</td>
                                    <td><code>Array</code></td>
                                    <td><code>-</code></td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2"><code>separator</code></td>
                                    <td>Ký tự phân cách giữa các mục (Ví dụ: <code>/</code>, <code>&gt;</code>, <code>-</code>).</td>
                                    <td><code>String</code></td>
                                    <td><code>'/'</code></td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2"><code>onClick</code></td>
                                    <td>Hàm callback được gọi khi click vào các liên kết. Trả về <code>(event, item)</code>.</td>
                                    <td><code>Function</code></td>
                                    <td><code>-</code></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    `;
}