import { Component, xml } from "@odoo/owl";
import { Button } from "../components/Button/Button.js";

export class PaymentDoc extends Component {
    static components = { Button };

    static template = xml`
        <div class="o_doc_container p-4 bg-light" style="min-height: 100vh;">
            <div class="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
                <div>
                    <h2 class="fw-bold text-dark">Xác nhận Thanh toán</h2>
                    <p class="text-muted small">Kiểm tra thông tin trước khi xác nhận chuyển khoản.</p>
                </div>
                <div class="d-flex gap-2">
                    <Button>Hủy bỏ</Button>
                    <Button type="'primary'">Xác nhận &amp; Gửi</Button>
                </div>
            </div>

            <div class="card border-0 shadow-sm rounded bg-white p-4">
                <h5 class="text-primary fw-bold mb-4">Thông tin Đề nghị (PR-2026-0001)</h5>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="text-muted small d-block">Nhà cung cấp</label>
                        <div class="text-dark fw-semibold">Công ty CP Green Harvest</div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="text-muted small d-block">Số tiền thanh toán</label>
                        <div class="text-dark fw-bold fs-4" style="color: #714b67;">$ 24,000.00</div>
                    </div>
                    <div class="col-12 mb-3">
                        <label class="text-muted small d-block">Nội dung</label>
                        <div class="p-3 bg-light rounded text-secondary" style="font-size: 14px;">
                            Thanh toán đợt 1 hợp đồng cung ứng vật tư logistics tháng 05/2026.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}