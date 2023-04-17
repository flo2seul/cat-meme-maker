import logo from './logo.svg';
import React from 'react'
import './App.css';
import Title from "./components/Title";
import MainCard from './components/MainCard';
import Form from './components/Form'
import Favorites from './components/Favorites';


const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const fetchCat = async (text) => {
const OPEN_API_DOMAIN = "https://cataas.com";
const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
const responseJson = await response.json();
return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};

const App = () => {
  const CAT1 = "https://cataas.com/cat/HSENVDU4ZMqy7KQ0/says/react";
  const CAT2 = "https://cataas.com/cat/BxqL2EjFmtxDkAm2/says/inflearn";
  const CAT3 = "https://cataas.com/cat/18MD6byVC1yKGpXp/says/JavaScript";

  const [counter, setCounter] = React.useState(
    () => {
      return jsonLocalStorage.getItem("counter")
    }
  ); 
  const [mainCat, setMainCat] = React.useState(CAT1);
  const [favorites, setFavorites] = React.useState(
    () => {
      return jsonLocalStorage.getItem('favorites') || []
    }
  )

  const alredyFavorite = favorites.includes(mainCat)
  async function setInitialCat() {
    const newCat = await fetchCat('First cat');
    setMainCat(newCat);
  }
  
  
  React.useEffect(()=> {
    setInitialCat();
  },[])
  async function updateMainCat(value) {
    const newCat = await fetchCat(value);
    setMainCat(newCat);

    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem('counter', nextCounter);
      return nextCounter;
    })

  }
 
  function handleHeartClick() {
    const nextFavorites = [...favorites, mainCat]
    setFavorites(nextFavorites)
    jsonLocalStorage.setItem('favorites', nextFavorites)
  }

  const counterTitle = counter === null ? "" : counter + "번째 ";
  return(
  <div>
    <Title>{counterTitle}고양이 가라사대</Title>
    <Form updateMainCat={updateMainCat}/>
    <MainCard img={mainCat} onHeartClick={handleHeartClick} alredyFavorite={alredyFavorite}/>
    <Favorites favorites={favorites}/>
  </div>
  )
}

export default App;
