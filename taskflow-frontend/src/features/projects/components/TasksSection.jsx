import { useState } from 'react';
import toast from 'react-hot-toast';
import NewTaskModal from './NewTaskModal';
import EditTaskModal from './EditTaskModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { deleteTask } from '@/services/api';

const TasksSection = ({ tasks, projectId, refreshTasks }) => {  
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleDeleteConfirm = async () => {
    if (!taskToDelete) return;

    try {
      await deleteTask(taskToDelete._id);
      toast.success('Task deleted successfully');
      refreshTasks();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setTaskToDelete(null);
    }
  }

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
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{task.title}</h3>
                  <p className="text-sm text-gray-500">{task.description}</p>
                  <p className="text-xs mt-1 text-gray-400">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingTask(task)}
                    className="text-blue-500 text-sm hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setTaskToDelete(task)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete
                  </button>
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
      <DeleteConfirmationModal
        isOpen={!!taskToDelete}
        onCancel={() => setTaskToDelete(null)}
        onConfirm={handleDeleteConfirm}
        message={`Are you sure you want to delete the task "${taskToDelete?.title}"?`}
      />
    </section>
  );
};

export default TasksSection;
