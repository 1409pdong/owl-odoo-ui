import { Component, xml, useState } from "@odoo/owl";
import { FloatButton } from "../../components/FloatButton/FloatButton.js";

export class FloatButtonDoc extends Component {
    static components = { FloatButton };

    setup() {
        this.state = useState({ clickCount: 3 });
    }

    static template = xml`
        <div class="o_doc_container py-3" style="min-height: 600px;">
            <h1 class="fw-bold text-dark mb-2">FloatButton Component</h1>
            <p class="text-muted mb-4">Nút bấm nổi, giải quyết bài toán dồn không gian mật độ dữ liệu.</p>

            <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">1. Shapes &amp; Content</h2>
            <div class="card border border-light shadow-sm rounded mb-4 bg-white p-4">
                <div class="row text-center">
                    <div class="col-3 border-end">
                        <span class="small text-muted d-block mb-3">Circle Shape</span>
                        <div class="d-flex justify-content-center align-items-center" style="height: 50px;">
                            <FloatButton type="'default'" shape="'circle'" icon="'fa-question-circle'" style="'position: relative !important; top:auto; left:auto;'"/>
                        </div>
                    </div>
                    <div class="col-3">
                        <span class="small text-muted d-block mb-3">Square with Desc</span>
                        <div class="d-flex justify-content-center align-items-center" style="height: 50px;">
                            <FloatButton type="'primary'" shape="'square'" icon="'fa-file-text-o'" description="'docs'" style="'position: relative !important; top:auto; left:auto;'"/>
                        </div>
                    </div>
                </div>
            </div>

            <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">2. Types &amp; Badges</h2>
            <div class="card border border-light shadow-sm rounded mb-4 bg-white p-4">
                <p class="text-muted small mb-3">Hiển thị nút bấm chuẩn kích thước gốc, tích hợp số hiệu thông báo trạng thái hoạt động thực tế.</p>
                <div class="d-flex gap-5 justify-content-start align-items-center">
                    <div class="text-center">
                        <span class="small text-muted d-block mb-2">Default + Badge (Click thử)</span>
                        <FloatButton type="'default'" icon="'fa-commenting-o'" badge="state.clickCount" style="'position: relative !important; top:auto; left:auto;'" onClick="() => this.state.clickCount++"/>
                    </div>
                    <div class="text-center">
                        <span class="small text-muted d-block mb-2">Primary + Message Badge</span>
                        <FloatButton type="'primary'" icon="'fa-envelope-o'" badge="'12'" style="'position: relative !important; top:auto; left:auto;'"/>
                    </div>
                    <div class="text-center">
                        <span class="small text-muted d-block mb-2">Danger Action</span>
                        <FloatButton type="'danger'" icon="'fa-exclamation-triangle'" style="'position: relative !important; top:auto; left:auto;'"/>
                    </div>
                </div>
            </div>

            <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">3. Action Menu Groups</h2>
            <div class="card border border-light shadow-sm rounded mb-4 bg-white p-4">
                <div class="row">
                    <div class="col-6 border-end">
                        <span class="small text-muted d-block mb-4 text-center">Click Trigger (Placement: Top)</span>
                        <div style="height: 180px; position: relative;" class="bg-light rounded border p-3">
                            <FloatButton type="'primary'" icon="'fa-bars'" isGroup="true" trigger="'click'" placement="'top'" style="'position: absolute !important; bottom: 20px; right: 20px;'">
                                <FloatButton icon="'fa-user'" tooltip="'User Profile'"/>
                                <FloatButton icon="'fa-cog'" tooltip="'Settings'"/>
                            </FloatButton>
                        </div>
                    </div>
                    <div class="col-6">
                        <span class="small text-muted d-block mb-4 text-center">Hover Trigger (Placement: Left)</span>
                        <div style="height: 180px; position: relative;" class="bg-light rounded border p-3">
                            <FloatButton type="'default'" icon="'fa-share-alt'" isGroup="true" trigger="'hover'" placement="'left'" style="'position: absolute !important; bottom: 20px; right: 20px;'">
                                <FloatButton icon="'fa-print'" tooltip="'Print Order'"/>
                                <FloatButton icon="'fa-download'" tooltip="'Export File'"/>
                            </FloatButton>
                        </div>
                    </div>
                </div>
            </div>

            <FloatButton type="'primary'" icon="'fa-chevron-up'" backTop="true" visibilityHeight="100" tooltip="'Cuộn lên đầu trang'" style="'bottom: 40px; right: 40px;'"/>
        </div>
    `;
}