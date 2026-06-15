import { Component, xml, useState } from "@odoo/owl";
import { Select } from "../../components/Select/Select.js";
import { Form } from "../../components/Form/Form.js";
import { FormItem } from "../../components/Form/FormItem.js";

export class SelectDoc extends Component {
    static components = { Select, Form, FormItem };

    setup() {
        this.managerOptions = [
            { label: 'Micheal Scott (CEO)', value: 'scott' },
            { label: 'Dwight Schrute (Sales)', value: 'dwight' },
            { label: 'Jim Halpert (Accountant)', value: 'jim' },
            { label: 'Pam Beesly (HR - Disabled)', value: 'pam', disabled: true }
        ];

        this.tagOptions = [
            { label: 'Python / Odoo Code', value: 'py' },
            { label: 'JavaScript / OWL', value: 'js' },
            { label: 'PostgreSQL Database', value: 'sql' },
            { label: 'Docker Container', value: 'docker' }
        ];

        this.state = useState({
            singleVal: 'dwight',
            multiVals: ['py', 'js'],
            variant: 'underlined'
        });
    }

    static template = xml`
        <div class="o_doc_container py-3">
            <h1 class="fw-bold text-dark mb-2">Select Component</h1>
            <p class="text-muted mb-4">Thành phần lựa chọn dữ liệu nâng cao, hỗ trợ bộ lọc và thẻ Tags (Mô phỏng trường quan hệ dữ liệu ERP).</p>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">1. Cơ bản &amp; Tìm kiếm (Searchable)</h2>
                <div class="card border border-light shadow-sm rounded bg-white p-4">
                    <div class="row" style="max-width: 700px;">
                        <div class="col-6">
                            <label class="fw-bold small mb-2 text-dark">Single Select + Clear:</label>
                            <Select options="managerOptions" value="state.singleVal" allowClear="true" onChange="(val) => this.state.singleVal = val"/>
                            <div class="mt-2 text-muted small">Value truyền ra: <span class="text-primary fw-bold"><t t-esc="state.singleVal"/></span></div>
                        </div>
                        <div class="col-6">
                            <label class="fw-bold small mb-2 text-dark">Có bộ lọc tìm kiếm (ShowSearch):</label>
                            <Select options="managerOptions" showSearch="true" placeholder="'Gõ để lọc nhân viên...'"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">2. Nhiều lựa chọn dạng thẻ (Multiple Tags)</h2>
                <div class="card border border-light shadow-sm rounded bg-white p-4">
                    <p class="text-muted small mb-3">Tương đương với trường dữ liệu <code>many2many_tags</code> trong Odoo View Sheet.</p>
                    <div style="max-width: 500px;">
                        <Select options="tagOptions" mode="'multiple'" value="state.multiVals" allowClear="true" onChange="(val) => this.state.multiVals = val"/>
                    </div>
                    <div class="mt-2 text-muted small">Mảng dữ liệu chọn: <span class="text-success fw-bold"><t t-esc="state.multiVals.join(', ')"/></span></div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">3. Đồng bộ Variants &amp; Lưới Odoo Group</h2>
                <div class="card border border-light shadow-sm rounded bg-white p-4">
                    <div class="mb-3 d-flex gap-2">
                        <button class="btn btn-sm btn-outline-primary" t-on-click="() => this.state.variant = 'outlined'">Outlined</button>
                        <button class="btn btn-sm btn-outline-primary" t-on-click="() => this.state.variant = 'filled'">Filled</button>
                        <button class="btn btn-sm btn-outline-primary" t-on-click="() => this.state.variant = 'borderless'">Borderless</button>
                        <button class="btn btn-sm btn-outline-primary" t-on-click="() => this.state.variant = 'underlined'">Underlined (Odoo)</button>
                    </div>

                    <div class="p-4 border rounded bg-light">
                        <Form layout="'group'" variant="state.variant">
                            <FormItem label="'Phụ trách'" required="true">
                                <Select options="managerOptions" variant="state.variant"/>
                            </FormItem>
                            <FormItem label="'Kỹ năng yêu cầu'">
                                <Select options="tagOptions" mode="'multiple'" variant="state.variant"/>
                            </FormItem>
                            <FormItem label="'Trạng thái lỗi'" error="'Vui lòng chọn thông tin phụ trách'">
                                <Select options="managerOptions" status="'error'" variant="state.variant"/>
                            </FormItem>
                            <FormItem label="'Bị khóa (Disabled)'">
                                <Select options="managerOptions" disabled="true" defaultValue="'scott'" variant="state.variant"/>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">4. Kích thước (Sizes)</h2>
                <div class="card border border-light shadow-sm rounded bg-white p-4">
                    <div class="d-flex flex-column gap-3" style="max-width: 300px;">
                        <Select options="managerOptions" size="'large'" placeholder="'Large (40px)'"/>
                        <Select options="managerOptions" size="'medium'" placeholder="'Medium (32px)'"/>
                        <Select options="managerOptions" size="'small'" placeholder="'Small (24px)'"/>
                    </div>
                </div>
            </div>
        </div>
    `;
}