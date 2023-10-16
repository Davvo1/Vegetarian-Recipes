import { useState } from "react";

export default function SearchBar() {
    
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');
    
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
    
    
    return(
    <>
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
    </>
    )
}