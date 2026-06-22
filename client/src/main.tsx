import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import UserProfile from './components/UserProfile.tsx'
import Home from '#components/Home'
import App from './App.tsx'
import LoginPage from '#components/LoginPage'
import { store } from './app/store'
import { Provider } from 'react-redux'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App />}>
    <Route path="" element={<Home />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/profile" element={<UserProfile />} />
  </Route>
))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <RouterProvider router={router} />
      </ GoogleOAuthProvider>
    </Provider>
  </StrictMode>,
)
