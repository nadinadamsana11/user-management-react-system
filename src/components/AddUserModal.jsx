import { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { X, Mail, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

export default function AddUserModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await setDoc(doc(db, "allowed_users", email.toLowerCase().trim()), {
        email: email.toLowerCase().trim(),
        role: role
      });
      toast.success("User authorized successfully!");
      setEmail("");
      onClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-md rounded-4xl shadow-2xl p-8 animate-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-slate-800">Authorize New User</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl cursor-pointer"><X size={20} /></button>
        </div>

        <form onSubmit={handleAdd} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="member@company.com"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-400 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Assign Permission</label>
            <div className="relative">
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <select 
                value={role} onChange={(e) => setRole(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-400 outline-none appearance-none"
              >
                <option value="user">Normal User</option>
                <option value="admin">System Administrator</option>
              </select>
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-blue-600 text-white p-4 rounded-2xl font-black hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95 disabled:opacity-50 mt-2"
          >
            {loading ? "Authorizing..." : "Grant System Access"}
          </button>
        </form>
      </div>
    </div>
  );
}