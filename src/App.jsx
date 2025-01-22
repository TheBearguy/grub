import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/app.layout'
import LandingPage from './pages/LandingPage'
import Onboarding from './pages/Onboarding'
import JobListing from './pages/JobListing'
import Job from './pages/Job'
import PostJob from './pages/PostJob'
import SavedJobs from './pages/SavedJobs'
import MyJobs from './pages/MyJobs'
import { ThemeProvider } from './components/ThemeProvider'
import AuthLayout from './components/AuthLayout'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: (
          <AuthLayout>
            <Onboarding />
          </AuthLayout>
        ),
      },
      {
        path: "/jobs",
        element: (
          <AuthLayout>
            <JobListing />
          </AuthLayout>
        ),
      },
      {
        path: "/post-job",
        element: (
          <AuthLayout>
            <PostJob />
          </AuthLayout>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <AuthLayout>
            <MyJobs />
          </AuthLayout>
        ),
      },
      {
        path: "/saved-jobs",
        element: (
          <AuthLayout>
            <SavedJobs />
          </AuthLayout>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <AuthLayout>
            <Job/>
          </AuthLayout>
        ),
      },
    ],
  },
]);


function App() {

  return <>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router}  />
        </ThemeProvider>
    </>

}

export default App
