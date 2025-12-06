const Video = require('../models/Video');

// GET all videos
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET single video by ID
exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE new video
exports.createVideo = async (req, res) => {
  try {
    const { title, description, category, duration, resolution, fileSize, tags, videoUrl } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description required' });
    }

    const video = new Video({
      title,
      description,
      category,
      duration,
      resolution,
      fileSize,
      tags: tags || [],
      videoUrl: videoUrl || '',
      thumbnailUrl: `https://via.placeholder.com/300x200?text=${encodeURIComponent(title)}`,
      uploadDate: new Date(),
      views: 0
    });

    await video.save();
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE video
exports.updateVideo = async (req, res) => {
  try {
    const update = { ...req.body, updatedAt: new Date() };
    const video = await Video.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE video
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.json({ message: 'Video deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.searchVideos = async (req, res) => {
  try {
    const q = (req.query.q || '').trim();

    
    if (!q) {
      const all = await Video.find().sort({ createdAt: -1 });
      return res.json(all);
    }

    const regex = new RegExp(q, 'i'); 

    const videos = await Video.find({
      $or: [
        { title: regex },
        { description: regex },
        { category: regex },
        { tags: regex }
      ]
    }).sort({ createdAt: -1 });

    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
