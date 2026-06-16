import { Component, xml, useState } from "@odoo/owl";
import { Badge } from "../../components/Badge/Badge.js";
import { BadgeRibbon } from "../../components/Badge/BadgeRibbon.js";
import { Button } from "../../components/Button/Button.js";

export class BadgeDoc extends Component {
    static components = { Badge, BadgeRibbon, Button };

    setup() {
        this.state = useState({
            dynamicCount: 5
        });
    }

    static template = xml`
        <div class="o_doc_container py-3">
            <h1 class="fw-bold text-dark mb-2">Badge Component</h1>
            <p class="text-muted mb-4">Huy hiệu thông báo và nhãn bộ đếm. Sử dụng để hiển thị các chỉ số chưa xử lý hoặc trạng thái trực tuyến.</p>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">1. Bộ đếm số lượng (Wrapping &amp; Standalone)</h2>
                <div class="card border border-light shadow-sm rounded bg-white p-4">
                    <div class="d-flex align-items-center gap-5 flex-wrap">
                        
                        <Badge count="5">
                            <div class="bg-light border rounded d-flex align-items-center justify-content-center" style="width: 42px; height: 42px;">
                                <i class="fa fa-envelope-o fa-lg text-secondary"/>
                            </div>
                        </Badge>

                        <Badge count="150" overflowCount="99">
                            <div class="bg-light border rounded d-flex align-items-center justify-content-center" style="width: 42px; height: 42px;">
                                <i class="fa fa-bell-o fa-lg text-secondary"/>
                            </div>
                        </Badge>

                        <div class="d-flex gap-2">
                            <span class="text-muted small">Standalone Badges:</span>
                            <Badge count="8" />
                            <Badge count="'NEW'" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">2. Thay đổi động &amp; Hiển thị số 0</h2>
                <div class="card border border-light shadow-sm rounded bg-white p-4">
                    <div class="d-flex align-items-center gap-4 mb-3">
                        <Badge count="state.dynamicCount">
                            <div class="bg-light border rounded" style="width: 40px; height: 40px;"/>
                        </Badge>
                        
                        <Badge count="0" showZero="true">
                            <div class="bg-light border rounded" style="width: 40px; height: 40px;"/>
                        </Badge>

                        <Badge count="0" showZero="false">
                            <div class="bg-light border rounded" style="width: 40px; height: 40px; text-align:center; line-height:40px; font-size:11px; color:#aaa;">Ẩn số 0</div>
                        </Badge>
                    </div>
                    <div class="d-flex gap-2">
                        <Button size="'small'" onClick="() => this.state.dynamicCount++"><i class="fa fa-plus"/></Button>
                        <Button size="'small'" onClick="() => this.state.dynamicCount = Math.max(0, this.state.dynamicCount - 1)"><i class="fa fa-minus"/></Button>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">3. Chấm trạng thái (Status Dots)</h2>
                <div class="card border border-light shadow-sm rounded bg-white p-4">
                    <div class="fw-bold small text-dark mb-2">Chấm thông báo ẩn số (Dot Mode):</div>
                    <div class="d-flex gap-4 align-items-center mb-4">
                        <Badge dot="true">
                            <i class="fa fa-comment-o fa-lg text-dark"/>
                        </Badge>
                        <Badge dot="true" size="'small'">
                            <span class="text-dark small fw-bold">Văn bản nhỏ</span>
                        </Badge>
                    </div>

                    <div class="border-top pt-3">
                        <div class="fw-bold small text-dark mb-2">Danh sách trạng thái hoạt động (Status Dots List):</div>
                        <div class="d-flex flex-column gap-2">
                            <Badge status="'success'" text="'Hoạt động trực tuyến (Success)'" />
                            <Badge status="'processing'" text="'Đang xử lý đồng bộ dữ liệu (Processing Animation)'" />
                            <Badge status="'error'" text="'Lỗi kết nối máy chủ (Error)'" />
                            <Badge status="'warning'" text="'Cảnh báo hết hạn kho (Warning)'" />
                            <Badge status="'default'" text="'Ngoại tuyến (Default)'" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">4. Ruy-băng góc thẻ (Badge.Ribbon)</h2>
                <div class="row" style="max-width: 800px;">
                    <div class="col-6">
                        <BadgeRibbon text="'Bán chạy'" status="'success'">
                            <div class="card p-4 border shadow-sm rounded bg-white">
                                <h3 class="h6 fw-bold mb-1">Gói phần mềm Odoo CRM</h3>
                                <p class="text-muted small mb-0">Hỗ trợ quản lý lead, tự động hóa phễu kinh doanh hiệu quả.</p>
                            </div>
                        </BadgeRibbon>
                    </div>
                    <div class="col-6">
                        <BadgeRibbon text="'-30%'" status="'error'">
                            <div class="card p-4 border shadow-sm rounded bg-white">
                                <h3 class="h6 fw-bold mb-1">Thiết bị POS Sunmi T2</h3>
                                <p class="text-muted small mb-0">Máy bán hàng cảm ứng chuyên dụng tại quầy thu ngân ERP.</p>
                            </div>
                        </BadgeRibbon>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">5. API Reference</h2>
                <div class="card border border-light shadow-sm rounded bg-white p-0">
                    <table class="table table-bordered table-sm small mb-0">
                        <thead class="table-light">
                            <tr><th class="px-3 py-2">Thuộc tính</th><th class="py-2">Mô tả</th><th class="py-2">Type</th><th class="py-2">Mặc định</th></tr>
                        </thead>
                        <tbody>
                            <tr><td class="px-3 py-2"><code>count</code></td><td>Giá trị số/chữ hiển thị trong nhãn</td><td><code>Number | String</code></td><td>-</td></tr>
                            <tr><td class="px-3 py-2"><code>dot</code></td><td>Bật hiển thị dấu chấm nhỏ thay vì hiển thị số</td><td><code>Boolean</code></td><td><code>false</code></td></tr>
                            <tr><td class="px-3 py-2"><code>overflowCount</code></td><td>Ngưỡng tối đa để hiển thị dạng cộng (+)</td><td><code>Number</code></td><td><code>99</code></td></tr>
                            <tr><td class="px-3 py-2"><code>showZero</code></td><td>Có hiện nhãn hay không nếu giá trị bằng 0</td><td><code>Boolean</code></td><td><code>false</code></td></tr>
                            <tr><td class="px-3 py-2"><code>status</code></td><td>Bật chấm trạng thái tròn độc lập</td><td><code>'default'|'success'|'error'|'warning'|'processing'</code></td><td>-</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}