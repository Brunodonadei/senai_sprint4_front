import { Component } from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import logo from '../../assets/img/logo_spmedgroup_v2.png';


class historicoConsulta extends Component{
    constructor(props){
        super(props);
        this.state = {
            descricao : '',
            dataConsulta : new Date(),
            idSituacao : 1,
            idMedico : 0,
            idPaciente : 0,
            listaPacientes : [],
            listaConsultas : [],
            listaMedicos : [],
            isLoading : false
        }
    }

    buscarPacientes = () => {
        Axios('http://localhost:5000/api/paciente', {
            headers : {
                'Access-Control-Allow-Origin' : '*',
                'Authorization' : 'Bearer' + localStorage.getItem('sp-login')
            }
        })
        .then(resposta => {
            if (resposta.status === 200) {
                this.setState({listaPacientes : resposta.data})
                console.log(this.state.listaPacientes)
            }
        })

        .catch(erro => console.log(erro))
    }

    buscarMedicos = () => {
        Axios('http://localhost:5000/api/medico', {
            headers : {
                'Access-Control-Allow-Origin' : '*',
                'Authorization' : 'Bearer' + localStorage.getItem('sp-login')
            }
        })
        .then(resposta => {
            if (resposta.status === 200) {
                this.setState({ listaMedicos : resposta.data })
                console.log(this.state.listaMedicos)
            }
        })

        .catch(erro => console.log(erro))
        
    }

    buscarConsultas = () => {
        Axios('http://localhost:5000/api/consulta', {
            headers : {
                'Access-Control-Allow-Origin' : '*',
                'Authorization' : 'Bearer' + localStorage.getItem('sp-login')
            }
        })
        .then(resposta => {
            if (resposta.status === 200) {
                this.setState({ listaConsultas : resposta.data })
                console.log(this.state.listaConsultas)
            }
        })

        .catch(erro => console.log(erro))
    }

    componentDidMount(){
        this.buscarConsultas()
        this.buscarMedicos()
        this.buscarPacientes()
    }

    cadastrarConsulta = (event) => {
        event.preventDefault()
        this.setState({isLoading  : true})

        let consulta = {
            idMedico : this.state.idMedico,
            idPaciente : this.state.idPaciente,
            idSituacao : parseInt(this.state.idSituacao),
            dataConsulta : new Date(this.state.dataConsulta),
            descricao : this.state.descricao
        }

        console.log(consulta)
            

        Axios.post('http://localhost:5000/api/consulta', consulta, {
             headers : {
                 'Authorization' : 'Bearer ' + localStorage.getItem('sp-login')
             }
        })

        .then(resposta => {
            if (resposta.status === 201) {
                console.log('Sua consulta foi agendada!!!!!11111')

                this.setState({isLoading : false})
            }
        })

        .catch(erro => {
            console.log(erro)
            this.setState({isLoading : false})
        })

        .then(this.buscarConsultas)

    } 

    atualizaState = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value })
    }


    render(){
        return(
            <div>
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
                        <h1>Histórico de Consultas</h1>
                        <section>
                            <div className="container">
                                <table style={{ borderCollapse : 'separate', borderSpacing : 30, align : 'center'}}>
                                    <thead className="consulta">
                                        <tr>
                                            <th>#</th>
                                            <th>Médico</th>
                                            <th>Paciente</th>
                                            <th>Situação</th>
                                            <th>Data da Consulta</th>
                                            <th>Descrição</th>
                                        </tr>
                                    </thead>

                                    <tbody className="consulta">
                                        {
                                            this.state.listaConsultas.map( evento => {
                                                return(
                                                    <tr key={evento.idConsulta}>

                                                        <td>{evento.idConsulta}</td>
                                                        <td>{evento.idMedicoNavigation.nomeMedico}</td>
                                                        <td>{evento.idPacienteNavigation.nomePaciente}</td>
                                                        <td>{evento.idSituacaoNavigation.situacao1}</td>
                                                        <td>{evento.dataConsulta}</td>
                                                        <td>{evento.descricao}</td>
        
                                                    </tr>
                                                )
                                            } )
                                        }


                                    </tbody>


                                </table>
                            </div>
                        </section>
                        <section>
                        <h1 style={{ fontSize : 50}}>Cadastro de consultas</h1>
                        <form onSubmit={this.cadastrarConsulta}>
                                <div style={{display : 'flex', flexDirection : 'column', width : '10vw'}}className="agendar">
                                    <select
                                    className="opcoes"
                                    name="idPaciente"
                                    value={this.state.idPaciente}
                                    onChange={this.atualizaState}
                                    >  
                                        <option value="0">Selecione o paciente</option>

                                        {
                                            this.state.listaPacientes.map(pacientes => {
                                                return(
                                                    <option key={pacientes.idPaciente} value={pacientes.idPaciente}>{pacientes.nomePaciente}</option>
                                                )
                                            })
                                        }
                                    </select>

                                    <select
                                    className="opcoes"
                                    name="idMedico"
                                    value={this.state.idMedico}
                                    onChange={this.atualizaState}
                                    >  
                                        <option value="0">Selecione o médico</option>

                                        {
                                            this.state.listaMedicos.map(medicos => {
                                                return(
                                                    <option key={medicos.idMedico} value={medicos.idMedico}>{medicos.nomeMedico}</option>
                                                )
                                            })
                                        }
                                    </select>

                                    <input 
                                        className="opcoes"
                                        type="text"
                                        name="descricao"
                                        value={this.state.descricao}
                                        onChange={this.atualizaState}
                                        placeholder="Descrição"
                                    
                                    />

                                    <input 
                                        className="opcoes"
                                        type="date"
                                        name="dataConsulta"
                                        value={this.state.dataConsulta}
                                        onChange={this.atualizaState}
                                        placeholder="Data da Consulta"
                                    
                                    />



                                    <select
                                        className="opcoes"
                                        name="idSituacao"
                                        value={this.state.idSituacao}
                                        onChange={this.atualizaState}
                                    >
                                        <option value="1">Agendada</option>
                                        <option value="2">Realizada</option>
                                        <option value="3">Cancelada</option>
                                    
                                    </select>

                                    {
                                        this.state.isLoading === true ?
                                        <button className="btn-cadastro" type="submit" disabled>Aguarde...</button> :
                                        <button className="btn-cadastro" type="submit">Cadastrar</button>
                                    }

                                    
                                    

                                    
                                </div>
                        </form>
                    </section>
                    </div>
        )
    }
}

export default historicoConsulta;