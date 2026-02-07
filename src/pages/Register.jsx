import { useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import toast from 'react-hot-toast';

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const cleanEmail = formData.email.toLowerCase().trim();

    try {
      const allowedDoc = await getDoc(doc(db, "allowed_users", cleanEmail));
      if (!allowedDoc.exists()) {
        throw new Error("This email is not authorized. Contact Admin.");
      }

      const assignedRole = allowedDoc.data().role;
      const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, formData.password);
      
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        name: formData.name,
        email: cleanEmail,
        role: assignedRole,
        createdAt: new Date()
      });

      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-4xl shadow-2xl border border-slate-100">
        <h2 className="text-3xl font-black text-slate-800 text-center mb-8 uppercase tracking-tighter">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input disabled={loading} type="text" placeholder="Full Name" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          <input disabled={loading} type="email" placeholder="Email" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          <input disabled={loading} type="password" placeholder="Password" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          <button disabled={loading} className="w-full bg-blue-600 text-white p-4 rounded-2xl font-black hover:bg-blue-700 transition-all cursor-pointer">
            {loading ? "Processing..." : "Create Account"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm font-medium">
          Already have an account? <Link to="/login" className="text-blue-600 font-bold">Sign In</Link>
        </p>
      </div>
    </div>
  );
}