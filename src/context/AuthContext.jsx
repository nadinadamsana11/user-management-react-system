import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null); // Role එක සහ වෙනත් විස්තර මෙහි ගබඩා වේ
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // පරිශීලකයාගේ Auth තත්ත්වය වෙනස් වන විට (Login/Logout) මෙය ක්‍රියාත්මක වේ
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        
        // Firestore එකෙන් පරිශීලකයාගේ Role එක ඇතුළු දත්ත ලබා ගැනීම
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } else {
        setCurrentUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData, // මෙහි userData.role ලෙස අපිට Role එක ගත හැක
    isAdmin: userData?.role === "admin" // ලේසියෙන් චෙක් කිරීමට helper එකක්
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// පහසුවෙන් පාවිච්චි කිරීමට custom hook එකක්
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);