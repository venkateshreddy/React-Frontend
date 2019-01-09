import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getApiData, saveApiData } from "../../actions/APIAction";
import ReactDataGrid from 'react-data-grid';
import CustomField from './CustomField';
import EditField from './EditField';
import '../Login/Login.scss';

const { Editors, Formatters } = require('react-data-grid-addons');

const { DropDownEditor } = Editors;
const { DropDownFormatter } = Formatters;

const visibleTypes = [
    { id: 'Yes', value: 'Yes', text: 'Yes', title: 'Yes' },
    { id: 'No', value: 'No', text: 'No', title: 'No' }
  ];
const aggregationTypes = [
    { id: 'none', value: 'none', text: 'None', title: 'None' },
    { id: 'sum', value: 'sum', text: 'Sum', title: 'Sum' },
    { id: 'average', value: 'average', text: 'Average', title: 'Average' }
  ];
class AddApi extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
            open: false,
			apiname: '',
            apiurl: '',
            apidata: undefined, 
            columns: [],
            error: undefined,
            cacheError: undefined,
            cacheDataSuccess: undefined,
            showSpinner: false,
            selectedrow: undefined,
            selectedIndexes: [],
            visibleCount: 0,
            tableColumns: [
                { name: 'Column Name', key: 'name', sortable: true },
                { name: 'Display Name', key: 'aliasName', editable: true, sortable: true },
                { name: 'Column Type', key: 'columnType', sortable: true },
                { 
                    name: 'Visible', 
                    key: 'visible', 
                    editor: <DropDownEditor options={visibleTypes} />, 
                    formatter: <DropDownFormatter options={visibleTypes} />,
                    sortable: true 
                },
                { 
                    name: 'Order', 
                    key: 'order',
                    sortable: true 
                },
                // { name: 'Is Number', key: 'isNumeric', sortable: true },
                // { 
                //     name: 'Aggregation', 
                //     key: 'aggregation', 
                //     editor: <DropDownEditor options={aggregationTypes} />, 
                //     formatter: <DropDownFormatter options={aggregationTypes} />,
                //     sortable: true
                // },
                {
                    name: 'Merged Columns (If any)',
                    key: 'remarks',
                    sortable: true
                }
            ]
		};
        this.rowGetter = this.rowGetter.bind(this);

        this.addCustomColumn = this.addCustomColumn.bind(this);

        this.editColumn = this.editColumn.bind(this);

		this.nameChange = this.nameChange.bind(this);

		this.urlChange = this.urlChange.bind(this);

        this.formSubmit = this.formSubmit.bind(this);
        
        this.saveApiData = this.saveApiData.bind(this);

        this.resetForm = this.resetForm.bind(this);

        this.onCloseModal = this.onCloseModal.bind(this);

        this.onAddingNewField = this.onAddingNewField.bind(this);

        this.onCellSelected = this.onCellSelected.bind(this);

        this.onCellDeSelected = this.onCellDeSelected.bind(this);

        this.deleteColumn = this.deleteColumn.bind(this);

        this.onUpdatingField = this.onUpdatingField.bind(this);
    }
    
    onCloseModal = () => {
        this.setState({ open : false, edit : false });
    };

    componentWillReceiveProps(newProps) {
        this.setState({ cacheError: newProps.cacheDataError });
        this.setState({ cacheDataSuccess: newProps.cacheDataSuccess });
    }

    nameChange(event) {
		this.setState({ apiname: event.target.value });
    }
    
    onAddingNewField(field) {
        const columns = Object.assign([], this.state.columns);
        columns.push(field);
        this.setState({ columns, open: false });
    }

    onUpdatingField(field) {
        const columns = [];
        this.state.columns.map((column) => {
            if (column.name === this.state.selectedrow.name) {
                columns.push(field);
            } else {
                columns.push(column);
            }
        })
        this.setState({ columns, edit: false });
    }

	urlChange(event) {
        this.setState({ apiurl: event.target.value, error: undefined });
    }
    resetForm() {
        this.setState({
            apidata: undefined
        });
    }
	formSubmit(event) {
        event.preventDefault();
		if (this.state.apiurl !== '') {
            this.setState({ showSpinner: true, apidata: '' });
            this.props.dispatch(getApiData(this.state.apiurl))
            .then(() => {
                let columns = [];
                const apiData = [];
                if (this.props.apidata.length > 0) {
                    this.props.apidata.map((data) => {
                        if (data['meta']) {
                            delete data['meta'];
                        }
                        if (data['$loki']) {
                            delete data['$loki'];
                        }
                        apiData.push(data);
                    });
                    const tempColumns = Object.keys(apiData[0]);
                    columns = tempColumns.map((column, index) => {
                        return { name: column, aliasName: column,  columnType: 'Standard', visible: 'Yes', order: (index + 1), aggregation: 'None', isNumeric: 'Yes' };
                    });
                    columns.map((column, index) => {
                        for(let i = 0; i <= apiData.length; i += 1){
                            if (apiData[i] && isNaN(apiData[i][column.name])) {
                                columns[index]['isNumeric'] = 'No';
                                break;  
                            }
                        }
                    });
                }
                this.setState({ showSpinner: false, apidata: apiData, visibleCount: columns.length, columns });  
            })
        } else {
            this.setState({ error: 'Please enter url' });
        }
    }
    saveApiData() {
        event.preventDefault();
        if (this.state.apiname === ''){
            this.setState({ error: 'API Name is required' });
        } else if(!this.state.apidata || this.state.apidata === '') {
            this.setState({ error: 'API data is required' });
        } else if(!this.state.columns || this.state.columns.length === 0) {
            this.setState({ error: 'No columns found' });
        } else {
            this.setState({ showSpinner: true });
            const columns = this.state.columns.sort(function(a,b) {
                return (a.order === b.order) ? 0 : ((a.order > b.order) ? 1 : -1);
            });
            this.props.dispatch(saveApiData(this.state.apiname, this.state.apidata, columns))
            .then(() => {
                alert('Processing Completed');
                this.setState({ showSpinner: false });
            })
        }
        return false;
    }
    IsValidJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    rowGetter(i) {
        return this.state.columns[i];
    }
    handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        const updatedKey = Object.keys(updated)[0];
        const columns = Object.assign([], this.state.columns);
        let visibleCount = this.state.visibleCount;
        let error = '';
        if (updatedKey === 'aggregation') {
            for (let i = fromRow; i <= toRow; i += 1) {
                if (columns[i]['isNumeric'] === 'Yes') {
                    columns[i]['aggregation'] = updated['aggregation'];
                } else {
                    error = 'Only numeric columns can be aggregated';   
                }
            }
        }
        if (updatedKey === 'visible') {
            for (let i = fromRow; i <= toRow; i += 1) {
                columns[i]['visible'] = updated['visible'];
                if (updated['visible'] === 'Yes') {
                    visibleCount += 1;
                    columns[i]['order'] = visibleCount;
                } else {
                    columns[i]['order'] = 'NA';
                    visibleCount -= 1;
                }
            }
        }
        if (updatedKey === 'order') {
            for (let i = fromRow; i <= toRow; i += 1) {
                columns[i]['order'] = updated['order'];
            }
        }
        if (updatedKey === 'aliasName') {
            if (updated['aliasName']) {
                let isRepeated = false;
                for (let i = 0; i < columns.length; i += 1) {
                    if ((i < fromRow || i > toRow) && columns[i]['aliasName'].toLowerCase().trim() === updated['aliasName'].toLowerCase().trim()) {
                        isRepeated = true;
                    }
                }
                if (isRepeated) {
                    error = 'Display name must be unique';
                } else {
                    for (let i = fromRow; i <= toRow; i += 1) {
                        columns[i]['aliasName'] = updated['aliasName'];
                    }   
                }
            } else {
                error = 'Display name can not be empty';
            }
        }
        this.setState({ columns, visibleCount, error });
    };
    handleGridSort = (sortColumn, sortDirection) => {
        const comparer = (a, b) => {
            if (sortDirection === 'ASC') {
            return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
            } else if (sortDirection === 'DESC') {
            return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
            }
        };

        const columns = sortDirection === 'NONE' ? this.state.columns.slice(0) : this.state.columns.sort(comparer);

        this.setState({ columns });
    };
    addCustomColumn() {
        this.setState({ open: true });
    }
    editColumn() {
        this.setState({ edit: true });
    }
    onCellSelected = ({ rowIdx }) => {
        this.setState({ selectedrow: this.state.columns[rowIdx] });
    };

    onCellDeSelected = ({ rowIdx }) => {
        this.setState({ selectedrow: undefined });
    };
    deleteColumn = () => {
        const x = confirm('Are you sure you want to delete column?');
        if (x) {
            this.setState({ columns: this.state.columns.filter((column) => (column.name !== this.state.selectedrow.name)) });
        }
    };
	render() {
        const visibleCountArr = [];
        for (let i = 1; i <= this.state.visibleCount; i += 1) {
            visibleCountArr.push({ id: i, value: i, text: `${i}`, title: `${i}` });
        }
        const isEditable = (row) => {
            if (row.columnType === 'Custom') {
               return false;
            }
            return true;
        };
        const isOrderEditable = (row) => {
            if (row.visible === 'Yes') {
                return true;
            }
            return false;
        }
        const nonEditableColumns = ['name', 'columnType', 'isNumeric', 'remarks'];
        const tableColumns = this.state.tableColumns.map((c) => {
            if (nonEditableColumns.indexOf(c.key) !== -1){
                return { ...c, editable: false };
            } else if (c.key === 'order') {
                let tempC = { ...c, editable: isOrderEditable };
                if (tempC.editable) {
                    tempC.editor = <DropDownEditor options={visibleCountArr} />
                    tempC.formatter = <DropDownFormatter options={visibleCountArr} />
                }
                return tempC;
            } else if (c.key === 'aliasName') {
                return { ...c, editable: true };
            } else{
                return { ...c, editable: isEditable };
            }
        });
		return (
			<form className="form-signin" action="">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-4 col-md-offset-4" style={{marginLeft:'0%', width: '100%'}}>
							<div className="login-block">
                                <div className="logo-block-create text-center">
									<p>Data&nbsp;<span className="t-bold">&nbsp;Create</span></p>
								</div>
								<div className="outer-input-create" style={{padding: '70px 20px 9px 20px'}}>
									<div className="inner-input">
										<form id="login-form">
                                            { this.state.error &&
												<span style={{ color: 'red' }}>{this.state.error}</span>
                                            }
											<div className="floating-label">
												<input autoComplete="off"  type="text" id="apiname" className="floating-input" placeholder=" " value={this.apiname} onChange={this.nameChange}></input>
												<label>API Name</label>
											</div>
											<div className="floating-label">
												<input type="text" id="apiurl" className="floating-input" placeholder=" " value={this.apiurl} onChange={this.urlChange}></input>
												<label>API URL</label>
											</div>
											<div className="text-center" style={{float:'right'}}>
                                                <button className="btn submit-btn" type="reset" onClick={this.resetForm}>Clear</button>
                                                <input type="button" className="btn submit-btn" onClick={this.formSubmit} value="Retrieve" />
                                                {this.state.showSpinner &&
                                                    <i className="fa fa-spinner fa-spin fa-5x" style={{ "fontSize": "20px" }}></i>
                                                }
                                            </div>
										</form>
									</div>
                                    { this.state.apidata && 
                                        <div className="inner-input" style={{marginTop: '5%'}}>
                                            { this.state.cacheError &&
												<span style={{ color: 'red' }}>{this.state.cacheError}</span>
                                            }
                                            { this.state.cacheDataSuccess &&
												<span style={{ color: 'green' }}>{this.state.cacheDataSuccess}</span>
                                            }
                                            { this.state.apidata && 
                                            <div style={{ fontSize: '11px' }}>
                                                <div className='logo-block-create-grid'>
                                                    <i title="Add Custom Column" onClick={this.addCustomColumn} className="fa fa-plus action_icon"></i>
                                                    { this.state.selectedrow && this.state.selectedrow.columnType === 'Custom' &&
                                                        <i title="Edit Column" onClick={this.editColumn} className="fa fa-edit action_icon"></i>
                                                    }
                                                    { this.state.selectedrow && this.state.selectedrow.columnType === 'Custom' &&
                                                        <i title="Delete Column" onClick={this.deleteColumn} className="fa fa-trash action_icon"></i>
                                                    }
                                                </div>
                                                <ReactDataGrid
                                                    enableCellSelect={true}
                                                    onCellSelected={this.onCellSelected}
                                                    onCellDeSelected={this.onCellDeSelected}
                                                    columns={tableColumns}
                                                    rowGetter={this.rowGetter}
                                                    rowsCount={this.state.columns.length}
                                                    rowHeight={35}
                                                    minHeight={300}
                                                    onGridRowsUpdated={this.handleGridRowsUpdated}
                                                    onGridSort={this.handleGridSort}
                                                />
                                            </div> }
                                            <div className="text-center" style={{float:'right'}}>
                                                <input type="button" className="btn submit-btn" onClick={this.saveApiData} value="Save" />
                                            </div>
                                            <CustomField saveField={this.onAddingNewField} onCloseModal={this.onCloseModal} open={this.state.open} columns={this.state.columns} />
                                                { this.state.selectedrow && this.state.selectedrow.columnType === 'Custom' && <EditField editRow={this.state.selectedrow} updateField={this.onUpdatingField} onCloseModal={this.onCloseModal} open={this.state.edit} columns={this.state.columns} /> }
                                        </div>
                                    }
                                    { !this.state.apidata && 
                                        <div className="inner-input" style={{marginTop: '5%'}}>
                                            <span>Columns will be listed here</span>
                                        </div>
                                    }
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		);
	}
}

const mapStateToProps = (state) => {
	return {
        apidata: state.api.data,
        apierror: state.api.error,
        cacheDataError: state.api.cacheDataError,
        cacheDataSuccess: state.api.cacheDataSuccess
	};
};

export default withRouter(connect(mapStateToProps)(AddApi));
