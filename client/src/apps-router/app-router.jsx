import { createBrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthLayout } from '../layouts';
import {
  LoginPage,
  SignupPage,
  ForgotPasswordPage
} from '../pages';

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "signin",
        element: (
          <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            <LoginPage />
          </GoogleOAuthProvider>
        ),
      },
      {
        path: "signup",
        element: (
          <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            <SignupPage />
          </GoogleOAuthProvider>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <ForgotPasswordPage />
        ),
      },
    ],
  },
]); 