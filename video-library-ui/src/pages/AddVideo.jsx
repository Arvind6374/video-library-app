import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createVideo } from '../services/api';
import '../styles/AddVideo.css';

export default function AddVideo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Tutorial',
    duration: 0,
    resolution: '1080p',
    fileSize: 0,
    tags: '',
    videoUrl: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.description) {
      setError('Title and description are required');
      return;
    }

    setLoading(true);
    try {
      await createVideo({
        ...formData,
        duration: parseInt(formData.duration, 10) || 0,
        fileSize: parseInt(formData.fileSize, 10) || 0,
        tags: formData.tags
          ? formData.tags.split(',').map((t) => t.trim())
          : []
      });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to create video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-video">
      <h1>Add New Video</h1>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="title"
          placeholder="Video Title *"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description *"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option>Tutorial</option>
          <option>Entertainment</option>
          <option>Documentary</option>
          <option>Music</option>
          <option>Sports</option>
        </select>
        <input
          type="number"
          name="duration"
          placeholder="Duration (seconds)"
          value={formData.duration}
          onChange={handleChange}
        />
        <input
          type="text"
          name="resolution"
          placeholder="Resolution (e.g., 1080p)"
          value={formData.resolution}
          onChange={handleChange}
        />
        <input
          type="number"
          name="fileSize"
          placeholder="File Size (MB)"
          value={formData.fileSize}
          onChange={handleChange}
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={formData.tags}
          onChange={handleChange}
        />
        <input
          type="text"
          name="videoUrl"
          placeholder="Video URL (optional)"
          value={formData.videoUrl}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Video'}
        </button>
      </form>
    </div>
  );
}
