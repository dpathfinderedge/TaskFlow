import { Progress } from '@/components/ui/progress';
import { Calendar, Users } from 'lucide-react';
import React from 'react'

const ProjectCard = ({ project }) => {
  const { name, description, endDate, progress, members } = project;

  return (
    <div className="bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition">{/**bg-zinc-800 */}
      <h2 className="text-lg font-semibold text-white">{name}</h2>
      <p className="text-sm text-zinc-400 mt-1">{description}</p>

      <div className="flex items-center gap-2 text-sm text-zinc-400 mt-4">
        <Calendar size={14} />
        <span>Due: {endDate}</span>
      </div>

      <div className="mt-4">
        <Progress value={progress} className="h-2 bg-zinc-700" />
        <span className="text-xs text-zinc-400 mt-1 block">{progress}% completed</span>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex -space-x-2">
          {members.map((src, index) => (
            <img
              key={index}
              src={src}
              alt="member"
              className="w-8 h-8 rounded-full border-2 border-zinc-800"
            />
          ))}
        </div>
        <Users size={16} className="text-zinc-400" />
      </div>
    </div>
  )
}

export default ProjectCard;