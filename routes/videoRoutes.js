const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

// SEARCH must come BEFORE '/:id'
router.get('/search', videoController.searchVideos);

router.get('/', videoController.getAllVideos);
router.get('/:id', videoController.getVideoById);
router.post('/', videoController.createVideo);
router.put('/:id', videoController.updateVideo);
router.delete('/:id', videoController.deleteVideo);

module.exports = router;
