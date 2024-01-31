import "bulma/css/bulma.css";
import "./styles.css";
import { useSelector } from "react-redux";
import CreateGame from "./components/CreateGame";
import Keyboard from "./components/Keyboard";
import WordLine from "./components/WordLine";
import Answer from "./components/Answer";

function App() {
  const guessesAllowed = useSelector((state) => state.game.guessesAllowed);
  const guessesMade = useSelector((state) => state.guess.guessesMade);
  const currentInputted = useSelector((state) => state.inputted.data);
  const pastGuesses = useSelector((state) => state.guess.data);

  // Display how many word guesses to display based on game settings
  // value should be an array of letters
  //   - if current guess, set to currentInputted
  //   - if past guess, set to pastGuesses[i]
  //   - if future guess, set to []
  // showMatches should be 'true' if we want to highlight the letters as matched (only do this for past guesses)
  const renderedWordLines = [];
  for (let i = 0; i < guessesAllowed; i++) {
    renderedWordLines.push(
      <WordLine
        key={i}
        value={
          i === guessesMade
            ? currentInputted
            : i < guessesMade
            ? pastGuesses[i]
            : []
        }
        showMatches={i < guessesMade}
      />
    );
  }

  return (
    <div className="container p-3">
      <div className="notification">
        <CreateGame />
      </div>
      {renderedWordLines}
      <Keyboard />
      <Answer />
    </div>
  );
}

export default App;
