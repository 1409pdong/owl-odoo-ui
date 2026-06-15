import { Component, xml, useState } from "@odoo/owl";

export class Table extends Component {
    static template = xml`
        <div class="o-table-wrapper" t-att-class="{'o-table-bordered': props.bordered}">
            
            <div t-if="props.loading" class="o-table-loading-overlay">
                <i class="fa fa-circle-o-notch fa-spin fa-2x text-primary"></i>
            </div>

            <div class="table-responsive">
                <table class="o-table" t-att-class="{'o-table-striped': props.striped, 'o-table-hover': props.hover}">
                    <thead class="o-table-thead">
                        <tr>
                            <th t-if="props.rowSelection" class="o-table-cell-selection">
                                <div class="form-check d-flex justify-content-center m-0">
                                    <input class="form-check-input o-checkbox" type="checkbox" 
                                           t-att-checked="isAllSelected"
                                           t-att-indeterminate="isIndeterminate"
                                           t-on-change="toggleSelectAll"/>
                                </div>
                            </th>

                            <t t-foreach="props.columns" t-as="col" t-key="col.key || col.dataIndex">
                                <th class="o-table-cell" 
                                    t-att-class="{
                                        'text-center': col.align === 'center',
                                        'text-end': col.align === 'right',
                                        'o-table-cell-sortable': col.sortable
                                    }"
                                    t-att-style="col.width ? ('width: ' + col.width + ';') : ''"
                                    t-on-click="() => this.handleSort(col)">
                                    
                                    <div class="d-inline-flex align-items-center gap-2">
                                        <t t-esc="col.title"/>
                                        <t t-if="col.sortable">
                                            <span class="o-table-sort-icon">
                                                <i class="fa fa-sort" t-if="state.sortColumn !== col.dataIndex"/>
                                                <i class="fa fa-sort-asc text-primary" t-if="state.sortColumn === col.dataIndex and state.sortDirection === 'asc'"/>
                                                <i class="fa fa-sort-desc text-primary" t-if="state.sortColumn === col.dataIndex and state.sortDirection === 'desc'"/>
                                            </span>
                                        </t>
                                    </div>
                                </th>
                            </t>
                        </tr>
                    </thead>

                    <tbody class="o-table-tbody">
                        <tr t-if="!props.dataSource or props.dataSource.length === 0">
                            <td t-att-colspan="props.rowSelection ? props.columns.length + 1 : props.columns.length" class="text-center py-5 text-muted">
                                <i class="fa fa-inbox fa-3x mb-3 text-neutral-300 d-block"></i>
                                Không có dữ liệu
                            </td>
                        </tr>

                        <t t-foreach="sortedData" t-as="row" t-key="row[props.rowKey]">
                            <tr class="o-table-row" t-att-class="{'o-table-row-selected': isSelected(row[props.rowKey])}">
                                
                                <td t-if="props.rowSelection" class="o-table-cell-selection">
                                    <div class="form-check d-flex justify-content-center m-0">
                                        <input class="form-check-input o-checkbox" type="checkbox" 
                                               t-att-checked="isSelected(row[props.rowKey])"
                                               t-on-change="(ev) => this.toggleRow(ev, row[props.rowKey], row)"/>
                                    </div>
                                </td>

                                <t t-foreach="props.columns" t-as="col" t-key="col.key || col.dataIndex">
                                    <td class="o-table-cell" 
                                        t-att-class="{
                                            'text-center': col.align === 'center',
                                            'text-end': col.align === 'right',
                                            'fw-bold text-dark': col.isIdentifier
                                        }">
                                        
                                        <t t-if="col.type === 'badge'">
                                            <span t-attf-class="badge bg-{{row[col.dataIndex + '_color'] || 'info'}}">
                                                <t t-esc="row[col.dataIndex]"/>
                                            </span>
                                        </t>
                                        <t t-elif="col.type === 'monetary'">
                                            <span class="text-nowrap text-dark fw-medium">
                                                $ <t t-esc="row[col.dataIndex]"/>
                                            </span>
                                        </t>
                                        <t t-else="">
                                            <t t-esc="row[col.dataIndex]"/>
                                        </t>
                                    </td>
                                </t>
                            </tr>
                        </t>
                    </tbody>
                </table>
            </div>
        </div>
    `;

    static props = {
        columns: { type: Array },
        dataSource: { type: Array },
        rowKey: { type: String }, // Khóa chính (ví dụ 'id')
        rowSelection: { type: Boolean, optional: true },
        bordered: { type: Boolean, optional: true },
        striped: { type: Boolean, optional: true },
        hover: { type: Boolean, optional: true },
        loading: { type: Boolean, optional: true },
        onSelectionChange: { type: Function, optional: true }
    };

    static defaultProps = {
        rowSelection: false,
        bordered: false,
        striped: false,
        hover: true,
        loading: false,
    };

    setup() {
        this.state = useState({
            selectedKeys: [],
            sortColumn: null,
            sortDirection: null, // 'asc' | 'desc' | null
        });
    }

    // Computed properties for Selection
    get isAllSelected() {
        if (!this.props.dataSource || this.props.dataSource.length === 0) return false;
        return this.state.selectedKeys.length === this.props.dataSource.length;
    }

    get isIndeterminate() {
        const count = this.state.selectedKeys.length;
        return count > 0 && count < this.props.dataSource.length;
    }

    isSelected(key) {
        return this.state.selectedKeys.includes(key);
    }

    // Selection Logic
    toggleSelectAll(ev) {
        if (ev.target.checked) {
            this.state.selectedKeys = this.props.dataSource.map(row => row[this.props.rowKey]);
        } else {
            this.state.selectedKeys = [];
        }
        this._emitSelection();
    }

    toggleRow(ev, key, row) {
        if (ev.target.checked) {
            this.state.selectedKeys.push(key);
        } else {
            this.state.selectedKeys = this.state.selectedKeys.filter(k => k !== key);
        }
        this._emitSelection();
    }

    _emitSelection() {
        if (this.props.onSelectionChange) {
            const selectedRows = this.props.dataSource.filter(row => this.state.selectedKeys.includes(row[this.props.rowKey]));
            this.props.onSelectionChange(this.state.selectedKeys, selectedRows);
        }
    }

    // Sorting Logic
    handleSort(col) {
        if (!col.sortable) return;

        if (this.state.sortColumn === col.dataIndex) {
            if (this.state.sortDirection === 'asc') this.state.sortDirection = 'desc';
            else if (this.state.sortDirection === 'desc') {
                this.state.sortColumn = null;
                this.state.sortDirection = null;
            }
        } else {
            this.state.sortColumn = col.dataIndex;
            this.state.sortDirection = 'asc';
        }
    }

    get sortedData() {
        let data = [...(this.props.dataSource || [])];
        const { sortColumn, sortDirection } = this.state;
        
        if (sortColumn && sortDirection) {
            data.sort((a, b) => {
                let valA = a[sortColumn];
                let valB = b[sortColumn];
                
                if (typeof valA === 'string') valA = valA.toLowerCase();
                if (typeof valB === 'string') valB = valB.toLowerCase();

                if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
                if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return data;
    }
}