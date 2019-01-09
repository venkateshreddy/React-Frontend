import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Grid, Row, Col, FormGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import ReactDataGrid from 'react-data-grid';
const { Data: { Selectors } } = require('react-data-grid-addons');
import './SearchData.scss';
import {loadApis, getSearchData} from '../../actions/APIAction';

class SearchData extends React.Component {
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
            totalCount: 0
        }
        this.changeAPI = this.changeAPI.bind(this);
        this.rowGetter = this.rowGetter.bind(this);
        this.changeSearchVal = this.changeSearchVal.bind(this);
        this.getRows = this.getRows.bind(this);
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
        Object.keys(newFilters).map((key) => {
            isEmpty = false;
            searchObj[key] = newFilters[key].filterTerm;
        });
        if (isEmpty) {
            searchObj = undefined; 
        }
        this.setState({ showSpinner: true });
        this.props.dispatch(getSearchData(this.state.selectedAPI, searchObj, undefined)).then(() => {
            this.setState({ showSpinner: false, count: this.props.apiData.length, rows: this.props.apiData });
        });
    }
    onClearFilters = () => {
        this.setState({filters: {} });
    };
    componentDidMount() {
        this.setState({ showSpinner: true });
        this.props.dispatch(loadApis()).then(() => {
            const apis = [];
            if (this.props.apis.error) {
                alert(this.props.apis.error);
            } else {
                this.props.apis.map((api) => {
                    if (api !== '') {
                        apis.push(api);
                    }
                });
            }
            this.setState({ apis, showSpinner: false });
        })
    }
    changeAPI(eventKey) {
        this.setState({ showSpinner: true });
        this.props.dispatch(getSearchData(eventKey, undefined, undefined)).then(() => {
            let columns = [];
            if (this.props.apiData.length > 0) {
                Object.keys(this.props.apiData[0]).map((column) => {
                    columns.push({ name: column, key: column, resizable: true, filterable: true });
                });
            }
            this.setState({ columns, showSpinner: false, totalCount: this.props.count, count: this.props.apiData.length, rows: this.props.apiData }, () => {
                this.grid.setState({ canFilter: true });
            });
        });
        this.setState({ selectedAPI: eventKey, searchVal: '', filters: {} });
    }
    rowGetter(i) {
        let rows = this.getRows();        
        return rows[i];
    }
    changeSearchVal(event) {
        let searchVal = event.target.value === '' ? undefined: event.target.value;
        this.setState({ showSpinner: true });
        this.props.dispatch(getSearchData(this.state.selectedAPI, undefined, searchVal)).then(() => {
            this.setState({ showSpinner: false, count: this.props.apiData.length, rows: this.props.apiData });
        });
        this.setState({ searchVal: event.target.value, filters: {} });
    }
	render() {
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
                                                                {this.state.apis.map((item, index) => <MenuItem key={index} eventKey={item}>{item}</MenuItem>)}
                                                            </DropdownButton>
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
                                                <ReactDataGrid
                                                    ref={(grid) => { this.grid = grid; }}
                                                    columns={this.state.columns}
                                                    rowGetter={this.rowGetter}
                                                    rowsCount={this.getRows().length}
                                                    rowHeight={25}
                                                    minHeight={500}
                                                    onAddFilter={this.handleFilterChange}
                                                    onClearFilters={this.onClearFilters}
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

export default withRouter(connect(mapStateToProps)(SearchData));
