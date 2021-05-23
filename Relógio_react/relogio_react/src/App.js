import React from 'react';
import './App.css';

// Define uma função que retorna um h2 com a data formatada
function DataFormatada(props) {
  return <h2>Horário Atual: {props.date.toLocaleTimeString()}</h2>
}

// Define a classe 'Clock' que será chamada na renderização dentro do App
class Clock extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      // O state é um valor inicial
      // Define o estado 'Date' pegando a data/hora atual
      date : new Date()
    };
  }

  // Ciclo de vida que ocorre quando a classe 'Clock' é inserido na DOM
  componentDidMount(){
    this.timerID = setInterval( () => {
      this.tikTokOnTheClock()
    }, 1000 )
  }

  // Ciclo de vida que ocorre quando o componente é removido da DOM
  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  // Define no state date a data atual a cada vez que é chamada
  tikTokOnTheClock(){
    this.setState({
      date : new Date() // = DateTime.Now (c#)
    })
  }

  // Pausa o relógio "matando" o seu processo
  pause() {    
    clearInterval(this.timerID)
    console.log(`Relógio ${this.timerID} pausado`)
  }

  // Retoma o processo do rolégio, criando um novo para substituí-lo
  retomar(){
    this.timerID = setInterval (() => {
      this.tikTokOnTheClock()
    }, 1000);
    console.log(`Relógio ${this.timerID} retomado`)
    console.log(`Agora eu sou o relógio ${this.timerID}`)
}

// Renderiza na tela os itens visuais
  render(){
    return (
      <div>
        <h1>Relógio</h1>
        <DataFormatada date = {this.state.date} />
        <button style={{margin : "20px", backgroundColor : "red", color: "white", height : "25px", fontWeight: "600"}} onClick={() => this.pause()}>Pausar</button>
        <button style={{backgroundColor : "green", color : "white", height : "25px", fontWeight: "600"}} onClick={() => this.retomar()}>Retomar</button>
      </div>
    )
  }
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Clock />
        <Clock />
      </header>
    </div>
  );
}

export default App;
