import { useSelector } from "react-redux";
import LetterBox from "./LetterBox";

// Display a collection of letters
// value: array of characters to display in the line
// showMatches: true/false - used to determine if we want to highlight matched letters
function WordLine({ value, showMatches }) {
  const wordLength = useSelector((state) => state.game.wordLength);
  const wordToGuess = useSelector((state) => state.game.wordToGuess);

  // create copy of the correct word and subtract from it whenever there is a match
  // this will allow us to color code the letters in the wrong spot correctly when there are multiples of the same letter
  let checkLetters = [...wordToGuess];

  // Show word boxes with number of letters to display based on game settings
  const renderedLetterBoxes = [];
  for (let i = 0; i < wordLength; i++) {
    let boxclass;
    if (showMatches)
    {
      if (value[i] === wordToGuess[i])
      {
        // correct letter in the correct spot
        boxclass = "correctspot";

        // remove letter from list
        checkLetters.splice(checkLetters.indexOf(value[i]), 1);
      }
      else if (checkLetters.includes(value[i])) {
        // letter is correct but in the wrong spot
        boxclass = "wrongspot";

        // remove letter from list
        checkLetters.splice(checkLetters.indexOf(value[i]), 1);
      }
      else {
        boxclass = "nomatch"
      }
    }
    else {
      boxclass = "empty"
    }
    renderedLetterBoxes.push(<LetterBox key={i} value={value[i]} className={boxclass} />);
  }

  return (
    <div className="is-flex is-justify-content-center">
      {renderedLetterBoxes}
    </div>
  );
}

export default WordLine;
