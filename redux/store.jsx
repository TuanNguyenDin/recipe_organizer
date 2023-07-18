import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import mealPlan from "./mealPlan";
import recipeSlice from "./recipeSlice";

export const store = configureStore({
    reducer:{
        user: userSlice,
        mealPlan: mealPlan,
        recipe: recipeSlice,
    }
})

export default store;