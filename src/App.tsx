import { useState } from 'react'
import useEventListener from '@use-it/event-listener'
import logo from './logo.svg'
import './App.css'
import useCalc from './hooks/useCalc';

(window as any).global = window;


function App() {
  const { valorTela, resultado, calcKey} = useCalc()
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className='tela'>
          <h2>{valorTela}</h2>
          <h1>{resultado}</h1>
        </div>
        <div className='grid-botoes'>
          {calcKey.map((value: any) => {
            if(value.digito === "="){
              return (
                <button style={{fontSize: 36}} key={value.digito} type="button" onClick={value.fn}>
                  {value.digito}
                </button>
              )
            }
            return (
                <button style={{fontSize: 36, width: 100}} key={value.digito} type="button" onClick={value.fn}>
                  {value.digito}
                </button>
          )})}
        </div>
      </header>
    </div>
  )
}

export default App
