import style from "./recipe.module.css";
import { Link } from "react-router-dom";



export default function RecipeCard({title, image, id}) {
    return(
        <div className={style.recipe}>
            <img 
            src={image}
            alt="Image of the dish"
            className={style.image}/>
             <Link  className={style.title} to={`RecipeDetail/:${id}`}><h1>{title}</h1></Link>
        </div>
    )
}
