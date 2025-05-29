import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProjectsHeader = () => {
  const navigate = useNavigate();

  const handleNewProject = () => {
    navigate('/projects/new');
  };

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-white">Projects</h1>
      <Button
        onClick={handleNewProject}
        className="flex items-center gap-2 bg-blue-400 text-white hover:opacity-0.8 cursor-pointer" 
      > {/**bg-primary hover:bg-primary/90*/}
        <Plus size={18} />
        New Project
      </Button>
    </div>
  )
}

export default ProjectsHeader;