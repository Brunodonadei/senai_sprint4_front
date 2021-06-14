import { Component } from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import logo from '../../assets/img/logo_spmedgroup_v2.png';

class historicoConsultaPaciente extends Component{
    constructor(props){
        super(props)
            this.state = {
                listaConsulta : [],
            }
        }

            buscarConsultas = () => {
                Axios('http://localhost:5000/api/consulta/minhas', {
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
                                <table style={{ borderCollapse : 'separate', borderSpacing : 30, align : 'center'}}>
                                    <thead className="consulta">
                                        <tr>
                                            <th>Médico</th>
                                            <th>Especialidade</th>
                                            <th>Situação</th>
                                            <th>Data da Consulta</th>
                                            <th>Descrição</th>
                                        </tr>
                                    </thead>

                                    <tbody className="consulta">
                                        {
                                            this.state.listaConsulta.map( evento => {
                                                return(
                                                    <tr key={evento.idConsulta}>

                                                        <td>{evento.idMedicoNavigation.nomeMedico}</td>
                                                        <td>{evento.idMedicoNavigation.idEspecialidadeNavigation.nomeEspecialidade}</td>
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
                    </div>
                )
            }

}

export default historicoConsultaPaciente;