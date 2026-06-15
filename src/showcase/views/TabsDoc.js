import { Component, xml, useState } from "@odoo/owl";
import { Tabs } from "../../components/Tabs/Tabs.js";
import { Button } from "../../components/Button/Button.js";

export class TabsDoc extends Component {
    static components = { Tabs, Button };

    setup() {
        this.basicItems = [
            { key: '1', label: 'Tab 1', content: 'Content of Tab Pane 1' },
            { key: '2', label: 'Tab 2', content: 'Content of Tab Pane 2' },
            { key: '3', label: 'Tab 3', content: 'Content of Tab Pane 3' }
        ];

        this.iconItems = [
            { key: '1', label: 'Cấu hình', icon: 'fa-cog', content: 'Thiết lập hệ thống' },
            { key: '2', label: 'Thống kê', icon: 'fa-bar-chart', content: 'Báo cáo doanh thu' }
        ];

        this.disabledItems = [
            { key: '1', label: 'Tab 1', content: 'Content of Tab Pane 1' },
            { key: '2', label: 'Tab 2', disabled: true, content: 'Bị khóa do phân quyền' },
            { key: '3', label: 'Tab 3', content: 'Content of Tab Pane 3' }
        ];

        this.state = useState({
            editableItems: [
                { key: '1', label: 'Tab 1', content: 'Content of Tab 1' },
                { key: '2', label: 'Tab 2', content: 'Content of Tab 2' }
            ],
            newTabIndex: 0,
            placement: 'top',
            size: 'medium'
        });
    }

    onEdit(action, targetKey) {
        if (action === 'add') {
            const newKey = `newTab${this.state.newTabIndex++}`;
            this.state.editableItems.push({
                key: newKey,
                label: `New Tab ${this.state.newTabIndex}`,
                content: `New Tab Content ${this.state.newTabIndex}`
            });
        } else if (action === 'remove') {
            this.state.editableItems = this.state.editableItems.filter(item => item.key !== targetKey);
        }
    }

    setPlacement(placement) { this.state.placement = placement; }
    setSize(size) { this.state.size = size; }

    static template = xml`
        <div class="o_doc_container py-3">
            <h1 class="fw-bold text-dark mb-2">Tabs Component</h1>
            <p class="text-muted mb-4">Các Tab giúp dễ dàng khám phá và chuyển đổi giữa các góc nhìn khác nhau trong một Form màn hình.</p>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">1. Cơ bản &amp; Tắt Tab</h2>
                <div class="row">
                    <div class="col-6">
                        <div class="card border border-light shadow-sm rounded mb-4 bg-white p-4">
                            <Tabs items="basicItems" />
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card border border-light shadow-sm rounded mb-4 bg-white p-4">
                            <Tabs items="disabledItems" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">2. Icon, Định tuyến Center &amp; Extra Actions</h2>
                <div class="card border border-light shadow-sm rounded mb-4 bg-white p-4">
                    <Tabs items="iconItems" centered="true">
                        <t t-set-slot="extraRight">
                            <Button size="'small'" type="'primary'">Save Configuration</Button>
                        </t>
                    </Tabs>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">3. Placements (Vị trí)</h2>
                <div class="card border border-light shadow-sm rounded mb-4 bg-white p-4">
                    <div class="mb-4 d-flex gap-2">
                        <Button type="state.placement === 'top' ? 'primary' : 'default'" onClick="() => this.setPlacement('top')">Top</Button>
                        <Button type="state.placement === 'bottom' ? 'primary' : 'default'" onClick="() => this.setPlacement('bottom')">Bottom</Button>
                        <Button type="state.placement === 'start' ? 'primary' : 'default'" onClick="() => this.setPlacement('start')">Start</Button>
                        <Button type="state.placement === 'end' ? 'primary' : 'default'" onClick="() => this.setPlacement('end')">End</Button>
                    </div>
                    <div style="min-height: 150px;">
                        <Tabs items="basicItems" placement="state.placement" />
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">4. Card &amp; Sizes</h2>
                <div class="card border border-light shadow-sm rounded mb-4 bg-white p-4">
                    <div class="mb-4 d-flex gap-2">
                        <Button type="state.size === 'small' ? 'primary' : 'default'" onClick="() => this.setSize('small')">Small</Button>
                        <Button type="state.size === 'medium' ? 'primary' : 'default'" onClick="() => this.setSize('medium')">Medium</Button>
                        <Button type="state.size === 'large' ? 'primary' : 'default'" onClick="() => this.setSize('large')">Large</Button>
                    </div>
                    <Tabs items="basicItems" type="'card'" size="state.size" />
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">5. Editable Card</h2>
                <div class="card border border-light shadow-sm rounded mb-4 bg-white p-4">
                    <Tabs items="state.editableItems" type="'editable-card'" onEdit="(action, key) => this.onEdit(action, key)" />
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">6. API Reference</h2>
                <div class="card border border-light shadow-sm rounded bg-white p-0">
                    <div class="table-responsive">
                        <table class="table table-bordered table-sm small mb-0">
                            <thead class="table-light">
                                <tr>
                                    <th class="px-3 py-2">Thuộc tính</th>
                                    <th class="py-2">Mô tả</th>
                                    <th class="py-2">Type</th>
                                    <th class="py-2">Mặc định</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="px-3 py-2"><code>items</code></td>
                                    <td>Mảng cấu hình (<code>key, label, icon, disabled, closable, content</code>)</td>
                                    <td><code>Array</code></td>
                                    <td><code>[]</code></td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2"><code>type</code></td>
                                    <td>Loại Style của tab</td>
                                    <td><code>'line' | 'card' | 'editable-card'</code></td>
                                    <td><code>'line'</code></td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2"><code>size</code></td>
                                    <td>Kích thước Tabs</td>
                                    <td><code>'large' | 'medium' | 'small'</code></td>
                                    <td><code>'medium'</code></td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2"><code>placement</code></td>
                                    <td>Vị trí của thanh điều hướng (Thường dùng trong các Report lớn)</td>
                                    <td><code>'top' | 'bottom' | 'start' | 'end'</code></td>
                                    <td><code>'top'</code></td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2"><code>extraLeft</code> / <code>extraRight</code></td>
                                    <td>Slot tên chỉ định để chèn thêm Custom Actions bên mép Trái/Phải</td>
                                    <td><code>Slot (XML)</code></td>
                                    <td><code>-</code></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}