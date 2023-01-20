import {Link} from "react-router-dom"

export default function FavoriteList({favorites, onUnfavorite}) {
    return <div>
        {favorites.map((favorite) => <Favorite {...favorite} onUnfavorite={onUnfavorite}/>)}
    </div>
}

function Favorite({title, image, spoonid, onUnfavorite, _id}) {
    const handleUnfavorite = async() => {
        const response = await fetch("/api/favorites/" + spoonid, {
            method: "DELETE"
        })

        if(!response.ok) {
            console.error("Error unfavoriting recipe")
            return
        }
        console.log(await response.json())
        onUnfavorite(_id)
    }

    return <div>
        <h2>{title}</h2>
        <img src = {image} alt = {title}/>
        <button onClick={handleUnfavorite}>unfavorite</button>
        <Link to={`/recipes/${_id}`}>
            View Recipe
        </Link>
    </div>
}