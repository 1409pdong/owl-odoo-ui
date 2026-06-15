import { Component, xml, useState } from "@odoo/owl";
import { ColorDoc } from "./views/ColorDoc.js";
import { TypographyDoc } from "./views/TypographyDoc.js";
import { SpacingDoc } from "./views/SpacingDoc.js";
import { ButtonDoc } from "./views/ButtonDoc.js";
import { FloatButtonDoc } from "./views/FloatButtonDoc.js";
import { AnchorDoc } from "./views/AnchorDoc.js";
import { BreadcrumbDoc } from "./views/BreadcrumbDoc.js";
import { DropdownDoc } from "./views/DropdownDoc.js";
import { MenuDoc } from "./views/MenuDoc.js";
import { StepsDoc } from "./views/StepsDoc.js";
import { TabsDoc } from "./views/TabsDoc.js";
import { CheckboxDoc } from "./views/CheckboxDoc.js";
import { DatePickerDoc } from "./views/DatePickerDoc.js";
import { FormDoc } from "./views/FormDoc.js";
import { InputDoc } from "./views/InputDoc.js";
import { RadioDoc } from "./views/RadioDoc.js";
import { SelectDoc } from "./views/SelectDoc.js";
import { TreeSelectDoc } from "./views/TreeSelectDoc.js";
import {TableDoc} from "./views/TableDoc.js";
import { CollapseDoc } from "./views/CollapseDoc.js";
import { UploadDoc } from "./views/UploadDoc.js";

export class Showcase extends Component {
    // Đăng ký toàn bộ danh sách sub-pages vào OWL
    static components = { ColorDoc, TypographyDoc, SpacingDoc, ButtonDoc, FloatButtonDoc, AnchorDoc, BreadcrumbDoc, DropdownDoc, MenuDoc, StepsDoc, TabsDoc, CheckboxDoc, DatePickerDoc, FormDoc, InputDoc, RadioDoc, SelectDoc, TreeSelectDoc, TableDoc, CollapseDoc, UploadDoc };

    setup() {
        // Mặc định ban đầu khi mở web lên sẽ ở trang Color
        this.state = useState({ activePage: 'token-color' });
    }

    setPage(pageName) {
        this.state.activePage = pageName;
    }

    static template = xml`
        <div class="d-flex" style="min-height: 100vh;">
            <!-- Sidebar -->
            <div class="bg-white border-end p-3" style="width: 260px;">

                <!-- Logo -->
                <h5 class="fw-bold text-primary mb-4">ERP Design System</h5>
                
                <!-- Navigation -->
                <div class="text-muted text-uppercase small fw-bold mb-2">Design Tokens</div>
                <ul class="nav flex-column mb-4 ps-1">

                    <!--Color scales-->
                    <li class="nav-item mb-1">
                        <a class="nav-link cursor-pointer rounded py-2 small" 
                           t-att-class="state.activePage === 'token-color' ? 'active bg-light text-primary fw-bold' : 'text-dark'" 
                           t-on-click="() => this.setPage('token-color')">
                            Color Scales
                        </a>
                    </li>

                    <!--Typography-->
                    <li class="nav-item mb-1">
                        <a class="nav-link cursor-pointer rounded py-2 small" 
                           t-att-class="state.activePage === 'token-typography' ? 'active bg-light text-primary fw-bold' : 'text-dark'" 
                           t-on-click="() => this.setPage('token-typography')">
                            Typography
                        </a>
                    </li>

                    <!--Spacing-->
                    <li class="nav-item mb-1">
                        <a class="nav-link cursor-pointer rounded py-2 small" 
                           t-att-class="state.activePage === 'token-spacing' ? 'active bg-light text-primary fw-bold' : 'text-dark'" 
                           t-on-click="() => this.setPage('token-spacing')">
                            Spacing Scale
                        </a>
                    </li>
                </ul>

                <!-- Component List -->
                <div class="text-muted text-uppercase small fw-bold mb-2">Atoms Components</div>
                <ul class="nav flex-column mb-4 ps-1">

                    <!--Button-->
                    <li class="nav-item mb-1">
                        <a class="nav-link cursor-pointer rounded py-2 small" 
                           t-att-class="state.activePage === 'atom-button' ? 'active bg-light text-primary fw-bold' : 'text-dark'" 
                           t-on-click="() => this.setPage('atom-button')">
                            Button
                        </a>
                    </li>

                    <!--FloatButton-->
                    <li class="nav-item mb-1">
                        <a class="nav-link cursor-pointer rounded py-2 small" 
                           t-att-class="state.activePage === 'atom-float-button' ? 'active bg-light text-primary fw-bold' : 'text-dark'" 
                           t-on-click="() => this.setPage('atom-float-button')">
                            FloatButton
                        </a>
                    </li>

                    <!--Anchor-->
                    <li class="nav-item mb-1">
                        <a class="nav-link cursor-pointer rounded py-2 small" 
                           t-att-class="state.activePage === 'atom-anchor' ? 'active bg-light text-primary fw-bold' : 'text-dark'" 
                           t-on-click="() => this.setPage('atom-anchor')">
                            Anchor
                        </a>
                    </li>

                    <!--Breadcrumb-->
                    <li class="nav-item mb-1">
                        <a class="nav-link cursor-pointer rounded py-2 small" 
                           t-att-class="state.activePage === 'atom-breadcrumb' ? 'active bg-light text-primary fw-bold' : 'text-dark'" 
                           t-on-click="() => this.setPage('atom-breadcrumb')">
                            Breadcrumb
                        </a>
                    </li>

                    <!--Dropdown-->
                    <li class="nav-item mb-1">
                        <a class="nav-link cursor-pointer rounded py-2 small" 
                           t-att-class="state.activePage === 'atom-dropdown' ? 'active bg-light text-primary fw-bold' : 'text-dark'" 
                           t-on-click="() => this.setPage('atom-dropdown')">
                            Dropdown
                        </a>
                    </li>

                    <!--Menu-->
                    <li class="nav-item mb-1">
                        <a class="nav-link cursor-pointer rounded py-2 small" 
                           t-att-class="state.activePage === 'atom-menu' ? 'active bg-light text-primary fw-bold' : 'text-dark'" 
                           t-on-click="() => this.setPage('atom-menu')">
                            Menu
                        </a>
                    </li>

                    <!--Steps-->
                    <li class="nav-item mb-1">
                        <a class="nav-link cursor-pointer rounded py-2 small" 
                           t-att-class="state.activePage === 'atom-steps' ? 'active bg-light text-primary fw-bold' : 'text-dark'" 
                           t-on-click="() => this.setPage('atom-steps')">
                            Steps
                        </a>
                    </li>

                    <!--Tabs-->
                    <li class="nav-item mb-1">
                        <a class="nav-link cursor-pointer rounded py-2 small" 
                           t-att-class="state.activePage === 'atom-tabs' ? 'active bg-light text-primary fw-bold' : 'text-dark'" 
                           t-on-click="() => this.setPage('atom-tabs')">
                            Tabs
                        </a>
                    </li>

                    <!--Checkbox-->
                    <li class="nav-item mb-1">
                        <a class="nav-link cursor-pointer rounded py-2 small" 
                           t-att-class="state.activePage === 'atom-checkbox' ? 'active bg-light text-primary fw-bold' : 'text-dark'" 
                           t-on-click="() => this.setPage('atom-checkbox')">
                            Checkbox
                        </a>
                    </li>

                    <!--DatePicker-->
                    <li class="nav-item mb-1">
                        <a class="nav-link cursor-pointer rounded py-2 small" 
                           t-att-class="state.activePage === 'atom-date-picker' ? 'active bg-light text-primary fw-bold' : 'text-dark'" 
                           t-on-click="() => this.setPage('atom-date-picker')">
                            Date Picker
                        </a>
                    </li>

                    <!--Form-->
                    <li class="nav-item mb-1">
                        <a class="nav-link cursor-pointer rounded py-2 small" 
                           t-att-class="state.activePage === 'atom-form' ? 'active bg-light text-primary fw-bold' : 'text-dark'" 
                           t-on-click="() => this.setPage('atom-form')">
                            Form
                        </a>
                    </li>

                    <!--Input-->
                    <li class="nav-item mb-1">
                        <a class="nav-link cursor-pointer rounded py-2 small" 
                        t-att-class="state.activePage === 'atom-input' ? 'active bg-light text-primary fw-bold' : 'text-dark'" 
                        t-on-click="() => this.setPage('atom-input')">
                            Input
                        </a>
                    </li>

                    <!--Radio-->
                    <li class="nav-item mb-1">
                        <a class="nav-link cursor-pointer rounded py-2 small" 
                        t-att-class="state.activePage === 'atom-radio' ? 'active bg-light text-primary fw-bold' : 'text-dark'" 
                        t-on-click="() => this.setPage('atom-radio')">
                            Radio
                        </a>
                    </li>

                    <!--Select-->
                    <li class="nav-item mb-1">
                        <a class="nav-link cursor-pointer rounded py-2 small" 
                        t-att-class="state.activePage === 'atom-select' ? 'active bg-light text-primary fw-bold' : 'text-dark'" 
                        t-on-click="() => this.setPage('atom-select')">
                            Select
                        </a>
                    </li>

                    <!--TreeSelect-->
                    <li class="nav-item mb-1">
                        <a class="nav-link cursor-pointer rounded py-2 small" 
                        t-att-class="state.activePage === 'atom-tree-select' ? 'active bg-light text-primary fw-bold' : 'text-dark'"
                        t-on-click="() => this.setPage('atom-tree-select')">
                            TreeSelect
                        </a>
                    </li>

                    <!--Table-->
                    <li class="nav-item mb-1">
                        <a class="nav-link cursor-pointer rounded py-2 small" 
                        t-att-class="state.activePage === 'atom-table' ? 'active bg-light text-primary fw-bold' : 'text-dark'"
                        t-on-click="() => this.setPage('atom-table')">
                            Table
                        </a>
                    </li>

                    <!--Collapse-->
                    <li class="nav-item mb-1">
                        <a class="nav-link cursor-pointer rounded py-2 small" 
                        t-att-class="state.activePage === 'atom-collapse' ? 'active bg-light text-primary fw-bold' : 'text-dark'"
                        t-on-click="() => this.setPage('atom-collapse')">
                            Collapse
                        </a>
                    </li>

                    <!--Upload-->
                    <li class="nav-item mb-1">
                        <a class="nav-link cursor-pointer rounded py-2 small"
                        t-att-class="state.activePage === 'atom-upload' ? 'active bg-light text-primary fw-bold' : 'text-dark'"
                        t-on-click="() => this.setPage('atom-upload')">
                            Upload
                        </a>
                    </li>

                    <!--Other Components-->
                    <li class="nav-item">
                        <a class="nav-link text-muted py-2 small" href="#">Khác (Sắp ra mắt)</a>
                    </li>
                </ul>
            </div>

            <!-- Main content area -->
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
                    
                    <t t-if="state.activePage === 'atom-button'">
                        <ButtonDoc />
                    </t>

                    <t t-if="state.activePage === 'atom-float-button'">
                        <FloatButtonDoc />
                    </t>

                    <t t-if="state.activePage === 'atom-anchor'">
                        <AnchorDoc />
                    </t>

                    <t t-if="state.activePage === 'atom-breadcrumb'">
                        <BreadcrumbDoc />
                    </t>

                    <t t-if="state.activePage === 'atom-dropdown'">
                        <DropdownDoc />
                    </t>

                    <t t-if="state.activePage === 'atom-menu'">
                        <MenuDoc />
                    </t>

                    <t t-if="state.activePage === 'atom-steps'">
                        <StepsDoc />
                    </t>

                    <t t-if="state.activePage === 'atom-tabs'">
                        <TabsDoc />
                    </t>

                    <t t-if="state.activePage === 'atom-checkbox'">
                        <CheckboxDoc />
                    </t>

                    <t t-if="state.activePage === 'atom-date-picker'">
                        <DatePickerDoc />
                    </t>

                    <t t-if="state.activePage === 'atom-form'">
                        <FormDoc />
                    </t>

                    <t t-if="state.activePage === 'atom-input'">
                        <InputDoc />
                    </t>

                    <t t-if="state.activePage === 'atom-radio'">
                        <RadioDoc />
                    </t>

                    <t t-if="state.activePage === 'atom-select'">
                        <SelectDoc />
                    </t>

                    <t t-if="state.activePage === 'atom-tree-select'">
                        <TreeSelectDoc />
                    </t>

                    <t t-if="state.activePage === 'atom-table'">
                        <TableDoc />
                    </t>

                    <t t-if="state.activePage === 'atom-collapse'">
                        <CollapseDoc />
                    </t>

                    <t t-if="state.activePage === 'atom-upload'">
                        <UploadDoc />
                    </t>

                </div>
            </div>
        </div>
    `;
}