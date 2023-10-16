import { useParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react";

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
        <h1>{recipeInfo.title}</h1>
        <img src={recipeInfo.image}/>
        <h2>Ingredients:</h2>
        <ul>
        {recipeInfo.extendedIngredients && recipeInfo.extendedIngredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.original}</li>
                ))}
        </ul>
        <h2>Instructions:</h2>

        {recipeInfo.analyzedInstructions && recipeInfo.analyzedInstructions.map((instructions, index) => (
                   <ol key={index}> 
                    {instructions.steps.map((step, stepIndex) => (
                        <li key={stepIndex}>{step.step}</li>
                    ))}
                    </ol>
        ))}
        </>
    ) 
}