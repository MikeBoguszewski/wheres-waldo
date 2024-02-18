import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Modal from "../components/Modal";
import Timer from "../components/Timer";

export default function LevelTwo() {
  const [characters, setCharacters] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: null, y: null });
  const [popupCoordinates, setPopupCoordinates] = useState({ x: null, y: null });
  const [foundCharacters, setFoundCharacters] = useState([]);
  const [win, setWin] = useState(false);
  const [time, setTime] = useState(0);
  const [scores, setScores] = useState([]);
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await fetch("https://wheres-waldo-8za6.onrender.com/levels/2");
        const data = await response.json();
        setCharacters(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchScores = async () => {
      try {
        const response = await fetch("https://wheres-waldo-8za6.onrender.com/scores/2");
        const data = await response.json();
        setScores(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchScores();
    fetchPositions();
  }, []);
  useEffect(() => {
    let interval;

    if (!win) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => {
      clearInterval(interval);
    };
  }, [win, time]);

  function handleClick(event) {
    setClicked(!clicked);
    const containerWidth = event.currentTarget.clientWidth;
    const containerHeight = event.currentTarget.clientHeight;
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;
    const relativeX = (x / containerWidth) * 100;
    const relativeY = (y / containerHeight) * 100;
    setCoordinates({ x: relativeX, y: relativeY });
    const popupX = ((x + 7) / containerWidth) * 100;
    const popupY = ((y - 6) / containerHeight) * 100;
    setPopupCoordinates({ x: popupX, y: popupY });
  }

  function checkCoordinates(selectedCharacter) {
    const characterDoc = characters.find((character) => character.name === selectedCharacter);
    if (coordinates.x >= characterDoc.coordinates.minX && coordinates.x <= characterDoc.coordinates.maxX && coordinates.y >= characterDoc.coordinates.minY && coordinates.y <= characterDoc.coordinates.maxY) {
      setFoundCharacters((prevFoundCharacters) => [...prevFoundCharacters, selectedCharacter]);
      if (foundCharacters.length + 1 === 2) {
        setWin(true);
      }
    }
  }

  return (
    <>
      <Header />
      <div className="level">
        <h1>
          Find:
          <img src="/assets/waldo.jpg" className="character"></img>
          <img src="/assets/wizard.jpg" className="character"></img>
        </h1>
        <Timer time={time} />
        <div className="gameboard" onClick={handleClick}>
          <img src="/assets/waldo-mountain.jpeg"></img>
          {clicked && (
            <div className="popup-box" style={{ top: `${popupCoordinates.y}%`, left: `${popupCoordinates.x}%` }}>
              <button onClick={() => checkCoordinates("Waldo")} disabled={foundCharacters.includes("Waldo")} style={{ backgroundColor: foundCharacters.includes("Waldo") ? "green" : "" }}>
                <img src="/assets/waldo.jpg" className="character"></img>
              </button>
              <button onClick={() => checkCoordinates("Wizard Whitebeard")} disabled={foundCharacters.includes("Wizard Whitebeard")} style={{ backgroundColor: foundCharacters.includes("Wizard Whitebeard") ? "green" : "" }}>
                <img src="/assets/wizard.jpg" className="character"></img>
              </button>
            </div>
          )}
        </div>
        <Link to={"/"}>Home</Link>
      </div>
      {win && <Modal scores={scores} time={time} level={2} />}
    </>
  );
}
