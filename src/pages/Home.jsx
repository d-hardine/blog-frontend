import { useState, useEffect } from 'react';
import axios from 'axios'

const Home = () => {
  const [fruits, setFruits] = useState([])

  const fetchApi = async () => {
    const response = await axios.get('/api')
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
          <li key={fruit.id}>dummy fetch from backend fruit: {fruit.fruit}</li>
        )}
      </ul>
    </div>
  );
};

export default Home;