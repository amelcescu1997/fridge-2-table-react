import { useEffect, useState } from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Nav from "./components/Nav";
import AddIngredient from "./pages/AddIngredient";
import Favorites from "./pages/Favorites";
import Ingredients from "./pages/Ingredients";
import Recipes from "./pages/Recipes";
import ViewRecipe from "./pages/ViewRecipe";

function App() {
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

  const unfavorite = (id) => {
      setFavorites((previousFavorites) => {
          return previousFavorites.filter((favorite) => {
              return favorite._id != id
          })
      })
  }

  const updateStep = (id, number, text) => {
    console.log(id, number, text)
    setFavorites((previousFavorites) => {
      return previousFavorites.map((favorite) => {
        if (favorite._id != id) {
          return favorite
        }

        return {
          ...favorite,
          userSteps: {...favorite.userSteps, [number]: text}
        }
      })
    })
  }

  return (
    <BrowserRouter>
    <Nav/>
      <Routes>
        <Route path="/" element={<Favorites favorites={favorites} onUnfavorite={unfavorite}/>}/>
        <Route path="/ingredients/add" element={<AddIngredient/>}/>
        <Route path="/recipes" element={<Recipes/>}/>
        <Route path="/ingredients" element={<Ingredients/>}/>
        <Route path="/recipes/:id" element={<ViewRecipe onUpdateStep={updateStep} favorites={favorites}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
