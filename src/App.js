import Favorites from "./components/Favorites";
import IngredientForm from "./components/IngredientForm";
import Ingredients from "./components/Ingredients";
import Recipes from "./components/Recipes";

function App() {
  return (
    <div >
      <h1>add ingredient</h1>
      <IngredientForm/>
      <h1>recipes</h1>
      <Recipes/>
      <h1>favorites</h1>
      <Favorites/>
      <h1>ingredients</h1>
      <Ingredients/>
    </div>
  );
}

export default App;
