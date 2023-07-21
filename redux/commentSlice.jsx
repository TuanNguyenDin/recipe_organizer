
import { createSlice } from "@reduxjs/toolkit";
import {COMMENTS} from "../database/comment";

const initialState = {
    comment: COMMENTS
};

const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        addComment(state, action) {
            const comment = action.payload;
            state.comment.push(comment);
        },
        editComment(state, action) {
            const comment = action.payload;
            const index = state.comment.findIndex((c) => c.id === comment.id);
            state.comment[index] = comment;
        },
        deleteComment(state, action) {
            const id = action.payload;
            state.comment = state.comment.filter((c) => c.id !== id);
        },
    },
});

export const { addComment, editComment, deleteComment } = commentSlice.actions;

export default commentSlice.reducer;
