import { useMemo, useState } from 'react';
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

const TasksSection = ({ tasks, projectId, refreshTasks, members }) => {  
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()) || task.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchTerm, statusFilter,  priorityFilter]);

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
      {/* <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <button
          className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
          onClick={() => setIsTaskModalOpen(true)}
        >
          + New Task
        </button>
      </div> */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <h2 className="text-xl font-semibold text-white">Tasks</h2>
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full md:w-60 p-2 rounded bg-gray-800 text-white border border-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-2 rounded bg-gray-800 text-white border border-gray-700"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select
            className="p-2 rounded bg-gray-800 text-white border border-gray-700"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            onClick={() => setIsTaskModalOpen(true)}
          >
            + New Task
          </button>
        </div>
      </div>

      {/* {filteredTasks.length === 0 ? (
        <p className="text-gray-400 text-sm">No tasks match the current filters.</p>
      ) : (
        <ul className="space-y-3">
          {filteredTasks.map((task) => (
            <li key={task._id} className="bg-gray-800 p-4 rounded shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg text-white">{task.title}</h3>
                  <p className="text-sm text-gray-400">{task.description}</p>
                  <p className="text-xs mt-1 text-gray-500">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                  <StatusDropdown
                    currentStatus={task.status}
                    taskId={task._id}
                    onStatusChange={handleStatusChange}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingTask(task)}
                    className="text-blue-400 text-sm hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeletingTaskId(task._id)}
                    className="text-red-400 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )} */}

      {/* {tasks.length === 0 ? ( */}
      {filteredTasks.length === 0 ? (
        // <p className="text-gray-500">No tasks yet. Create one!</p>
        <p className="text-gray-500">No tasks match the current filters.</p>
      ) : (
        <ul className="space-y-3">
          {/* {tasks.map(task => ( */}
          {filteredTasks.map(task => (
            <li key={task._id} className="bg-gray-800 p-4 rounded shadow">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium text-lg">{task.title}</h3>
                  <p className="text-sm text-gray-400">{task.description}</p>
                  {/* <p className="text-sm mt-1 text-gray-400">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p> */}
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    <span className={`px-2 py-0.5 rounded-full font-medium text-white ${
                      task.priority === 'high'
                        ? 'bg-red-600'
                        : task.priority === 'medium'
                        ? 'bg-yellow-500 text-black'
                        : 'bg-green-600'
                    }`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  </div>
                  {task.assignedTo && (
                    <p className="text-xs text-gray-400 mt-1">
                      Assigned to: {task.assignedTo.name}
                    </p>
                  )}
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
          members={members}
        />
      )}

      {/* Edit Task Modal */}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          isOpen={!!editingTask}
          onClose={() => setEditingTask(null)}
          onTaskCreated={refreshTasks}
          members={members}
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
