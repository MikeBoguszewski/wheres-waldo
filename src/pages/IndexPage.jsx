import { Link } from "react-router-dom";
import Header from "./Header";

export default function IndexPage() {
  return (
    <div className="index">
      <Header/>
      <div className="sign-container">
        <img src="/assets/waldo-sign.webp" className="sign"></img>
      </div>
      <div className="levels">
        <Link to={"/level-one"}>
          <div className="level-select">
            <h2>Level 1</h2>
            <img src="/assets/waldo-beach.jpeg"></img>
          </div>
        </Link>
        <Link to={"/level-two"}>
          <div className="level-select">
            <h2>Level 2</h2>
            <img src="/assets/waldo-mountain.jpeg"></img>
          </div>
        </Link>
        <Link to={"/level-three"}>
          <div className="level-select">
            <h2>Level 3</h2>
            <img src="/assets/waldo-troy.jpeg"></img>
          </div>
        </Link>
      </div>
    </div>
  );
}
