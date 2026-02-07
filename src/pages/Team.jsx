import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, query, limit, onSnapshot } from "firebase/firestore";
import { Plus, Users as UsersIcon, ChevronRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AddUserModal from "../components/AddUserModal";

export default function Team() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "users"), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let userList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      userList.sort((a, b) => {
        if (a.id === currentUser?.uid) return -1;
        if (b.id === currentUser?.uid) return 1;
        return 0;
      });

      setUsers(userList);
      setLoading(false);
    }, (error) => {
      console.error(error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          <UsersIcon size={24} className="text-blue-600" /> Team Members
        </h1>
        {isAdmin && (
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-5 py-2.5 rounded-2xl font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
            <Plus size={20} /> Add Member
          </button>
        )}
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-blue-600" /></div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((user) => (
                <tr key={user.id} onClick={() => navigate(`/profile/${user.id}`)} className="hover:bg-slate-50 cursor-pointer group transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} className="w-10 h-10 rounded-full bg-slate-100" alt="pfp" />
                    <div>
                      <p className="font-bold text-slate-700">{user.name} {user.id === currentUser?.uid && <span className="text-blue-500 text-xs ml-1">(You)</span>}</p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-xs uppercase text-slate-500">{user.role}</td>
                  <td className="px-6 py-4 text-right"><ChevronRight size={18} className="text-slate-300 group-hover:text-blue-600" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <AddUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}