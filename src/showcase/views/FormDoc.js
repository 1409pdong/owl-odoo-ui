import { Component, xml, useState } from "@odoo/owl";
import { Form } from "../../components/Form/Form.js";
import { FormItem } from "../../components/Form/FormItem.js";
import { Button } from "../../components/Button/Button.js";
import { Checkbox } from "../../components/Checkbox/Checkbox.js";
import { DatePicker } from "../../components/DatePicker/DatePicker.js";
import { RangePicker } from "../../components/DatePicker/RangePicker.js";

export class FormDoc extends Component {
    static components = { Form, FormItem, Button, Checkbox, DatePicker, RangePicker };

    setup() {
        this.state = useState({
            layout: 'group',
            variant: 'underlined', // 'outlined' | 'filled' | 'borderless' | 'underlined'
            isFormDisabled: false,
            agreePolicy: true
        });
    }

    setLayout(ly) { this.state.layout = ly; }
    setVariant(vr) { this.state.variant = vr; }

    static template = xml`
        <div class="o_doc_container py-3">
            <h1 class="fw-bold text-dark mb-2">Form &amp; Form.Item</h1>
            <p class="text-muted mb-4">Quản lý giao diện nhập liệu. Đã sửa lỗi Wrap Grid tự động và hỗ trợ 4 Variants giao diện Odoo Frontend.</p>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">1. Điều khiển Component</h2>
                
                <div class="card border border-light shadow-sm rounded bg-white p-4">
                    <div class="row">
                        <div class="col-md-5 border-end">
                            <div class="fw-bold small mb-2 text-dark">Thay đổi Layout:</div>
                            <div class="d-flex flex-wrap gap-2">
                                <Button type="state.layout === 'horizontal' ? 'primary' : 'default'" size="'small'" onClick="() => this.setLayout('horizontal')">Horizontal</Button>
                                <Button type="state.layout === 'vertical' ? 'primary' : 'default'" size="'small'" onClick="() => this.setLayout('vertical')">Vertical</Button>
                                <Button type="state.layout === 'inline' ? 'primary' : 'default'" size="'small'" onClick="() => this.setLayout('inline')">Inline</Button>
                                <Button type="state.layout === 'group' ? 'primary' : 'default'" danger="true" size="'small'" onClick="() => this.setLayout('group')">Odoo Group (Grid)</Button>
                            </div>
                        </div>
                        
                        <div class="col-md-5 border-end px-3">
                            <div class="fw-bold small mb-2 text-dark">Kiểu viền Input (Variant):</div>
                            <div class="d-flex flex-wrap gap-2">
                                <Button type="state.variant === 'outlined' ? 'primary' : 'default'" size="'small'" onClick="() => this.setVariant('outlined')">Outlined</Button>
                                <Button type="state.variant === 'filled' ? 'primary' : 'default'" size="'small'" onClick="() => this.setVariant('filled')">Filled</Button>
                                <Button type="state.variant === 'borderless' ? 'primary' : 'default'" size="'small'" onClick="() => this.setVariant('borderless')">Borderless</Button>
                                <Button type="state.variant === 'underlined' ? 'primary' : 'default'" size="'small'" onClick="() => this.setVariant('underlined')">Underlined</Button>
                            </div>
                        </div>

                        <div class="col-md-2 px-3">
                            <div class="fw-bold small mb-2 text-dark">Trạng thái:</div>
                            <Checkbox checked="state.isFormDisabled" onChange="(val) => this.state.isFormDisabled = val">
                                Disabled
                            </Checkbox>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">2. Biểu mẫu Tổng hợp (Comprehensive Demo)</h2>
                <div class="card border border-light shadow-sm rounded bg-white p-4">
                    
                    <div style="max-width: 900px; margin: 0 auto;">
                        <Form layout="state.layout" variant="state.variant" disabled="state.isFormDisabled">
                            
                            <FormItem label="'Khách hàng'" required="true">
                                <input class="o-input" placeholder="Tìm kiếm tên hoặc mã số thuế..."/>
                            </FormItem>

                            <FormItem label="'Nhóm đối tác'">
                                <select class="o-input">
                                    <option>Khách hàng VIP</option>
                                    <option>Khách lẻ</option>
                                    <option>Đại lý phân phối</option>
                                </select>
                            </FormItem>

                            <FormItem label="'Ngày sinh'">
                                <DatePicker variant="state.variant" placeholder="'Chọn ngày...'" disabled="state.isFormDisabled" />
                            </FormItem>

                            <FormItem label="'Kỳ báo cáo'">
                                <RangePicker variant="state.variant" disabled="state.isFormDisabled" />
                            </FormItem>

                            <FormItem label="'Hạn mức tín dụng'" help="'Tính theo đơn vị VNĐ.'">
                                <input type="number" class="o-input" placeholder="VD: 50000000"/>
                            </FormItem>

                            <FormItem label="'Phương thức TT'">
                                <div class="d-flex gap-3 align-items-center h-100">
                                    <label class="d-flex align-items-center gap-1 cursor-pointer">
                                        <input type="radio" name="paymethod" checked="true"/> Tiền mặt
                                    </label>
                                    <label class="d-flex align-items-center gap-1 cursor-pointer">
                                        <input type="radio" name="paymethod"/> Chuyển khoản
                                    </label>
                                </div>
                            </FormItem>

                            <FormItem label="'Điều khoản'">
                                <div class="d-flex align-items-center h-100">
                                    <Checkbox checked="state.agreePolicy" disabled="state.isFormDisabled" onChange="(val) => this.state.agreePolicy = val">
                                        Đã đọc và đồng ý
                                    </Checkbox>
                                </div>
                            </FormItem>

                            <FormItem label="'Ghi chú nội bộ'" help="'Nhập mô tả hoặc ghi chú thêm...'">
                                <textarea class="o-input"></textarea>
                            </FormItem>

                            <FormItem label="'Email Liên hệ'" required="true" error="'Định dạng Email không hợp lệ.'">
                                <input class="o-input" value="wrong-email-format"/>
                            </FormItem>

                            <t t-if="state.layout !== 'group'">
                                <FormItem label="''">
                                    <Button type="'primary'" icon="'fa-save'" disabled="state.isFormDisabled">Lưu dữ liệu</Button>
                                </FormItem>
                            </t>

                        </Form>
                    </div>

                </div>
            </div>

        </div>
    `;
}