import React from 'react';
import {
	FormGroup,
	Button,
	Modal,
	Grid,
	Row,
	Col
} from 'react-bootstrap';
import Toggle from 'react-toggle';

class EditField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fieldColumns: props.editRow.mergeColumns,
            fieldName: props.editRow.name,
            order: props.editRow.order
        }
        this.handleCheck = this.handleCheck.bind(this);
        this.getColumns = this.getColumns.bind(this);
        this.saveField = this.saveField.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.isDuplicate = this.isDuplicate.bind(this);
    }
    isDuplicate() {
        let count = 0;
        this.props.columns.map((column) => {
            if (column.name === this.state.fieldName || column.aliasName === this.state.fieldName) {
                count += 1;
            }
        });
        return (count > 1);
    }
    handleNameChange(event) {
        this.setState({ fieldName: event.target.value });
    }
    saveField() {
        if (!this.state.fieldName) {
            alert('Please enter coulumn name');
            return false;
        } else if (this.isDuplicate() === true) {
            alert('Column name already existed');
            return false;
        } else if (this.state.fieldColumns.length < 2) {
            alert('Please choose atleast two columns to merge');
            return false;
        } else {
            const newColumn = { 
                name: this.state.fieldName,
                aliasName: this.state.fieldName,
                columnType: 'Custom',
                visible: 'Yes',
                aggregation: 'None',
                order: this.state.order,
                isNumeric: 'No',
                mergeColumns: this.state.fieldColumns,
                remarks: this.state.fieldColumns.join(' - ')
            };
            this.props.updateField(newColumn);
        }
    }
    handleCheck(event) {
        let fieldColumns = Object.assign([], this.state.fieldColumns);
        if (event.target.checked) {
            fieldColumns.push(event.target.name);
        } else {
            fieldColumns = fieldColumns.splice(fieldColumns.indexOf(event.target.name), 1);
        }
        this.setState({ fieldColumns });
    }
    getColumns() {
        return this.props.columns.map((column, index) => {
            return (
            <Row key={index}>
                <Col lg={2} md={2}>
                    <span>{column.name}</span>
                </Col>
                <Col lg={2} md={2}>
                    <Toggle
                        name={column.name}
                        checked={(this.state.fieldColumns.indexOf(column.name) !== -1)}
                        icons={false}
                        onChange={this.handleCheck}
                    />
                </Col>
            </Row>);
        })
    }
    render() {
        return (
        <Modal show={this.props.open} container={this} onHide={this.props.onCloseModal} aria-labelledby="contained-modal-title">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              Edit Column
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <FormGroup controlId="formBasicText">
            <div className={`col-md-12 col-sm-12 col-xs-12 padding-horizontal`}>
                <div className="floating-label">
                    <input type="text" className="floating-input form-control form-field-input input-sm" onChange={this.handleNameChange} value={this.state.fieldName} placeholder=" " name="field_name" />
                    <label className="form-field-label-text" htmlFor="field_name">Column Name</label>
                </div>
                <div className="floating-label">
                    <input type="text" readOnly placeholder=" " className="floating-input form-control form-field-input input-sm" value={ this.state.fieldColumns.join(' - ') } />
                    <label className="form-field-label-text" htmlFor="field_name">Preview (read-only)</label>
                </div>
                <div className="floating-label">
                    <Grid>
                        <div style={{ 'marginTop': '3%', 'marginLeft': '2%' }}>
                        {
                            this.getColumns()
                        }
                        </div>
                    </Grid>
                    <label className="form-field-label-text" htmlFor="fields">Choose Columns to merge (Choosing Order will be Merge order)</label>
                </div>
            </div>
        </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onCloseModal}>Close</Button>
            <Button onClick={this.saveField}>Save</Button>
          </Modal.Footer>
        </Modal>);
    }
}
export default EditField;