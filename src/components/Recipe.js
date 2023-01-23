import { useEffect, useMemo, useState } from "react";
import { SimpleRecipe } from "./RecipeList";

export default function Recipe({ title, image, raw, userSteps = {}, _id, onUpdateStep }) {
    const [editingInstructions, setEditingInstructions] = useState([])

    const ingredients = useMemo(() => {
        return raw.extendedIngredients
            .filter((ingredient) => {
                return ingredient.nameClean
            })
            .map((ingredient) => {
                return `${ingredient.amount} ${ingredient.unit} ${ingredient.nameClean}`
            })
    }, [raw])

    const instructions = useMemo(() => {
        const steps = raw.analyzedInstructions.flatMap((instruction) => {
            return instruction.steps.map((step) => {
                return step.step
            })
        })
        for (const i in userSteps) {
            steps[i] = userSteps[i]
        }
        return steps
    }, [raw, userSteps])

    useEffect(() => {
        setEditingInstructions(instructions.map(() => {
            return false
        }))
    }, []) //keep the [] empty

    const updateEditingInstruction = (instruction, index) => {
        setEditingInstructions((previousEditingInstructions) => {
            return previousEditingInstructions.map((editingInstruction, i) => {
                if (i === index) {
                    return instruction
                }
                return editingInstruction
            })
        })
    }

    const submitEditedInstructions = async(index) => {
        const response = await fetch(`/api/favorites/${_id}/steps`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                number: index,
                text: editingInstructions[index]
            })
        })

        if (!response.ok) {
            const errorData = await response.json()
            console.error(errorData)
            console.error("Error adding step to recipe") 
            return
        }

        onUpdateStep(_id, index, editingInstructions[index])
        updateEditingInstruction(false, index)
    }

    return <div>
        <SimpleRecipe title={title} image={image} hideFavorite />
        <h2>Ingredients</h2>
        <ul>
            {ingredients.map((ingredient) => {
                return <li>{ingredient}</li>
            })}
        </ul>
        <h2>Instructions</h2>
        <ol>
            {instructions.map((instruction, i) => {
                return <li>
                    {editingInstructions[i] ?
                        <span style={{width:"100%", display:"flex"}}>
                            <input style={{flexGrow: 1}} onChange={(e) => updateEditingInstruction(e.target.value, i)} value={editingInstructions[i]}/><button onClick={() => submitEditedInstructions(i)}>Submit</button></span> :
                        <span>{instruction} <button onClick={() => { updateEditingInstruction(instruction, i) }}>Edit</button></span>}
                </li>
            })}
        </ol>
    </div>
}