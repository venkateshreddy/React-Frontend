export default function reducer(state={
	applicationName: '',
	sideNavigationToggled: false,
	userName: ''
}, action) {
	switch (action.type) {
    case "SET_MENU_TOGGLE_ACTIVE": {
      return { ...state, sideNavigationToggled: true };
    }
    case "SET_MENU_TOGGLE_INACTIVE": {
      return { ...state, sideNavigationToggled: false };
    }
		case "SET_APPLICATION_NAME": {
			return {...state, applicationName: action.payload}
		}
		case "CLEAR_APPLICATION_NAME": {
			return {...state, applicationName: ''}
		}
		case "TOGGLE_SIDE_NAVIGATION_BAR": {
			return {...state, sideNavigationToggled: !state.sideNavigationToggled}
		}
		case "LOGGED_USER_NAME": {
			let userName = '';

			if(localStorage.getItem('userDetails') !== null) {
				let userDetails = JSON.parse(localStorage.getItem('userDetails'));

				userName = userDetails['userName'];
			}
			return { ...state, userName: userName }
		}
	}

	return state;
}
