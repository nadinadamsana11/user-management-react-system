import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, FolderOpen, Bell, Settings, X } from "lucide-react";

const menuItems = [
  { path: "/", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { path: "/team", label: "Team Members", icon: <Users size={20} /> },
  { path: "/files", label: "Project Files", icon: <FolderOpen size={20} /> },
  { path: "/announcements", label: "Announcements", icon: <Bell size={20} /> },
  { path: "/settings", label: "Settings", icon: <Settings size={20} /> },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 cursor-pointer" onClick={onClose} />
      )}

      {/* Sidebar Content */}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-white z-60 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-black text-slate-800">Main <span className="text-blue-600">Menu</span></h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-lg cursor-pointer"><X size={20} /></button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all cursor-pointer
                  ${isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-slate-600 hover:bg-slate-50"}
                `}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}