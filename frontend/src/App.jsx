import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Servicos from './pages/Servicos';
import Psicologos from './pages/Psicologos';
import PsicologoDetail from './pages/PsicologoDetail';
import Contato from './pages/Contato';
import Admin from './pages/admin/Admin';
import { psychologistsFallback } from './lib/data';
import { API_URL } from './lib/api';

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname === '/login';
  const [statusBackend, setStatusBackend] = useState('offline');
  const [psychologists, setPsychologists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statusRes = await fetch(`${API_URL}/api/health`);
        if (!statusRes.ok) throw new Error('Health check failed');
        const statusJson = await statusRes.json();
        if (statusJson.status !== 'ok') throw new Error('Backend returned bad status');
        setStatusBackend('online');

        const profRes = await fetch(`${API_URL}/api/professionals/`);
        if (profRes.ok) {
          const data = await profRes.json();
          setPsychologists(
            Array.isArray(data)
              ? data.map((p) => ({
                  id: String(p.id),
                  name: p.name,
                  specialty: p.specialty,
                  bio: p.description || p.full_bio,
                  imageUrl: p.photo_url,
                }))
              : []
          );
        }
      } catch {
        setStatusBackend('offline');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground antialiased">
      {!isAdminRoute && <Header />}

      {/* Indicador de Status da API - escondido no admin */}
      {!isAdminRoute && (
      <div className="fixed top-20 right-6 z-40">
        <div
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
            statusBackend === 'online'
              ? 'bg-primary/10 text-primary'
              : 'bg-destructive/10 text-destructive'
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              statusBackend === 'online'
                ? 'bg-primary animate-pulse'
                : 'bg-destructive'
            }`}
          />
          {statusBackend === 'online' ? 'Backend Online' : 'Backend Offline'}
        </div>
      </div>
      )}

      <main className="relative grow">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                psychologists={
                  psychologists.length > 0 ? psychologists : psychologistsFallback
                }
              />
            }
          />
          <Route path="/servicos" element={<Servicos />} />
          <Route
            path="/psicologos"
            element={<Psicologos API_URL={API_URL} />}
          />
          <Route
            path="/psicologos/:id"
            element={<PsicologoDetail API_URL={API_URL} />}
          />
          <Route path="/contato" element={<Contato API_URL={API_URL} />} />
          <Route
            path="/login"
            element={
              <div className="min-h-screen">
                <Admin />
              </div>
            }
          />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}
