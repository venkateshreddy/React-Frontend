import React from 'react';
import { Draggable } from 'react-drag-and-drop';
import { Link } from 'react-router';
import DraggableFormElement from './DraggableFormElement';
import { Row, Col } from 'react-bootstrap';
import ReactScrollbar from 'react-scrollbar-js';
import { connect } from 'react-redux';

@connect((store) => ({
  apps : store.applicationCreation
}))

class DraggableOptionsMultiSelectDropdown extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      allOptions: props.options,
      filteredOptions: props.options,
      gridElements: props.apps.gridElements
    }
    this.handleChange = this.handleChange.bind(this);
    this.addGridElement = this.addGridElement.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
  }
  componentWillReceiveProps(nextProps){
    this.setState({ gridElements: nextProps.apps.gridElements });
  }
  addGridElement(columnName){
    const id = Math.floor((Math.random() * 100) + 1);
    this.props.formElements.map((element, index) => {
      if(columnName === element.columnName){
        element.isInnerElement = false;
        element.id = id;
        this.props.dispatch({ type: "ADD_GRID_ELEMENT", element });
      }
    });
  }
  deleteGridElement(columnName){
    this.props.dispatch({ type: "DELETE_GRID_ELEMENT", columnName });
  }
  toggleCheckbox(event){
    if(event.target.checked) {
      this.addGridElement(event.target.value);
    } else {
      this.deleteGridElement(event.target.value);
    }
  }
  handleChange(event){
    const searchString = event.target.value;
    this.setState({ searchText: searchString });
    const filteredOptions = [];
    this.state.allOptions.map((option, index) => {
      if (option.text.toLowerCase().indexOf(searchString.toLowerCase()) >= 0) {
        filteredOptions.push(option);
      }
      return index;
    });
    this.setState({ filteredOptions });
  }
  getDraggableElement(option, checked) {
    const icon = `/assets/images/icons/${option.icon}`;
    return <Draggable type={option.type} data={option.value}>
              <Row>
                <Col lg={2} md={2}>
                  <img className="draggable_element_icon" src={icon} alt="" />
                </Col>
                <Col lg={6} md={6}>
                  <div>{option.text}</div>
                </Col>
                <Col lg={1} md={1}>
                  <input checked={checked} onClick={this.toggleCheckbox} type="checkbox" value={option.value} />
                </Col>
              </Row>
          </Draggable>;
  }
  getDraggableElements(existingControls){
    const draggableElements = [];
    const addedElements = [];
    existingControls.map((control) => {
      addedElements.push(control.name);
    });
    this.state.filteredOptions.map((option) => {
      let checked = false;
      if(addedElements.indexOf(option.value) >= 0){
        checked = true;
      }
      const element = <li key={option.value} className="element_li">
                {
                  this.getDraggableElement(option, checked)
                }
              </li>;
      draggableElements.push(element);
    });
    return draggableElements;
  }
  render(){
    const myScrollbar = {
			width: '100%',
			height: '50vh'
    };
    const myInnerScrollbar = {
			width: '100%',
			height: '40vh'
    };
		return(
      <div>
        <Row>
          <Col lg={12} md={12}>
            <h1 className="dynamic_fields_heading">{this.props.title}</h1>
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12}>
            <input className="search_textbox" value={this.state.searchText} onChange={this.handleChange} type="text" placeholder="Search" /> 
          </Col>
        </Row>
        <ReactScrollbar style={myInnerScrollbar}>
          <ul>
            {
              this.getDraggableElements(this.state.gridElements)
            }
          </ul>
        </ReactScrollbar>
      </div>
    );
	}
}
export default DraggableOptionsMultiSelectDropdown;