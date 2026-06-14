import { Component, xml, useState } from "@odoo/owl";
import { Dropdown } from "../../components/Dropdown/Dropdown.js";
import { Button } from "../../components/Button/Button.js";

export class DropdownDoc extends Component {
    static components = { Dropdown, Button };

    setup() {
        this.state = useState({
            lastAction: "Chưa chọn tác vụ nào"
        });

        // 1. Basic Items
        this.basicItems = [
            { key: '1', title: 'Action 1' },
            { key: '2', title: 'Action 2' },
            { key: '3', title: 'Action 3' }
        ];

        // 2. Odoo Action Menu Items (Có icon, divider và danger)
        this.actionMenuItems = [
            { key: 'export', title: 'Xuất dữ liệu', icon: 'fa-upload' },
            { key: 'duplicate', title: 'Nhân bản', icon: 'fa-copy' },
            { key: 'print', title: 'In phiếu', icon: 'fa-print', disabled: true }, // Nút in bị mờ
            { type: 'divider' },
            { key: 'delete', title: 'Xóa bản ghi', icon: 'fa-trash', danger: true } // Nút xóa màu đỏ
        ];

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(item) {
        this.state.lastAction = item.title;
        console.log("Dropdown item selected:", item);
    }

    static template = xml`
        <div class="o_doc_container py-3">
            <h1 class="fw-bold text-dark mb-2">Dropdown Component</h1>
            <p class="text-muted mb-4">Danh sách sổ xuống (Dropdown Menu) cho phép tổ chức nhiều thao tác hoặc tùy chọn mà không làm chật chội không gian hiển thị chính.</p>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">1. Quy chuẩn &amp; Ứng dụng</h2>
                <div class="card border border-light shadow-sm rounded mb-4 bg-white">
                    <div class="card-body p-4">
                        <div class="fw-bold text-dark mb-2" style="font-size: 15px;">Trong Odoo ERP, Dropdown thường dùng ở đâu?</div>
                        <ul class="text-muted small mb-0 ps-3" style="line-height: 1.6;">
                            <li><strong>Action Menu:</strong> Nút bấm ⚙️ hoặc "Hành động" trên thanh Control Panel để chứa các lệnh: Xuất, Xóa, Nhân bản.</li>
                            <li><strong>Bộ lọc (Search Panel):</strong> Liệt kê danh sách Filters, Group By, Favorites.</li>
                            <li><strong>User Profile:</strong> Menu xổ ra từ Avatar người dùng ở góc trên cùng bên phải.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">2. Biến thể cốt lõi</h2>
                
                <div class="row">
                    <div class="col-md-6 mb-4">
                        <div class="card border border-light shadow-sm rounded h-100 bg-white">
                            <div class="card-body p-4">
                                <div class="fw-bold text-dark mb-3" style="font-size: 15px;">Basic &amp; Hover Trigger</div>
                                <p class="text-muted small mb-3">Dropdown kích hoạt khi rê chuột (Hover) thay vì Click.</p>
                                <div class="p-4 bg-light rounded border border-light d-flex justify-content-center">
                                    <Dropdown items="basicItems" trigger="'hover'" onSelect="handleSelect">
                                        <a href="#" class="text-primary fw-bold text-decoration-none">
                                            Rê chuột vào đây <i class="fa fa-angle-down ms-1"></i>
                                        </a>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 mb-4">
                        <div class="card border border-light shadow-sm rounded h-100 bg-white">
                            <div class="card-body p-4">
                                <div class="fw-bold text-dark mb-3" style="font-size: 15px;">Odoo Action Menu</div>
                                <p class="text-muted small mb-3">Tổ hợp Icon, Dấu gạch ngang (Divider), Trạng thái vô hiệu hóa và Nguy hiểm (Danger).</p>
                                <div class="p-4 bg-light rounded border border-light d-flex justify-content-center">
                                    <Dropdown items="actionMenuItems" onSelect="handleSelect">
                                        <Button icon="'fa-cog'">Hành động</Button>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">3. Minh họa Sự kiện (Events)</h2>
                <div class="card border border-light shadow-sm rounded bg-white p-4 text-center">
                    <p class="text-muted small mb-4">Thử chọn một mục từ Menu Hành Động ở trên, thông tin trả về sẽ được hiển thị ở đây.</p>
                    <div class="bg-body border border-dashed rounded p-3 text-primary fw-bold fs-5">
                        <t t-esc="state.lastAction"/>
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
                                    <td>Mảng danh sách các tác vụ. Object: <code>{key, title, icon, disabled, danger, type}</code>. Dùng <code>type='divider'</code> để tạo vạch ngang.</td>
                                    <td><code>Array</code></td>
                                    <td>Bắt buộc</td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2"><code>trigger</code></td>
                                    <td>Phương thức gọi dropdown mở ra. (Lưu ý: mobile không hỗ trợ tốt hover).</td>
                                    <td><code>'click' | 'hover'</code></td>
                                    <td><code>'click'</code></td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2"><code>placement</code></td>
                                    <td>Hướng menu xổ xuống tương quan với gốc tọa độ nút.</td>
                                    <td><code>'bottomLeft' | 'bottomRight'</code></td>
                                    <td><code>'bottomLeft'</code></td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2"><code>onSelect</code></td>
                                    <td>Hàm callback kích hoạt khi click chọn một item không bị disable. Trả về toàn bộ Object của Item đó.</td>
                                    <td><code>Function(item)</code></td>
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