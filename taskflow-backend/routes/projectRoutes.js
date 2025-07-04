const express = require('express');
const router = express.Router();
const { getProjects, getProjectById, createProject, inviteMember } = require('../controllers/projectController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);
router.get('/get', getProjects);
router.post('/create', createProject);
router.get('/:id', getProjectById);
router.post('/:id/invite', inviteMember);

module.exports = router;
