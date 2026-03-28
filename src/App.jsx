import { useState } from 'react'
import faviconLogo from './assets/favicon.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <section id="center">
      <div>
        <img src={faviconLogo} className="car" alt="car logo" />
        <h1>AutoDépenses</h1>
        <p>
          Comment gérer les dépenses de vos véhicules
        </p>
      </div>
      <button
        className="counter"
        onClick={() => setCount((count) => count + 1)}
      >
        Count is {count}
      </button>
    </section>
  )
}

export default App
