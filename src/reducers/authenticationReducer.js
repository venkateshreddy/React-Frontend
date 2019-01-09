export default function reducer(state={
    userDetails: {},
    users: [],
    roles: [],
    roleusers: [],
    permissionrole: [],
    permissions: [],
		roleApplications: [],
		roleRestrictedApplications: [],
    fetching: false,
    fetched: false,
		isAuthenticated: false,
		registrationMessage: '',
		usernameAvailable: false,
    error: null,
  }, action) {
    switch (action.type) {
      case "FETCH_USER_DETAILS": {
        return {...state, fetching: true}
      }
      case "FETCH_USER_DETAILS_REJECTED": {
        return {
					...state,
					fetching: false,
					error: action.payload,
					isAuthenticated: false
				}
      }
      case "FETCH_USER_DETAILS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          isAuthenticated: true,
          userDetails: action.payload,
        }
      }
      case "FETCH_USERS": {
        return {...state, fetching: true}
      }
      case "FETCH_USERS_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_USERS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          users: action.payload,
        }
      }
      case "FETCH_ROLES": {
        return {...state, fetching: true}
      }
      case "FETCH_ROLES_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_ROLES_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          roles: action.payload,
        }
      }
      case "ADD_ROLE": {
        return {...state, fetching: true}
      }
      case "ADD_ROLE_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "ADD_ROLE_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
        }
      }
      case "DELETE_ROLE": {
        return {...state, fetching: true}
      }
      case "DELETE_ROLE_FULFILLED": {
        return {
					...state,
					roles: this.state.roles.filter(r => r.ID !== action.payload.roldId),
          fetching: false,
          fetched: true,
        }
			}
			case "DELETE_ROLE_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_ROLE_USERS": {
        return {...state, fetching: true}
      }
      case "FETCH_ROLE_USERS_REJECTED": {
        return {...state, fetching: true}
      }
      case "FETCH_ROLE_USERS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          roleusers: action.payload
        }
      }
      case "ADD_USER_ROLE": {
        return {...state, fetching: true}
      }
      case "ADD_USER_ROLE_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "ADD_USER_ROLE_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true
        }
      }
      case "FETCH_PERMISSIONS": {
        return {...state, fetching: true}
      }
      case "FETCH_PERMISSIONS_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_PERMISSIONS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          permissions: action.payload
        }
      }
      case "FETCH_PERMISSION_ROLE": {
        return {...state, fetching: true}
      }
      case "FETCH_PERMISSION_ROLE_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_PERMISSION_ROLE_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          permissionrole: action.payload
        }
      }
      case "ADD_PERMISSION_ROLE": {
        return {...state, fetching: true}
      }
      case "ADD_PERMISSION_ROLE_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "ADD_PERMISSION_ROLE_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true
        }
      }
      case "FETCH_ROLE_APPLICATION": {
        return {...state, fetching: true}
      }
      case "FETCH_ROLE_APPLICATION_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_ROLE_APPLICATION_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          roleApplications: action.payload
        }
			}
			case "FETCH_ROLE_RESTRICTED_APPLICATION": {
        return {...state, fetching: true}
      }
      case "FETCH_ROLE_RESTRICTED_APPLICATION_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_ROLE_RESTRICTED_APPLICATION_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          roleRestrictedApplications: action.payload
        }
      }
      case "ADD_ROLE_APPLICATION": {
        return {...state, fetching: true}
      }
      case "ADD_ROLE_APPLICATION_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "ADD_ROLE_APPLICATION_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          roleApplications: action.payload
        }
			}
			case "REGISTER_USER": {
				return {...state, fetching: true}
			}
			case "REGISTER_USER_FULFILLED": {
				return { ...state, fetching: false, fetched: true, registrationMessage: action.payload }
			}
			case "REGISTER_USER_REJECTED": {
				return {...state, fetching: false, error: action.payload}
			}
			case "USER_NAME_AVAILABLE": {
				return {...state, fetching: true}
			}
			case "USER_NAME_AVAILABLE_FULFILLED": {
				return { ...state, fetching: false, fetched: true, usernameAvailable: action.payload.usernameAvailable }
			}
			case "USER_NAME_AVAILABLE_REJECTED": {
				return {...state, fetching: false, error: action.payload}
			}
      case "LOCATION_CHANGE": {
        return {
          ...state
        }
      }
			case "FETCH_RESTRICTED_FIELD_DATA": {
        return {...state, fetching: true }
      }
      case "FETCH_RESTRICTED_FIELD_DATA_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_RESTRICTED_FIELD_DATA_FULFILLED": {
        return {
          ...state,
          fetching: false,
					fetched: true,
					applicationFieldUniqueValues: action.payload
				}
      }
			case "ADD_RESTRICTED_FIELD_DATA": {
        return {...state, fetching: true }
      }
      case "ADD_RESTRICTED_FIELD_DATA_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "ADD_RESTRICTED_FIELD_DATA_FULFILLED": {
        return {
          ...state,
          fetching: false,
					fetched: true,
					roleRestrictedApplications: [...state.roleRestrictedApplications, action.payload]
				}
      }
    }

    return state
}
