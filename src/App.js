import { useState, useEffect } from 'react';
import Axios from 'axios'
import './App.css';

require('dotenv').config();

function App() {

  const [foodName, setFoodName] = useState('')
  const [days, setDays] = useState(0)
  const [newFoodName, setNewFoodName] = useState('')
  const [foodList, setFoodList] = useState([])

  const getFoodList = () => {
    Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/food')
      .then((response) => {
        setFoodList(response.data)
        console.log("foodList: ", foodList)
        console.log("response: ", response)
      })
  }

  const addToList = () => {
    Axios.post(process.env.REACT_APP_BACKEND_URL + '/api/food', { foodName, days })
      .then((response) => {
        getFoodList();
      })
  }

  const updateFood = (id) => {
    Axios.put(process.env.REACT_APP_BACKEND_URL + '/api/food', { id, newFoodName })
      .then((response) => {
        getFoodList();
      })
  }

  const deleteFood = (id) => {
    Axios.delete(process.env.REACT_APP_BACKEND_URL + `/api/food/${id}`)
      .then((response) => {
        getFoodList();
      })
  }

  useEffect(() => {
    getFoodList();
  }, [])

  return (
    <div className="App">
      <h1> CRUD App para probar peticiones HTTP * - *</h1>

      <label> Food Name: </label>
      <input type='text' onChange={(event) => {
        setFoodName(event.target.value)
      }} />

      <label> Days Since I Ate It: </label>
      <input type='number' onChange={(event) => {
        setDays(event.target.value)
      }} />

      <button onClick={addToList} > Add to List </button>

      <h1> Food List </h1>

      {foodList.map((value, key) => {
        return (
          <div key={key} className="food" >
            <h1> {value.foodName} </h1>
            <h1> {value.daysSinceIAte} </h1>
            <input
              type="text"
              placeholder="New food name.."
              onChange={(event) => {
                setNewFoodName(event.target.value)
              }} />
            <button onClick={() => updateFood(value._id)} > Update </button>
            <button onClick={() => deleteFood(value._id)} > Delete </button>
          </div>
        )
      })
      }

    </div>

  );
}

export default App;
