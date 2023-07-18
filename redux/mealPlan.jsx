import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userEmail: '',
    plan: {
        day: null,
        breakfast: null,
        lunch: null,
        dinner: null
    }
}
export const mealPlan = createSlice({
    name: 'meal-plan',
    initialState,
    reducers: {
        createPlan: (state, action) => {
            state.userEmail = action.payload.userEmail;
            state.plan = action.payload.plan;
        }
    }
});
export const {createPlan} = mealPlan.actions
export default mealPlan.reducer