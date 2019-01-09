import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import './SideMenuBar.scss';
import store from '../../store/store';
import { Draggable } from 'react-drag-and-drop';
import DraggableFormElement from '../Reusable Components/DraggableFormElement';
import DraggableOptionsMultiSelectDropdown from '../Reusable Components/DraggableOptionsMultiSelectDropdown';
import MultiSelectDropdown from '../Reusable Components/MultiSelectDropdown';

@connect((store) => ({
  header: store.header
}))

class SideMenuBar extends React.Component {
  render() {
    return (
      <div className={this.props.header.sideNavigationToggled ? "left-section active" : "left-section"} id="navigation-example-2">
        <div className="left-bar">
          <div className="logo-section">
            <div className="logo">
              <img src="/assets/images/icons/logo.png" alt="" />
            </div>
            <p>Data<span className="t-bold">Search</span></p>
          </div>
          <div className="menu-section">
            <ul className="menu-list">
              <li>
                <Link to="/Create">
                  <img src="/assets/images/icons/menu-icon1.png" alt="" />
                  <p>Create Application</p>
                  <br className="clear" />
                </Link>
              </li>
              <li>
                <Link to="/search">
                  <img className="viewIcon" src="/assets/images/icons/menu-icon2.png" alt="" />
                  <p>View APIs</p>
                  <br className="clear" />
                </Link>
              </li>
              {/* <li>
                <Link to="/Authorization">
                  <img src="/assets/images/icons/menu-icon3.png" alt="" />
                  <p>User Authorization</p>
                  <br className="clear" />
                </Link>
              </li>
              <li>
                <Link to="/DataApproval">
                  <img src="/assets/images/icons/menu-icon4.png" alt="" />
                  <p>Data Approval</p>
                  <br className="clear" />
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default SideMenuBar;
