import { Component, xml, useState } from "@odoo/owl";
import { Checkbox } from "../../components/Checkbox/Checkbox.js";
import { CheckboxGroup } from "../../components/Checkbox/CheckboxGroup.js";
import { Button } from "../../components/Button/Button.js";

export class CheckboxDoc extends Component {
    static components = { Checkbox, CheckboxGroup, Button };

    setup() {
        this.plainOptions = ['Apple', 'Pear', 'Orange'];
        
        this.state = useState({
            controlledChecked: false,
            controlledDisabled: false,
            
            // Check all Demo
            checkedList: ['Apple', 'Orange'],
            indeterminate: true,
            checkAll: false,

            // Checkbox Group Options
            groupOptions1: [
                { label: 'Apple', value: 'Apple' },
                { label: 'Pear', value: 'Pear' },
                { label: 'Orange', value: 'Orange', disabled: true }
            ]
        });
    }

    // Handlers for 'Controlled Checkbox'
    toggleChecked() { this.state.controlledChecked = !this.state.controlledChecked; }
    toggleDisable() { this.state.controlledDisabled = !this.state.controlledDisabled; }

    // Handlers for 'Check all' logic
    onCheckAllChange(checked) {
        this.state.checkedList = checked ? [...this.plainOptions] : [];
        this.state.indeterminate = false;
        this.state.checkAll = checked;
    }

    onGroupChange(list) {
        this.state.checkedList = list;
        this.state.indeterminate = !!list.length && list.length < this.plainOptions.length;
        this.state.checkAll = list.length === this.plainOptions.length;
    }

    static template = xml`
        <div class="o_doc_container py-3">
            <h1 class="fw-bold text-dark mb-2">Checkbox Component</h1>
            <p class="text-muted mb-4">Thu thập lựa chọn của người dùng. Dùng khi cần chọn nhiều giá trị trong cùng một nhóm thông tin.</p>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">1. Cơ bản &amp; Vô hiệu hóa</h2>
                <div class="row">
                    <div class="col-6">
                        <div class="card border border-light shadow-sm rounded bg-white p-4">
                            <span class="text-muted small d-block mb-3">Basic usage</span>
                            <Checkbox onChange="(val) => console.log('Checked:', val)">Checkbox</Checkbox>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card border border-light shadow-sm rounded bg-white p-4">
                            <span class="text-muted small d-block mb-3">Disabled Checkbox</span>
                            <div class="d-flex flex-column gap-2">
                                <div><Checkbox defaultChecked="false" disabled="true">Disabled Unchecked</Checkbox></div>
                                <div><Checkbox defaultChecked="true" disabled="true">Disabled Checked</Checkbox></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">2. Trạng thái kiểm soát (Controlled)</h2>
                <div class="card border border-light shadow-sm rounded mb-4 bg-white p-4">
                    <div class="mb-4">
                        <Checkbox checked="state.controlledChecked" 
                                  disabled="state.controlledDisabled" 
                                  onChange="(val) => this.state.controlledChecked = val">
                            <span t-esc="state.controlledChecked ? 'Checked' : 'Unchecked'" /> - 
                            <span t-esc="state.controlledDisabled ? 'Disabled' : 'Enabled'" />
                        </Checkbox>
                    </div>
                    <div class="d-flex gap-2">
                        <Button type="'primary'" size="'small'" onClick="() => this.toggleChecked()">Toggle Check</Button>
                        <Button size="'small'" onClick="() => this.toggleDisable()">Toggle Disable</Button>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">3. Check All (Indeterminate Effect)</h2>
                <div class="card border border-light shadow-sm rounded mb-4 bg-white p-4">
                    <p class="text-muted small mb-3">Sử dụng property <code>indeterminate</code> kết hợp logic Local State để làm tính năng Chọn Tất Cả.</p>
                    
                    <div class="border-bottom pb-3 mb-3">
                        <Checkbox indeterminate="state.indeterminate" 
                                  checked="state.checkAll" 
                                  onChange="(val) => this.onCheckAllChange(val)">
                            Check all
                        </Checkbox>
                    </div>
                    
                    <CheckboxGroup options="plainOptions" 
                                   value="state.checkedList" 
                                   onChange="(list) => this.onGroupChange(list)" />
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">4. Nhóm Checkbox Group &amp; Layout</h2>
                <div class="card border border-light shadow-sm rounded mb-4 bg-white p-4">
                    <div class="mb-4">
                        <div class="fw-bold text-dark mb-2 small">Basic Group (Mảng Array / Object)</div>
                        <CheckboxGroup options="state.groupOptions1" defaultValue="['Apple']" />
                    </div>
                    
                    <div class="mb-4 border-top pt-4">
                        <div class="fw-bold text-dark mb-2 small">Vertical Group</div>
                        <CheckboxGroup options="plainOptions" direction="'vertical'" />
                    </div>
                    
                    <div class="mb-0 border-top pt-4">
                        <div class="fw-bold text-dark mb-3 small">Sử dụng với Bootstrap Grid</div>
                        <CheckboxGroup>
                            <div class="row w-100">
                                <div class="col-4"><Checkbox value="'A'">Option A</Checkbox></div>
                                <div class="col-4"><Checkbox value="'B'">Option B</Checkbox></div>
                                <div class="col-4"><Checkbox value="'C'">Option C</Checkbox></div>
                                <div class="col-4 mt-2"><Checkbox value="'D'">Option D</Checkbox></div>
                                <div class="col-4 mt-2"><Checkbox value="'E'">Option E</Checkbox></div>
                            </div>
                        </CheckboxGroup>
                    </div>
                </div>
            </div>
            
        </div>
    `;
}