import './App.css';
import { useState, useEffect, useRef } from 'react';
import RecipeCard from './Recipe';
import loadingGif from './loading.gif';
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
      // Skip the effect on initial render
      isInitialMount.current = false;
      return;
    }

    getRecipes();
  }, [query]);


  async function getRecipes() {
    let response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&diet=vegetarian`);
    let data = await response.json();
    setRecipes(data.results);
    console.log(data.results);
    setLoading(false);
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
        onChange={updateSearch}
        />
        <button className='search-button'>
          Search
        </button>
      </form>
      <p className="introduction">All your favorite recipes, in one place</p>
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
