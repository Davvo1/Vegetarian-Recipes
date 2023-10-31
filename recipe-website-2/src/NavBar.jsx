import style from "./navbar.module.css";
import logo from "./assets/logo.png";
import { Link } from "react-router-dom";



export default function NavBar({submitSearch, search, updateSearch, showSearchBar}) {
   return(
    <div class={style.navbar}>
    <img src={logo} className={style.appLogo}/>
    { showSearchBar && (
    <form className={style.searchForm}
        onSubmit={submitSearch}>
        <input
          className={style.searchBar}
          type="text"
          value={search}
          placeholder='What do you want to cook today?'
          onChange={updateSearch}
        />
      </form>)}
    </div>
    )
}