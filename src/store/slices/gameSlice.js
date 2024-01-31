import { createSlice } from "@reduxjs/toolkit";

// random word generator: https://www.npmjs.com/package/is-word
import { generate } from "random-words";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    wordLength: 5,
    guessesAllowed: 6,
    wordToGuess: [],
    wins: 0,
    losses: 0,
    isGameOver: false,
  },
  reducers: {
    // Create a new game based on inputted settings
    // Expecting: action.payload === {wordLength: X, guessesAllowed: X }
    newGame(state, action) {
      state.wordLength = action.payload.wordLength;
      state.guessesAllowed = action.payload.guessesAllowed;

      // Generate new word and put into array
      state.wordToGuess = generate({
        minLength: action.payload.wordLength,
        maxLength: action.payload.wordLength,
      })
        .toUpperCase()
        .split("");

      state.isGameOver = false;

      // (state.wordToGuess);
    },
    winGame(state, action) {
      // add to the win counter
      state.wins = state.wins + 1;

      // set state to disable keyboard input
      state.isGameOver = true;
    },
    loseGame(state, action) {
      // add to the loss counter
      state.losses = state.losses + 1;

      // set state to disable keyboard input
      state.isGameOver = true;
    },
  },
});

export const { newGame, winGame, loseGame } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
