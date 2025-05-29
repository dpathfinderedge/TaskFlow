import React, { useEffect, useState } from "react";
import ProjectsHeader from "../components/ProjectsHeader";
import ProjectCard from "../components/ProjectCard";
import EmptyState from "../components/EmptyState";
import Avatar from '../../../assets/avatar.png';
import { getProjects } from "@/services/api";

// const dummyProjects = [
//   {
//     id: 1,
//     title: 'Website Redesign',
//     description: 'Update UI for marketing site',
//     progress: 70,
//     tasksCompleted: 14,
//     totalTasks: 20,
//     dueDate: 'May 25',
//     members: [Avatar, Avatar, Avatar]
//   },
//   {
//     id: 2,
//     title: 'Mobile App Development',
//     description: 'Update UI for Bookly',
//     progress: 50,
//     tasksCompleted: 10,
//     totalTasks: 20,
//     dueDate: 'May 30',
//     members: [Avatar, Avatar]
//   },
//   {
//     id: 3,
//     title: 'Marketing Campaign',
//     description: 'New marking campaign',
//     progress: 30,
//     tasksCompleted: 8,
//     totalTasks: 20,
//     dueDate: 'May 30',
//     members: [Avatar, Avatar]
//   },
//   {
//     id: 4,
//     title: 'New Emplyee Unboarding',
//     description: 'Zoom meeting organization',
//     progress: 90,
//     tasksCompleted: 18,
//     totalTasks: 20,
//     dueDate: 'May 30',
//     members: [Avatar, Avatar, Avatar]
//   },
// ]

const Projects = () => {
  const [projects, setProjects] = useState([]); {/**dummyProjects */}
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);
  
  return (
    <div className="p-6">
      <ProjectsHeader />

      {loading ? (
          <p className="text-gray-400">Loading projects...</p>
        ) : projects.length === 0 ? (
          <div className="flex justify-center w-full"><EmptyState /></div>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )
      }
    </div>
  );
};
  
export default Projects;
  