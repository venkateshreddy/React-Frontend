/**
 * Created by svs on 9/10/17.
 */
import { setNewEmployee } from '../actions/EmployeeActions';
import { server } from './config';

const request = require('superagent');

export const updateNewEmployee = (employeeData, shouldUpdateState, dispatch, setSyncedWithServer) => {
  const url = 'http://0.0.0.0:9000/employees/updateNewEmployee';
  request.post(url)
  .send(employeeData)
  .set('access_token', 'masterKey')
  .set('Accept', 'application/json')
    .end((err, res) => {
      if (err || !res.ok) {
        console.log('Oh no! error');
      } else {
        console.log(JSON.stringify(res.body));
        setSyncedWithServer(true);
        if (shouldUpdateState) {
          console.log('updating state');
          dispatch(setNewEmployee(res.body));
        }
      }
    });
};

export const findNewEmployee = (employeeData, shouldUpdateState, dispatch) => {
  const url = `${server}/employees/findNewEmployee`;
  request.post(url)
    .send(employeeData)
    .set('access_token', 'masterKey')
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err || !res.ok) {
        console.log('Oh no! error');
      } else {
        console.log(JSON.stringify(res.body));
        if (shouldUpdateState) {
          console.log(server);
          console.log('updating state');
          dispatch(setNewEmployee(res.body));
        }
      }
    });
};
