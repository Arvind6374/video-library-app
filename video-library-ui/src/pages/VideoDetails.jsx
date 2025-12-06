import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchVideoById, deleteVideo } from '../services/api';
import '../styles/VideoDetails.css';

export default function VideoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideoById(id)
      .then((res) => {
        setVideo(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await deleteVideo(id);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!video) return <div className="error">Video not found</div>;

  return (
    <div className="video-details">
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Back
      </button>

      <div className="details-container">
        <div>
          <img
            src={
              video.thumbnailUrl ||
              'https://via.placeholder.com/480x270?text=Video'
            }
            alt={video.title}
            className="thumbnail"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://via.placeholder.com/480x270?text=Video';
            }}
          />

          {video.videoUrl && (
            <video
              className="video-player"
              controls
              src={video.videoUrl}
            />
          )}
        </div>

        <div className="info">
          <h1>{video.title}</h1>

          <p className="meta">
            {video.category} • {video.duration ? Math.round(video.duration / 60) : 0} min •{' '}
            {video.views ?? 0} views
          </p>

          <p className="description">{video.description}</p>

          <div className="specs">
            <span>📊 {video.fileSize ?? '—'} MB</span>
            <span>📹 {video.resolution ?? '—'}</span>
            <span>🏷️ {video.tags?.join(', ') || '—'}</span>
          </div>

          <button className="delete-btn" onClick={handleDelete}>
            Delete Video
          </button>
        </div>
      </div>
    </div>
  );
}
