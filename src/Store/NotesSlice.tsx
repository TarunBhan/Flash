import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
  todos: [{ id: 1, textValue: "" }],
};

const NotesSlice = createSlice({
  name: "Notes",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        textValue: action.payload,
      };
      state.todos.push(todo as any);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((item) => item !== action.payload);
    },
  },
});
export const { addTodo, deleteTodo } = NotesSlice.actions;

export default NotesSlice.reducer;
