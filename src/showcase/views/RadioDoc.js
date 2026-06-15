import { Component, xml, useState } from "@odoo/owl";
import { Radio } from "../../components/Radio/Radio.js";
import { RadioGroup } from "../../components/Radio/RadioGroup.js";

export class RadioDoc extends Component {
    static components = { Radio, RadioGroup };

    setup() {
        this.plainOptions = ['Apple', 'Pear', 'Orange'];
        
        this.state = useState({
            groupVal1: 'Apple',
            groupVal2: 'B',
            btnVal1: 'Hangzhou',
            btnVal2: 'Shanghai'
        });
    }

    static template = xml`
        <div class="o_doc_container py-3">
            <h1 class="fw-bold text-dark mb-2">Radio Components</h1>
            <p class="text-muted mb-4">Các lựa chọn một-trong-nhiều. Hỗ trợ đầy đủ Style Nút bấm (Button Group) cực kỳ phổ biến trong Odoo ERP.</p>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">1. Cơ bản &amp; Vô hiệu hóa</h2>
                <div class="card border border-light shadow-sm rounded bg-white p-4">
                    <div class="d-flex gap-4">
                        <Radio>Basic Radio</Radio>
                        <Radio disabled="true">Disabled</Radio>
                        <Radio disabled="true" checked="true">Disabled Checked</Radio>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">2. Nhóm Radio Group &amp; Cấu trúc dọc (Vertical)</h2>
                <div class="card border border-light shadow-sm rounded mb-4 bg-white p-4">
                    <div class="mb-4">
                        <div class="fw-bold small mb-2 text-dark">Group từ Array (Horizontal):</div>
                        <RadioGroup options="plainOptions" value="state.groupVal1" onChange="(val) => this.state.groupVal1 = val" />
                        <div class="mt-2 text-primary small fw-bold">Chọn: <t t-esc="state.groupVal1"/></div>
                    </div>
                    
                    <div class="border-top pt-4">
                        <div class="fw-bold small mb-2 text-dark">Group Lồng Thẻ <code>&lt;Radio&gt;</code> (Vertical):</div>
                        <RadioGroup direction="'vertical'" value="state.groupVal2" onChange="(val) => this.state.groupVal2 = val">
                            <Radio value="'A'">Option A (Mặc định)</Radio>
                            <Radio value="'B'">Option B</Radio>
                            <Radio value="'C'" disabled="true">Option C (Disabled)</Radio>
                            <Radio value="'D'">Option D với văn bản siêu siêu dài để test hiển thị Layout.</Radio>
                        </RadioGroup>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">3. Radio Buttons &amp; Solid State</h2>
                <div class="card border border-light shadow-sm rounded mb-4 bg-white p-4">
                    <p class="text-muted small mb-3">Sử dụng thuộc tính <code>optionType="'button'"</code> trên RadioGroup.</p>
                    
                    <div class="mb-4">
                        <div class="fw-bold small mb-2 text-dark">Outlined (Mặc định):</div>
                        <RadioGroup optionType="'button'" value="state.btnVal1" onChange="(val) => this.state.btnVal1 = val">
                            <Radio value="'Hangzhou'">Hangzhou</Radio>
                            <Radio value="'Shanghai'">Shanghai</Radio>
                            <Radio value="'Beijing'" disabled="true">Beijing</Radio>
                            <Radio value="'Chengdu'">Chengdu</Radio>
                        </RadioGroup>
                    </div>

                    <div>
                        <div class="fw-bold small mb-2 text-dark">Solid Style (In đậm nền):</div>
                        <RadioGroup optionType="'button'" buttonStyle="'solid'" value="state.btnVal2" onChange="(val) => this.state.btnVal2 = val">
                            <Radio value="'Hangzhou'">Hangzhou</Radio>
                            <Radio value="'Shanghai'">Shanghai</Radio>
                            <Radio value="'Beijing'">Beijing</Radio>
                        </RadioGroup>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">4. Kích thước (Sizes)</h2>
                <div class="card border border-light shadow-sm rounded mb-4 bg-white p-4">
                    <div class="d-flex flex-column gap-3 align-items-start">
                        <RadioGroup optionType="'button'" size="'large'" defaultValue="'A'">
                            <Radio value="'A'">Large</Radio><Radio value="'B'">Large</Radio>
                        </RadioGroup>
                        <RadioGroup optionType="'button'" size="'medium'" defaultValue="'A'">
                            <Radio value="'A'">Medium</Radio><Radio value="'B'">Medium</Radio>
                        </RadioGroup>
                        <RadioGroup optionType="'button'" size="'small'" defaultValue="'A'">
                            <Radio value="'A'">Small</Radio><Radio value="'B'">Small</Radio>
                        </RadioGroup>
                    </div>
                </div>
            </div>

            <div style="height: 100px;"></div>
        </div>
    `;
}