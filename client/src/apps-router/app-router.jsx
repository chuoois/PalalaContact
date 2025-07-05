import { createBrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthLayout } from '../layouts';
import {
  LoginPage,
  SignupPage,
  ForgotPasswordPage,
  VerifyEmailPage
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
        path: "verify-email",
        element: <VerifyEmailPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
    ],
  },
]);
