import { useMemo } from "react";
import {useParams} from "react-router-dom"
import Recipe from "../components/Recipe";

export default function ViewRecipe({favorites, onUpdateStep}) {
    const {id} = useParams()

    const recipe = useMemo(() => {
        return favorites.find((favorite) => {
            return favorite._id === id
        })
    }, [id, favorites])

    return <div>
        <h1>
            Recipe Details
        </h1>
        {recipe && <Recipe {...recipe} onUpdateStep={onUpdateStep}/>}
    </div>
}