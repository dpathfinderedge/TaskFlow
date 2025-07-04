/* eslint-disable no-useless-catch */
const API_URL = import.meta.env.VITE_API_URL;

// Project-related Functions
export const createProject = async (projectData) => {  
  try {
    const res = await fetch(`${API_URL}/projects/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(projectData),
    });

    const data = await res.json();
    console.log(data);
    if (!res.ok) throw new Error(data.message || 'Failed to create project');
    return data;
  } catch (err) {
    throw err;
  }
};

export const getProjects = async () => {
  try {
    const res = await fetch(`${API_URL}/projects/get`, {
      method: 'GET',
      credentials: 'include',
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch projects');
    return data;
  } catch (err) {
    throw err;
  }
};

export const getProjectById = async (projectId) => {
  try {
    const res = await fetch(`${API_URL}/projects/${projectId}`, {
      method: 'GET',
      credentials: 'include',
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch project');
    return data;
  } catch (err) {
    throw err;
  }
};

export const inviteMember = async (projectId, inviteData) => {
  try {
    const res = await fetch(`${API_URL}/projects/${projectId}/invite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(inviteData)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to invite member');
    return data;
  } catch (err) {
    throw err;
  }
};

// Task-related Functions
export const createTask = async (taskData) => {
  try {
    const res = await fetch(`${API_URL}/tasks/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(taskData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create task');
    return data;
  } catch (err) {
    throw err;
  }
};

export const getTasksByProject = async (projectId) => {
  try {
    const res = await fetch(`${API_URL}/tasks/project/${projectId}`, {
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch tasks');
    return data;
  } catch (err) {
    throw err;
  }
};

export const updateTask = async (taskId, updates) => {
  try {
    const res = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(updates)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update task');
    return data;
  } catch (err) {
    throw err;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const res = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete task');
    return data;
  } catch (err) {
    throw err;
  }
};
