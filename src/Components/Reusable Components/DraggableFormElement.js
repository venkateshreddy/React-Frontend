import React from 'react';
import { Draggable } from 'react-drag-and-drop';
import { Link } from 'react-router';

class DraggableFormElement extends React.Component{
	render(){
    const icon = `/assets/images/icons/${this.props.icon}`;
    return(
			<Draggable type={this.props.type} data={this.props.Data}>
            	<li>
                <Link>
                  <img className="draggable_element_icon" src={icon} alt="" />
                  <p>{this.props.elementType}</p>
                  <br className="clear" />
                </Link>
              </li>
         	</Draggable>
        );
	}
}
export default DraggableFormElement;