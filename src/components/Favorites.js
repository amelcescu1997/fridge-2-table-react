import { useEffect, useState } from "react"

export default function Favorites() {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        async function fetchFavorites() {
            const response = await fetch("/api/favorites")
            if(!response.ok) {
                console.error("Error fetching favorites")
                return
            }
            setFavorites(await response.json())
        }
        fetchFavorites()
    }, [])

    return <div style={{display: "flex"}}>
        {favorites.map((favorite) => <Favorite {...favorite}/>)}
    </div>
}

function Favorite({title, image, spoonid}) {
    const handleUnfavorite = async() => {
        const response = await fetch("/api/favorites/" + spoonid, {
            method: "DELETE"
        })

        if(!response.ok) {
            console.error("Error unfavoriting recipe")
            return
        }
        console.log(await response.json())
    }

    return <div>
        <h2>{title}</h2>
        <img src = {image} alt = {title}/>
        <button onClick={handleUnfavorite}>unfavorite</button>
    </div>
}