import { useState, useEffect } from 'react';
import axios from 'axios'

const Main = () => {
  const [fruits, setFruits] = useState([])

  const fetchApi = async () => {
    const response = await axios.get('http://localhost:3000/api')
    setFruits(response.data)
  }

  useEffect(() => {
    fetchApi()
  }, [])

  return (
    <div>
      <h1>This is the main page!</h1>
      <p>Whooooooo!</p>
      <ul>
        {fruits.map((fruit) => 
          <li key={fruit.id}>{fruit.fruit}</li>
        )}
      </ul>
    </div>
  );
};

export default Main;