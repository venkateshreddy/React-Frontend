export default function reducer(state={
		applications: [],
    gridElements: [],
    restrictedApplications: [],
		dataForApproval: [],
		modifiedDataForApproval: [],
		uploadedFileData: {},
		applicationFieldUniqueValues: [],
		application: {
			name: "",
			data: [],
			restrictedColumnData: [],
			metadata: [],
			gridSettings: []
		},
		fetching: false,
		fetched: false,
		creatingApplication: false,
		createdApplication: false,
		errorCreatingApplication: false,
    error: null,
    formElements: []
  }, action) {
    switch (action.type) {
      case "SAVE_CONTAINER_TITLE": {
        const newGridElements = [];
        state.gridElements.map((element, index)=> {
          const tempElement = element;
          if(tempElement.id === action.id){
            tempElement.title = action.title;
          }
          newGridElements.push(tempElement);
        });
        return { ...state, gridElements: newGridElements };
      }
      // case "ADD_CHILD_ELEMENT": {
      //   const newGridElements = [];
      //   state.gridElements.map((element, index)=> {
      //     const tempElement = element;
      //     if(element.id !== undefined && action.parent === element.id){
      //       element.elements.push(action.id);
      //     }
      //     newGridElements.push(tempElement);
      //   });
      //   return { ...state, gridElements: newGridElements };
      // }
      // case "SAVE_CONTAINER_LAYOUT": {
      //   let parentElement = null;
      //   state.gridElements.map((element, index)=> {
      //     if(element.id !== undefined && action.parent === element.id){
      //       parentElement = element;
      //     }
      //   });
      //   const tempLayout = {};
      //   if(parentElement !== null){
      //     parentElement.elements.map((id, index) => {
      //       tempLayout[id] = action.layout[index];
      //     });
      //   }
      //   const finalElements = [];
      //   state.gridElements.map((element, index)=> {
      //     const tempElement = element;
      //     if(tempElement.id !== undefined && tempLayout[tempElement.id] !== undefined){
      //       tempElement.position = tempLayout[tempElement.id];
      //     }
      //     finalElements.push(tempElement);
      //   });
      //   return { ...state, gridElements: finalElements };
      // }
      case "DELETE_GRID_ELEMENT": {
        const newGridElements = [];
        state.gridElements.map((element, index)=> {
          if(element.columnName !== action.columnName){
            newGridElements.push(element);
          }
        });
        return { ...state, gridElements: newGridElements };
      }
      case "ADD_GRID_ELEMENT": {
        const newGridElements = [];
        state.gridElements.map((element, index)=> {
          newGridElements.push(element);
        });
        newGridElements.push(action.element);
        return { ...state, gridElements: newGridElements };
      }
      case "SAVE_GRID_LAYOUT": {
        const newGridElements = [];
        state.gridElements.map((element, index) => {
          const tempElement = element;
          action.layouts.map((position)=>{
            if(tempElement.id === parseInt(position.i, 10)){
              if(position.w === 1){
                position.w = 200;
              }
              tempElement.position = position;
            }
          })
          newGridElements.push(tempElement);
        });
        return { ...state, gridElements: newGridElements };
      }
      case "SET_GRID_ELEMENTS": {
        return { ...state, gridElements: action.elements };
      }
      case "CLEAR_FORM_ELEMENTS": {
        return { ...state, formElements: [] };
      }
      case "SET_FORM_ELEMENTS": {
        return { ...state, formElements: action.data };
      }
      case "FETCH_APPLICATIONS": {
        return {...state, fetching: true}
      }
      case "FETCH_APPLICATIONS_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_APPLICATIONS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          applications: action.payload,
        }
      }
      case "FETCH_RESTRICTED_APPLICATIONS": {
        return {...state, fetching: true}
      }
      case "FETCH_RESTRICTED_APPLICATIONS_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_RESTRICTED_APPLICATIONS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          restrictedApplications: action.payload,
        }
			}
			case "FETCH_RESTRICTED_APPLICATION_DATA": {
        return {...state, fetching: true}
      }
      case "FETCH_RESTRICTED_APPLICATION_DATA_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_RESTRICTED_APPLICATION_DATA_FULFILLED": {
				let application = state.application;

				application['data'] = action.payload.data;

				application['restrictedColumnData'] = action.payload.restrictionData;

				return {
          ...state,
          fetching: false,
          fetched: true,
          application
        }
			}
			case "UPDATE_GRID_SETTINGS": {
        return {...state, fetching: true}
      }
      case "UPDATE_GRID_SETTINGS_FULFILLED": {
				return {
          ...state,
          fetching: false,
          fetched: true
        }
			}
			case "UPDATE_GRID_SETTINGS_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
			case "FETCH_APPLICATION_METADATA": {
        return {...state, fetching: true}
      }
      case "FETCH_APPLICATION_METADATA_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_APPLICATION_METADATA_FULFILLED": {
				let application = state.application;

				application['metadata'] = action.payload;

				application['gridSettings'] = JSON.parse(action.payload.gridSettings);

				return {
          ...state,
          fetching: false,
          fetched: true,
          application
        }
			}
			case "ADD_APPLICATION": {
        return {
					...state,
					fetching: true,
					creatingApplication: true
				}
      }
      case "ADD_APPLICATION_REJECTED": {
        return {
					...state,
					fetching: false,
					error: action.payload,
					errorCreatingApplication: true
				}
      }
      case "ADD_APPLICATION_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
					applications: action.payload,
					createdApplication: true
        }
			}
			case "RESET_ADD_APPLICATION_FLAGS": {
				return {
					...state,
					creatingApplication: false,
					createdApplication: false,
					errorCreatingApplication: false
				}
			}
      case "UPLOAD_APPLICATION": {
        return {...state, fetching: true }
      }
      case "UPLOAD_APPLICATION_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "UPLOAD_APPLICATION_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          applications: action.payload,
        }
			}
			case "UPLOAD_APPLICATION_FOR_APPROVAL": {
        return {...state, fetching: true }
      }
      case "UPLOAD_APPLICATION_FOR_APPROVAL_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "UPLOAD_APPLICATION_FOR_APPROVAL_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true
        }
      }
      case "AUDIT_APPLICATION": {
        return {...state, fetching: true }
      }
      case "AUDIT_APPLICATION_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "AUDIT_APPLICATION_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          applications: action.payload,
        }
      }
      case "FETCH_APPLICATION_AUDIT": {
        return {...state, fetching: true }
      }
      case "FETCH_APPLICATION_AUDIT_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_APPLICATION_AUDIT_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          applications: action.payload,
        }
      }
      case "SUBMIT_DATA_FOR_APPROVAL": {
        return {...state, fetching: true }
      }
      case "SUBMIT_DATA_FOR_APPROVAL_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "SUBMIT_DATA_FOR_APPROVAL_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true
        }
			}
			case "FETCH_DATA_FOR_APPROVAL": {
        return {...state, fetching: true }
      }
      case "FETCH_DATA_FOR_APPROVAL_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_DATA_FOR_APPROVAL_FULFILLED": {
        return {
          ...state,
          fetching: false,
					fetched: true,
					dataForApproval: action.payload
        }
			}
			case "FETCH_MODIFIED_DATA_FOR_APPROVAL": {
        return {...state, fetching: true }
      }
      case "FETCH_MODIFIED_DATA_FOR_APPROVAL_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_MODIFIED_DATA_FOR_APPROVAL_FULFILLED": {
        return {
          ...state,
          fetching: false,
					fetched: true,
					modifiedDataForApproval: action.payload
        }
			}
			case "ADD_APPLICATION_RECORD": {
        return {...state, fetching: true }
      }
      case "ADD_APPLICATION_RECORD_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "ADD_APPLICATION_RECORD_FULFILLED": {
        return {
          ...state,
          fetching: false,
					fetched: true
        }
			}
			case "EDIT_APPLICATION_RECORD": {
        return {...state, fetching: true }
      }
      case "EDIT_APPLICATION_RECORD_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "EDIT_APPLICATION_RECORD_FULFILLED": {
        return {
          ...state,
          fetching: false,
					fetched: true
        }
      }
      case "UPDATE_AUDIT_STATUS": {
        return {...state, fetching: true }
      }
      case "UPDATE_AUDIT_STATUS_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "UPDATE_AUDIT_STATUS_FULFILLED": {
        return {
          ...state,
          fetching: false,
					fetched: true
        }
      }
			case "REJECT_UPDATE_APPLICATION_RECORD": {
        return {...state, fetching: true }
      }
      case "REJECT_UPDATE_APPLICATION_RECORD_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "REJECT_UPDATE_APPLICATION_RECORD_FULFILLED": {
        return {
          ...state,
          fetching: false,
					fetched: true
        }
			}
			case "REJECT_APPLICATION_RECORD": {
        return {...state, fetching: true }
      }
      case "REJECT_APPLICATION_RECORD_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "REJECT_APPLICATION_RECORD_FULFILLED": {
        return {
          ...state,
          fetching: false,
					fetched: true
        }
			}
			case "READ_UPLOADED_FILE_DATA": {
        return {...state, fetching: true }
      }
      case "READ_UPLOADED_FILE_DATA_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "READ_UPLOADED_FILE_DATA_FULFILLED": {
        return {
          ...state,
          fetching: false,
					fetched: true,
					uploadedFileData: action.payload
				}
			}
			case "UPDATE_APPLICATIONS": {
        const { id, text } = action.payload
        const newApplications = [...state.applications]
        const applicatioToUpdate = newApplications.findIndex(application => application.id === id)
        newApplications[applicationToUpdate] = action.payload;

        return {
          ...state,
          applications: newApplications,
        }
      }
    //   case "DELETE_TWEET": {
    //     return {
    //       ...state,
    //       tweets: state.tweets.filter(tweet => tweet.id !== action.payload),
    //     }
    //   }
    }

    return state
}
