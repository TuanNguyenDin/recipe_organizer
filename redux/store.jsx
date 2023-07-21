import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import mealPlan from "./mealPlan";
import recipeSlice from "./recipeSlice";
import commentSlice from "./commentSlice";
export const store = configureStore({
    reducer:{
        user: userSlice,
        mealPlan: mealPlan,
        recipe: recipeSlice,
        comment: commentSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export default store;