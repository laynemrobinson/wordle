import { useDispatch, useSelector } from "react-redux";
import { addGuess, addLetter, removeLetter, winGame, loseGame } from "../store";
import { useWordChecker } from "react-word-checker";

const SpellCheck = (checkword) => {
  const { isLoading, wordExists } = useWordChecker("en");
  if (!isLoading) {
    return wordExists(checkword);
  }
};

function Keyboard() {
  const dispatch = useDispatch();

  const wordToGuess = useSelector((state) => state.game.wordToGuess);
  const wordLength = useSelector((state) => state.game.wordLength);
  const currentInput = useSelector((state) => state.inputted.data);
  const isGameOver = useSelector((state) => state.game.isGameOver);
  const pastGuesses = useSelector((state) => state.guess.data);

  const isValidWord = SpellCheck(currentInput.join(""));

  // check if user is out of guesses
  const guessesAllowed = useSelector((state) => state.game.guessesAllowed);
  const guessesMade = useSelector((state) => state.guess.guessesMade);

  const handleClick = (event) => {
    const value = event.target.innerText.toUpperCase();

    switch (value) {
      // Enter clicked
      case "ENTER":
        if (currentInput.length === wordLength && isValidWord) {
          // valid guess, submit it

          // *** WE HAVE A WINNER *** !!!
          if (currentInput.join("") === wordToGuess.join("")) {
            dispatch(winGame(currentInput));
          }
          // *** WE HAVE A LOSER *** :(
          else if (guessesAllowed === guessesMade + 1) {
            // game over :(
            dispatch(loseGame(currentInput));
          } else {
            dispatch(addGuess(currentInput));
          }
        } else {
          // not a valid guess
          console.log("Invalid word entered");
        }
        break;
      // Delete clicked
      case "DELETE":
        dispatch(removeLetter());
        break;
      // Letter clicked
      default:
        // Do not allow more than the max number of letters to be entered
        if (currentInput.length !== wordLength) {
          dispatch(addLetter(value));
        }
    }
  };

  const getButtonColor = (value) => {
    let color = "";
    if (pastGuesses.flat().includes(value)) {
      color = "nomatch";

      if (wordToGuess.includes(value)) {
        color = "wrongspot";

        // loop through all the past guessed words
        for (let w = 0; w < pastGuesses.length; w++) {
          // loop through each letter
          for (let l = 0; l < wordLength; l++) {
            // check if letter is in the correct spot
            if ((pastGuesses[w][l] === wordToGuess[l]) && (wordToGuess[l] === value) ) {
              color = "correctspot";
            }
          }
          
        }
      }
    }
    return color;
  };

  const keyboardRow1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keyboardRow2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keyboardRow3 = ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"];

  const renderKeyBoardRow1 = keyboardRow1.map((key) => {
    let color = getButtonColor(key);
    return (
      <button
        key={key}
        className={`button is-light m-1 ${color}`}
        onClick={handleClick}
        disabled={isGameOver}
      >
        {key}
      </button>
    );
  });

  const renderKeyBoardRow2 = keyboardRow2.map((key) => {
    let color = getButtonColor(key);
    return (
      <button
        key={key}
        className={`button is-light m-1 ${color}`}
        onClick={handleClick}
        disabled={isGameOver}
      >
        {key}
      </button>
    );
  });

  const renderKeyBoardRow3 = keyboardRow3.map((key) => {
    let color = getButtonColor(key);
    return (
      <button
        key={key}
        className={`button is-light m-1 ${color}`}
        onClick={handleClick}
        disabled={isGameOver}
      >
        {key}
      </button>
    );
  });

  return (
    <div>
      <div className="has-text-centered">{renderKeyBoardRow1}</div>
      <div className="has-text-centered">{renderKeyBoardRow2}</div>
      <div className="has-text-centered">{renderKeyBoardRow3}</div>
    </div>
  );
}

export default Keyboard;
