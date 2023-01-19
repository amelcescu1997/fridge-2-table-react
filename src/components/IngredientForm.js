import { useState } from "react"

export default function IngredientForm() {
    const [name, setName] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()

        const response = await fetch("/api/ingredients/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name //same as name: name
            })
        })

        if (!response.ok) {
            console.error("Error making request")
            return
        }

        const responseBody = await response.json()

        console.log(responseBody)
    }

    return <form onSubmit={handleSubmit}>

        <div>
            <label>name</label>
            <input value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <button>add ingredient</button>
    </form>
}