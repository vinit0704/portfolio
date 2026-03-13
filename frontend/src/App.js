
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import About from './components/About';

const Skills         = lazy(() => import('./components/Skills'));
const Projects       = lazy(() => import('./components/Projects'));
const Contact        = lazy(() => import('./components/Contact'));
const Login          = lazy(() => import('./pages/admin/Login'));
const Dashboard      = lazy(() => import('./pages/admin/Dashboard'));
const Overview       = lazy(() => import('./pages/admin/Overview'));
const AdminSkills    = lazy(() => import('./pages/admin/AdminSkills'));
const AdminProjects  = lazy(() => import('./pages/admin/AdminProjects'));
const AdminContacts = lazy(() => import('./pages/admin/AdminContacts'));



const Fallback = () => (
  <div style={{ minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <p style={{ color: '#00ffff', fontFamily: 'Orbitron', letterSpacing: 4 }}>LOADING...</p>
  </div>
);

function HomePage() {
  return (
    <>
      <div className="scanline"></div>
      <Navbar />
      <Hero />
      <Suspense fallback={<Fallback />}>
        <About /> 
        <Skills />
        <Projects />
        <Contact />
      </Suspense>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/admin/login" element={
              <Suspense fallback={<Fallback />}><Login /></Suspense>
            } />

            <Route path="/admin" element={
              <PrivateRoute adminOnly>
                <Suspense fallback={<Fallback />}><Dashboard /></Suspense>
              </PrivateRoute>
            }>
              <Route index          element={<Suspense fallback={<Fallback />}><Overview /></Suspense>} />
              <Route path="dashboard" element={<Suspense fallback={<Fallback />}><Overview /></Suspense>} />
              <Route path="skills"    element={<Suspense fallback={<Fallback />}><AdminSkills /></Suspense>} />
              <Route path="projects"  element={<Suspense fallback={<Fallback />}><AdminProjects /></Suspense>} />
              <Route path="contacts"  element={<Suspense fallback={<Fallback />}><AdminContacts /></Suspense>} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
