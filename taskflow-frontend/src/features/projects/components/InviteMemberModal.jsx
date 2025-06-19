import { useEffect, useRef, useState } from "react";
import { inviteMember } from '@/services/api';
import { motion, AnimatePresence } from "framer-motion";

const roles = ['Member', 'Admin'];

const InviteMemberModal = ({ isOpen, onClose, projectId, onSuccess }) =>{
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Member');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const modalRef = useRef();

  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setRole('Member');
      setError();
      setSuccess('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutsideOrEsc = (e) => {
      if (e.type === 'mousedown' && modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }

      if (e.type === 'keydown' && e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutsideOrEsc);
      document.addEventListener('keydown', handleClickOutsideOrEsc);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideOrEsc);
      document.removeEventListener('keydown', handleClickOutsideOrEsc);
    }
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Email is required');
      return;
    }

    try {
        const res = await inviteMember(projectId, { email, role });
        setSuccess(res.message);
        onSuccess();
    } catch (err) {
        setError(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          ref={modalRef} 
          className="bg-white dark:bg-gray-900 text-black p-6 rounded-xl shadow-xl w-full max-w-md"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
            <h2 className="text-xl font-semibold mb-4">Invite Member</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                type="email"
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>
            <div>
                <label className="block mb-1 font-medium">Role</label>
                <select
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                >
                {roles.map((r) => (
                    <option key={r} value={r}>
                    {r}
                    </option>
                ))}
                </select>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <div className="flex justify-end space-x-2">
                <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                Cancel
                </button>
                <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                Invite
                </button>
            </div>
            </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InviteMemberModal;
