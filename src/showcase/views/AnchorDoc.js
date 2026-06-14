import { Component, xml } from "@odoo/owl";
import { Anchor } from "../../components/Anchor/Anchor.js";

export class AnchorDoc extends Component {
    static components = { Anchor };

    setup() {
        // Dữ liệu mẫu giả lập cấu trúc phân hệ Thiết lập hệ thống (Odoo Settings)
        this.odooSettingsMenu = [
            {
                key: 'general',
                href: '#sec-general',
                title: 'General Settings',
                children: [
                    { key: 'users', href: '#sec-users', title: 'Users & Companies' },
                    { key: 'integrations', href: '#sec-integrations', title: 'Integrations' }
                ]
            },
            { key: 'crm', href: '#sec-crm', title: 'CRM & Lead Management' },
            { key: 'invoicing', href: '#sec-invoicing', title: 'Invoicing & Payments' }
        ];

        // Menu ngang giả định thay cho pageToc cũ
        this.horizontalMenu = [
            { key: 'overview', href: '#anchor-overview', title: 'Quy chuẩn' },
            { key: 'variants', href: '#anchor-variants', title: 'Phân loại' },
            { key: 'api', href: '#anchor-api', title: 'Thuộc tính (API)' }
        ];
    }

    static template = xml`
        <div class="o_doc_container py-3">
            <h1 class="fw-bold text-dark mb-2">Anchor Component</h1>
            <p class="text-muted mb-4">Thành phần liên kết mốc điều hướng. Giúp tối ưu hóa trải nghiệm trên các giao diện biểu mẫu dài hoặc trang cấu hình ERP tập trung mà không cần bẻ nhỏ dữ liệu thành các Tab khuất tầm mắt.</p>

            <div id="anchor-overview" class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">1. Quy chuẩn &amp; Ứng dụng</h2>
                <div class="card border border-light shadow-sm rounded mb-4 bg-white">
                    <div class="card-body p-4">
                        <div class="fw-bold text-dark mb-2" style="font-size: 15px;">Khi nào nên áp dụng?</div>
                        <ul class="text-muted small mb-0 ps-3" style="line-height: 1.6;">
                            <li>Sử dụng khi một màn hình chứa khối lượng trường dữ liệu phân đoạn lớn (như cấu hình phân hệ hoặc tài liệu thẩm định nhân sự).</li>
                            <li>Thay thế cho giải pháp phân thẻ Tab truyền thống khi luồng nghiệp vụ đòi hỏi người dùng phải bao quát thông tin từ trên xuống dưới một cách liền mạch.</li>
                            <li>Thanh chỉ báo (Ink bullet) tự động tính toán vị trí cuộn của container bọc để phản hồi trạng thái active chính xác theo thời gian thực.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div id="anchor-variants" class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">2. Phân loại cốt lõi</h2>
                
                <div class="card border border-light shadow-sm rounded mb-4 bg-white">
                    <div class="card-body p-4">
                        <div class="fw-bold text-dark mb-2" style="font-size: 15px;">Khung điều hướng phân bậc (Vertical Nested)</div>
                        <p class="text-muted small mb-3">Hỗ trợ lồng ghép đa cấp bậc nhằm bao phủ các nhóm tính năng cha-con phức tạp.</p>
                        <div class="p-3 bg-light rounded border border-light" style="max-width: 300px;">
                            <Anchor items="odooSettingsMenu" affix="false" containerSelector="'.flex-grow-1'" />
                        </div>
                    </div>
                </div>

                <div class="card border border-light shadow-sm rounded mb-4 bg-white">
                    <div class="card-body p-4">
                        <div class="fw-bold text-dark mb-2" style="font-size: 15px;">Thanh neo ngang (Horizontal Sub-menu)</div>
                        <p class="text-muted small mb-3">Ứng dụng cho các thanh chức năng phụ sát mép đầu trang, tiết kiệm không gian bề ngang màn hình.</p>
                        <div class="p-2 bg-light rounded mb-2">
                            <Anchor items="horizontalMenu" direction="'horizontal'" affix="false" containerSelector="'.flex-grow-1'" />
                        </div>
                    </div>
                </div>
            </div>

            <div id="anchor-odoo-flow" class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">3. Biến thể Biểu mẫu thực tế (Odoo Flow)</h2>
                <p class="text-muted small mb-3">Mô phỏng trải nghiệm cuộn thực tế trong phân hệ biểu mẫu ERP tổng hợp.</p>
                
                <div class="border rounded bg-white shadow-sm overflow-hidden" style="max-height: 400px; overflow-y: auto;" id="odoo-scroll-mock-container">
                    <div class="row m-0">
                        <div class="col-4 bg-light border-end p-3 position-sticky top-0" style="height: 400px;">
                            <div class="small text-uppercase text-muted fw-bold mb-3" style="font-size: 11px;">Hệ thống cài đặt</div>
                            <Anchor items="odooSettingsMenu" affix="false" containerSelector="'#odoo-scroll-mock-container'" />
                        </div>
                        <div class="col-8 p-4">
                            <div id="sec-general" class="pb-5 border-bottom">
                                <h4 class="fw-bold text-dark h6 text-uppercase mb-3">General Settings</h4>
                                <div id="sec-users" class="p-3 bg-body rounded mb-3 border">
                                    <span class="fw-semibold text-secondary d-block small mb-1">Users &amp; Companies</span>
                                    <div class="text-muted" style="font-size: 12px;">Quản lý phân quyền người dùng và thiết lập cơ cấu đa công ty thành viên.</div>
                                </div>
                                <div id="sec-integrations" class="p-3 bg-body rounded border">
                                    <span class="fw-semibold text-secondary d-block small mb-1">Integrations</span>
                                    <div class="text-muted" style="font-size: 12px;">Đồng bộ dữ liệu thông qua cổng API bên thứ ba, kết nối các dịch vụ vận chuyển thông minh.</div>
                                </div>
                            </div>

                            <div id="sec-crm" class="py-5 border-bottom">
                                <h4 class="fw-bold text-dark h6 text-uppercase mb-2">CRM &amp; Lead Management</h4>
                                <p class="text-muted" style="font-size: 12px;">Cấu hình phễu bán hàng tự động, ghi nhận nguồn khách hàng tiềm năng và phân phối công việc cho đội ngũ kinh doanh.</p>
                            </div>

                            <div id="sec-invoicing" class="pt-5" style="padding-bottom: 200px;">
                                <h4 class="fw-bold text-dark h6 text-uppercase mb-2">Invoicing &amp; Payments</h4>
                                <p class="text-muted" style="font-size: 12px;">Thiết lập mẫu hóa đơn điện tử, thiết lập cổng thanh toán quốc tế và quy trình đối soát công nợ tự động.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="anchor-api" class="mb-5 pt-2">
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
                                    <td>Mảng cấu hình các điểm mốc điều hướng (Hỗ trợ cấu trúc đệ quy qua <code>children</code>)</td>
                                    <td><code>{ key, href, title, children }[]</code></td>
                                    <td><code>-</code></td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2"><code>direction</code></td>
                                    <td>Quy định hướng hiển thị sơ đồ cây thư mục</td>
                                    <td><code>'vertical' | 'horizontal'</code></td>
                                    <td><code>'vertical'</code></td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2"><code>affix</code></td>
                                    <td>Kích hoạt trạng thái tự động bám dính khi cuộn qua mép màn hình</td>
                                    <td><code>boolean</code></td>
                                    <td><code>true</code></td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2"><code>containerSelector</code></td>
                                    <td>CSS Selector định vị vùng cuộn mục tiêu (nhận diện vùng scroll nội bộ)</td>
                                    <td><code>string</code></td>
                                    <td><code>'window'</code></td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2"><code>offsetTop</code></td>
                                    <td>Độ lệch khoảng cách tính toán pixel từ mép đỉnh nhằm kích hoạt trạng thái</td>
                                    <td><code>number</code></td>
                                    <td><code>0</code></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}