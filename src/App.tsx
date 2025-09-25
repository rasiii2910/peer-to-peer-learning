import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from './components/AuthLayout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ProfilePage from './pages/ProfilePage';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import MessagesList from './pages/MessagesList';
import ChatView from './pages/ChatView';
import ReadProfilePage from './pages/ReadOnlyProfile';

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
      <Route path="/profile" element={<ReadProfilePage />} />
      <Route
        path="/dashboard"
        element={(
          <div className="min-h-screen w-full flex items-start justify-center p-6 relative">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black via-purple-950 to-black opacity-90" />

            <div className="relative w-full max-w-6xl rounded-xl p-[2px] mx-auto" style={{ background: 'linear-gradient(90deg,#7c3aed,#8b5cf6)' }}>
              <div className="relative overflow-hidden rounded-lg bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100" style={{ boxShadow: '0 6px 30px rgba(124,58,237,0.35), inset 0 0 30px rgba(124,58,237,0.06)' }}>
                <div className="grid grid-cols-1 md:grid-cols-4">
                  <div className="hidden md:block md:col-span-1 bg-gradient-to-b from-purple-700/60 to-indigo-700/40 relative p-6 rounded-l-lg overflow-hidden">
                    <Sidebar />
                  </div>

                  <main className="col-span-1 md:col-span-3 p-6 md:p-10 max-h-[calc(100vh-4rem)] overflow-auto hide-scrollbar">
                    <Dashboard />
                  </main>
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-lg" style={{ boxShadow: '0 0 40px rgba(124,58,237,0.35)' }} />
              </div>
            </div>
          </div>
        )}
      />

      {/* Messages list */}
      <Route
        path="/messages"
        element={(
          <div className="min-h-screen w-full flex items-start justify-center p-6 relative">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black via-purple-950 to-black opacity-90" />

            <div className="relative w-full max-w-6xl rounded-xl p-[2px] mx-auto" style={{ background: 'linear-gradient(90deg,#7c3aed,#8b5cf6)' }}>
              <div className="relative overflow-hidden rounded-lg bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100" style={{ boxShadow: '0 6px 30px rgba(124,58,237,0.35), inset 0 0 30px rgba(124,58,237,0.06)' }}>
                <div className="grid grid-cols-1 md:grid-cols-4">
                  <div className="hidden md:block md:col-span-1 bg-gradient-to-b from-purple-700/60 to-indigo-700/40 relative p-6 rounded-l-lg overflow-hidden">
                    <Sidebar />
                  </div>

                  <main className="col-span-1 md:col-span-3 p-6 md:p-10 max-h-[calc(100vh-4rem)] overflow-auto hide-scrollbar">
                    <MessagesList />
                  </main>
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-lg" style={{ boxShadow: '0 0 40px rgba(124,58,237,0.35)' }} />
              </div>
            </div>
          </div>
        )}
      />

      {/* Chat view */}
      <Route
        path="/messages/:id"
        element={(
          <div className="min-h-screen w-full flex items-start justify-center p-6 relative">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black via-purple-950 to-black opacity-90" />

            <div className="relative w-full max-w-6xl rounded-xl p-[2px] mx-auto" style={{ background: 'linear-gradient(90deg,#7c3aed,#8b5cf6)' }}>
              <div className="relative overflow-hidden rounded-lg bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100" style={{ boxShadow: '0 6px 30px rgba(124,58,237,0.35), inset 0 0 30px rgba(124,58,237,0.06)' }}>
                <div className="grid grid-cols-1 md:grid-cols-4">
                  <div className="hidden md:block md:col-span-1 bg-gradient-to-b from-purple-700/60 to-indigo-700/40 relative p-6 rounded-l-lg overflow-hidden">
                    <Sidebar />
                  </div>

                  <main className="col-span-1 md:col-span-3 p-6 md:p-10 max-h-[calc(100vh-4rem)] overflow-auto hide-scrollbar">
                    <ChatView />
                  </main>
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-lg" style={{ boxShadow: '0 0 40px rgba(124,58,237,0.35)' }} />
              </div>
            </div>
          </div>
        )}
      />

      {/* Read-only profile */}
      <Route
        path="/profile/view/:id"
        element={(
          <div className="min-h-screen w-full flex items-start justify-center p-6 relative">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black via-purple-950 to-black opacity-90" />

            <div className="relative w-full max-w-6xl rounded-xl p-[2px] mx-auto" style={{ background: 'linear-gradient(90deg,#7c3aed,#8b5cf6)' }}>
              <div className="relative overflow-hidden rounded-lg bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100" style={{ boxShadow: '0 6px 30px rgba(124,58,237,0.35), inset 0 0 30px rgba(124,58,237,0.06)' }}>
                <div className="grid grid-cols-1 md:grid-cols-4">
                  <div className="hidden md:block md:col-span-1 bg-gradient-to-b from-purple-700/60 to-indigo-700/40 relative p-6 rounded-l-lg overflow-hidden">
                    <Sidebar />
                  </div>

                  <main className="col-span-1 md:col-span-3 p-6 md:p-10 max-h-[calc(100vh-4rem)] overflow-auto hide-scrollbar">
                    <ReadOnlyProfile />
                  </main>
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-lg" style={{ boxShadow: '0 0 40px rgba(124,58,237,0.35)' }} />
              </div>
            </div>
          </div>
        )}
      />

      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
}
