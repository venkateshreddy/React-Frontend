import axios from "axios";

export function authenticateUser(user) {
	return function (dispatch) {
		dispatch({ type: "FETCH_USER_DETAILS" });

		var email = user.userName;

		var password = user.password;
		if (email === 'demo' && password === 'demo@123') {
			dispatch({ 
				type: "FETCH_USER_DETAILS_FULFILLED", 
				payload: {
					"userName":"demo",
					"firstName":"demo",
					"lastName":"Kumar",
					"permissions":["DataApprove","DataCreation","DataApprove","DataCreation"]
				}
			});
		} else {
			dispatch({ type: "FETCH_USER_DETAILS_REJECTED", payload: "Invalid Credentials" });
		}
	}
}

export function getUsers() {
	return function (dispatch) {
		dispatch({ type: "FETCH_USERS" });

		return axios.get(__API__ + "/api/users/")
			.then((response) => {
				dispatch({ type: "FETCH_USERS_FULFILLED", payload: response.data.recordset })
			})
			.catch((err) => {
				dispatch({ type: "FETCH_USERS_REJECTED", payload: err })
			});
	}
}

export function getRoles() {
	return function (dispatch) {
		dispatch({ type: "FETCH_ROLES" });

		return axios.get(__API__ + "/api/roles/")
			.then((response) => {
				dispatch({ type: "FETCH_ROLES_FULFILLED", payload: response.data.recordset })
			})
			.catch((err) => {
				dispatch({ type: "FETCH_ROLES_REJECTED", payload: err })
			})
	}
}

export function AddRole(role) {
	return function (dispatch) {
		dispatch({ type: "ADD_ROLE" });

		let userName;

		if (localStorage.getItem('userDetails') !== null) {
			let userDetails = JSON.parse(localStorage.getItem('userDetails'));

			userName = userDetails['userName'];
		}

		return axios.post(__API__ + "/api/roles/", role, { 'headers': { 'UserName': userName } })
			.then((response) => {
				dispatch({ type: "ADD_ROLE_FULFILLED", payload: response.data.recordset })
			})
			.catch((err) => {
				dispatch({ type: "ADD_ROLE_REJECTED", payload: err })
			})
	}
}

export function deleteRole(roleId) {
	return function (dispatch) {
		dispatch({ type: "DELETE_ROLE" });

		return axios.delete(__API__ + "/api/roles/" + roleId)
			.then((response) => {
				dispatch({ type: "DELETE_ROLE_FULFILLED", payload: { message: response.data.message, roldId: response.data.roleId } })
			})
			.catch((err) => {
				dispatch({ type: "DELETE_ROLE_REJECTED", payload: err })
			})
	}
}

export function getRoleUsers() {
	return function (dispatch) {
		dispatch({ type: "FETCH_ROLE_USERS" });

		return axios.get(__API__ + "/api/roleusers/")
			.then((response) => {
				dispatch({ type: "FETCH_ROLE_USERS_FULFILLED", payload: response.data.recordset })
			})
			.catch((err) => {
				dispatch({ type: "FETCH_ROLE_USERS_REJECTED", payload: err })
			});
	}
}

export function addUserRole(userRole) {
	return function (dispatch) {
		dispatch({ type: "ADD_USER_ROLE" });

		let userName;

		if (localStorage.getItem('userDetails') !== null) {
			let userDetails = JSON.parse(localStorage.getItem('userDetails'));

			userName = userDetails['userName'];
		}

		return axios.post(__API__ + "/api/roleusers/", userRole, { 'headers': { 'UserName': userName } })
			.then((response) => {
				dispatch({ type: "ADD_USER_ROLE_FULFILLED", payload: response.data.recordset })
			})
			.catch((err) => {
				dispatch({ type: "ADD_USER_ROLE_REJECTED", payload: err })
			})
	}
}

export function getPermissions() {
	return function (dispatch) {
		dispatch({ type: "FETCH_PERMISSIONS" });

		return axios.get(__API__ + "/api/permissions/")
			.then((response) => {
				dispatch({ type: "FETCH_PERMISSIONS_FULFILLED", payload: response.data.recordset })
			})
			.catch((err) => {
				dispatch({ type: "FETCH_PERMISSIONS_REJECTED", payload: err })
			});
	}
}

export function getPermissionRole() {
	return function (dispatch) {
		dispatch({ type: "FETCH_PERMISSION_ROLE" });

		return axios.get(__API__ + "/api/permissionrole/")
			.then((response) => {
				dispatch({ type: "FETCH_PERMISSION_ROLE_FULFILLED", payload: response.data.recordset })
			})
			.catch((err) => {
				dispatch({ type: "FETCH_PERMISSION_ROLE_REJECTED", payload: err })
			});
	}
}

export function addPermissionRole(permissionRole) {
	return function (dispatch) {
		dispatch({ type: "ADD_PERMISSION_ROLE" });

		let userName;

		if (localStorage.getItem('userDetails') !== null) {
			let userDetails = JSON.parse(localStorage.getItem('userDetails'));

			userName = userDetails['userName'];
		}

		return axios.post(__API__ + "/api/permissionrole/", permissionRole, { 'headers': { 'UserName': userName } })
			.then((response) => {
				dispatch({ type: "ADD_PERMISSION_ROLE_FULFILLED", payload: response.data.recordset })
			})
			.catch((err) => {
				dispatch({ type: "ADD_PERMISSION_ROLE_REJECTED", payload: err })
			})
	}
}

export function getRoleApplications() {
	return function (dispatch) {
		dispatch({ type: "FETCH_ROLE_APPLICATION" });

		let userName;

		if (localStorage.getItem('userDetails') !== null) {
			let userDetails = JSON.parse(localStorage.getItem('userDetails'));

			userName = userDetails['userName'];
		}

		return axios.get(__API__ + "/api/roleapplication/", { 'headers': { 'UserName': userName } })
			.then((response) => {
				dispatch({ type: "FETCH_ROLE_APPLICATION_FULFILLED", payload: response.data.recordset })
			})
			.catch((err) => {
				dispatch({ type: "FETCH_ROLE_APPLICATION_REJECTED", payload: err })
			});
	}
}

export function getRoleRestrictedApplications() {
	return function (dispatch) {
		dispatch({ type: "FETCH_ROLE_RESTRICTED_APPLICATION" });

		let userName;

		if (localStorage.getItem('userDetails') !== null) {
			let userDetails = JSON.parse(localStorage.getItem('userDetails'));

			userName = userDetails['userName'];
		}

		return axios.get(__API__ + "/api/rolerestrictedapplication/", { 'headers': { 'UserName': userName } })
			.then((response) => {
				dispatch({ type: "FETCH_ROLE_RESTRICTED_APPLICATION_FULFILLED", payload: response.data.recordset })
			})
			.catch((err) => {
				dispatch({ type: "FETCH_ROLE_RESTRICTED_APPLICATION_REJECTED", payload: err })
			})
	}
}

export function addRoleApplication(roleApplication) {
	return function (dispatch) {
		dispatch({ type: "ADD_ROLE_APPLICATION" });

		let userName;

		if (localStorage.getItem('userDetails') !== null) {
			let userDetails = JSON.parse(localStorage.getItem('userDetails'));

			userName = userDetails['userName'];
		}

		return axios.post(__API__ + "/api/roleapplication/", roleApplication, { 'headers': { 'UserName': userName } })
			.then((response) => {
				dispatch({ type: "ADD_ROLE_APPLICATION_FULFILLED", payload: response.data.recordset })
			})
			.catch((err) => {
				dispatch({ type: "ADD_ROLE_APPLICATION_REJECTED", payload: err })
			});
	}
}

export function registerUser(data) {
	return function (dispatch) {
		dispatch({ type: "REGISTER_USER" });

		return axios.post(__API__ + "/api/register/", data)
			.then((response) => {
				dispatch({ type: "REGISTER_USER_FULFILLED", payload: response.data.message })
			})
			.catch((err) => {
				dispatch({ type: "REGISTER_USER_REJECTED", payload: err })
			});
	}
}

export function checkUsernameAvailability(data) {
	return function (dispatch) {
		dispatch({ type: "USER_NAME_AVAILABLE" });

		return axios.post(__API__ + "/api/checkusernameavailability/", data)
			.then((response) => {
				dispatch({ type: "USER_NAME_AVAILABLE_FULFILLED", payload: response.data })
			})
			.catch((err) => {
				dispatch({ type: "USER_NAME_AVAILABLE_REJECTED", payload: err })
			});
	}
}

export function fetchRestrictedFieldData(data) {
	return function (dispatch) {
		dispatch({ type: "FETCH_RESTRICTED_FIELD_DATA" });

		return axios.post(__API__ + "/api/getRestrictedFieldData/", data)
			.then((response) => {
				dispatch({ type: "FETCH_RESTRICTED_FIELD_DATA_FULFILLED", payload: response.data })
			})
			.catch((err) => {
				dispatch({ type: "FETCH_RESTRICTED_FIELD_DATA_REJECTED", payload: err })
			});
	}
}

export function addRestrictedFieldData(data) {
	return function (dispatch) {
		dispatch({ type: "ADD_RESTRICTED_FIELD_DATA" });

		let userName;

		if (localStorage.getItem('userDetails') !== null) {
			let userDetails = JSON.parse(localStorage.getItem('userDetails'));

			userName = userDetails['userName'];
		}

		return axios.post(__API__ + "/api/addRestrictedFieldData/", data, { 'headers': { 'UserName': userName } })
			.then((response) => {
				console.log(response.data.recordset);
				dispatch({ type: "ADD_RESTRICTED_FIELD_DATA_FULFILLED", payload: response.data.recordset[0] })
			})
			.catch((err) => {
				dispatch({ type: "ADD_RESTRICTED_FIELD_DATA_REJECTED", payload: err })
			});
	}
}

