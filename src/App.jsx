import { useState } from 'react'
import ConvertForm from "./components/ConvertForm"
import './App.css'


function App() {


  return (
    <>
      <div className="currency-convertor">
        <h2 className="currency-title"> Currency convertor</h2>
      <ConvertForm />

      </div>
    </>
  )
}

export default App
