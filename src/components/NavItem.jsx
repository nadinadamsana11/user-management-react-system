import React from 'react';

/**
 * NavItem Component
 * @param {ReactNode} icon - Lucide icon component
 * @param {string} label - The text to display
 * @param {boolean} active - Highlights the item if true
 * @param {function} onClick - Function to run when clicked
 */
export default function NavItem({ icon, label, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold 
        transition-all duration-200 cursor-pointer group
        ${active 
          ? "bg-blue-600 text-white shadow-lg shadow-blue-100" 
          : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
        }
      `}
    >
      {/* Icon Wrapper */}
      <span className={`
        transition-transform duration-200 group-hover:scale-110
        ${active ? "text-white" : "text-slate-400 group-hover:text-blue-600"}
      `}>
        {icon}
      </span>

      {/* Label Text */}
      <span className="text-sm tracking-wide">
        {label}
      </span>
      
      {/* Active Indicator Dot (Optional) */}
      {active && (
        <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></span>
      )}
    </button>
  );
}