import { useEffect, useState } from "react"

export default function RecipeList() {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        async function fetchRecipes() {
            const response = await fetch("/api/recipes")
            if(!response.ok) {
                console.error("Error fetching recipes")
                return
            }
            setRecipes(await response.json())
        }
        fetchRecipes()
    }, [])

    return <div>
        {recipes.map((recipe) => <SimpleRecipe {...recipe}/>)}
    </div>
}

export function SimpleRecipe({title, image, id, hideFavorite}) {
    const handleFavorite = async() => {
        const response = await fetch("/api/favorites/" + id, {
            method: "POST"
        })

        if(!response.ok) {
            console.error("Error favoriting recipe")
            return
        }
        console.log(await response.json())
    }

    return <div>
        <h2>{title}</h2>
        <img src = {image} alt = {title}/>
        {!hideFavorite && <button onClick={handleFavorite}>favorite</button>}
    </div>
}