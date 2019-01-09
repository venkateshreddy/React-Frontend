import React, { Component } from 'react';
import { connect } from "react-redux";
import { Grid, Row, Col } from 'react-bootstrap';

import store from "../../store/store"
import { checkUsernameAvailability, registerUser } from "../../actions/authenticationAction"
import './Register.scss';
import { FormErrors } from '../Reusable Components/Form/FormErrors';

@connect((store, history) => {
	return {
		auth: store.authentication
	};
})
export class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userName: '',
			password: '',
			confirmPassword: '',
			email: '',
			formErrors: { userName: '', password: '', confirmPassword: '', email: '' },
			userNameValid: false,
			passwordValid: false,
			confirmPasswordValid: false,
			emailValid: false,
			formValid: false,
			checkUsernameInitiated: false
		}

		this.handleUserName = this.handleUserName.bind(this);

		this.handlePassword = this.handlePassword.bind(this);

		this.handleConfirmPassword = this.handleConfirmPassword.bind(this);

		this.handleEmail = this.handleEmail.bind(this);

		this.register = this.register.bind(this);
	}

	handleUserName = (e) => {
		e.preventDefault();

		let value = e.target.value;

		this.setState({ userName: value }, () => {
			this.validateField('UserName', value);
			let self = this;
			setTimeout(function () {
				if (self.state.userNameValid && self.state.userName.length >= 6) {
					self.setState({ checkUsernameInitiated: true });
					self.props.dispatch(checkUsernameAvailability({ userName: self.state.userName }))
					.then(() => {
						self.setState({ checkUsernameInitiated: false });
					});
				}
				else {
					self.setState({ checkUsernameInitiated: false });
				}
			}, 2000)

		});
	}

	handlePassword = (e) => {
		e.preventDefault();

		let value = e.target.value;

		this.setState({ password: value }, () => { this.validateField('Password', value) });
	}

	handleConfirmPassword = (e) => {
		e.preventDefault();

		let value = e.target.value;

		this.setState({ confirmPassword: value }, () => { this.validateField('ConfirmPassword', value) });
	}

	handleEmail = (e) => {
		e.preventDefault();

		let value = e.target.value;

		this.setState({ email: value }, () => { this.validateField('Email', value) });
	}

	register = (e) => {
		e.preventDefault();

		this.props.dispatch(registerUser({
			"userName": this.state.userName,
			"password": this.state.password,
			"email": this.state.email
		})).then(() => {
			alert(this.props.auth.registrationMessage);
		});
	}

	validateField(fieldName, value) {
		let fieldValidationErrors = this.state.formErrors;
		let userNameValid = this.state.userNameValid;
		let passwordValid = this.state.passwordValid;
		let confirmPasswordValid = this.state.confirmPasswordValid;
		let emailValid = this.state.emailValid;

		switch (fieldName) {
			case 'Email':
				emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
				fieldValidationErrors.email = emailValid ? '' : 'Email is invalid';
				break;
			case 'Password':
				passwordValid = value.length >= 6;
				fieldValidationErrors.password = passwordValid ? '' : 'Password is too short';
				break;
			case 'ConfirmPassword':
				confirmPasswordValid = value.length >= 6;
				fieldValidationErrors.confirmPassword = confirmPasswordValid ? '' : 'Confirm password is too short';
				if (confirmPasswordValid) {
					confirmPasswordValid = this.state.password === this.state.confirmPassword;
					fieldValidationErrors.confirmPassword = confirmPasswordValid ? '' : 'Passwords do not match';
				}
				break;
			case 'UserName':
				userNameValid = value !== '';
				fieldValidationErrors.userName = userNameValid ? '' : 'Enter user name';
				if (userNameValid) {
					userNameValid = value.length >= 6;
					fieldValidationErrors.userName = userNameValid ? '' : 'User name is too short';
				}
				break;
			default:
				break;
		}

		this.setState({
			formErrors: fieldValidationErrors,
			emailValid: emailValid,
			passwordValid: passwordValid,
			confirmPasswordValid: confirmPasswordValid,
			userNameValid: userNameValid
		}, this.validateForm);
	}

	validateForm() {
		this.setState({
			formValid: this.state.userNameValid &&
				this.state.emailValid &&
				this.state.passwordValid &&
				this.state.confirmPasswordValid
		});
	}

	errorClass(error) {
		return (error.length === 0 ? '' : 'has-error');
	}

	render() {
		const { checkUsernameInitiated } = this.state;

		return (
			<Grid>
				<Row>
					<Col md={6} mdOffset={3}>
						<div className="login-block">
							<div className="logo-block text-center">
								<img src="/assets/images/icons/login-logo.png" alt="" />
								<p>Wizz<span className="t-bold">APP</span></p>
							</div>
							<div className="outer-input">
								<div className="inner-input">
									<div className="l-head">
										<p>Register</p>
										<img src="/assets/images/icons/user.png" alt="" />
									</div>
									<form id="register-form">
										<div style={{ border: '0px' }} className='panel panel-default'>
											<FormErrors formErrors={this.state.formErrors} />
										</div>
										<div className="floating-label">
											<input type="textbox" className={`floating-input ${this.errorClass(this.state.formErrors.userName)}`} name="UserName" value={this.state.userName} placeholder="" onChange={this.handleUserName} />
											<label className="form-field-label-text" htmlFor="UserName">User name<span style={{ color: 'red' }}> *</span>
												{checkUsernameInitiated && <span style={{ paddingLeft: '5px' }}><i class="fa fa-circle-o-notch fa-spin" /> Checking username availability</span>}
												{this.props.auth.usernameAvailable && !checkUsernameInitiated && <span style={{ color: 'green', paddingLeft: '5px' }}><i className="fa fa-check-circle" /> Username available</span>}
												{!this.props.auth.usernameAvailable && !checkUsernameInitiated && this.state.userNameValid && <span style={{ color: 'red', paddingLeft: '5px' }}><i className="fa fa-times-circle" /> Username not available</span>}
											</label>
										</div>
										<div className="floating-label">
											<input type="password" className={`floating-input ${this.errorClass(this.state.formErrors.password)}`} name="Password" value={this.state.password} placeholder="" onChange={this.handlePassword} />
											<label className="form-field-label-text" htmlFor="Password">Password<span style={{ color: 'red' }}> *</span></label>
										</div>
										<div className="floating-label">
											<input type="password" className={`floating-input ${this.errorClass(this.state.formErrors.confirmPassword)}`} name="ConfirmPassword" value={this.state.confirmPassword} placeholder="" onChange={this.handleConfirmPassword} />
											<label className="form-field-label-text" htmlFor="ConfirmPassword">Confirm Password<span style={{ color: 'red' }}> *</span></label>
										</div>
										<div className="floating-label">
											<input type="textbox" className={`floating-input ${this.errorClass(this.state.formErrors.email)}`} name="Email" value={this.state.email} placeholder="" onChange={this.handleEmail} />
											<label className="form-field-label-text" htmlFor="Email">Email<span style={{ color: 'red' }}> *</span></label>
										</div>
										<div className="text-center">
											<input type="button" className="btn submit-btn" onClick={this.register} value="Register" disabled={!this.state.formValid} />
										</div>
									</form>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</Grid>
		);
	}
}
