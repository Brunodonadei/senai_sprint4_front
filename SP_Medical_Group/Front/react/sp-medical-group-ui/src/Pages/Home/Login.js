import { Link } from 'react-router-dom';

import React, { Component } from 'react';
import axios from 'axios';
import { parseJwt, usuarioAutenticado } from '../../services/auth';

import '../../assets/css/login.css'
import logo from '../../assets/img/logo_spmedgroup_v2.png'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            senha: '',
            erroMensagem: '',
            taCarregando: false
        }
    }

    efetuaLogin = (event) => {
        event.preventDefault();

        this.setState({ erroMensagem: '', taCarregando: true })

        axios.post('http://localhost:5000/api/login', {
            email: this.state.email,
            senha: this.state.senha
        })

            .then(resposta => {
                if (resposta.status === 200) {

                    localStorage.setItem('sp-login', resposta.data.token)
                    console.log(resposta.data.token)

                    // console.log('Meu token é: ' + resposta.data.token)

                    this.setState({ email: '', senha: '' })

                    this.setState({ taCarregando: false })

                    // let base64 = localStorage.getItem('sp-login').split('.')[1]

                    // console.log(base64)
                    // console.log(window.atob(base64))
                    // console.log(JSON.parse(window.atob(base64)).role)

                    console.log(parseJwt());
                    console.log(parseJwt().role)

                    if (parseJwt().role === "1") {
                        this.props.history.push('/consulta')
                    }
                    else if (parseJwt().role === "2") {
                        this.props.history.push('/minhas')
                    }
                    else if (parseJwt().role === "3") {
                        this.props.history.push('/medico')
                    }
                }
            })

            .catch(() => {
                this.setState({ erroMensagem: "E-mail ou senha inválidos! Tente novamente.", taCarregando: false })
            })
    }

    atualizaState = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value })
    }

    render() {
        return (
            <nav>
            <header className="header">
                <img src={logo} alt="Logo"/>
                    <nav>
                        <ul className="menu">
                        <li><Link to="/consulta">Marcar Consulta</Link></li>
                        <li><Link to="/minhas">Histórico Consultas - Paciente</Link></li>
                        <li><Link to="/medico"> Histórico de Consultas - Médico</Link></li>
                        <li><a>Médicos</a></li>
                        <li><Link to="/">Login</Link></li>
                        </ul>
                    </nav>
            </header>
            <h1>Login</h1>
                <div className="content">
                    <h2>Olá! Somos a Sp Medical Group. Pensamos no melhor para você, e no melhor para sua saúde. Bem Vindo(a).</h2>
                    <h2>Faça login para iniciar o agendamento de suas consultas:</h2>
                </div>
                <form onSubmit={this.efetuaLogin} className="login-box">
                    <div className="text-box">
                    <input className="email" type="text" placeholder="E-mail" name="email" value={this.state.email} onChange={this.atualizaState}/>
     
                    </div>
                        <div className="text-box">
                        <input className="senha" type="password" placeholder="Senha" name="senha" value={this.state.senha} onChange={this.atualizaState}/>
                
                    </div>
                        <div className="text-box">
                        {
                            this.state.taCarregando === true ?
                            <button className="btn" type="submit" disabled>Aguarde...</button> :
                            <button className="btn" type="submit" disabled={this.state.email === '' || this.state.senha === '' ? 'none' : ''}>Login</button>
                        }
                        <div className="text-box">
                            <p style={{ color : 'red'}}>{this.state.erroMensagem}</p>
                        </div>
                    </div>
                </form>
            </nav>
        )
    }
}

export default Login;