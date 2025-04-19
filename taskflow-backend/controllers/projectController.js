const Project = require('../models/Project');
const { getIO } = require('../sockets');

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      'members.userId': req.user.id
    });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      createdBy: req.user.id,
      members: [{ userId: req.user.id, role: 'admin' }]
    });

    // broadcast new project
    const io = getIO();
    io.to('projectsRoom').emit('projectCreated', project);

    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
