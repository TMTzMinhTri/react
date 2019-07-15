import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/HomePage/landing";
import Navbar from "./pages/HomePage/navbar";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Alert from './pages/HomePage/alert'
import Dashboard from './pages/dashboard/Dashboard'
import CreateProfile from './pages/profile/createProfile'
import EditProfile from './pages/profile/editProfile'
import AddExperience from './pages/profile/addExperience'
import AddEducation from './pages/profile/addEducation'
import Profiles from './pages/dashboard/profiles/profiles'

import PrivateRoute from './utils/PrivateRoute'
//redux
import { Provider } from "react-redux";
import store from './store'
import { loadUser } from './actions/auth'
import { setAuthToken } from "./utils/setAuthToken";


if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profiles" component={Profiles} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute exact path="/add-experience" component={AddExperience} />
            <PrivateRoute exact path="/add-education" component={AddEducation} />
          </Switch>
        </section>
      </Router>
    </Provider>
  )
}



export default App;
