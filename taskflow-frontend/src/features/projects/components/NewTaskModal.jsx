import { createTask } from '@/services/api';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const NewTaskModal = ({ isOpen, onClose, projectId, onTaskCreated, members }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [assignedTo, setAssignedTo] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const modalRef = useRef();

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutsideOrEsc = (e) => {
      if (e.type === 'mousedown' && modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }

      if (e.type === 'keydown' && e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutsideOrEsc);
      document.addEventListener('keydown', handleClickOutsideOrEsc);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideOrEsc);
      document.removeEventListener('keydown', handleClickOutsideOrEsc);
    }
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createTask({ title, priority, assignedTo, description, dueDate, projectId });
      toast.success('Task created successfully');
      onTaskCreated();
      onClose(); 
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          ref={modalRef} 
          className="bg-gray-900 text-white p-6 rounded-lg w-full max-w-md shadow-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4">New Task</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Title</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-800"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Assign To</label>
              <select
                className="w-full p-2 rounded bg-gray-800"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                required
              >
                <option value="">Select a member</option>
                {members.map((member) => (
                  <option key={member.userId._id} value={member.userId._id}>
                    {member.userId.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Description</label>
              <textarea
                rows={3}
                className="w-full p-2 rounded bg-gray-800"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Due Date</label>
              <input
                type="date"
                className="w-full p-2 rounded bg-dark-800"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm bg-gray-600 hover:bg-gray-500 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 rounded"
              >
                {loading ? 'Creating...' : 'Create Task'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NewTaskModal;
