import { Component, xml, useState } from "@odoo/owl";
import { ColorDoc } from "./views/ColorDoc.js";
import { TypographyDoc } from "./views/TypographyDoc.js";
import { SpacingDoc } from "./views/SpacingDoc.js";
import { CheckBoxDoc } from "./views/CheckBoxDoc.js";

export class Showcase extends Component {
    // Đăng ký toàn bộ danh sách sub-pages vào OWL
    static components = { ColorDoc, TypographyDoc, SpacingDoc, CheckBoxDoc };

    setup() {
        // Mặc định ban đầu khi mở web lên sẽ ở trang Color
        this.state = useState({ activePage: 'token-color' });
    }

    setPage(pageName) {
        this.state.activePage = pageName;
    }

    static template = xml`
        <div class="d-flex" style="min-height: 100vh;">
            <div class="bg-white border-end p-3" style="width: 260px;">
                <h5 class="fw-bold text-primary mb-4">ERP Design System</h5>
                
                <div class="text-muted text-uppercase small fw-bold mb-2">Design Tokens</div>
                <ul class="nav flex-column mb-4 ps-1">
                    <li class="nav-item mb-1">
                        <a class="nav-link cursor-pointer rounded py-2 small" 
                           t-att-class="state.activePage === 'token-color' ? 'active bg-light text-primary fw-bold' : 'text-dark'" 
                           t-on-click="() => this.setPage('token-color')">
                            Color Scales
                        </a>
                    </li>
                    <li class="nav-item mb-1">
                        <a class="nav-link cursor-pointer rounded py-2 small" 
                           t-att-class="state.activePage === 'token-typography' ? 'active bg-light text-primary fw-bold' : 'text-dark'" 
                           t-on-click="() => this.setPage('token-typography')">
                            Typography
                        </a>
                    </li>
                    <li class="nav-item mb-1">
                        <a class="nav-link cursor-pointer rounded py-2 small" 
                           t-att-class="state.activePage === 'token-spacing' ? 'active bg-light text-primary fw-bold' : 'text-dark'" 
                           t-on-click="() => this.setPage('token-spacing')">
                            Spacing Scale
                        </a>
                    </li>
                </ul>

                <div class="text-muted text-uppercase small fw-bold mb-2">Atoms Components</div>
                <ul class="nav flex-column mb-4 ps-1">
                    <li class="nav-item mb-1">
                        <a class="nav-link cursor-pointer rounded py-2 small" 
                           t-att-class="state.activePage === 'atom-checkbox' ? 'active bg-light text-primary fw-bold' : 'text-dark'" 
                           t-on-click="() => this.setPage('atom-checkbox')">
                            CheckBox
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-muted py-2 small" href="#">🔲 Button (Sắp ra mắt)</a>
                    </li>
                </ul>
            </div>

            <div class="flex-grow-1 bg-body p-5 overflow-auto" style="height: 100vh;">
                <div style="max-width: 960px; margin: 0 auto;">
                    
                    <t t-if="state.activePage === 'token-color'">
                        <ColorDoc />
                    </t>
                    
                    <t t-if="state.activePage === 'token-typography'">
                        <TypographyDoc />
                    </t>
                    
                    <t t-if="state.activePage === 'token-spacing'">
                        <SpacingDoc />
                    </t>
                    
                    <t t-if="state.activePage === 'atom-checkbox'">
                        <CheckBoxDoc />
                    </t>

                </div>
            </div>
        </div>
    `;
}