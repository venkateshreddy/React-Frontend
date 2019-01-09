import React from 'react';
import RGL from 'react-grid-layout';
import { Droppable } from 'react-drag-and-drop';
import ReactGridLayout from 'react-grid-layout';
import store from '../../store/store';
import { connect } from 'react-redux';

@connect((store) => ({
  apps : store.applicationCreation
}))
class DraggableContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      containerTitle: props.title,
      editedTitle: props.title,
      isTitleEditing: false,
      containerId: props.id
    }
    this.saveTempTitle = this.saveTempTitle.bind(this);
    this.saveEditedTitle = this.saveEditedTitle.bind(this);
    this.editContainerTitle = this.editContainerTitle.bind(this);
  }

  toggleElement(elementID) {
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
  }
  onInternalDrop(data, event) {
    event.stopPropagation();
    const existingControls = this.props.apps.gridElements;
    const addedElements = [];
    existingControls.map((control) => {
      addedElements.push(control.name);
    });
    if(addedElements.indexOf(data.element) < 0){
      this.props.formElements.map((element, index) => {
        if(data.element === element.name){
          const tempElement = element;
          tempElement.isInnerElement = true;
          tempElement.containerId = this.props.id;
          const id = Math.floor((Math.random() * 100) + 1);
          tempElement.id = id;
          //this.props.dispatch({ type: "ADD_GRID_ELEMENT", element: tempElement });
        }
      });
    }
  }
  saveContainerLayout(layout, id) {
    this.props.dispatch({ type: "SAVE_GRID_LAYOUT", layout });
  }
  separateDynamicElement() {
    const separateElements = [];
    const oneRow = [];
    var layout = [];
    const thisContainerElements = [];
    this.props.apps.gridElements.map((element)=>{
      if(element.containerId === this.props.id) {
        thisContainerElements.push(element);
      }
    })
    oneRow.push(thisContainerElements.map((element, index) => {
      let elementPosition = element.position;
      if(elementPosition === undefined){
        elementPosition = {i: element.id.toString(), x: 0, y: index, w: 200, h: 2}; 
      }
      layout.push(elementPosition);
      switch (element.formElement) {
				case 'text':
				case 'date':
				case 'Input Box':
				case 'URL':
					var type = element.dataType == 'decimal' ? 'number' : 'text';
					return (<div key={element.id} className="col-md-3 col-sm-6 col-xs-12 no-padding padding-horizontal">
						<div className="floating-label">
							<input type={type} maxLength={element.length} className="floating-input form-control form-field-input input-sm" key={element.columnName} id={element.columnName} placeholder=" " value="" />
							<label className="form-field-label-text" htmlFor={element.columnName}>{element.columnName}{(element.required === 'Y' || element.isPrimary === 'Y') && <span className="required">*</span>}</label>
						</div>
					</div>);
					break;
				case 'Drop Down':
					return (<div key={element.id} className="col-md-3 col-sm-6 col-xs-12 no-padding margin-bottom padding-horizontal">
						<label className="form-field-label-text" htmlFor={element.columnName}>{element.columnName}{(element.required === 'Y' || element.isPrimary === 'Y') && <span className="required">*</span>}</label>
						<select className="form-control input-sm" id={element.columnName} placeholder={`Select ${element.columnName}`} value="">
							{
								this.bindDropdown(element)
							}
						</select>
					</div>);
					break;
				case 'textarea':
					return (<div key={element.id} className="col-md-3 col-sm-6 col-xs-12 no-padding margin-bottom padding-horizontal">
						<label className="form-field-label-text" htmlFor={element.columnName}>{element.columnName}{(element.required === 'Y' || element.isPrimary === 'Y') && <span className="required">*</span>}</label>
						<textarea className="form-control input-sm" id={element.columnName} placeholder={`Enter ${element.columnName}`} value="" />
					</div>);
          break;   
			}
    }));
    separateElements.push(
      <div className="row" key={'test'}>
        <ReactGridLayout 
          onDragStart={(layout: Layout, oldItem: LayoutItem, newItem: LayoutItem,placeholder: LayoutItem, e: MouseEvent, element: HTMLElemen) =>e.stopPropagation()} key={this.props.id.toString()} 
          containerPadding={[0,0]} 
          onLayoutChange={(layout) => this.saveContainerLayout(layout, this.props.id)} 
          className="layout" 
          layout={[]} 
          verticalCompact={false} 
          cols={1000} 
          rowHeight={25} 
          width={1000} 
          useCSSTransforms={true}
        >
          {oneRow}
        </ReactGridLayout>
			</div>
		);
		return separateElements;
  }
  editContainerTitle(){
    this.setState({ isTitleEditing: true });
    this.setState({ editedTitle: this.state.containerTitle });
  }
  saveEditedTitle(){
    console.log(this.state.editedTitle);
    if (this.state.editedTitle !== ''){
      this.setState({ containerTitle: this.state.editedTitle });
      this.props.dispatch({ type: 'SAVE_CONTAINER_TITLE', title: this.state.editedTitle, id: this.state.containerId });
      this.setState({ isTitleEditing: false });
    } else {
      this.setState({ isTitleEditing: false });
    }
  }
  saveTempTitle(event){
    console.log(event.target.value);
    this.setState({ editedTitle: event.target.value });
  }
  render(){
    let titleText = <h1 className="toggler-title" onDoubleClick={this.editContainerTitle}>{this.state.containerTitle}</h1>;
    if(this.state.isTitleEditing){
      titleText = <input type="text" value={this.state.editedTitle} onBlur={this.saveEditedTitle} onChange={this.saveTempTitle} />;
    }
    return(
      <Droppable types={["element"]} onDrop={this.onInternalDrop.bind(this)}>
        <div className="content-inner">
          <div className="toggler active" id="budgetVsSpent">
            <div className="toggler-bar js-toggler-bar">
              {titleText}
              <span className="box-filter-arrow" onClick={() => this.toggleElement('budgetVsSpent')} />
            </div>
            <div className="toggler-content">
                <div className="panel-body">
                { this.separateDynamicElement() }
                </div>
            </div>
          </div>
        </div>
      </Droppable>
    );
	}
}
export default DraggableContainer;