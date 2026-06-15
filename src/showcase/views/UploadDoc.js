import { Component, xml, useState } from "@odoo/owl";
import { Upload } from "../../components/Upload/Upload.js";

export class UploadDoc extends Component {
    static components = { Upload };

    setup() {
        this.state = useState({
            // Khởi tạo sẵn danh sách đính kèm có sẵn (Mô phỏng Many2many tài liệu)
            existingPictures: [
                { uid: 'o-1', name: 'avatar_user.png', status: 'done', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
                { uid: 'o-2', name: 'product_macbook.jpg', status: 'done', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=150' }
            ]
        });
    }

    static template = xml`
        <div class="o_doc_container py-3">
            <h1 class="fw-bold text-dark mb-2">Upload Component</h1>
            <p class="text-muted mb-4">Quản lý và tải tập tin lên hệ thống. Được module hóa hỗ trợ kéo thả Dropzone và dải lưới đính kèm tài liệu chứng từ ERP.</p>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">1. Nút bấm cơ bản (Click to Upload)</h2>
                <div class="card border border-light shadow-sm rounded bg-white p-4">
                    <p class="text-muted small mb-3">Tải lên file hóa đơn, chứng từ đính kèm dạng danh sách hàng dọc kèm nút Xóa.</p>
                    <div style="max-width: 400px;">
                        <Upload accept="'.pdf,.docx,.xlsx'" multiple="true" buttonText="'Đính kèm chứng từ (.pdf, .docx)'" />
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">2. Vùng kéo thả tập tin (Drag and Drop Zone)</h2>
                <div class="card border border-light shadow-sm rounded bg-white p-4">
                    <p class="text-muted small mb-3">Khu vực Dropzone cỡ lớn giúp kéo thả nhiều tập tin cùng một lúc, tích hợp thanh tiến trình đồng bộ.</p>
                    <Upload type="'drag'" multiple="true" />
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">3. Thẻ hình ảnh (Picture Card Grid)</h2>
                <div class="card border border-light shadow-sm rounded bg-white p-4">
                    <p class="text-muted small mb-3">Thường dùng hiển thị mảng hình ảnh đính kèm của Sản phẩm hoặc Biên lai, Hover hiện icon thùng rác để xóa.</p>
                    <div>
                        <Upload listType="'picture-card'" 
                                fileList="state.existingPictures" 
                                multiple="true"
                                accept="'image/*'"
                                onChange="(newList) => this.state.existingPictures = newList" />
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">4. Khóa tương tác (Disabled State)</h2>
                <div class="card border border-light shadow-sm rounded bg-white p-4">
                    <div class="d-flex flex-column gap-4" style="max-width: 400px;">
                        <Upload disabled="true" buttonText="'Nút bấm bị khóa'" />
                        <Upload type="'drag'" disabled="true" />
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-2">
                <h2 class="h5 text-uppercase fw-bold text-secondary border-bottom pb-2 mb-3">5. API Reference</h2>
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
                                <tr><td class="px-3 py-2"><code>type</code></td><td>Kiểu vùng kích hoạt tải lên</td><td><code>'select' | 'drag'</code></td><td><code>'select'</code></td></tr>
                                <tr><td class="px-3 py-2"><code>listType</code></td><td>Kiểu hiển thị danh sách đính kèm</td><td><code>'text' | 'picture-card'</code></td><td><code>'text'</code></td></tr>
                                <tr><td class="px-3 py-2"><code>multiple</code></td><td>Cho phép chọn nhiều file cùng lúc</td><td><code>Boolean</code></td><td><code>false</code></td></tr>
                                <tr><td class="px-3 py-2"><code>accept</code></td><td>Định dạng file lọc nhận diện hệ thống</td><td><code>String (VD: 'image/*', '.pdf')</code></td><td>-</td></tr>
                                <tr><td class="px-3 py-2"><code>disabled</code></td><td>Khóa trạng thái tải file</td><td><code>Boolean</code></td><td><code>false</code></td></tr>
                                <tr><td class="px-3 py-2"><code>fileList</code></td><td>Mảng dữ liệu tập tin truyền vào quản lý</td><td><code>Array</code></td><td><code>[]</code></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}