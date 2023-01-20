import {Link} from "react-router-dom"

export default function Nav() {
    return <div style={{display: "flex", width: "100%", justifyContent: "space-between"}}>
        <Link to="/">
            Favorites
        </Link>
        <Link to="/ingredients/add">
            Add Ingredient
        </Link>
        <Link to="/recipes">
            Recipes
        </Link>
        <Link to="/ingredients">
            Ingredients
        </Link>
    </div>
}