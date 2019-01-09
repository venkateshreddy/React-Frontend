import React from 'react';
import { connect } from 'react-redux';
import SideMenuBar from '../SideMenuBar/SideMenuBar';
import NavBar from '../NavBar/NavBar';
import './Layout.scss';
import store from '../../store/store';
import Login from '../Login/Login';
import { Register } from '../Register/Register';

@connect((store) => ({
	auth: store.authentication,
	header: store.header
}))
class Layout extends React.Component {
	componentDidMount() {
		console.log('layout props', this.props);
	}
  render() {
    const { location } = this.props;

    const mypath = location.pathname;

		if(((localStorage.getItem('userDetails') === null || JSON.parse(localStorage.getItem('userDetails'))['userName'] === undefined) && (mypath !== '/login' && mypath !== '/register')) ||
			mypath === '/login') {
      return (
        <Login />
      );
		}
		else if((localStorage.getItem('userDetails') === null && mypath === '/register') || mypath === '/register') {
			return (
        <Register />
      );
		}

    return (
      <div className="wizapp-wrap">
        <SideMenuBar {...this.props} />
        <div className="main-section" style={{paddingLeft: this.props.header.sideNavigationToggled ? "140px" : "0"}}>
          <NavBar />
          <div className="content app-container">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { locale: state.locale };
}

export default connect(mapStateToProps)(Layout);
