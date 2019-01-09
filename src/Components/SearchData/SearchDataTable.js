import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Grid, Row, Col, FormGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import ReactTable from 'react-table';
import './SearchData.scss';
import {loadApis, getSearchData, deleteAPI} from '../../actions/APIAction';
import 'react-table/react-table.css'

class SearchDataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            rows: [],
            apis: props.apis,
            selectedAPI: '',
            selectedColumn: '',
            searchVal: '',
            showSpinner: false,
            filters: {},
            count: 0,
            totalCount: 0,
            page: 0,
            pageSize: 10,
            searchObj: undefined,
            sorted: undefined,
            apiColumns: undefined,
            secondaryColumns: []
        }
        this.changeAPI = this.changeAPI.bind(this);
        this.rowGetter = this.rowGetter.bind(this);
        this.changeSearchVal = this.changeSearchVal.bind(this);
        this.getRows = this.getRows.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.searchWithLocalFilters = this.searchWithLocalFilters.bind(this);
        this.deleteAPI = this.deleteAPI.bind(this);
    }
    getRows = () => {
        return Selectors.getRows(this.state);
    };
    handleFilterChange = (filter) => {
        let newFilters = Object.assign({}, this.state.filters);
        if (filter.filterTerm) {
            newFilters[filter.column.key] = filter;
        } else {
            delete newFilters[filter.column.key];
        }
        this.setState({ filters: newFilters }, () => {
            if (this.state.searchVal === '') {
                this.searchWithLocalFilters(newFilters);
            }
        });
    };
    searchWithLocalFilters = (newFilters) => {
        let searchObj = {};
        let isEmpty = true;
        newFilters.map((filter) => {
            isEmpty = false;
            searchObj[filter.id] = filter.value;
        });
        if (isEmpty) {
            searchObj = undefined; 
        }
        this.setState({ showSpinner: true, searchObj });
        if (this.state.selectedAPI !== '') {
            this.props.dispatch(getSearchData(this.state.selectedAPI, searchObj, undefined, this.state.page, this.state.pageSize, this.state.sorted)).then(() => {
                this.setState({ 
                    showSpinner: false, 
                    totalCount: this.props.count, 
                    count: this.props.apiData.length, 
                    rows: (this.state.secondaryColumns.length > 0) ? this.getFormattedData(this.props.apiData, this.state.secondaryColumns) : this.props.apiData 
                });
            });
        }
    }
    onClearFilters = () => {
        this.setState({filters: {} });
    };
    componentDidMount() {
        this.setState({ showSpinner: true });
        this.props.dispatch(loadApis()).then(() => {
            const apis = [];
            const apiColumns = {};
            if (this.props.apis.error) {
                alert(this.props.apis.error);
            } else {
                this.props.apis.map((api) => {
                    if (api !== '') {
                        apis.push(api.name);
                        apiColumns[api.name] = api.columns;
                    }
                });
            }
            this.setState({ apis, apiColumns, showSpinner: false });
        })
    }
    getFormattedData(apiData, secondaryColumns) {
        console.log(apiData, secondaryColumns);
        const tempData = Object.assign([], apiData);
        secondaryColumns.map((column) => {
            tempData.map((row, index) => {
                let values = [];
                column.mergeColumns.map((subCol) => {
                    values.push(row[subCol]);
                });
                tempData[index][column.mergeColumns.join('~')] = values.join(' ');
            });
        });
        return tempData
    }
    changeAPI(eventKey) {
        this.setState({ showSpinner: true });
        this.props.dispatch(getSearchData(eventKey, undefined, undefined, 0, this.state.pageSize, this.state.sorted)).then(() => {
            let columns = [];
            let secondaryColumns = [];
            if (this.props.apiData.length > 0) {
                this.state.apiColumns[eventKey].map((column) => {
                    if (column.name !== '$loki' && column.name !== 'meta' && column.visible === 'Yes'){
                        if (column.columnType === 'Custom') {
                            secondaryColumns.push(column);
                            columns.push({ Header: column.aliasName, accessor: column.mergeColumns.join('~') });
                        } else {
                            columns.push({ Header: column.aliasName, accessor: column.name });
                        }
                    }
                });
                let apiData = this.props.apiData;
                if (secondaryColumns.length > 0) {
                    apiData = this.getFormattedData(this.props.apiData, secondaryColumns);
                }
                this.setState({ 
                    columns,
                    showSpinner: false,
                    totalCount: this.props.count,
                    count: this.props.count,
                    rows: apiData,
                    secondaryColumns
                });
            }
        });
        this.setState({ selectedAPI: eventKey, searchVal: '', filters: {} });
    }
    deleteAPI() {
        const x = confirm(`Are you sure you want to delete '${this.state.selectedAPI}'`);
        if (x) {
            this.setState({ showSpinner: true });
            this.props.dispatch(deleteAPI(this.state.selectedAPI)).then(() => {
                this.setState({ 
                    selectedAPI: '',
                    showSpinner: false,
                    totalCount: 0,
                    columns: [],
                    count: 0,
                    rows: [],
                    apis: this.props.apis.map((api) => api.name )
                });
            });
        } else {
            return false;
        }
    }
    rowGetter(i) {
        let rows = this.getRows();        
        return rows[i];
    }
    fetchData({ page, pageSize, filtered, sorted }, instance) {
        let tempPage = 0;
        if (page !== this.state.page) {
            tempPage = page;
        }
        this.setState({ page, pageSize, sorted: (sorted.length > 0) ? sorted[0] : undefined }, () => {
            this.searchWithLocalFilters(filtered);
        });
    }
    changeSearchVal(event) {
        let searchVal = event.target.value === '' ? undefined: event.target.value;
        this.setState({ showSpinner: true });
        this.props.dispatch(getSearchData(this.state.selectedAPI, this.state.searchObj, searchVal, 0, this.state.pageSize, this.state.sorted)).then(() => {
            this.setState({ 
                showSpinner: false, 
                count: this.props.apiData.length, 
                totalCount: this.props.count, 
                rows: (this.state.secondaryColumns.length > 0) ? this.getFormattedData(this.props.apiData, this.state.secondaryColumns) : this.props.apiData 
            });
        });
        this.setState({ searchVal: event.target.value, filters: {} });
    }
	render() {
        let apis = [];
        if (this.state.apis && this.state.apis[0] && (typeof this.state.apis[0] === 'string' || this.state.apis[0] instanceof String)){
            apis = this.state.apis;
        } else {
            apis = this.state.apis.map((api) => api.name);
        }
		return (
			<form className="form-signin" action="">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-4 col-md-offset-4" style={{marginLeft:'0%', width: '100%'}}>
							<div className="login-block">
                                <div className="logo-block-create text-center">
									<p>Data&nbsp;<span className="t-bold">&nbsp;Search</span></p>
								</div>
								<div className="outer-input-create">
                                    <Grid fluid>
                                        <Row>
                                            <Col lg={12} md={12}>
                                                <Col lg={5} md={5} className="np-left">
                                                    <FormGroup>
                                                        <Col lg={3} md={3} className="no-padding">
                                                            <label className="margin-top10">Choose API:</label>
                                                        </Col>
                                                        <Col lg={9} md={9} className="np-left">
                                                            <DropdownButton id="Roles" title={this.state.selectedAPI === '' ? "Choose API" : this.state.selectedAPI} onSelect={this.changeAPI}>
                                                                {apis.map((item, index) => <MenuItem key={index} eventKey={item}>{item}</MenuItem>)}
                                                            </DropdownButton>
                                                            { this.state.selectedAPI &&
                                                            <i onClick={this.deleteAPI} title="delete" style={{'fontSize': '17px', 'marginLeft': '20px', 'cursor': 'pointer'}} className="fa fa-trash" aria-hidden="true"></i>
                                                            }    
                                                        </Col>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={2} md={2} className="no-padding">
                                                    
                                                </Col>
                                                <Col lg={2} md={2} className="no-padding">
                                                    <FormGroup>
                                                        <input disabled={!this.state.selectedAPI} type="text" style={{padding: '5px'}} className="form-control " placeholder="Global Search" value={this.state.searchVal} onChange={this.changeSearchVal} />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={2} md={2}>
                                                    <span>Showing {this.state.count} of {this.state.totalCount} rows</span>
                                                </Col>
                                                <Col lg={1} md={1}>
                                                    {this.state.showSpinner &&
                                                        <i className="fa fa-spinner fa-spin fa-5x" style={{ "fontSize": "20px" }}></i>
                                                    }
                                                </Col>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} md={12}>
                                                {/* <ReactDataGrid
                                                    ref={(grid) => { this.grid = grid; }}
                                                    columns={this.state.columns}
                                                    rowGetter={this.rowGetter}
                                                    rowsCount={this.getRows().length}
                                                    rowHeight={25}
                                                    minHeight={500}
                                                    onAddFilter={this.handleFilterChange}
                                                    onClearFilters={this.onClearFilters}
                                                /> */}
                                                <ReactTable
                                                    data={this.state.rows}
                                                    filterable
                                                    noDataText="Please choose the API!"
                                                    columns={this.state.columns}
                                                    manual
                                                    pages={Math.ceil(this.state.totalCount / this.state.pageSize)}
                                                    onFetchData={this.fetchData} // Request new data when things change
                                                    filterable
                                                    defaultPageSize={this.state.pageSize}
                                                    defaultSorted={[]}
                                                    className="-striped -highlight"
                                                />
                                            </Col>
                                        </Row>
                                    </Grid>
                                </div>	
							</div>
						</div>
					</div>
				</div>
			</form>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
        apis: state.api.apis,
        apiData: state.api.searchResults,
        count: state.api.count
	};
};

export default withRouter(connect(mapStateToProps)(SearchDataTable));
