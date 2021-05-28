import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import wishlist from './App'

const routing = (
  <Router>
      <Switch>
        <Route exact path="/" component={wishlist} /> {/* Home */}
        {/* <Route path="/notfound" component={NotFound} /> Not Found */}
        {/* <Redirect to="/notfound" /> Redireciona para NotFound caso não encontre nenhuma rota */}
      </Switch>
  </Router>
)

ReactDOM.render( routing, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
