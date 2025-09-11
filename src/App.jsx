import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      count is {count}
      <br />
      <button onClick={() => setCount(count + 1)}>click me</button>
    </div>
  )
}

export default App
