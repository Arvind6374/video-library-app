import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VideoLibrary from './pages/VideoLibrary';
import VideoDetails from './pages/VideoDetails';
import AddVideo from './pages/AddVideo';
import './App.css';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-brand">
          📽️ Video Library
        </Link>
        <div className="nav-links">
          <Link to="/">Library</Link>
          <Link to="/add">Add Video</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<VideoLibrary />} />
        <Route path="/video/:id" element={<VideoDetails />} />
        <Route path="/add" element={<AddVideo />} />
      </Routes>
    </Router>
  );
}

export default App;
