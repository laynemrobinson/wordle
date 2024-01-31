import { useSelector } from "react-redux";

function Answer() {
  const isGameOver = useSelector((state) => state.game.isGameOver);
  const answer = useSelector((state) => state.game.wordToGuess);

  if (isGameOver) {
    return (
      <h3 className="is-size-3 is-flex is-justify-content-center">
        The answer is&nbsp;<strong className="has-text-success">{answer.join("")}</strong>
      </h3>
    );
  }
}

export default Answer;
