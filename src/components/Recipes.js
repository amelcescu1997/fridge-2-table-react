import { useEffect, useState } from "react"

export default function Recipes() {
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

    return <div style={{display: "flex"}}>
        {recipes.map((recipe) => <Recipe {...recipe}/>)}
    </div>
}

function Recipe({title, image, id}) {
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
        <button onClick={handleFavorite}>favorite</button>
    </div>
}