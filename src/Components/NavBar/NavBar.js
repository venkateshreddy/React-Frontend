/**
 * @file Wizzapp NavBar.
 * @author Deepu
 */
import React from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux';
import { Row, Col, NavDropdown, MenuItem, Nav } from 'react-bootstrap';
import { withRouter } from 'react-router';

import './NavBar.scss';
import store from '../../store/store';
import { toggleSideNavigationBar, loggedUserName } from "../../actions/headerAction";

@withRouter
@connect((store) => ({
	auth: store.authentication,
	header: store.header
}))
class NavBar extends React.Component {
	constructor(props) {
		super(props);

		this.toggleSideNavigation = this.toggleSideNavigation.bind(this);

		this.Logout = this.Logout.bind(this);
	}

	Logout = (e) => {
		localStorage.removeItem('userDetails');
	}

	componentDidMount() {
		this.props.dispatch(loggedUserName());
	}

	toggleSideNavigation = (e) => {
		e.preventDefault();

		this.props.dispatch(toggleSideNavigationBar());
	}

	render() {
		return (
			<div className="header-section">
				<nav className="navbar navbar-default navbar-fixed">
					<div className="container-fluid">
						<div className="navbar-header">
							<button type="button" onClick={this.toggleSideNavigation} className="navbar-toggle" id="btn-open" data-toggle="collapse" data-target="">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<span className="cancel">
								<button type="button" onClick={this.toggleSideNavigation} className="navbar-toggle" id="btn-open" data-toggle="collapse" data-target="">
									<span className="sr-only">Toggle navigation</span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
								</button>
							</span>
						</div>
						<div className="collapse navbar-collapse">
							<span className="header-appName">{this.props.header.applicationName}</span>
							<ul className="nav navbar-nav navbar-right">
								<li>
									<p className="welcome-text">Welcome {this.props.header.userName}</p>
								</li>
								<li>
									<a href="">
										<p className="b-right mb_0"><i className="fa fa-bell-o" aria-hidden="true"></i>
											<span className="notification-count">01</span>
										</p>
									</a>
								</li>
								<li>
									<ul className="navbar-actions">
										<li>
											<Nav>
												<NavDropdown
													id="navbar-menu"
													eventKey={3}
													className="navbar-name notify-dropdown"
													title={
														<span className="navbar-action-settings" title="Go to settings">
															<div className="navbar-action-icon">
																<i className="fa fa-user" aria-hidden="true" />
															</div>
														</span>
													}
												>
													<MenuItem eventKey={3.1}><Link to="/Create">Create Application</Link></MenuItem>
													<MenuItem eventKey={3.2}><Link to="/">View Application</Link></MenuItem>
													<MenuItem eventKey={3.3}><Link to="/Authorization">User authorization</Link></MenuItem>
													<MenuItem eventKey={3.4}><Link to="/DataApproval">Data Approval</Link></MenuItem>
													<MenuItem eventKey={3.5}><Link to="/" onClick={this.Logout}>Logout</Link></MenuItem>
												</NavDropdown>
											</Nav>
										</li>
									</ul>
								</li>
								<li className="separator hidden-lg"></li>
							</ul>
						</div>
					</div>
				</nav>
			</div>
		);
	}
}

export default NavBar;
