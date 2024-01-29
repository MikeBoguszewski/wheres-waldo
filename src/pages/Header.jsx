import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div>
        <Link to={"/"}>
          <img src="/assets/waldo-logo.png" className="logo" />
        </Link>
      </div>
    </header>
  );
}