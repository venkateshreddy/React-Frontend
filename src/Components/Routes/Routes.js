import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { createHashHistory } from 'history'
import Layout from '../Layout/Layout';
import Login from '../Login/Login';
import AddApi from '../AddAPI/AddApi';
import SearchData from '../SearchData/SearchDataTable';

// const history = new createBrowserHistory();
const history = createHashHistory({
  basname: '',
  hashType: 'slash'
})
const NoMatch = () => {
  return (
    <h1>No match found.</h1>
  )
}
class Routes extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <Router history={history}>
        <Route path="/" component={Layout}>
          <IndexRoute component={SearchData} />
          {/* </Route> */}
          <Route path="Login" name="Login" component={Login} />
          <Route path="create" name="Add API" component={AddApi} />
          <Route path="search" name="Search Data" component={SearchData} />
          <Route path="*" component={NoMatch}/>
        </Route>
      </Router>
    );
  }
}

export default Routes;
