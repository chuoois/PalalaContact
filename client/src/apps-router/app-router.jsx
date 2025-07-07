import { createBrowserRouter, Navigate  } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthLayout } from '../layouts';
import { ProtectedRoute } from '../apps-router/protected-router';
import {
  LoginPage,
  SignupPage,
  ForgotPasswordPage,
  PrivacyPolicyPage,
  TermsOfServicePage,
} from '../pages';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "signin",
        element: (
          <GoogleOAuthProvider clientId={clientId}>
            <LoginPage />
          </GoogleOAuthProvider>
        ),
      },
      {
        path: "signup",
        element: (
          <GoogleOAuthProvider clientId={clientId}>
            <SignupPage />
          </GoogleOAuthProvider>
        ),
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "terms-of-service",
        element: <TermsOfServicePage />,
      },
    ],
  },
  // Các route được bảo vệ
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <h1>Home Page</h1>
      </ProtectedRoute>
    ),
  },
  // Route mặc định chuyển đến login
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Navigate to="/auth/signin" replace />
      </ProtectedRoute>
    ),
  },
]);