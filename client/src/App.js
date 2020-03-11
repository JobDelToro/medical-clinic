import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider, observer } from 'mobx-react';

import Dashboard from './containers/layout/dashboard';
import SignUp from './containers/signup/SignUp';
import SignIn from './containers/signin/SignIn';
import ClinicianEdit from './containers/clinician/ClinicianEdit';

import history from './history';
import Store from './store';
import './App.css';

const store = new Store();

 const App = () => {
  return (
	  <Provider store={store}>
		  <Router history={history}>
			  <Switch>
				<Route path="/" exact component={Dashboard}/>
				<Route path="/signup" exact component={SignUp} />
				<Route path="/signin" exact component={SignIn} />
				<Route path="/clinician/edit/:id" exact component={ClinicianEdit}/>
			  </Switch>
		  </Router>
	  </Provider>
	
  );
};

export default observer(App);
