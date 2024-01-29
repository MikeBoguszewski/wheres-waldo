import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

export default function LevelOne() {
  const [clicked, setClicked] = useState(false);
  const [popupCoordinates, setPopupCoordinates] = useState({ x: null, y: null });
  function handleClick(event) {
    setClicked(!clicked);
    const containerWidth = event.currentTarget.clientWidth;
    const containerHeight = event.currentTarget.clientHeight;
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;
    const relativeX = (x / containerWidth) * 100;
    const relativeY = (y / containerHeight) * 100;
    console.log(`${relativeX}, ${relativeY}`);
    const popupX = ((x + 7) / containerWidth) * 100;
    const popupY = ((y - 6) / containerHeight) * 100;
    setPopupCoordinates({ x: popupX, y: popupY });
    console.log(popupCoordinates);
  }

  return (
    <>
      <Header />
      <div className="level">
        <h1>
          Find:
          <img src="/assets/waldo.jpg" className="character"></img>
        </h1>
        <div className="gameboard" onClick={handleClick}>
          <img src="/assets/waldo-beach.jpeg"></img>
          {clicked && (
            <div className="popup-box" style={{ top: `${popupCoordinates.y}%`, left: `${popupCoordinates.x}%` }}>
              <button>
                <img src="/assets/waldo.jpg"></img>
              </button>
            </div>
          )}
        </div>
        <Link to={"/"}>Home</Link>
      </div>
    </>
  );
}
