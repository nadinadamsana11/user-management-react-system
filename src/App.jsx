import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Team from "./pages/Team";

// Basic Page Components
const Dashboard = () => <div className="text-2xl font-black">Dashboard Content</div>;
const Files = () => <div className="text-2xl font-black">Project Files Content</div>;
const Announcements = () => <div className="text-2xl font-black">Announcements Content</div>;
const Settings = () => <div className="text-2xl font-black">Settings Content</div>;

function App() {
  const { currentUser } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Auth Pages */}
        <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Layout Routes */}
        <Route element={currentUser ? <MainLayout /> : <Navigate to="/login" />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/team" element={<Team />} />
          <Route path="/files" element={<Files />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;