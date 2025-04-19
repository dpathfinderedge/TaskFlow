import { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // 1) fetch initial list
    const fetchProjects = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/projects`,
        { withCredentials: true }
      );
      setProjects(res.data);
    };
    fetchProjects();

    // 2) connect socket & join room
    const socket = io(import.meta.env.VITE_WS_URL, {
      withCredentials: true
    });
    socket.emit('joinProjects');

    // 3) listen for real‑time events
    socket.on('projectCreated', (project) => {
      setProjects((prev) => [...prev, project]);
    });

    // cleanup on unmount
    return () => socket.disconnect();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Your Projects</h1>
      <ul className="space-y-4">
        {projects.map((p) => (
          <li key={p._id}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="text-gray-600">{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;