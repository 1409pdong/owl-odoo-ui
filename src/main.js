import "./scss/design-system.scss";
import { mount } from "@odoo/owl";
import { Showcase } from "./showcase/Showcase.js";

// Khởi chạy hệ thống Design System
mount(Showcase, document.getElementById("app"));