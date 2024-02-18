import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LevelOne from "./pages/LevelOne";
import LevelTwo from "./pages/LevelTwo";
import LevelThree from "./pages/LevelThree";

function App() {

  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/level-one" element={<LevelOne />} />
      <Route path="/level-two" element={<LevelTwo />} />
      <Route path="/level-three" element={<LevelThree />} />
    </Routes>
  );
}

export default App;
