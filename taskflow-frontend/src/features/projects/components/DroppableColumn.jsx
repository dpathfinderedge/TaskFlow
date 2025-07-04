import { useDroppable } from '@dnd-kit/core';

const DroppableColumn = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className="bg-gray-900 p-4 rounded shadow-sm "> {/**min-h-[100px] */}
      {children}
    </div>
  );
};

export default DroppableColumn;
