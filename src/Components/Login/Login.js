import React, { PropTypes as T } from 'react';
import styles from '../../styles/signin.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router';

import store from "../../store/store"
import { authenticateUser } from "../../actions/authenticationAction"
import './Login.scss';
// @connect((store) => {
//     return {
//         applications: store.applicationCreation,
//         auth: store.authentication
//     };
// })
class Login extends React.Component {
	constructor(props) {
		super(props);

		this.props = props;

		this.state = {
			username: '',
			password: '',
		};

		this.userNameChange = this.userNameChange.bind(this);

		this.passWordChange = this.passWordChange.bind(this);

		this.formSubmit = this.formSubmit.bind(this);
	}

	userNameChange(event) {
		this.setState({ username: event.target.value });
	}

	passWordChange(event) {
		this.setState({ password: event.target.value });
	}

	formSubmit = (event) => {
		event.preventDefault();

		this.props.dispatch(authenticateUser({
			userName: this.state.username,
			password: this.state.password
		}));
	}
	componentWillReceiveProps(newProps) {
		if (newProps.auth.isAuthenticated) {
			localStorage.setItem('userDetails', JSON.stringify(this.props.auth.userDetails));
			this.props.router.push('/');
		}
	}
	render() {
		return (
			<form className="form-signin" action="">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-4 col-md-offset-4">
							<div className="login-block">
								<div className="logo-block text-center">
									<img src="/assets/images/icons/login-logo.png" alt="" />
									<p>Data<span className="t-bold">Search</span></p>
								</div>
								<div className="outer-input">
									<div className="inner-input">
										<div className="l-head">
											<p>Login</p>
											<img src="/assets/images/icons/user.png" alt="" />
										</div>
										<form id="login-form">
											<div className="floating-label">
												<input type="text" id="Username" className="floating-input" placeholder=" " value={this.username} onChange={this.userNameChange}></input>
												<label>User Name</label>
											</div>
											<div className="floating-label">
												<input type="password" id="Password" className="floating-input" placeholder=" " value={this.password} onChange={this.passWordChange}></input>
												<label>Enter password</label>
											</div>
											<div className="text-center">
												{!this.props.auth.isAuthenticated && this.props.auth.error &&
													<span style={{ color: 'red' }}>Invalid username / password</span>
												}
												<button className="btn submit-btn" type="submit" onClick={this.formSubmit}>Sign in</button>
											</div>
										</form>
									</div>
									<div className="text-center">
										<a href="" className="forgot-pwd">Forgot Password</a><span> | </span>
										<Link to="/Register">Register</Link>
									</div>
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
		applications: state.applicationCreation,
		auth: state.authentication
	};
};

export default withRouter(connect(mapStateToProps)(Login));
// Login.contextTypes = {
//     router: React.PropTypes.object.isRequired
// };
