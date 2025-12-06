import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllVideos, searchVideos } from '../services/api';
import '../styles/VideoLibrary.css';

export default function VideoLibrary() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // initial load
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await fetchAllVideos();
        if (mounted) setVideos(res.data);
      } catch (err) {
        if (mounted) setError(err.message || 'Failed to load');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setLoading(true);

    try {
      if (!value.trim()) {
        const res = await fetchAllVideos();
        setVideos(res.data);
      } else {
        const res = await searchVideos(value);
        setVideos(res.data);
      }
      setError(null);
    } catch (err) {
      setError(err.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container video-library">
        <div className="library-header">
          <h1 className="page-title">Video Library</h1>
          <input
            className="search-input"
            placeholder="Search by title, tag, category..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="video-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="video-card" style={{ minHeight: 220 }} />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container video-library">
      <div className="library-header">
        <h1 className="page-title">Video Library</h1>
        <input
          className="search-input"
          placeholder="Search by title, tag, category..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {videos.length === 0 ? (
        <div className="video-card" style={{ padding: 24 }}>
          <h3 style={{ margin: 0 }}>No videos found</h3>
          <p className="lead">
            Try a different search term or <Link to="/add">add a new video</Link>.
          </p>
        </div>
      ) : (
        <div className="video-grid">
          {videos.map((video) => (
            <Link
              key={video._id}
              to={`/video/${video._id}`}
              className="video-card"
            >
              <img
                className="thumb"
                src={
                  video.thumbnailUrl ||
                  'https://via.placeholder.com/480x270?text=Video'
                }
                alt={video.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://via.placeholder.com/480x270?text=Video';
                }}
              />
              <div className="video-info">
                <h3>{video.title}</h3>
                <div className="category">{video.category}</div>
                <div className="meta-row">
                  <div>{video.duration ? Math.round(video.duration / 60) : 0} min</div>
                  <div>{video.views || 0} views</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="page-bottom-spacing" />
    </div>
  );
}
