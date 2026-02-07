import { useState } from "react";
import { User, Settings, HelpCircle, LogOut, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function UserDropdown() {
  const { currentUser, userData } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-slate-50">
        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userData?.name}`} className="w-9 h-9 rounded-full bg-slate-100" alt="pfp" />
        <ChevronDown size={14} className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-20 animate-in zoom-in duration-200">
            <Link to={`/profile/${currentUser?.uid}`} onClick={() => setIsOpen(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 font-medium">
              <User size={16} /> My Profile
            </Link>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 font-medium border-b border-slate-50">
              <Settings size={16} /> Settings
            </button>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 font-bold hover:bg-red-50 cursor-pointer transition-colors">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
}