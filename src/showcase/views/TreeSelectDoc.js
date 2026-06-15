import { Component, xml, useState } from "@odoo/owl";
import { TreeSelect } from "../../components/TreeSelect/TreeSelect.js";
import { Form } from "../../components/Form/Form.js";
import { FormItem } from "../../components/Form/FormItem.js";

export class TreeSelectDoc extends Component {
    static components = { TreeSelect, Form, FormItem };

    setup() {
        // Dữ liệu mẫu phân cấp chuẩn Odoo (VD: Phòng ban / Phân loại sản phẩm)
        this.treeData = [
            {
                value: 'parent 1',
                label: 'Bộ phận Kinh Doanh',
                children: [
                    { value: 'child 1-1', label: 'Team Bán Hàng Trực Tiếp' },
                    { 
                        value: 'child 1-2', label: 'Team Marketing',
                        children: [
                            { value: 'child 1-2-1', label: 'Digital Marketing' },
                            { value: 'child 1-2-2', label: 'Tổ chức sự kiện', disabled: true }
                        ]
                    }
                ]
            },
            {
                value: 'parent 2',
                label: 'Bộ phận IT & R&D',
                children: [
                    { value: 'child 2-1', label: 'Odoo Developers' },
                    { value: 'child 2-2', label: 'System Admin' }
                ]
            }
        ];

        this.state = useState({
            singleVal: 'child 1-1',
            multiVals: ['child 2-1', 'child 1-2-1'],
            variant: 'underlined'
        });
    }

    static template = xml`
        <div class="o_doc_container py-3">
            <h1 class="fw-bold text-dark mb-2">TreeSelect Component</h1>
            <p class="text-muted mb-4">Mô phỏng trường dữ liệu chọn phân cấp (Cây). Tương đương với các trường Category hoặc Parent-Child Relationship trong Odoo ERP.</p>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">1. Cơ bản &amp; Tìm kiếm (Single Select)</h2>
                <div class="card border border-light shadow-sm rounded bg-white p-4">
                    <div class="row" style="max-width: 700px;">
                        <div class="col-6">
                            <label class="fw-bold small mb-2 text-dark">Chọn Đơn (Kèm Clear):</label>
                            <TreeSelect treeData="treeData" value="state.singleVal" allowClear="true" onChange="(val) => this.state.singleVal = val"/>
                            <div class="mt-2 text-muted small">ID hiện tại: <span class="text-primary fw-bold"><t t-esc="state.singleVal"/></span></div>
                        </div>
                        <div class="col-6">
                            <label class="fw-bold small mb-2 text-dark">Tìm kiếm theo tên (ShowSearch):</label>
                            <TreeSelect treeData="treeData" showSearch="true" placeholder="'Gõ để tìm kiếm...'"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">2. Nhiều lựa chọn &amp; Checkbox Tree</h2>
                <div class="card border border-light shadow-sm rounded bg-white p-4">
                    <p class="text-muted small mb-3">Sử dụng thuộc tính <code>treeCheckable="true"</code> để biến giao diện xổ xuống thành dạng Checkbox Tree thân thiện.</p>
                    <div style="max-width: 500px;">
                        <TreeSelect treeData="treeData" treeCheckable="true" showSearch="true" value="state.multiVals" allowClear="true" onChange="(val) => this.state.multiVals = val"/>
                    </div>
                    <div class="mt-2 text-muted small">Mảng dữ liệu chọn: <span class="text-success fw-bold"><t t-esc="state.multiVals.join(', ')"/></span></div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">3. Tích hợp Odoo Form Variants</h2>
                <div class="card border border-light shadow-sm rounded bg-white p-4">
                    <div class="mb-3 d-flex gap-2">
                        <button class="btn btn-sm btn-outline-primary" t-on-click="() => this.state.variant = 'outlined'">Outlined</button>
                        <button class="btn btn-sm btn-outline-primary" t-on-click="() => this.state.variant = 'filled'">Filled</button>
                        <button class="btn btn-sm btn-outline-primary" t-on-click="() => this.state.variant = 'borderless'">Borderless</button>
                        <button class="btn btn-sm btn-outline-primary" t-on-click="() => this.state.variant = 'underlined'">Underlined (Odoo)</button>
                    </div>

                    <div class="p-4 border rounded bg-light">
                        <Form layout="'group'" variant="state.variant">
                            <FormItem label="'Danh mục sản phẩm'" required="true">
                                <TreeSelect treeData="treeData" variant="state.variant" placeholder="'Chọn danh mục'"/>
                            </FormItem>
                            <FormItem label="'Phòng ban liên quan'">
                                <TreeSelect treeData="treeData" treeCheckable="true" variant="state.variant"/>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>

        </div>
    `;
}