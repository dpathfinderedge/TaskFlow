import React from 'react'

const GoalsCard = ({ icon, title, desc }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-6">
      {/* <Icon size={18} className="text-blue-400 mb-2" /> */}
      <h3 className="text-white font-semibold text-xl mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  )
}

export default GoalsCard;