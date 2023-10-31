import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import style from "./description.module.css";
import NavBar from "./NavBar";

export default function recipeDetail() {

    const apiKey = "b8c0b2e4511548e08f08ff504a6cbb0e"; 
    const { id } = useParams();
    const recipeId = id.replace(":", "");
    const [recipeInfo, setRecipeInfo] = useState({});
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        fetchRecipe();
    }, [recipeId]);



    async function fetchRecipe() {
        let request = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`);
        let data = await request.json();
        console.log(data);
        setRecipeInfo(data);
    }
    return(
        <> 
        <NavBar showSearchBar={false}/>
        <div className={style.recipe}>
        <div className={style.titleContainer}>
            <img src={recipeInfo.image} className={style.image}/>   
            <div className={style.title}>
                <h1>{recipeInfo.title}</h1>
            </div>
        </div>
        <div className={style.recipeInformation}>
        <div className={style.info}>
            <p>Servings: {recipeInfo.servings}</p>
            <p>Diet: {recipeInfo.diets && recipeInfo.diets[0]}</p>
            <p>Cooking time: {recipeInfo.readyInMinutes}m</p>
        </div>
        <div className={style.list}>    
        <ul>
            <h2>Ingredients</h2>
            {recipeInfo.extendedIngredients && recipeInfo.extendedIngredients.map((ingredient, index) => (
                        <li key={index}>{ingredient.original}</li>
                    ))}
            </ul>
        {recipeInfo.analyzedInstructions && recipeInfo.analyzedInstructions.map((instructions, index) => (
                  <>
                   <ol key={index}>
                      <h2>Instructions</h2>
                    {instructions.steps.map((step, stepIndex) => (
                        <li key={stepIndex}>{step.step}</li>
                    ))}
                    </ol>
                    </>
        ))}
            </div>
            <div className={style.notes}>
                <h2>Notes:</h2>
                {recipeInfo.winePairing && recipeInfo.winePairing.pairingText ? (
                    <p>{recipeInfo.winePairing.pairingText}</p>
                ) : (
                    <p>No notes.</p>
                )} 
            </div>  
            </div>
        </div>
        </>
    ) 
}