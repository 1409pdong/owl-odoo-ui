import { Component, xml, useState } from "@odoo/owl";
import { Input } from "../../components/Input/Input.js";
import { TextArea } from "../../components/Input/TextArea.js";
import { OTP } from "../../components/Input/OTP.js";

export class InputDoc extends Component {
    static components = { Input, TextArea, OTP };

    setup() {
        this.state = useState({
            otpValue: ''
        });
    }

    static template = xml`
        <div class="o_doc_container py-3">
            <h1 class="fw-bold text-dark mb-2">Input Components</h1>
            <p class="text-muted mb-4">Các trường nhập liệu văn bản từ cơ bản đến nâng cao (Search, Password, Textarea, OTP).</p>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">1. Cơ bản &amp; Kích thước (Sizes)</h2>
                <div class="card border border-light shadow-sm rounded mb-4 bg-white p-4">
                    <div class="d-flex flex-column gap-3" style="max-width: 400px;">
                        <Input size="'large'" placeholder="'Large Input'"/>
                        <Input size="'medium'" placeholder="'Medium Input (Default)'"/>
                        <Input size="'small'" placeholder="'Small Input'"/>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">2. Variants (Kiểu dáng viền)</h2>
                <div class="card border border-light shadow-sm rounded mb-4 bg-white p-4">
                    <div class="d-flex flex-column gap-3" style="max-width: 400px;">
                        <Input variant="'outlined'" placeholder="'Outlined (Mặc định Odoo)'"/>
                        <Input variant="'filled'" placeholder="'Filled'"/>
                        <Input variant="'borderless'" placeholder="'Borderless'"/>
                        <Input variant="'underlined'" placeholder="'Underlined'"/>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">3. Icons, Password &amp; Search Box</h2>
                <div class="card border border-light shadow-sm rounded mb-4 bg-white p-4">
                    <div class="d-flex flex-column gap-3" style="max-width: 400px;">
                        
                        <Input placeholder="'Nhập tên đăng nhập...'">
                            <t t-set-slot="prefix"><i class="fa fa-user"/></t>
                            <t t-set-slot="suffix"><i class="fa fa-info-circle"/></t>
                        </Input>
                        
                        <Input placeholder="'Nhập để hiện nút xóa...'" allowClear="true"/>
                        
                        <Input type="'password'" placeholder="'Nhập mật khẩu...'" defaultValue="'odoo1234'"/>
                        
                        <Input search="true" placeholder="'Tìm kiếm khách hàng...'" onSearch="(val) => console.log('Searching: ', val)"/>
                        <Input search="true" enterButtonText="'TÌM KIẾM'" placeholder="'Tìm kiếm nâng cao...'"/>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">4. Text Area (Nhập nhiều dòng) &amp; Trạng thái Lỗi</h2>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <div class="card border border-light shadow-sm rounded h-100 bg-white p-4">
                            <p class="fw-bold small mb-2 text-dark">TextArea (Có đếm ký tự):</p>
                            <TextArea placeholder="'Nhập ghi chú...'" showCount="true" maxLength="100"/>
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="card border border-light shadow-sm rounded h-100 bg-white p-4">
                            <p class="fw-bold small mb-2 text-dark">Validation Status:</p>
                            <Input status="'error'" placeholder="'Error Status'" class="mb-3"/>
                            <Input status="'warning'" placeholder="'Warning Status'" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">5. Input OTP (One Time Password)</h2>
                <div class="card border border-light shadow-sm rounded mb-4 bg-white p-4">
                    <p class="text-muted small mb-3">Nhập mã PIN hoặc OTP. Hỗ trợ tính năng Paste (Dán) chuỗi số copy từ tin nhắn.</p>
                    
                    <OTP length="6" onChange="(val) => this.state.otpValue = val"/>
                    
                    <div class="mt-3 text-primary fw-bold small">
                        Mã bạn vừa nhập: <t t-esc="state.otpValue"/>
                    </div>
                </div>
            </div>

            <div style="height: 100px;"></div>
        </div>
    `;
}