import { createSlice } from "@reduxjs/toolkit";
import { newGame, winGame, loseGame } from "./gameSlice";
import { addGuess } from "./guessesSlice";

const inputtedSlice = createSlice({
  name: "inputted",
  initialState: {
    data: [],
  },
  reducers: {
    // Add letter selected to the array
    // action.payload should be a expecting a letter
    addLetter(state, action) {
      state.data.push(action.payload);
    },
    // Delete letter from the end of the array
    removeLetter(state, action) {
      state.data.pop();
    },
  },
  extraReducers(builder) {
    builder.addCase(newGame, (state, action) => {
      // new game was created, reset the data
      state.data = [];
    });
    builder.addCase(winGame, (state, action) => {
      // game ended, reset the data
      state.data = [];
    });
    builder.addCase(loseGame, (state, action) => {
      // game ended, reset the data
      state.data = [];
    });
    builder.addCase(addGuess, (state, action) => {
      // guess added, reset the data
      state.data = [];
    });
  }
});

export const { addLetter, removeLetter } = inputtedSlice.actions;
export const inputtedReducer = inputtedSlice.reducer;
