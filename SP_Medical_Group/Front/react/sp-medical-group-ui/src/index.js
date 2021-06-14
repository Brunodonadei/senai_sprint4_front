import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { parseJwt, usuarioAutenticado } from './services/auth';

import './index.css';

import historicoConsultaPaciente from './Pages/historicoConsultaPaciente/historicoConsultaPaciente';
import historicoConsulta from './Pages/historicoConsulta/historicoConsulta';
import notFound from './Pages/NotFound/notFound';
import Login from './Pages/Home/Login';

import reportWebVitals from './reportWebVitals';
import historicoConsultaMedico from './Pages/historicoConsultaMedico/historicoConsultaMedico';

const PermissaoAdm = ({component : Component}) => (
  <Route 
    render = { props =>
      usuarioAutenticado() && parseJwt().role === "1" ?
      <Component {...props} /> : 
      <Redirect to = '/' />
    }
  />
)

const PermissaoPaciente = ({ component : Component }) => (
  <Route 
    render = { props =>
      usuarioAutenticado() && parseJwt().role === "2" ?
      <Component {...props} /> :
      <Redirect to = '/' />
    }
  
  />
)

const PermissaoMedico = ({ component : Component }) => (
  <Route 
    render = { props =>
      usuarioAutenticado() && parseJwt().role === "3" ?
      <Component {...props} /> :
      <Redirect to = '/' />
    }
  
  />
)

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <PermissaoAdm path="/consulta" component={historicoConsulta} />
        <PermissaoPaciente path="/minhas" component={historicoConsultaPaciente}/>
        <PermissaoMedico path="/medico" component={historicoConsultaMedico}/>
        {/* <Route path="/login" component={Login}/> */}
        <Route path="/notFound" component={notFound} />
        <Redirect to ="/notFound" component={notFound} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
