import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/app.layout'
import LandingPage from './pages/LandingPage'
import Onboarding from './pages/Onboarding'
import JobListing from './pages/JobListing'
import JobPage from './pages/Job'
import PostJob from './pages/PostJob'
import SavedJob from './pages/SavedJob'
import MyJobs from './pages/MyJobs'
import { ThemeProvider } from './components/ThemeProvider'

const router = createBrowserRouter([
    {
        element: <AppLayout/>,
        children: [
            {
                path: "/",
                element: <LandingPage/>
            },
            {
                path: "/onboarding",
                element: <Onboarding/>
            },
            {
                path: "/jobs",
                element: <JobListing/>
            },
            {
                path: "/job/:id",
                element: <JobPage/>
            },
            {
                path: "/post-job",
                element: <PostJob/>
            },
            {
                path: "/saved-job",
                element: <SavedJob/>
            },
            {
                path: "/my-job",
                element: <MyJobs/>
            }
        ]
    }
])


function App() {

  return <>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router}  />
        </ThemeProvider>
    </>

}

export default App
