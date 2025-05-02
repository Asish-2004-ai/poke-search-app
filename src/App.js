import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Favorites from "./pages/Favorites";
import ErrorBoundary from "./components/ErrorBoundary";
import { FavoritesProvider } from "../src/context/FavoritesContext";
import Compare from "./pages/Compare";


function App() {
  return (
    <ErrorBoundary>
      <FavoritesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:id" element={<Detail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/compare" element={<Compare />} />
          </Routes>
        </Router>
      </FavoritesProvider>
    </ErrorBoundary>
  );
}

export default App;
