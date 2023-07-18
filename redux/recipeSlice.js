import { createSlice } from "@reduxjs/toolkit";
import {RECIPES} from "../database/recipes";
const initialState = {
    recipes: RECIPES,
};

const recipeSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        addRecipe(state, action) {
            const recipe = action.payload;
            // create a random unique id
            state.recipes.push(recipe);

        },
        editRecipe(state, action) {
            const recipe = action.payload;
            const index = state.recipes.findIndex((r) => r.id === recipe.id);
            state.recipes[index] = recipe;
        },
        deleteRecipe(state, action) {
            const id = action.payload;
            state.recipes = state.recipes.filter((r) => r.id !== id);
        },
    },
});

export const { addRecipe, editRecipe, deleteRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;