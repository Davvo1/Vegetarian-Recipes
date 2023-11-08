import './App.css';
import { useState, useEffect } from 'react';
import RecipeCard from './Recipe';
import NavBar from "./NavBar";
import loadingGif from './assets/loading.gif';
import chefHat from "./assets/chef.png";

function App() {

  const apiKey = "b8c0b2e4511548e08f08ff504a6cbb0e";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

 useEffect(() => {
    getRecipes();
  }, [query]);


  async function getRecipes() {
    try {
      let response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&diet=vegetarian`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      let data = await response.json();
      setRecipes(data.results);
      console.log(data.results);
    } catch (err) {
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
    if (query !== search) {
      setSearch('');
      console.log(query);
      setLoading(true);
      setSearched(true);
      console.log(searched);
    }

  }


  return (
    <div className="App">
      <NavBar
        search={search}
        updateSearch={updateSearch}
        submitSearch={submitSearch}
        showSearchBar={true}
      />
      <p className="introduction"><img src={chefHat} className='chef-hat'/>{searched ? "Searched Recipes" : "Recommended recipes"}</p>
      {loading ? <img className='loading-gif'
        src={loadingGif} /> :
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
            )
          })}

        </div>}
    </div>
  );

}



export default App;
