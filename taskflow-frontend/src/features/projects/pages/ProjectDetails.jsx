import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById, getTasksByProject } from '@/services/api';
import InviteMemberModal from '../components/InviteMemberModal';
import MembersSection from '../components/MembersSection';
import TasksSection from '../components/TasksSection';
import ProjectOverview from '../components/ProjectOverview';

const ProjectDetails = () => {
  const { id: projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projData, taskData] = await Promise.all([
          getProjectById(projectId),
          getTasksByProject(projectId)
        ]);
        setProject(projData);
        setTasks(taskData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);
  
  const handleInviteSuccess = async () => {
    const updated = await getProjectById(projectId);
    setProject(updated);
    setIsInviteOpen(false);
  };

  const formatDate = (iso) => new Date(iso).toLocaleDateString();

  if (loading) return <p className="p-4 text-white">Loading project...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!project) return <p className="p-4 text-gray-400">Project not found.</p>;

  return (
    <div className="p-6 text-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
        <p className="text-gray-400">{project.description}</p>
      </div>

      {/* Meta Info */}
      <div className="mb-6 flex flex-wrap gap-6 text-sm text-gray-300">
        <div>Created by: <span className="text-white font-medium">{project.createdBy?.name}</span></div>
        <div>Created on: <span className="text-white">{formatDate(project.createdAt)}</span></div>
        <div>Members: <span className="text-white">{project.members?.length || 0}</span></div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-700">
        <nav className="flex gap-4">
          {['overview', 'tasks', 'team'].map(tab => (
            <button
              key={tab}
              className={`pb-2 font-medium ${
                activeTab === tab ? 'border-b-2 border-blue-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Panels */}
      {activeTab === 'overview' && (
        <div className="text-gray-300 space-y-3">
          <p>This is a general overview of your project.</p>
          {/* <p>Future analytics, progress charts, and milestones will appear here.</p> */}
          {/* Add a summary (progress bar, upcoming deadlines, project stats) */}
          <ProjectOverview
            project={project}
            tasks={tasks}
           />
        </div>
      )}

      {activeTab === 'tasks' && (
        // <TasksSection projectId={projectId} />
        <TasksSection
         tasks={tasks} 
         projectId={projectId} 
         refreshTasks={async () => {
          const updatedTasks = await getTasksByProject(projectId);
          setTasks(updatedTasks);  
         }}
         members={project.members}
        />
      )}

      {activeTab === 'team' && (
        <MembersSection
          members={project.members}
          onInviteClick={() => setIsInviteOpen(true)}
        />
        // Later support role management or permissions
      )}

      {/* Invite Member Modal */}
      {isInviteOpen && (
        <InviteMemberModal
          isOpen={isInviteOpen}
          onClose={() => setIsInviteOpen(false)}
          projectId={projectId}
          onSuccess={handleInviteSuccess}
        />
      )}
    </div>
  );
}

export default ProjectDetails;