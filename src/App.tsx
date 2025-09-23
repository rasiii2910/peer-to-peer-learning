import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from './components/AuthLayout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ProfilePage from './pages/ProfilePage';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Routes>
      {/* Auth routes use the AuthLayout */}
      <Route
        path="/signin"
        element={
          <AuthLayout>
            <SignIn />
          </AuthLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthLayout>
            <SignUp />
          </AuthLayout>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <AuthLayout>
            <ForgotPassword />
          </AuthLayout>
        }
      />

      {/* Main app routes (profile/dashboard) - full width */}
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/dashboard" element={<ProfilePage />} />

      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
}
