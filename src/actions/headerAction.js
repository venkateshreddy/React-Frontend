
export function setApplicationName(applicationName) {
	return function(dispatch) {
		dispatch({type: "SET_APPLICATION_NAME", payload: applicationName});
	}
}

export function clearApplicationName() {
	return function(dispatch) {
		dispatch({type: "CLEAR_APPLICATION_NAME"});
	}
}

export function toggleSideNavigationBar() {
	return function(dispatch) {
		dispatch({type: "TOGGLE_SIDE_NAVIGATION_BAR"});
	}
}

export function loggedUserName() {
	return function(dispatch) {
		dispatch({ type: "LOGGED_USER_NAME" });
	}
}
