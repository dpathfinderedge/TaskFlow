import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Bars3Icon } from '@heroicons/react/24/solid';

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

const getPriorityStyle = (priority) => {
  const base = 'text-xs px-2 py-0.5 rounded-full font-medium';
  switch (priority) {
    case 'low':
      return <span className={`${base} bg-gray-600 text-gray-300`}>Low</span>;
    case 'medium':
      return <span className={`${base} bg-blue-600 text-white`}>Medium</span>;
    case 'high':
      return <span className={`${base} bg-red-600 text-white`}>High</span>;
    default:
      return <span className={`${base} bg-gray-500 text-white`}>Medium</span>;
  }
};

const DraggableTask = ({ task, onEdit, onDelete, onStatusChange, onViewLogs }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useDraggable({
    id: task._id,
    data: { task }
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    cursor: 'default'
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      // {...attributes}
      className="bg-gray-800 p-4 rounded shadow"
    > 
      <div className="flex justify-between items-start gap-2">
        <div className="w-full"> {/**{...listeners} {...attributes} */}
          <h3 className="font-medium text-lg text-white">{task.title}</h3>
          <p className="text-sm text-gray-400">{task.description}</p>
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
            <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            <div>{getPriorityStyle(task.priority)}</div>
          </div>
          {task.assignedTo && (
            <p className="text-xs text-blue-400 mt-1">
              Assigned to: {task.assignedTo.name}
            </p>
          )}

          {task.activityLogs?.length > 0 && (
            <div className="mt-2">
              <button
                onClick={() => onViewLogs(task)}
                className="text-yellow-400 text-sm hover:underline"
              >
                View Logs
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-2 md:gap-4">
          <div {...listeners} {...attributes} className="cursor-grab hover:opacity-70 text-gray-400" title="Drag"> {/**{...attributes} */}
            <Bars3Icon className="w-5 h-5" />
          </div>

          <StatusDropdown
            currentStatus={task.status}
            taskId={task._id}
            onStatusChange={onStatusChange}
          />
          <button
            onClick={() => onEdit(task)}
            className="text-blue-500 text-sm hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="text-red-500 text-sm hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default DraggableTask;
