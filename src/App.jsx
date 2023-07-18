import {useState } from 'react'
import './App.css'

function App() {
  let semana = new Date().getDay()
  let diasSema = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  let queDia = diasSema[semana]
  let meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  let mes = new Date().getMonth()
  let queMes = meses[mes]
  let day = new Date().getDate()
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [dia, setDia] = useState('')
  const [nameCity, setNameCity] = useState('')
  const [grauCity, setGrauCity] = useState('')
  const [descri, setDescri] = useState('')
  let [iconClima, setIconClima] = useState('')

  async function atuClima() {
    const buscandoClima = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=fa0f33a054890bc5fd73371867e43d84&lang=pt_br`)
    const respostaClima = await buscandoClima.json()

    if (!buscandoClima.ok) {
      setError('Erro ' + buscandoClima.status)
      setInput('')
      setNameCity('')
      setDescri('')
      setDia('')
      setGrauCity('')
      setIconClima('')
    }else {
      setError('')
      setInput('')
       console.log(respostaClima)
       let temp = Math.floor(respostaClima.main.temp)
       let resulTemp = temp - 273
       setDia(`${queDia}, ${day} de ${queMes} ${new Date().getFullYear()}`)
       setNameCity(respostaClima.name)
       setGrauCity(resulTemp +'°C')
       respostaClima.weather.forEach(elementoArray => {
        iconClima = `https://openweathermap.org/img/wn/${elementoArray.icon}@2x.png` 
        setIconClima(iconClima)
        setDescri(elementoArray.description)
       })
    }
  }
  function buscar(ev) {
    ev.preventDefault()
    atuClima()
  }
  return (
    <>
    <form onSubmit={buscar}>
      <input 
      type="text" 
      placeholder='Digite sua cidade' 
      value={input} 
      onChange={(e) => setInput(e.target.value)}
      />
      <button>Buscar</button>
    </form>
    <div id='erro'>{error}</div>
    <div id='container'>
    <div id='respostaClima'>
    <div id='nameCity'>{nameCity}</div>
    <div>{dia}</div>
    <div id="division">
    <img id='imgClima' src={iconClima}/>
    <div>
    <div id='grau'>{grauCity}</div>
    <div id='descri'>{descri}</div>
    </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default App
