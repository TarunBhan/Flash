import { configureStore } from "@reduxjs/toolkit";
import NotesSlice from "./NotesSlice";

export const Store = configureStore({
  reducer: NotesSlice,
});
