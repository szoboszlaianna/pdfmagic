import { Container } from "@mui/material";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PdfMerge from "./pages/PdfMerge";
import PdfRemove from "./pages/PdfRemove";
import PdfReorder from "./pages/PdfReorder";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Container sx={{ marginTop: "2rem" }}>
        <Routes>
          <Route path="/merge" element={<PdfMerge />} />
          <Route path="/remove" element={<PdfRemove />} />
          <Route path="/reorder" element={<PdfReorder />} />
          {/* Add more routes as needed */}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
