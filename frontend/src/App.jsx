import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreateNotePage from "./pages/CreateNotePage";
import ViewNoteDetailPage from "./pages/ViewNoteDetailPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPassword";
import EmailVerifyPage from "./pages/EmailVerifyPage";
import { useAuthStore } from "./store/authStore";

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    //so anytime a logged in user tries to get into the signup page we
    // restrict via the if-check
    return <Navigate to="/" replace />;
  }

  return children;
};

const ProtectedRoute = ({ children }) => {
  // so isAuthenticated is the same as saying isLoggedIn, got me confused for a second
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  //   // Show loading while checking auth
  // if(isCheckingAuth) {
  //   return <div>Loading...</div>; // or your loading component
  // }

  if (!isAuthenticated) {
    // if the user is not authenticated, then prompt to log em in
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    // if they have not verified their account, take them to the verify-email page
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const App = () => {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(isAuthenticated);
  console.log(user);

  return (
    <div className="relative h-full w-full">
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <SignupPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <LoginPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route path="/verify-email" element={<EmailVerifyPage />} />
          {/* go to this route and boom it take you to the home page */}
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateNotePage />
              </ProtectedRoute>
            }
          />
          {/* id will be dynamic */}
          <Route
            path="/note/:id"
            element={
              <ProtectedRoute>
                <ViewNoteDetailPage />
              </ProtectedRoute>
            }
          />
          <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
          {/* catch all route, might add a 404 not found page */}
          <Route
            path="*"
            element={
              <Navigate to="/" replace /> // alr is a protected route
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
