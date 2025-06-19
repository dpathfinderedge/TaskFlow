import { useState } from 'react';
import toast from 'react-hot-toast';
import NewTaskModal from './NewTaskModal';
import EditTaskModal from './EditTaskModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { deleteTask, updateTask } from '@/services/api';

const StatusDropdown = ({ currentStatus, taskId, onStatusChange }) => {
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState(currentStatus);

  const handleChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setEditing(false);
    await onStatusChange(taskId, newStatus);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'todo':
        return 'bg-gray-600';
      case 'in-progress':
        return 'bg-yellow-600';
      case 'completed':
        return 'bg-green-600';    
      default:
        return 'bg-gray-500';
    }
  };

  return editing ? (
    <select
      className="text-sm bg-gray-800 text-white rounded px-2 py-1"
      value={status}
      onChange={handleChange}
      onBlur={() => setEditing(false)}
      autoFocus
    >
      <option value="todo">Todo</option>
      <option value="in-progress">In Progress</option>
      <option value="completed">Completed</option>
    </select>
  ) : (
    <span
      onClick={() => setEditing(true)}
      className={`cursor-pointer inline-block text-center text-white hover:opacity-90 text-xs capitalize px-3 py-1 rounded-full ${getStatusStyle(status)}`}
    >
      {status.replace('-', ' ')}
    </span>
  )
};

const TasksSection = ({ tasks, projectId, refreshTasks }) => {  
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  const handleDelete = async () => {
    if (!deletingTaskId) return;

    try {
      await deleteTask(deletingTaskId);
      toast.success('Task deleted successfully');
      refreshTasks();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeletingTaskId(null);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      refreshTasks();
      toast.success(`Status updated`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <button
          className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
          onClick={() => setIsTaskModalOpen(true)}
        >
          + New Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet. Create one!</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map(task => (
            <li key={task._id} className="bg-gray-800 p-4 rounded shadow">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium text-lg">{task.title}</h3>
                  <p className="text-sm text-gray-400">{task.description}</p>
                  <p className="text-sm mt-1 text-gray-400">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col justify-between gap-2">
                  <StatusDropdown
                    currentStatus={task.status}
                    taskId={task._id}
                    onStatusChange={handleStatusChange}
                  />

                  <div className="flex justify-between gap-2">
                    <button
                      onClick={() => setEditingTask(task)}
                      className="text-blue-500 text-sm hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeletingTaskId(task._id)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* New Task Modal */}
      {isTaskModalOpen && (
        <NewTaskModal 
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          projectId={projectId}
          onTaskCreated={refreshTasks}
        />
      )}

      {/* Edit Task Modal */}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          isOpen={!!editingTask}
          onClose={() => setEditingTask(null)}
          onTaskCreated={refreshTasks}
        />
      )}

      {/* Delete Task Modal */}
      {deletingTaskId && (
        <DeleteConfirmationModal
          isOpen={!!deletingTaskId}
          onCancel={() => setDeletingTaskId(null)}
          onConfirm={handleDelete}
          message={`Are you sure you want to delete this task?`}
        />
      )}
    </section>
  );
};

export default TasksSection;
