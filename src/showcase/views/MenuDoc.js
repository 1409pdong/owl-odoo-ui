import { Component, xml, useState } from "@odoo/owl";
import { Menu } from "../../components/Menu/Menu.js";
import { Button } from "../../components/Button/Button.js";

export class MenuDoc extends Component {
    static components = { Menu, Button };

    setup() {
        this.state = useState({
            lastAction: 'Chưa có mục nào được chọn',
            dynamicMode: 'inline', // 'inline' | 'horizontal'
            dynamicTheme: 'light'  // 'light' | 'dark'
        });

        // ==============================================
        // 1. DATA CHO CÁC VÍ DỤ ITEM TYPES (PHÂN LOẠI)
        // ==============================================
        
        // 1.1 MenuItemType Examples
        this.menuItemData = [
            { key: 'dashboard', label: 'Dashboard', icon: 'fa-tachometer' },
            { key: 'home', label: 'Home', icon: 'fa-home' },
            { key: 'profile', label: 'Profile', icon: 'fa-user' },
            { key: 'settings', label: 'Settings', icon: 'fa-cog' },
            { key: 'reports', label: 'Reports', icon: 'fa-bar-chart' }
        ];

        // 1.2 SubMenuType Examples
        this.subMenuData = [
            { key: 'sales', label: 'Sales', icon: 'fa-line-chart', children: [
                { key: 'quotations', label: 'Quotations' },
                { key: 'sales_orders', label: 'Sales Orders' }
            ]},
            { key: 'purchase', label: 'Purchase', icon: 'fa-shopping-cart', children: [
                { key: 'rfq', label: 'RFQ' },
                { key: 'purchase_orders', label: 'Purchase Orders' }
            ]},
            { key: 'accounting', label: 'Accounting', icon: 'fa-calculator', children: [
                { key: 'invoices', label: 'Invoices' },
                { key: 'payments', label: 'Payments' }
            ]}
        ];

        // 1.3 MenuItemGroupType Examples
        this.groupMenuData = [
            { type: 'group', label: 'Master Data', children: [
                { key: 'customers', label: 'Customers', icon: 'fa-users' },
                { key: 'vendors', label: 'Vendors', icon: 'fa-truck' }
            ]},
            { type: 'group', label: 'Transactions', children: [
                { key: 'orders', label: 'Orders', icon: 'fa-file-text-o' },
                { key: 'invoices', label: 'Invoices', icon: 'fa-money' }
            ]},
            { type: 'group', label: 'Reports', children: [
                { key: 'revenue', label: 'Revenue Report', icon: 'fa-pie-chart' },
                { key: 'cost', label: 'Cost Report', icon: 'fa-area-chart' }
            ]}
        ];

        // 1.4 MenuDividerType Examples
        this.dividerMenuData = [
            { key: 'dashboard', label: 'Dashboard', icon: 'fa-tachometer' },
            { type: 'divider' },
            { key: 'settings', label: 'Settings', icon: 'fa-cog' }
        ];

        // ==============================================
        // 2. DATA CHO DEMO INTERACTIVE (CHẾ ĐỘ & THEME)
        // ==============================================
        this.interactiveData = [
            { key: 'nav1', label: 'Navigation One', icon: 'fa-envelope' },
            { key: 'nav2', label: 'Navigation Two', icon: 'fa-calendar' },
            { key: 'nav3', label: 'Navigation Three', icon: 'fa-folder-open', children: [
                { key: 'opt1', label: 'Option 1' },
                { key: 'opt2', label: 'Option 2' },
                { key: 'sub1', label: 'Submenu', children: [
                    { key: 'sub_opt1', label: 'Option 3' },
                    { key: 'sub_opt2', label: 'Option 4' }
                ]}
            ]},
            { key: 'nav4', label: 'Navigation Four (Link)', icon: 'fa-link' }
        ];


        this.odooConfigMenuData = [
    {
        key: 'config',
        label: 'Cấu hình',
        scrollable: true, // KÍCH HOẠT THANH CUỘN (Scrollbar)
        children: [
            { key: 'settings', label: 'Cài đặt' },
            { type: 'group', label: 'Hóa đơn', children: [
                { key: 'payment_terms', label: 'Điều khoản thanh toán' }
            ]},
            // ... (các dữ liệu nhóm khác giữ nguyên)
        ]
    },
    { key: 'reports', label: 'Báo cáo' }
];

        this.handleSelect = this.handleSelect.bind(this);
    }



    handleSelect(key, item) {
        this.state.lastAction = `Đã chọn: ${item.label} (Key: ${key})`;
    }

    toggleMode() {
        this.state.dynamicMode = this.state.dynamicMode === 'inline' ? 'horizontal' : 'inline';
    }

    toggleTheme() {
        this.state.dynamicTheme = this.state.dynamicTheme === 'light' ? 'dark' : 'light';
    }

    static template = xml`
        <div class="o_doc_container py-3">
            <h1 class="fw-bold text-dark mb-2">Menu Component</h1>
            <p class="text-muted mb-4">Hệ thống trình đơn điều hướng đa dạng (Versatile Menu) đáp ứng mọi kịch bản định tuyến trong Odoo ERP: Thanh ứng dụng trên cùng (Top Nav) và Thanh chức năng lề trái (Side Nav).</p>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">1. Cấu trúc phần tử (Item Types)</h2>
                <p class="text-muted small mb-3">Menu Component hỗ trợ 4 loại cấu trúc dữ liệu chính yếu giúp định hình hệ thống phân cấp thông tin.</p>
                
                <div class="row">
                    <div class="col-md-3 mb-4">
                        <div class="card border border-light shadow-sm rounded h-100 bg-white">
                            <div class="card-header bg-light border-bottom-0 py-2">
                                <span class="fw-bold text-dark" style="font-size: 13px;">MenuItemType</span>
                            </div>
                            <div class="card-body p-0 border-top">
                                <Menu items="menuItemData" mode="'inline'" defaultSelectedKey="'home'" onSelect="handleSelect"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-3 mb-4">
                        <div class="card border border-light shadow-sm rounded h-100 bg-white">
                            <div class="card-header bg-light border-bottom-0 py-2">
                                <span class="fw-bold text-dark" style="font-size: 13px;">SubMenuType</span>
                            </div>
                            <div class="card-body p-0 border-top">
                                <Menu items="subMenuData" mode="'inline'" defaultOpenKeys="['sales']" onSelect="handleSelect"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-3 mb-4">
                        <div class="card border border-light shadow-sm rounded h-100 bg-white">
                            <div class="card-header bg-light border-bottom-0 py-2">
                                <span class="fw-bold text-dark" style="font-size: 13px;">MenuItemGroupType</span>
                            </div>
                            <div class="card-body p-0 border-top">
                                <Menu items="groupMenuData" mode="'inline'" onSelect="handleSelect"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-3 mb-4">
                        <div class="card border border-light shadow-sm rounded h-100 bg-white">
                            <div class="card-header bg-light border-bottom-0 py-2">
                                <span class="fw-bold text-dark" style="font-size: 13px;">MenuDividerType</span>
                            </div>
                            <div class="card-body p-0 border-top">
                                <Menu items="dividerMenuData" mode="'inline'" onSelect="handleSelect"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">2. Demo Interactive: Modes, Theme &amp; Switcher</h2>
                <div class="card border border-light shadow-sm rounded mb-4 bg-white">
                    <div class="card-body p-4">
                        <p class="text-muted small mb-3">
                            Mô phỏng bảng điều khiển linh hoạt. Hỗ trợ thay đổi Chế độ (Inline <i class="fa fa-arrows-h mx-1"/> Horizontal) và Chủ đề (Light <i class="fa fa-adjust mx-1"/> Dark).<br/>
                            <span class="text-primary">* Odoo Note: Tính năng "Open Current Submenu Only" được tích hợp mặc định dựa trên mảng <code>defaultOpenKeys</code>.</span>
                        </p>
                        
                        <div class="d-flex gap-2 mb-4 p-3 bg-light rounded border border-light align-items-center">
                            <span class="text-muted small fw-bold me-2">Control Switcher:</span>
                            <Button type="'primary'" icon="state.dynamicMode === 'inline' ? 'fa-list' : 'fa-minus'" onClick="() => this.toggleMode()">
                                Mode: <t t-esc="state.dynamicMode.toUpperCase()"/>
                            </Button>
                            <Button type="state.dynamicTheme === 'dark' ? 'primary' : 'default'" 
                                    danger="state.dynamicTheme === 'dark'"
                                    icon="state.dynamicTheme === 'dark' ? 'fa-moon-o' : 'fa-sun-o'" 
                                    onClick="() => this.toggleTheme()">
                                Theme: <t t-esc="state.dynamicTheme.toUpperCase()"/>
                            </Button>
                        </div>

                        <div class="border rounded overflow-hidden" 
                             t-att-class="state.dynamicTheme === 'dark' ? 'bg-dark' : 'bg-white'" 
                             t-att-style="state.dynamicMode === 'inline' ? 'max-width: 300px;' : 'width: 100%; min-height: 250px;'">
                             
                            <Menu items="interactiveData" 
                                  mode="state.dynamicMode" 
                                  theme="state.dynamicTheme"
                                  defaultSelectedKey="'nav1'"
                                  defaultOpenKeys="['nav3']"
                                  onSelect="handleSelect" />
                                  
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">3. Phản hồi Sự kiện (Events)</h2>
                <div class="card border border-light shadow-sm rounded bg-white p-4 text-center">
                    <div class="bg-body border border-dashed rounded p-3 text-primary fw-bold fs-5">
                        <t t-esc="state.lastAction"/>
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">4. Thông số API (Menu &amp; ItemType)</h2>
                <div class="card border border-light shadow-sm rounded bg-white p-0">
                    <div class="table-responsive">
                        <table class="table table-bordered table-sm small mb-0">
                            <thead class="table-light">
                                <tr>
                                    <th class="px-3 py-2">Thuộc tính</th>
                                    <th class="py-2">Phạm vi</th>
                                    <th class="py-2">Định dạng kiểu dữ liệu</th>
                                    <th class="py-2">Mô tả &amp; Ứng dụng</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="px-3 py-2"><code>items</code></td>
                                    <td><strong>Menu</strong></td>
                                    <td><code>ItemType[]</code></td>
                                    <td>Mảng cấu trúc dữ liệu tạo nên menu.</td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2"><code>mode</code></td>
                                    <td><strong>Menu</strong></td>
                                    <td><code>'inline' | 'horizontal'</code></td>
                                    <td>Định hướng menu (Dọc Sidebar hoặc Ngang Top-Nav).</td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2"><code>theme</code></td>
                                    <td><strong>Menu</strong></td>
                                    <td><code>'light' | 'dark'</code></td>
                                    <td>Quy định chủ đề màu sắc.</td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2"><code>type</code></td>
                                    <td><strong>ItemType</strong></td>
                                    <td><code>'group' | 'divider' | undefined</code></td>
                                    <td>Biến thể của Item. Nếu không truyền, mặc định là Menu thông thường.</td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2"><code>children</code></td>
                                    <td><strong>ItemType</strong></td>
                                    <td><code>ItemType[]</code></td>
                                    <td>Mảng Item con. Tự động chuyển Item hiện tại thành <em>SubMenuType</em>.</td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2"><code>onSelect</code></td>
                                    <td><strong>Menu</strong></td>
                                    <td><code>Function(key, item)</code></td>
                                    <td>Callback kích hoạt khi một mục (không bị disabled) được click.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    `;
}