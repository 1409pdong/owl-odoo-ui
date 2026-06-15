import { Component, xml, useState } from "@odoo/owl";
import { Table } from "../../components/Table/Table.js";
import { Button } from "../../components/Button/Button.js";

export class TableDoc extends Component {
    static components = { Table, Button };

    setup() {
        this.state = useState({
            selectedCount: 0,
            loading: false
        });

        // Định nghĩa Cột
        this.columns = [
            { title: 'Mã tham chiếu', dataIndex: 'name', isIdentifier: true, sortable: true },
            { title: 'Khách hàng', dataIndex: 'partner', sortable: true },
            { title: 'Ngày tạo', dataIndex: 'date' },
            { title: 'Tổng tiền', dataIndex: 'amount', type: 'monetary', align: 'right', sortable: true },
            { title: 'Trạng thái', dataIndex: 'state', type: 'badge', align: 'center' }
        ];

        // Dữ liệu mẫu chuẩn Odoo Sales Order
        this.dataSource = [
            { id: 1, name: 'SO-2026-001', partner: 'Agrolait', date: '12/06/2026', amount: '4,500.00', state: 'Báo giá', state_color: 'info' },
            { id: 2, name: 'SO-2026-002', partner: 'Azure Interior', date: '13/06/2026', amount: '12,200.00', state: 'Đơn hàng bán', state_color: 'success' },
            { id: 3, name: 'SO-2026-003', partner: 'Deco Addict', date: '14/06/2026', amount: '850.00', state: 'Đã hủy', state_color: 'danger' },
            { id: 4, name: 'SO-2026-004', partner: 'Gemini Furniture', date: '14/06/2026', amount: '9,000.00', state: 'Báo giá', state_color: 'info' },
        ];

        this.handleSelection = this.handleSelection.bind(this);
    }

    handleSelection(selectedKeys, selectedRows) {
        this.state.selectedCount = selectedKeys.length;
    }

    toggleLoading() {
        this.state.loading = true;
        setTimeout(() => {
            this.state.loading = false;
        }, 1500);
    }

    static template = xml`
        <div class="o_doc_container py-3">
            <h1 class="fw-bold text-dark mb-2">Table (List View)</h1>
            <p class="text-muted mb-4">Hiển thị dữ liệu dạng lưới. Được tinh chỉnh theo phong cách Odoo List View, hỗ trợ Sắp xếp, Chọn nhiều dòng và Trạng thái dữ liệu.</p>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">1. Basic &amp; Selection (Cơ bản &amp; Chọn dòng)</h2>
                <div class="card border border-light shadow-sm rounded mb-4 bg-white">
                    <div class="card-body p-4">
                        <div class="d-flex justify-content-between align-items-end mb-3">
                            <p class="text-muted small mb-0">Bảng dữ liệu tiêu chuẩn với chức năng tick chọn. Click vào Header để sắp xếp (Cột Mã, Khách hàng, Tổng tiền).</p>
                            <span class="badge bg-primary text-white rounded-pill px-3 py-2">
                                Đã chọn: <t t-esc="state.selectedCount"/> bản ghi
                            </span>
                        </div>
                        <div class="border rounded">
                            <Table columns="columns" 
                                   dataSource="dataSource" 
                                   rowKey="'id'" 
                                   rowSelection="true" 
                                   onSelectionChange="handleSelection"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">2. Variants (Các biến thể hiển thị)</h2>
                
                <div class="row">
                    <div class="col-12 mb-4">
                        <div class="card border border-light shadow-sm rounded bg-white">
                            <div class="card-body p-4">
                                <div class="fw-bold text-dark mb-3" style="font-size: 15px;">Bordered Table (Có kẻ khung)</div>
                                <Table columns="columns" dataSource="dataSource" rowKey="'id'" bordered="true"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 mb-4">
                        <div class="card border border-light shadow-sm rounded bg-white">
                            <div class="card-body p-4">
                                <div class="fw-bold text-dark mb-3" style="font-size: 15px;">Striped Table (Đổ màu xen kẽ)</div>
                                <Table columns="columns" dataSource="dataSource" rowKey="'id'" striped="true"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">3. States (Các trạng thái)</h2>
                
                <div class="card border border-light shadow-sm rounded mb-4 bg-white">
                    <div class="card-body p-4">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div class="fw-bold text-dark" style="font-size: 15px;">Loading State</div>
                            <Button type="'primary'" onClick="() => this.toggleLoading()">Tải lại dữ liệu</Button>
                        </div>
                        <div class="border rounded">
                            <Table columns="columns" dataSource="dataSource" rowKey="'id'" loading="state.loading"/>
                        </div>
                    </div>
                </div>

                <div class="card border border-light shadow-sm rounded mb-4 bg-white">
                    <div class="card-body p-4">
                        <div class="fw-bold text-dark mb-3" style="font-size: 15px;">Empty State (Không có dữ liệu)</div>
                        <div class="border rounded">
                            <Table columns="columns" dataSource="[]" rowKey="'id'" rowSelection="true"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">4. API (Thuộc tính)</h2>
                <div class="card border border-light shadow-sm rounded bg-white p-0">
                    <div class="table-responsive">
                        <table class="table table-bordered table-sm small mb-0">
                            <thead class="table-light">
                                <tr>
                                    <th class="px-3 py-2">Thuộc tính</th>
                                    <th class="py-2">Mô tả</th>
                                    <th class="py-2">Định dạng</th>
                                    <th class="py-2">Mặc định</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="px-3 py-2"><code>columns</code></td>
                                    <td>Cấu hình cột. Object: <code>{title, dataIndex, sortable, type, align, width, isIdentifier}</code></td>
                                    <td><code>Array</code></td>
                                    <td>Bắt buộc</td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2"><code>dataSource</code></td>
                                    <td>Mảng chứa dữ liệu của các dòng</td>
                                    <td><code>Array</code></td>
                                    <td>Bắt buộc</td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2"><code>rowKey</code></td>
                                    <td>Trường định danh duy nhất (Ví dụ: 'id'). Bắt buộc nếu dùng rowSelection.</td>
                                    <td><code>String</code></td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2"><code>rowSelection</code></td>
                                    <td>Bật cột Checkbox để chọn nhiều dòng</td>
                                    <td><code>Boolean</code></td>
                                    <td><code>false</code></td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2"><code>bordered</code> / <code>striped</code></td>
                                    <td>Thêm viền dọc / Đổ màu nền xen kẽ các dòng</td>
                                    <td><code>Boolean</code></td>
                                    <td><code>false</code></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}