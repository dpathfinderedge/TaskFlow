const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { getProjects, createProject } = require('../controllers/projectController');
const router = express.Router();

router.use(protect);
router.get('/', getProjects);
router.post('/', createProject);

module.exports = router;
