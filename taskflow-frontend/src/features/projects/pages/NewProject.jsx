import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { createProject } from '@/services/api';

const NewProject = () => {
  const [form, setForm] = useState({ name: '', description: '', startDate: '', endDate: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    console.log(form);
    e.preventDefault();
    setErrors({});
    setLoading(true);

    
    try {
        // console.log(form);
      await createProject(form);
      navigate('/projects');
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-semibold mb-6">Create New Project</h1>

      <div className="bg-gray-800 rounded-2xl shadow-md text-white p-6">{/**max-w-2xl mx-auto bg-zinc-900*/}
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && <p className="text-red-500 text-sm mt-1">{errors.general}</p>}
          <div>
            <label htmlFor="name" className="block mb-1 font-medium text-white">
              Project Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g., Marketing Website Redesign"
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block mb-1 font-medium text-white">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              placeholder="Brief summary of the project..."
            //   required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="deadline" className="block text-sm font-medium mb-1 text-white">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={form.startDate }
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex-1">
              <label htmlFor="deadline" className="block text-sm font-medium mb-1 text-white">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={form.endDate }
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 transition font-semibold"
            >
              {loading ? 'Creating...': 'Create Project'}
            </button>
          </div>
        </form>
      </div> 
    </div>
  );
};

export default NewProject;
