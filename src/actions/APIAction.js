import axios from "axios";
var CancelToken = axios.CancelToken;
var cancel;

//const API_URL = 'http://localhost:9000/cache';
const API_URL = 'http://datasearchapi.mcbitsstech.com/cache';
const headers = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
export function getSearchData(apiname, columns, pattern, page, pageSize, sorted) {
    return function (dispatch) {
        if (cancel != undefined) {
            cancel();
        }
        return axios({
            method: 'post',
            url: `${API_URL}/get/${apiname}`,
            data: { columns, pattern, sorted, start: (page * pageSize), end: ((page * pageSize) + pageSize) },
            cancelToken: new CancelToken(function executor(c) {
                cancel = c;
            })
        })
		.then((response) => {
            if (response.data.error){
                alert(response.data.error);
                dispatch({ type: "LOAD_SEARCH_DATA_FAILED", payload: response.data.error })
            } else {
                dispatch({ type: "LOAD_SEARCH_DATA", payload: response.data.data, count: response.data.count })
            }
        })
        .catch((err) => {
            dispatch({ type: "LOAD_SEARCH_DATA_FAILED", payload: err })
        });
	}
}
export function loadApis() {
    return function (dispatch) {
		return axios.get(`${API_URL}/allapis`)
        .then((response) => {
            dispatch({ type: "LOAD_APIS", payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: "LOAD_APIS_FAILED", payload: err })
        });
	}
}
export function deleteAPI(apiname) {
    return function (dispatch) {
		return axios.get(`${API_URL}/delete/${apiname}`)
        .then((response) => {
            dispatch({ type: "LOAD_APIS", payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: "DELETE_API_FAILED", payload: err })
        });
	}
}
export function getApiData(url) {
	return function (dispatch) {
		return axios.get(url)
			.then((response) => {
				dispatch({ type: "LOAD_API_DATA", payload: response.data })
			})
			.catch((err) => {
				dispatch({ type: "LOAD_API_DATA_FAILED", payload: err })
			});
	}
}
export function saveApiData(name, data, columns) {
	return function (dispatch) {
		return axios.post(`${API_URL}/create/${name}`, { data, columns }, headers)
        .then((response) => {
            if (response.data.error) {
                dispatch({ type: "CACHE_DATA_ERROR", payload: response.data.error, success: false })
            } else if (response.data === '') {
                dispatch({ type: "CACHE_DATA_ERROR", payload: "Empty response", success: false })
            } else {
                dispatch({ type: "CACHE_DATA_ERROR", payload: "Data has been added to cache", success: true })
            }
        })
        .catch((err) => {
            console.log(err);
        });
	}
}
