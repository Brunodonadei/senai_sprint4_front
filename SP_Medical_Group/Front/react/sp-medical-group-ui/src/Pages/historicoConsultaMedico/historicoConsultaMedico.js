import { Component } from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import logo from '../../assets/img/logo_spmedgroup_v2.png';

class historicoConsultaMedico extends Component{
    constructor(props){
        super(props)
        this.state = {
            listaConsulta : [],
            descricao : '',
            idDescricaoAlterada : 0,
            isLoading : false
        }
    }

    buscarConsultas = () => {
        Axios('http://localhost:5000/api/consulta/minhas/medico', {
            headers : {
                'Access-Control-Allow-Origin' : '*',
                'Authorization' : 'Bearer ' + localStorage.getItem('sp-login')
            }
        })
        .then(resposta => {
            if (resposta.status === 200) {
                this.setState({ listaConsulta : resposta.data })
                console.log(this.state.listaConsulta)
            }
        })

        .catch(erro => console.log(erro))
    }

    atualizarDescricao = () => {
        this.setState({isLoading  : true})
            
        Axios.patch('http://localhost:5000/api/Consulta/descricao/' + this.state.idDescricaoAlterada, {
             headers : {
                 'Access-Control-Allow-Origin' : '*',
                 'Authorization' : 'Bearer ' + localStorage.getItem('sp-login')
             }
        })

        .then(resposta => {
            if (resposta.status === 204) {
                console.log('Sua descrição foi alterada')

                this.setState({isLoading : false})
            }
        })

        .catch(erro => {
            console.log(erro)
            this.setState({isLoading : false})
        })

        .then(this.buscarConsultas)

    } 

    buscarConsultaPorId = (evento) => {
        this.setState({
            idDescricaoAlterada : evento.idConsulta,
            descricao : evento.descricao
        }, () => {
            this.atualizarDescricao()
        })
        
    }

    atualizaState = (campo) => {
        this.setState({[campo.target.name] : campo.target.value})
    }

    componentDidMount(){
        this.buscarConsultas()
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
                        <table style={{ borderCollapse : 'separate', borderSpacing : 30}}>
                            <thead className="consulta">
                                <tr>
                                    <th>Paciente</th>
                                    <th>Situação</th>
                                    <th>Data da Consulta</th>
                                    <th>Descrição</th>
                                </tr>
                            </thead>

                            <tbody className="consulta">
                                {
                                    this.state.listaConsulta.map(evento => {
                                        return(
                                            <tr key={evento.idConsulta}>

                                                <td>{evento.idPacienteNavigation.nomePaciente}</td>
                                                <td>{evento.idSituacaoNavigation.situacao1}</td>
                                                <td>{evento.dataConsulta}</td>
                                                <td>{evento.descricao}</td>
                                                <td><input 
                                                        className="opcoes"
                                                        type="text"
                                                        name="descricao"
                                                        value={this.state.descricao}
                                                        onChange={this.atualizaState}
                                                        placeholder="Editar descrição"/>
                                    
                                                </td>
                                                <td><button value={evento.descricao} onClick={() => this.buscarConsultaPorId(evento)}>Editar</button></td>
                                            </tr>
                                        )
                                    
                                    } )
                                }


                            </tbody>


                        </table>
                    </div>
                </section>
            </div>
        )
    }
    
}

export default historicoConsultaMedico