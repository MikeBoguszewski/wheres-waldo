import { Link } from "react-router-dom";
import { useState } from "react";

export default function Modal({ scores, time, level }) {
  const [inputValue, setInputValue] = useState("");
  const [updatedScores, setUpdatedScores] = useState([...scores]);
  const sortedScores = updatedScores[0].scores.sort((a, b) => a.time - b.time);
  const [sumbitted, setSubmitted] = useState(false)
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const updateScores = async (event) => {
    if (inputValue === "") {
      return
    }
    event.preventDefault()
    try {
      const response = await fetch(`http://localhost:3000/scores/${level}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: inputValue,
          time: time,
        }),
      });
      if (response.ok) {
        const response = await fetch(`http://localhost:3000/scores/${level}`);
        const data = await response.json();
        setUpdatedScores([...data]);
        setInputValue("");
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error adding score:", error);
    }
  };


  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Congratulations, You Win!</h2>
        <h3>Top Scores:</h3>
        <div>
          <ul>
            {sortedScores.map((score, index) => (
              <li key={index}>
                <span>{score.name}: </span>
                <span className="digits">{("0" + Math.floor((score.time / 60000) % 60)).slice(-2)}:</span>
                <span className="digits">{("0" + Math.floor((score.time / 1000) % 60)).slice(-2)}.</span>
                <span className="digits mili-sec">{("0" + ((score.time / 10) % 100)).slice(-2)}</span>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={(event) => updateScores(event)}>
          <label htmlFor="name">Add Score to Leaderboard:</label>
          <input type="text" id="name" name="name" placeholder="Enter Name" value={inputValue} onChange={handleChange} disabled={sumbitted}></input>
        </form>
        <Link to={"/"}>Return to Homepage</Link>
      </div>
    </div>
  );
}
