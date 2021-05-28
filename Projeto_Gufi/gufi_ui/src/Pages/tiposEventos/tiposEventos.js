import { Component } from 'react';

class TiposEventos extends Component{
    constructor(props){
        super(props);
        this.state = {
            // State : valor inicial
            listaTiposEventos : [],
            titulo : ''
        }
    }

    componentDidMount(){

    }

    render(){
        return(
            <div>
                <main>
                    <section>
                        {/* lista de tipos de eventos */}
                        <h2>Lista de tipos de eventos</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th> {/* IDs */}
                                    <th>Título</th> {/* Titulos */}
                                </tr>
                            </thead>
                        </table>
                    </section>
                </main>
            </div>
        )
    }
}

export default TiposEventos;