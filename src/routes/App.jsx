import { HashRouter, Routes, Route } from "react-router-dom";
import { Add } from "../pages/Add";
import { NotFound } from "../pages/NotFound";
import { Parking } from "../pages/Parking";
import { Update } from "../pages/Update";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Parking />} />
          {/* <Route exact path="/add" element={<Add />} /> */}
          <Route exact path="/update/:id" element={<Update />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App; 
