import { faker } from '@faker-js/faker';
import {RECIPES} from "./recipes";


// get all recipes id
const recipeIds = RECIPES.map((recipe) => recipe.id);
// get random recipe id
const getRandomRecipeId = () => Math.floor(Math.random() * recipeIds.length);
export function createComment() {
    return {
        id: faker.string.uuid(),
        recipeId : recipeIds[getRandomRecipeId()],
        email: faker.internet.email(),
        content: faker.lorem.sentence(),
        date: faker.date.recent(),
    };
}

export const COMMENTS = faker.helpers.multiple(createComment, {
    count: 100,
});