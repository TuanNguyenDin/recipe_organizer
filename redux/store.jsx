import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import mealPlan from "./mealPlan";

export default store = configureStore({
    reducer:{
        user: userSlice,
        mealPlan: mealPlan,
    }
})