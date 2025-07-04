const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, //[true, 'Project name is required']
    trim: true
  },
  description: { 
    type: String,
    trim: true 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  members: [
    { 
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
      role: {type: String, default: 'Member' }
    }
  ],
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started'
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  }
}, { 
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
