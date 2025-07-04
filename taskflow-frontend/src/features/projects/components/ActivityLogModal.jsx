import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const ActivityLogModal = ({ isOpen, onClose, logs, taskTitle }) => {
  const modalRef = useRef();

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

  const sortedLogs = [...logs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          ref={modalRef} 
          className="bg-gray-900 text-white w-full max-w-md rounded-lg p-6 shadow-lg relative max-h-[80vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-lg font-semibold mb-4">
            Activity Logs for: <span className="text-blue-400">{taskTitle}</span>
          </h2>
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-gray-400 hover:text-white text-xl"
          >
            &times;
          </button>
          <ul className="space-y-4">
            {sortedLogs?.length > 0 ? (
              sortedLogs.map((log, idx) => (
                <li key={idx} className="border-l-4 border-blue-500 pl-4">
                  <p className="text-sm">{log.message}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(log.createdAt).toLocaleString()} {/*by {log.performedBy?.name || 'Unknown'}*/}
                  </p>
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-400">No logs available for this task.</p>
            )}
          </ul>
        </motion.div>
      </motion.div>
    </AnimatePresence>
    
  );
};

export default ActivityLogModal;
