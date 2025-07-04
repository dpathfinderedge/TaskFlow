const Task = require('../models/Task');
const Project = require('../models/Project');

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, dueDate, projectId, assignedTo } = req.body; 

  try {
    if (!title || !projectId) {
      return res.status(400).json({ message: "Title and project ID are required" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      project: projectId,
      assignedTo,
      createdBy: req.user._id,
      activityLogs: [
        {
          message: `Task created`,
          performedBy: req.user._id
        }
      ]
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Create Task Error:', error);
    res.status(500).json({ message: "Server error while creating task" });
  }
};

// Get all tasks for a specific project
exports.getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await Task.find({ project: projectId }).populate('assignedTo', 'name email');
    // const tasks = await Task.find({ project: projectId }).populate('assignedTo', 'name email').sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Fetch Tasks Error:', error);
    res.status(500).json({ message: "Server error while fetching tasks" });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const updates = req.body;

  try {
    const task = await Task.findById(taskId);
    // const task = await Task.findById(taskId).populate('activityLogs.performedBy', 'name');
    if (!task) return res.status(404).json({ message: "Task not found" });

    const changes = [];

    if (updates.title && updates.title !== task.title) {
      changes.push(`Title changed from "${task.title}" to "${updates.title}"`);
    }
    if (updates.description && updates.description !== task.description) {
      changes.push(`Description updated`);
    }
    if (updates.dueDate && new Date(updates.dueDate).toISOString() !== task.dueDate?.toISOString()) {
      changes.push(`Due date updated to ${new Date(updates.dueDate).toLocaleDateString()}`);
    }
    if (updates.priority && updates.priority !== task.priority) {
      changes.push(`Priority changed from "${task.priority}" to "${updates.priority}"`);
    }
    if (updates.assignedTo && updates.assignedTo.toString() !== task.assignedTo?.toString()) {
      changes.push(`Assigned to a new user`);
    }
    if (updates.status && updates.status !== task.status) {
      changes.push(`Status changed from "${task.status}" to "${updates.status}`);
    }

    Object.assign(task, updates);

    if (changes.length > 0) {
      changes.forEach((message) => {
        task.activityLogs.push({
          message,
          performedBy: req.user._id
        });
      });
    }

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    console.error('Update Task Error:', error);
    res.status(500).json({ message: "Failed to update task" });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error('Delete Task Error:', error);
    res.status(500).json({ message: "Failed to delete task" });
  }
};
