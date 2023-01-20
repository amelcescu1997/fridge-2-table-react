import FavoriteList from "../components/FavoriteList";

export default function Favorites({favorites, onUnfavorite}) {
    return <div>
        <h1>Favorite Recipes</h1>
        <FavoriteList favorites={favorites} onUnfavorite={onUnfavorite}/>
    </div>
}