import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnimeListPage from '../pages/animeListPage';
import CreateAnimePage from '../pages/animeCreatePage';
import UpdateAnimePage from '../pages/animeUpdatePage';
import { AnimeProvider } from '../context/animeContext';
import Header from '../components/header/header';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AnimeListPage />} />
      <Route path="/create" element={<CreateAnimePage />} />
      <Route path="/update/:id" element={<UpdateAnimePage />} />
    </Routes>
  );
};

const RouterSetup: React.FC = () => {
  return (
    <Router>
      <AnimeProvider>
        <Header /> 
        <AppRoutes />
      </AnimeProvider>
    </Router>
  );
};

export default RouterSetup;
