import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { LoginForm as Login } from "./components/Login.tsx";
import { SignupForm as Signup } from "./components/Signup.tsx";
import { QuotesPage as Quotes } from "./components/Quotes.tsx";
import { AddQuoteForm as QuotesForm } from "./components/QuotesForm.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/quotes",
    element: <Quotes />
  },
  {
    path: "/add-quote",
    element: < QuotesForm />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
