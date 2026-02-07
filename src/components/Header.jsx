import { Menu, X } from "lucide-react";
import UserDropdown from "./UserDropdown";
import { useAuth } from "../context/AuthContext";

export default function Header({ isSidebarOpen, setIsSidebarOpen }) {
  const { userData } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 h-16">
      <div className="max-w-7xl mx-auto px-4 h-full flex justify-between items-center">
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-2 hover:bg-slate-100 rounded-xl cursor-pointer text-slate-600 transition-colors"
          >
            {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white text-sm">U</div>
            <div className="flex items-start">
              <span className="text-base font-black text-slate-800 leading-none">{userData?.name}</span>
              <sup className="text-[10px] font-black text-blue-600 uppercase ml-1">{userData?.role}</sup>
            </div>
          </div>
        </div>

        {/* User Data එක Dropdown එකට පාස් කිරීම */}
        <UserDropdown userData={userData} />
        
      </div>
    </header>
  );
}