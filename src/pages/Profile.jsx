import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Save, Trash2, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";

export default function Profile() {
  const { id } = useParams();
  const { currentUser, isAdmin } = useAuth();
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [updating, setUpdating] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const navigate = useNavigate();

  const isOwnProfile = currentUser?.uid === id;

  useEffect(() => {
    const fetchProfile = async () => {
      const docSnap = await getDoc(doc(db, "users", id));
      if (docSnap.exists()) {
        setProfile(docSnap.data());
        setName(docSnap.data().name);
      }
    };
    fetchProfile();
  }, [id]);

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await updateDoc(doc(db, "users", id), { name });
      toast.success("Profile updated!");
    } catch (err) { toast.error(err.message); }
    finally { setUpdating(false); }
  };

  const proceedDelete = async () => {
    setUpdating(true);
    try {
      await deleteDoc(doc(db, "users", id));
      toast.success("User deleted");
      navigate("/team");
    } catch (err) { toast.error(err.message); }
    finally { setUpdating(false); setIsConfirmOpen(false); }
  };

  if (!profile) return <div className="p-10 text-center font-bold text-slate-300">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-slate-800 font-bold cursor-pointer transition-colors">
        <ArrowLeft size={18} /> Back
      </button>

      <div className="bg-white rounded-4xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="h-32 bg-linear-to-r from-blue-600 to-indigo-700"></div>
        <div className="px-8 pb-10 -mt-16">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}`} className="w-32 h-32 rounded-3xl border-4 border-white bg-white shadow-lg mb-6" alt="avatar" />
          <h2 className="text-2xl font-black text-slate-800">{profile.name}</h2>
          <p className="text-slate-400 font-medium uppercase text-xs">{profile.role}</p>

          <div className="mt-8 space-y-4">
            <input disabled={!isOwnProfile} value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none" />
            <div className="flex gap-3">
              {isOwnProfile && (
                <button onClick={handleUpdate} disabled={updating} className="flex-1 bg-blue-600 text-white p-4 rounded-2xl font-black flex items-center justify-center gap-2 cursor-pointer hover:bg-blue-700">
                  <Save size={18} /> Update
                </button>
              )}
              {isAdmin && !isOwnProfile && (
                <button onClick={() => setIsConfirmOpen(true)} className="flex-1 bg-red-50 text-red-600 p-4 rounded-2xl font-black flex items-center justify-center gap-2 cursor-pointer hover:bg-red-100">
                  <Trash2 size={18} /> Delete Member
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal isOpen={isConfirmOpen} title="Remove Member" message="Are you sure you want to delete this user?" onConfirm={proceedDelete} onCancel={() => setIsConfirmOpen(false)} loading={updating} />
    </div>
  );
}