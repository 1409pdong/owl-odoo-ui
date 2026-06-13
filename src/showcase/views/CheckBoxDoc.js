import { Component, xml } from "@odoo/owl";
import { CheckBox } from "../../components/CheckBox/CheckBox.js";

export class CheckBoxDoc extends Component {
    static components = { CheckBox };

    static template = xml`
        <div class="ant-doc-container">
            <h1>CheckBox</h1>
            <p class="lead text-muted">Thành phần lựa chọn cơ bản trong hệ thống.</p>

            <div class="card mb-5 border-0 shadow-sm">
                <div class="card-body p-4">
                    <CheckBox id="'d1'" value="true" label="'Ví dụ CheckBox'"/>
                </div>
                <div class="card-footer bg-white border-top-0 p-3">
                    <pre class="bg-light p-2 rounded"><code>&lt;CheckBox id="d1" value="true" label="Ví dụ CheckBox"/&gt;</code></pre>
                </div>
            </div>

            <h3>API Reference</h3>
            <table class="table table-bordered">
                <thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
                <tbody>
                    <tr><td>id</td><td>String</td><td>ID duy nhất</td></tr>
                    </tbody>
            </table>
        </div>
    `;
}