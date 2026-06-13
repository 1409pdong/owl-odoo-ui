import "./scss/design-system.scss";
import { mount, Component, xml, useState } from "@odoo/owl";
import { Showcase } from "./showcase/Showcase.js";
import { PaymentDoc } from "./wireframes/PaymentDoc.js";

class App extends Component {
    static components = { Showcase, PaymentDoc };
    
    setup() {
        // Mặc định là 'guideline', nếu url là /wireframes thì tự chuyển sang 'wireframe'
        this.state = useState({
            mode: window.location.pathname.includes('/wireframes') ? 'wireframe' : 'guideline'
        });
    }

    setMode(newMode) {
        this.state.mode = newMode;
        // Cập nhật URL trình duyệt mà không load lại trang
        window.history.pushState({}, '', newMode === 'wireframe' ? '/wireframes' : '/');
    }

    static template = xml`
        <div class="app">
            <div class="bg-dark text-white p-2 d-flex gap-3">
                <button class="btn btn-sm" 
                        t-att-class="state.mode === 'guideline' ? 'btn-primary' : 'btn-outline-light'" 
                        t-on-click="() => this.setMode('guideline')">
                    📚 Documentation (Guideline)
                </button>
                <button class="btn btn-sm" 
                        t-att-class="state.mode === 'wireframe' ? 'btn-primary' : 'btn-outline-light'" 
                        t-on-click="() => this.setMode('wireframe')">
                    🎨 Wireframes
                </button>
            </div>

            <t t-if="state.mode === 'wireframe'">
                <PaymentDoc />
            </t>
            <t t-else="">
                <Showcase />
            </t>
        </div>
    `;
}
mount(App, document.body);