import { Component, xml, useState } from "@odoo/owl";
import { Steps } from "../../components/Steps/Steps.js";
import { Button } from "../../components/Button/Button.js";

export class StepsDoc extends Component {
    static components = { Steps, Button };

    setup() {
        this.state = useState({
            currentStep: 1, 
            odooStep: 1,
            panelStep: 1
        });

        this.basicItems = [
            { title: 'Finished', description: 'Đã hoàn thành xác minh.' },
            { title: 'In Progress', description: 'Đang xử lý dữ liệu.', subTitle: 'Left 00:00:08' },
            { title: 'Waiting', description: 'Chờ phản hồi từ máy chủ.' }
        ];

        // Dữ liệu cho Panel
        this.panelItems = [
            { title: 'Login', icon: 'fa-user' },
            { title: 'Verification', icon: 'fa-shield' },
            { title: 'Pay', icon: 'fa-credit-card' },
            { title: 'Done', icon: 'fa-smile-o' }
        ];

        this.errorItems = [
            { title: 'Finished', description: 'Tải tệp thành công.' },
            { title: 'In Progress', description: 'Trích xuất dữ liệu thất bại.' },
            { title: 'Waiting', description: 'Chờ đồng bộ.' }
        ];

        this.odooItems = [
            { title: 'Báo giá' },
            { title: 'Báo giá đã gửi' },
            { title: 'Đơn hàng bán' },
            { title: 'Đã khóa', disabled: true }
        ];
    }

    nextStep() { if (this.state.currentStep < 2) this.state.currentStep++; }
    prevStep() { if (this.state.currentStep > 0) this.state.currentStep--; }
    setOdooStep(index) { this.state.odooStep = index; }
    setPanelStep(index) { this.state.panelStep = index; }

    static template = xml`
        <div class="o_doc_container py-3">
            <h1 class="fw-bold text-dark mb-2">Steps Component</h1>
            <p class="text-muted mb-4">Thanh điều hướng dẫn dắt người dùng vượt qua một tác vụ được chia thành nhiều bước hoặc mô phỏng tiến trình của một chứng từ ERP.</p>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">1. Phân loại cốt lõi (Types &amp; Variants)</h2>
                
                <div class="card border border-light shadow-sm rounded mb-4 bg-white">
                    <div class="card-header bg-light border-bottom-0 py-2"><span class="fw-bold text-dark" style="font-size: 13px;">Default (Tiêu chuẩn)</span></div>
                    <div class="card-body p-4 border-top">
                        <Steps items="basicItems" current="state.currentStep" />
                        
                        <div class="mt-4 pt-3 border-top d-flex gap-2">
                            <Button onClick="() => this.prevStep()" disabled="state.currentStep === 0">Previous</Button>
                            <Button type="'primary'" onClick="() => this.nextStep()" disabled="state.currentStep === 2">Next Step</Button>
                        </div>
                    </div>
                </div>

                <div class="card border border-light shadow-sm rounded mb-4 bg-white">
                    <div class="card-header bg-light border-bottom-0 py-2"><span class="fw-bold text-dark" style="font-size: 13px;">Panel Steps (Khối thẻ) &amp; Clickable</span></div>
                    <div class="card-body p-4 border-top">
                        <p class="text-muted small mb-3">Panel style đóng khung các bước thành thẻ, kết hợp sự kiện <code>onChange</code> để click chọn tự do.</p>
                        <Steps items="panelItems" current="state.panelStep" type="'panel'" onChange="(idx) => this.setPanelStep(idx)" />
                    </div>
                </div>

                <div class="card border border-light shadow-sm rounded mb-4 bg-white">
                    <div class="card-header bg-light border-bottom-0 py-2"><span class="fw-bold text-dark" style="font-size: 13px;">Dot Style (Dạng chấm)</span></div>
                    <div class="card-body p-4 border-top">
                        <Steps items="basicItems" current="1" type="'dot'" />
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">2. Odoo Navigation Statusbar</h2>
                <div class="card border border-light shadow-sm rounded mb-4 bg-white">
                    <div class="card-body p-0">
                        <p class="text-muted small p-4 mb-0 pb-2">Đây là biến thể cực kỳ đặc trưng của Odoo, nằm ở góc phải các Form View (như Sales, Invoices). Thường được gán thuộc tính <code>clickable</code> để người dùng đổi trạng thái nhanh.</p>
                        
                        <div class="bg-light border-top border-bottom p-3 d-flex justify-content-between align-items-center flex-nowrap overflow-hidden gap-3">
                            <div class="d-flex gap-2 flex-shrink-0">
                                <Button type="'primary'" className="'text-nowrap'">Xác nhận Đơn</Button>
                                <Button className="'text-nowrap'">Hủy bỏ</Button>
                            </div>
                            
                            <div class="flex-grow-1 d-flex justify-content-end overflow-x-auto pb-1">
                                <Steps items="odooItems" 
                                       type="'navigation'" 
                                       current="state.odooStep" 
                                       onChange="(idx) => this.setOdooStep(idx)" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">3. Status &amp; Orientation (Trạng thái &amp; Hướng)</h2>
                
                <div class="row">
                    <div class="col-md-7 mb-4">
                        <div class="card border border-light shadow-sm rounded h-100 bg-white">
                            <div class="card-header bg-light border-bottom-0 py-2"><span class="fw-bold text-dark" style="font-size: 13px;">Error Status</span></div>
                            <div class="card-body p-4 border-top">
                                <p class="text-muted small mb-4">Thiết lập <code>status="'error'"</code> để báo đỏ bước hiện tại.</p>
                                <Steps items="errorItems" current="1" status="'error'" />
                            </div>
                        </div>
                    </div>

                    <div class="col-md-5 mb-4">
                        <div class="card border border-light shadow-sm rounded h-100 bg-white">
                            <div class="card-header bg-light border-bottom-0 py-2"><span class="fw-bold text-dark" style="font-size: 13px;">Vertical (Dọc)</span></div>
                            <div class="card-body p-4 border-top">
                                <Steps items="basicItems" current="1" direction="'vertical'" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    `;
}