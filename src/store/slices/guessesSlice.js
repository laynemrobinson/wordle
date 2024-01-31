import { createSlice } from "@reduxjs/toolkit";
import { newGame, winGame, loseGame } from "./gameSlice";

const guessesSlice = createSlice({
  name: "guess",
  initialState: {
    guessesMade: 0,
    data: [],
  },
  reducers: {
    // Add new guess
    // action.payload should be an array of the word being guessed
    addGuess(state, action) {
      state.data.push(action.payload);
      state.guessesMade = state.guessesMade + 1;
    },
  },
  extraReducers(builder) {
    builder.addCase(newGame, (state, action) => {
      // new game was created, reset the data
      state.data = [];
      state.guessesMade = 0;
    });
    builder.addCase(winGame, (state, action) => {
      state.data.push(action.payload);
      state.guessesMade = state.guessesMade + 1;
    });
    builder.addCase(loseGame, (state, action) => {
      state.data.push(action.payload);
      state.guessesMade = state.guessesMade + 1;
    });
  },
});

export const { addGuess } = guessesSlice.actions;
export const guessesReducer = guessesSlice.reducer;
