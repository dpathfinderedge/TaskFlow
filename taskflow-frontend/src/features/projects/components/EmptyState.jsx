import React from 'react';
import { Button } from '@/components/ui/button';
import { FilePlus } from 'lucide-react';
import Empty from '../../../assets/empty-state.png';

const EmptyState = ({ onNewProject }) => {
  return (
    <div className="flex flex-col items-center h-full justify-center text-center py-20 text-zinc-400">
      <img
        src={Empty}
        alt="No projects"
        className="w-48 h-48 mb-6"
      />
      <h2 className="text-xl font-semibold text-white mb-2">
        No Projects Yet
      </h2>
      <p className="text-sm mb-6">
        Click <strong>'New Project'</strong> to get started!
      </p>
      <Button onClick={onNewProject} className="gap-2 bg-blue-400">
        <FilePlus size={16} />
        New Project
      </Button>
    </div>
  )
}

export default EmptyState;