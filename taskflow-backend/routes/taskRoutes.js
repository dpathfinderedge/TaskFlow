const express = require('express');
const router = express.Router();

const {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const { protect } = require('../middlewares/authMiddleware');

// Get all tasks in a project
router.use(protect);
router.post('/create', createTask);
router.get('/project/:projectId', getTasksByProject);
router.patch('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

module.exports = router;
