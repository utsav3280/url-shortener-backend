import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Shorten from "./components/shorten";
import ClickCount from "./components/checkcount";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Shorten />} />
          <Route path="/check" element={<ClickCount />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
