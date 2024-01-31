import { configureStore } from "@reduxjs/toolkit";
import { gameReducer, newGame, winGame, loseGame } from "./slices/gameSlice";
import { guessesReducer, addGuess } from "./slices/guessesSlice";
import { inputtedReducer, addLetter, removeLetter } from "./slices/inputtedSlice";

const store = configureStore({
    reducer: {
        game: gameReducer,
        guess: guessesReducer,
        inputted: inputtedReducer,
    },
});

export { store, newGame, winGame, loseGame, addGuess, addLetter, removeLetter };