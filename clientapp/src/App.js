import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Landing } from "./pages/HomePage/landing";
import { Navbar } from "./pages/HomePage/navbar";
import { Login } from "./pages/auth/login";
import Register from "./pages/auth/register";
import Alert from './pages/HomePage/alert'
//redux
import { Provider } from "react-redux";
import store from './store'



const App = () =>
  <Provider store={store}>
    <Router>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <section className="container">
        <Alert />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </section>
    </Router>
  </Provider>

export default App;
