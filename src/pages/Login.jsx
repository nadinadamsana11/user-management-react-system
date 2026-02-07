import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true); // Start loading during DB check

    try {
      // Firebase authentication logic
      await signInWithEmailAndPassword(auth, email.toLowerCase().trim(), password);
      
      toast.success("Welcome back!");
      navigate("/"); // Redirect to home/dashboard
        // catch කොටස මෙසේ වෙනස් කරන්න:
        } catch (error) {
        console.error(error); // error එක පාවිච්චි කිරීමෙන් Warning එක ඉවත් වේ.
        toast.error("Invalid credentials. Please try again.");
        } finally {
      setIsLoggingIn(false); // Stop loading exactly when task is done
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white p-10 rounded-4xl shadow-2xl border border-slate-100">
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-200">
            <span className="text-white font-black text-3xl">U</span>
          </div>
          <h2 className="text-3xl font-black text-slate-800">User Portal</h2>
          <p className="text-slate-400 font-medium text-sm mt-1">Please sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email Address</label>
            <input 
              disabled={isLoggingIn}
              type="email" 
              placeholder="name@company.com" 
              className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-400 focus:bg-white outline-none transition-all disabled:opacity-50" 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Password</label>
            <input 
              disabled={isLoggingIn}
              type="password" 
              placeholder="••••••••" 
              className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-400 focus:bg-white outline-none transition-all disabled:opacity-50" 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button 
            disabled={isLoggingIn}
            className="w-full bg-blue-600 text-white p-4 rounded-2xl font-black hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95 disabled:bg-slate-400 uppercase tracking-wider text-sm mt-2"
          >
            {isLoggingIn ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-slate-100 text-center">
          <p className="text-slate-500 font-medium text-sm">
            Don't have an account yet? <br/>
            <Link to="/register" className="text-blue-600 font-black hover:underline mt-1 inline-block">
              Register via Authorized Email
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}