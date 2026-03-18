import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Roadmap from "./pages/Roadmap";
import Dashboard from "./pages/Dashboard";
import Practice from "./pages/Practice";
import MockInterview from "./pages/MockInterview";
// import Contact from "./pages/Contact";
import ProfileSetup from "./pages/ProfileSetup";
import Profile from "./pages/Profile";
// import TodayTopic from "./pages/TodayTopic";
import CareerGuidance from "./pages/CareerGuidance";
import AdminDashboard from "./pages/AdminDashboard";
import LearnTopic from "./pages/LearnTopic";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/contact" element={<Contact />} /> */}

          {/* 🔐 PROTECTED ROUTES */}
          <Route
            path="/profile-setup"
            element={
              <ProtectedRoute>
                <ProfileSetup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/today"
            element={
              <ProtectedRoute>
                <TodayTopic />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/roadmap"
            element={
              <ProtectedRoute>
                <Roadmap />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/practice"
            element={
              <ProtectedRoute>
                <Practice />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mock-interview"
            element={
              <ProtectedRoute>
                <MockInterview />
              </ProtectedRoute>
            }
          />

          <Route
            path="/career-guidance"
            element={
              <ProtectedRoute>
                <CareerGuidance />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/learn/:role/:topic/:level"
            element={
              <ProtectedRoute>
                <LearnTopic />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
