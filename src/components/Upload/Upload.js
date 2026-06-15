import { Component, xml, useState, useRef, onWillUpdateProps } from "@odoo/owl";

export class Upload extends Component {
    static template = xml`
        <div class="o-upload-container" t-att-class="{'o-upload-disabled': props.disabled}">
            <input type="file" 
                   class="d-none" 
                   t-ref="fileInput"
                   t-att-multiple="props.multiple"
                   t-att-accept="props.accept"
                   t-att-disabled="props.disabled"
                   t-on-change="onFileChange" />

            <t t-if="props.type === 'drag'">
                <div class="o-upload o-upload-drag" 
                     t-att-class="{'o-upload-drag-hover': state.isDragging}"
                     t-on-click="triggerSelect"
                     t-on-dragover.prevent="onDragOver"
                     t-on-dragleave.prevent="onDragLeave"
                     t-on-drop.prevent="onDrop">
                    <p class="o-upload-drag-icon"><i class="fa fa-cloud-upload fa-2x text-muted"/></p>
                    <p class="o-upload-text fw-semibold small text-dark mb-1">Kéo thả tập tin vào đây hoặc nhấp để tải lên</p>
                    <p class="o-upload-hint text-muted text-caption-size">Hỗ trợ tải lên tập tin đơn lẻ hoặc hàng loạt</p>
                </div>
            </t>
            
            <t t-elif="props.type === 'select' and props.listType === 'picture-card'">
                <div class="o-upload o-upload-picture-card" t-on-click="triggerSelect">
                    <div class="text-center">
                        <i class="fa fa-plus text-muted mb-1 d-block"/>
                        <span class="small text-muted">Tải ảnh lên</span>
                    </div>
                </div>
            </t>
            
            <t t-else="">
                <button type="button" class="btn btn-secondary py-1 px-3 d-inline-flex align-items-center gap-2" t-on-click="triggerSelect" t-att-disabled="props.disabled">
                    <i class="fa fa-upload"/> <t t-esc="props.buttonText || 'Tải tập tin lên'"/>
                </button>
            </t>

            <div t-if="currentFileList.length > 0" class="o-upload-list" t-att-class="'o-upload-list-' + props.listType">
                <t t-foreach="currentFileList" t-as="file" t-key="file.uid">
                    
                    <t t-if="props.listType === 'picture-card'">
                        <div class="o-upload-list-item o-upload-list-item-card" t-att-class="'o-upload-item-status-' + file.status">
                            <div class="o-upload-thumb">
                                <t t-if="file.url">
                                    <img t-att-src="file.url" alt="thumbnail"/>
                                </t>
                                <t t-else="">
                                    <i class="fa fa-file-image-o fa-2x text-muted"/>
                                </t>
                            </div>
                            <div class="o-upload-actions-overlay">
                                <span class="o-upload-action-icon" t-on-click.stop="() => this.removeFile(file.uid)">
                                    <i class="fa fa-trash-o"/>
                                </span>
                            </div>
                            <div t-if="file.status === 'uploading'" class="o-upload-progress-mini">
                                <div class="o-upload-progress-bar" t-att-style="'width: ' + file.percent + '%'"/>
                            </div>
                        </div>
                    </t>

                    <t t-else="">
                        <div class="o-upload-list-item" t-att-class="'o-upload-item-status-' + file.status">
                            <div class="o-upload-item-info">
                                <i t-attf-class="fa {{ getFileIcon(file.name) }} o-upload-item-icon"/>
                                <span class="o-upload-item-name" t-att-title="file.name" t-esc="file.name"/>
                            </div>
                            
                            <span class="o-upload-item-card-actions" t-on-click.stop="() => this.removeFile(file.uid)">
                                <i class="fa fa-trash-o text-muted o-upload-remove-btn"/>
                            </span>

                            <div t-if="file.status === 'uploading'" class="o-upload-progress-line">
                                <div class="o-upload-progress-bar" t-att-style="'width: ' + file.percent + '%'"/>
                            </div>
                        </div>
                    </t>

                </t>
            </div>
        </div>
    `;

    static props = {
        type: { type: String, optional: true },       // 'select' | 'drag'
        listType: { type: String, optional: true },   // 'text' | 'picture-card'
        multiple: { type: Boolean, optional: true },
        accept: { type: String, optional: true },
        disabled: { type: Boolean, optional: true },
        buttonText: { type: String, optional: true },
        fileList: { type: Array, optional: true },    // Controlled FileList
        onChange: { type: Function, optional: true },
        onRemove: { type: Function, optional: true }
    };

    static defaultProps = { type: 'select', listType: 'text', multiple: false, disabled: false };

    setup() {
        this.fileInputRef = useRef("fileInput");
        this.state = useState({
            localFileList: [],
            isDragging: false
        });

        onWillUpdateProps((nextProps) => {
            if ('fileList' in nextProps && nextProps.fileList !== undefined) {
                this.state.localFileList = nextProps.fileList;
            }
        });
    }

    get currentFileList() {
        return this.props.fileList !== undefined ? this.props.fileList : this.state.localFileList;
    }

    triggerSelect() {
        if (this.props.disabled) return;
        this.fileInputRef.el.click();
    }

    onFileChange(ev) {
        const files = Array.from(ev.target.files);
        if (files.length === 0) return;
        this.processFiles(files);
        ev.target.value = ''; // Reset input để có thể chọn lại cùng 1 file
    }

    onDragOver() { if (!this.props.disabled) this.state.isDragging = true; }
    onDragLeave() { this.state.isDragging = false; }
    
    onDrop(ev) {
        this.state.isDragging = false;
        if (this.props.disabled) return;
        const files = Array.from(ev.dataTransfer.files);
        if (files.length > 0) this.processFiles(files);
    }

    processFiles(files) {
        // Mocking quá trình tải lên tạo Progress bar tăng dần
        const newUploadedFiles = files.map(file => {
            const uid = 'o-file-' + Math.random().toString(36).substr(2, 9);
            const isImage = file.type.startsWith('image/');
            return {
                uid: uid,
                name: file.name,
                status: 'uploading',
                percent: 10,
                url: isImage ? URL.createObjectURL(file) : null
            };
        });

        let updatedList = this.props.multiple ? [...this.currentFileList, ...newUploadedFiles] : [newUploadedFiles[0]];
        this.emitUpdate(updatedList);

        // Giả lập hiệu ứng tăng phần trăm tải lên (Progress Line Animation)
        newUploadedFiles.forEach(file => {
            let progress = 10;
            const interval = setInterval(() => {
                progress += 30;
                let currentFiles = this.currentFileList.map(f => {
                    if (f.uid === file.uid) {
                        if (progress >= 100) {
                            clearInterval(interval);
                            return { ...f, status: 'done', percent: 100 };
                        }
                        return { ...f, percent: progress };
                    }
                    return f;
                });
                this.emitUpdate(currentFiles);
            }, 300);
        });
    }

    removeFile(uid) {
        if (this.props.disabled) return;
        const updatedList = this.currentFileList.filter(f => f.uid !== uid);
        
        if (this.props.onRemove) this.props.onRemove(uid);
        this.emitUpdate(updatedList);
    }

    emitUpdate(newList) {
        if (this.props.fileList === undefined) {
            this.state.localFileList = newList;
        }
        if (this.props.onChange) {
            this.props.onChange(newList);
        }
    }

    getFileIcon(filename) {
        const ext = filename.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'fa-file-image-o text-info';
        if (['pdf'].includes(ext)) return 'fa-file-pdf-o text-danger';
        if (['doc', 'docx'].includes(ext)) return 'fa-file-word-o text-primary';
        if (['xls', 'xlsx'].includes(ext)) return 'fa-file-excel-o text-success';
        if (['zip', 'rar'].includes(ext)) return 'fa-file-archive-o text-warning';
        return 'fa-file-text-o text-secondary';
    }
}