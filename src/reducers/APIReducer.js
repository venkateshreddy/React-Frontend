const initialState = {
    data: null,
    error: null,
    cacheDataError: null,
    cacheDataSuccess: null,
    searchResults: [],
    apis: [],
    count: 0
  };
  
  export default function reducer(state = initialState, action) {
    let st = state;
    switch (action.type) {
      case 'LOAD_API_DATA': {
        st = {
          ...state,
          data: action.payload,
          cacheDataError: null
        };
        break;
      }
      case 'LOAD_API_DATA_FAILED': {
        st = {
          ...state,
          error: action.payload,
          cacheDataError: null        
        };
        break;
      }
      case 'LOAD_APIS': {
        st = {
          ...state,
          apis: action.payload        
        };
        break;
      }
      case 'LOAD_SEARCH_DATA': {
        st = {
          ...state,
          searchResults: action.payload,
          count: action.count        
        };
        break;
      }
      case 'CACHE_DATA_ERROR': {
          if (action.success){
            st = {
                ...state,
                cacheDataSuccess: action.payload,
                cacheDataError: null
            }    
          } else {
            st = {
                ...state,
                cacheDataError: action.payload,
                cacheDataSuccess: null
            }
          }
      }
      default: {
        return st;
      }
    }
    return st;
  }
  