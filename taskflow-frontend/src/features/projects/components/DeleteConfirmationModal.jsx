import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const DeleteConfirmationModal = ({ isOpen, onConfirm, onCancel, message }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutsideOrEsc = (e) => {
      if (e.type === 'mousedown' && modalRef.current && !modalRef.current.contains(e.target)) {
        onCancel();
      }

      if (e.type === 'keydown' && e.key === 'Escape') {
        onCancel();
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
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          ref={modalRef} 
          className="bg-gray-900 p-6 rounded-lg w-full max-w-md text-white"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
          <p className="mb-6 text-gray-300">{message}</p>
          <div className="flex justify-end gap-2">
            <button onClick={onCancel} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">
              Cancel
            </button>
            <button onClick={onConfirm} className="px-4 py-2 bg-red-600 rounded hover:bg-red-500">
              Delete
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteConfirmationModal;
