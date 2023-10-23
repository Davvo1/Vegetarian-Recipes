import './App.css';
import { useState, useEffect, useRef } from 'react';
import RecipeCard from './Recipe';
import loadingGif from './assets/loading.gif';
import {Routes, Route, useNavigate} from 'react-router-dom';
import RecipeDetail from './RecipeDetail';
import SearchBar from './SearchBar';


function App() {

  const apiKey = "b8c0b2e4511548e08f08ff504a6cbb0e";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const isInitialMount = useRef(true);
  
 useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    getRecipes();
  }, [query]);


  async function getRecipes() {
    try {
    let response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&diet=vegetarian`);
    if(!response.ok) {
      throw new Error('Network response was not ok');
    } 
    let data = await response.json();
    setRecipes(data.results);
    console.log(data.results);
    } catch(err) {
    console.log(err)
    } finally {    
    setLoading(false);
    }
  };

  function updateSearch(e) {
    setSearch(e.target.value);
  }

  function submitSearch(e) {
      e.preventDefault()
      setQuery(search);
      if(query === '') {
      return;
    }
    if(search === query) {
      return;
    }  
    console.log(err);
    setSearch('');
    console.log(query);
     setLoading(true);
  }


  return (
    <div className="App">
      <form className="search-form"
      onSubmit={submitSearch}>
        <input 
        className='search-bar'
        type="text"
        value={search}
        placeholder='What do you want to cook today?'
        onChange={updateSearch}
        />
      </form>
      <p className="introduction">Recommended recipes</p>
      {loading ? <img className='loading-gif'
      src={loadingGif}/> : 
      <div className='recipe-holder'>
      {recipes.map(recipe => {
        return (
          <>
        <RecipeCard 
        title={recipe.title}
        image={recipe.image}
        key={recipe.id}
        id={recipe.id}
        />
        </>
      )})}

      </div>}
    </div>
  );

}



export default App;
