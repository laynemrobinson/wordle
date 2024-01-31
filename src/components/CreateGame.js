import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { newGame } from "../store";

function CreateGame() {
  const dispatch = useDispatch();

  const [dropdownLength, setDropdownLength] = useState("5");
  const [dropdownGuesses, setDropdownGuesses] = useState("6");

  useEffect(() => {
    dispatch(newGame({ wordLength: 5, guessesAllowed: 6 }));
  }, [dispatch]);

  const wins = useSelector((state) => state.game.wins);
  const losses = useSelector((state) => state.game.losses);

  const handleChangeLength = (event) => {
    setDropdownLength(event.target.value);
  };

  const handleChangeGuesses = (event) => {
    setDropdownGuesses(event.target.value);
  };

  const handleNewGame = () => {
    dispatch(
      newGame({
        wordLength: parseInt(dropdownLength),
        guessesAllowed: parseInt(dropdownGuesses),
      })
    );
  };

  return (
    <div className="is-flex is-justify-content-center is-align-items-flex-end">
      <div className="m-2">
        <div className="field">
          <label className="label">Word Length</label>
          <div className="control">
            <div className="select">
              <select
                onChange={handleChangeLength}
                value={dropdownLength}
                className="w-dd"
              >
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="m-2">
        <div className="field">
          <label className="label">Number of Guesses</label>
          <div className="control">
            <div className="select">
              <select
                onChange={handleChangeGuesses}
                value={dropdownGuesses}
                className="w-dd"

              >
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="m-2">
        <div className="control">
          <button className="button is-primary" onClick={handleNewGame}>
            New Game
          </button>
        </div>
      </div>
      <div className="m-2">
        <div className="control is-size-6 has-text-weight-bold">
          Wins: {wins}
          <br />
          Losses: {losses}
        </div>
      </div>
    </div>
  );
}

export default CreateGame;
