import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import NewTaskModal from './NewTaskModal';
import EditTaskModal from './EditTaskModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { deleteTask, updateTask } from '@/services/api';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import DraggableTask from './DraggableTask';
import DroppableColumn from './DroppableColumn';
import ActivityLogModal from './ActivityLogModal';

const TasksSection = ({ tasks, projectId, refreshTasks, members }) => {  
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [collapsedColumns, setCollapsedColumns] = useState({ todo: false, 'in-progress': false, completed: false});

  const [selectedTaskLogs, setSelectedTaskLogs] = useState([]);
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [logTaskTitle, setLogTaskTitle] = useState('');

  const toggleCollapse = (key) => {
    setCollapsedColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleViewLogs = (task) => {
    setSelectedTaskLogs(task.activityLogs || []);
    setLogTaskTitle(task.title);
    setLogModalOpen(true);
  };
  

  const groupedTasks = useMemo(() => {
    const groups = { 'todo': [], 'in-progress': [], 'completed': [] };
    const validStatuses = Object.keys(groups);

    const filtered = tasks.filter(task => {
      const matchesSearch = task.title?.toLowerCase().includes(searchTerm.toLowerCase()) || task.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });

    filtered.forEach(task => {
      const safeStatus = validStatuses.includes(task.status) ? task.status : 'todo';
      groups[safeStatus].push(task)
    });
    return groups;
  }, [tasks, searchTerm, statusFilter, priorityFilter]);

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

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || !active) return;
  
    const taskId = active.id;
    const newStatus = over.id;
  
    const task = tasks.find((t) => t._id === taskId);
    if (!task || task.status === newStatus) return;
  
    try {
      await updateTask(taskId, { status: newStatus });
      toast.success('Task status updated');
      refreshTasks();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className="mt-8">
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

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div> {/**className="grid grid-cols-1 md:grid-cols-3 gap-6" */}
          {['todo', 'in-progress', 'completed'].map((statusKey) => (
            <DroppableColumn key={statusKey} id={statusKey}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-semibold text-lg capitalize">
                  {statusKey.replace('-', ' ')} ({groupedTasks[statusKey].length})
                </h3>
                <button
                  onClick={() => toggleCollapse(statusKey)}
                  className="text-sm text-blue-400 hover:underline"
                >
                  {collapsedColumns[statusKey] ? 'Expand' : 'Collapse'}
                </button>
              </div>
              
              {!collapsedColumns[statusKey] && (
                <SortableContext
                  items={groupedTasks[statusKey].map(task => task._id)}
                  strategy={verticalListSortingStrategy}
                >
                  <ul className="space-y-3">
                    {groupedTasks[statusKey].map(task => (
                      <DraggableTask
                        key={task._id}
                        task={task}
                        onEdit={() => setEditingTask(task)}
                        onDelete={() => setDeletingTaskId(task._id)}
                        onStatusChange={handleStatusChange}
                        onViewLogs={handleViewLogs}
                      />
                    ))}
                  </ul>
                </SortableContext>
              )}
            </DroppableColumn>
          ))}
        </div>
      </DndContext>

      {isTaskModalOpen && (
        <NewTaskModal 
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          projectId={projectId}
          onTaskCreated={refreshTasks}
          members={members}
        />
      )}

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          isOpen={!!editingTask}
          onClose={() => setEditingTask(null)}
          onTaskCreated={refreshTasks}
          members={members}
        />
      )}

      {deletingTaskId && (
        <DeleteConfirmationModal
          isOpen={!!deletingTaskId}
          onCancel={() => setDeletingTaskId(null)}
          onConfirm={handleDelete}
          message={`Are you sure you want to delete this task?`}
        />
      )}

      <ActivityLogModal
        isOpen={logModalOpen}
        onClose={() => setLogModalOpen(false)}
        logs={selectedTaskLogs}
        taskTitle={logTaskTitle}
      />
    </section>
  );
};

export default TasksSection;
