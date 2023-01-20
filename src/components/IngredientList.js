import { useEffect, useState } from "react"

export default function IngredientList() {
    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        async function fetchIngredients() {
            const response = await fetch("/api/ingredients")
            if(!response.ok) {
                console.error("Error fetching ingredients")
                return
            }
            setIngredients(await response.json())
        }
        fetchIngredients()
    }, [])

    return <ul>
        {ingredients.map((ingredient) => <Ingredient {...ingredient}/>)}
    </ul>
}

function Ingredient({name, quantity, _id}) {
    // const handleUningredient = async() => {
    //     const response = await fetch("/api/ingredients/" + spoonid, {
    //         method: "DELETE"
    //     })

    //     if(!response.ok) {
    //         console.error("Error unfavoriting recipe")
    //         return
    //     }
    //     console.log(await response.json())
    // }

    return <li>
        {name} x{quantity}
        {/* <button onClick={handleConsume}>consume</button> */}
    </li>
}