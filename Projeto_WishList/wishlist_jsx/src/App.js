import { Component } from 'react';
import desejo from './img/trash-alt-solid.svg';
import logo from './img/LogoWishList.png';
import './App.css';

class wishlist extends Component
{
  constructor(props)
  {
    super(props);
    this.state = 
    {
       descricaoArray  : [],
       email      : '',
       email1     : '',
       senha      : '',
       idUser     : 1,
       desejo     : ''
    }
  }

  componentDidMount()
  {
    this.listarDesejo()
  }

  listarDesejo = () =>
  {
    console.log('ta funfando confia!!')

    fetch('http://localhost:5000/api/Desejo') 

    .then(resposta => resposta.json())

    .then(dados => this.setState({descricaoArray : dados}))

    .catch(erro => console.log(erro))
  }

  cadastrarDesejo = (event) =>
  {
    event.preventDefault();

    fetch('http://localhost:5000/api/Desejo',
    {
      method : 'POST',

      body : JSON.stringify({ descricao : this.state.desejo,
                              idUsuario : this.state.idUser}),

      headers : {
        "Content-Type" : "application/json"
    }
    })

    .then(console.log('Tipo de Evento cadastrado!'))

    .catch(erro => console.log(erro))

    .then(this.listarDesejo)
  }

  limparCampos = () =>
  {
    this.setState(
      {
        email      : '',
        email1     : '',
        senha      : '',
        desejo     : ''
      }
    )
  }

  atualiazarDesejo = async (event) =>
  {
    await this.setState({ desejo : event.target.value})
  }

  atualiazarid = async (event) =>
  {
    await this.setState({ idUsuario : event.target.value})
  }

    render()
    {
      return ( 
       
        <div className="coluna body">

          <section className="container dis spa">

              <section className="contaiter-wishlist coluna spa">

                  <img src={logo} alt="Logo Wish List"/>

                    <div className="content-wishlist dis">

                        {
                          this.state.descricaoArray.map( (wish) => {
                            return(

                          <div className="wishlist dis">
                                <div className="texto-wishlist">
                                  <h4>Desejo número: {wish.idDesejo}</h4>
                                  <h4>Descrição:</h4>
                                  <p>{wish.descricao}</p>
                                </div>
        
                              <img src={desejo} alt="Botão de exluir (formato de lixo)" onclick="deletar()" />
                          </div>
                            )
                          })

                        }

                    </div>

          </section>

              <section className="container-inputs coluna">

                      <form onSubmit={this.cadastrarUser} className="box coluna spa">
                          <h1>Usuário</h1>
                          <input type="email" value={this.state.email1} onChange={this.atualiazarUser} placeholder="E-mail"/>
                          <input type="password" value={this.state.senha} onChange={this.atualiazarUser} placeholder="Senha"/>

                          <div className="botao dis">
                              <button type="submit">Visualizar →</button>
                          </div>
                      </form>

                      <form onSubmit={this.cadastrarDesejo} className="box coluna spa">
                          <h1>Cadastrar novo desejo</h1>
                          <input type="number" value={this.state.idUser} onChange={this.atualiazarid} placeholder="Id do seu usuário"/>
                          <input type="text" value={this.state.desejo} onChange={this.atualiazarDesejo} placeholder="Digite seu desejo"/>
                          <button type="submit">→</button>
                      </form>

              </section>

          </section>

        </div>

      );
    }
}

export default wishlist;
