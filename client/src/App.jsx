// 1. External packages
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// 2. Internal alias (e.g. "@/components/MyComponent")
// 3. Relative imports
import API from './lib/API';
import Common from './pages/Common';
import LoginLayout from './pages/AuthN';
import AddFilmLayout from './pages/AddFilm';
import FilmTableLayout from './pages/FilmTable';
import { AuthProvider } from './contexts/AuthContext';
import { FilterProvider } from './contexts/FilterContext';
// 4. CSS modules
import './App.css';
import './index.css';
import { useAuth } from './hooks/useAuth';

function App() {
  const future = {
    v7_starTransition: true,
    v7_relativeSplatPath: true
  }

  return(
    <BrowserRouter future={future}>
      <AuthProvider>
        <FilterProvider>
          <AppRouted />
        </FilterProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

function AppRouted() {

  const [films, setFilms] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { token, logout, isLoggedIn } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(`AppRouted.jsx: ${err.message}`);
    }
  }

  useEffect(() => {
    API.getFilms(token)
      .then((rows) => {
        setFilms(rows);
        setRefresh(false);
      })
      .catch(() => {
        handleLogout();
      });
  }, [refresh, isLoggedIn]);

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Common /> : <Navigate to="/login" />}>
        <Route index element={<Navigate to="/films" />} />
        <Route path="/films" element={<FilmTableLayout films={films} setRefresh={setRefresh}/>} />
        <Route path="/add" element={<AddFilmLayout setRefresh={setRefresh} />} />
      </Route>
      <Route path="/login" element={<LoginLayout />} />
    </Routes>
  );
}

export default App;