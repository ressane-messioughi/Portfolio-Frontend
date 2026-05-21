
import { Routes, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage.jsx"
import AdminPage from './pages/AdminPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import AddProjectPage from './pages/AddProjectPage.jsx'
import Project from './pages/Project.jsx'
import DetailProject from './components/ProjectComponents/DetailProject.jsx'
import EditProjectPage from './pages/EditProjectPage.jsx'
import AnalyticsTracker from './components/AdminComponents/AnalyticsTracker.jsx'
import PrivateRoute from './hooks/PrivateRoute.jsx'

function App() {


  return (
    <>
       <AnalyticsTracker />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<PrivateRoute role={"admin"}><AdminPage /></PrivateRoute>} />
        <Route path="/projects" element={<Project/>} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin/project/new" element={<AddProjectPage />} />
        <Route path="/admin/project/:id/edit" element={<EditProjectPage />} />
        <Route path="/projects/:id" element={<DetailProject />} />
       




        {/* <Route path="/projects" element={<ProjectPage />} />
      <Route path="/projects/:id" element={<ProjectDetailPage />} />
      
      <Route path="/admin/project/:id/edit" element={<EditProjectPage />} /> */}
      </Routes>
    </>
  )
}

export default App
