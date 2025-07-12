import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const useSocket = (projectId, refreshTasks) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!projectId) return;

    socketRef.current = io(import.meta.env.VITE_WS_URL, {
      withCredentials: true,
    });

    socketRef.current.emit('join-project', projectId);

    socketRef.current.on('task-created', () => refreshTasks());
    socketRef.current.on('task-updated', () => refreshTasks());
    socketRef.current.on('task-deleted', () => refreshTasks());

    return () => {
      socketRef.current.emit('leave-project', projectId);
      socketRef.current.disconnect();
    };
  }, [projectId, refreshTasks]);

  return socketRef;
};

export default useSocket;
