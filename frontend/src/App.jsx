import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';


// Importação de componentes modulares
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/Home';

/**
 * App.jsx - Orquestrador da Aplicação
 */
export default function App() {
  // 1. Defina a variável com o link do seu Render (MUDE APENAS ISTO)
  const API_URL = 'https://seu-link-do-render.onrender.com/api/professionals'; // Exemplo: 'https://brasiltour-api.onrender.com'

  const [tema, setTema] = useState('claro');
  const [statusBackend, setStatusBackend] = useState('offline');
  const [cidades, setCidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

/**
   * Função para procurar dados no servidor Node.js (Render)
   */
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Usamos a variável API_URL em vez do localhost
      const statusRes = await fetch(`${API_URL}/api/health`);
      if (!statusRes.ok) throw new Error('Health check failed');
      
      const statusJson = await statusRes.json();
      const isOnline = statusJson.status === 'ok';
      if (!isOnline) throw new Error('Backend returned bad status');

      setStatusBackend('online');

      // Usamos a variável API_URL para buscar os profissionais
      const profissionaisRes = await fetch(`${API_URL}/api/professionals/`);
      if (!profissionaisRes.ok) throw new Error('Failed to fetch professionals');
      
      const profissionaisJson = await profissionaisRes.json();
      setCidades(profissionaisJson);
    } catch (err) {
      console.error('Erro na ligação ao backend:', err);
      setStatusBackend('offline');
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${
      tema === 'escuro' ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-900'
    }`}>
      
      {/* Menu de Navegação superior */}
      <Navbar 
        titulo="BrasilTour ✈️" 
        tema={tema} 
        setTema={setTema} 
      />

      <main className="grow max-w-6xl mx-auto w-full px-6 py-12">
        {/* Indicador de Status da API no canto superior direito */}
        <div className="flex justify-end mb-8">
          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
            statusBackend === 'online' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
          }`}>
            <div className={`w-2 h-2 rounded-full ${statusBackend === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            {statusBackend === 'online' ? 'Backend Online' : 'Backend Offline'}
          </div>
        </div>

        {/* Definição das Rotas da Aplicação */}
        <Routes>
          <Route path="/" element={
            <Home 
              tema={tema} 
              cidades={cidades} 
              loading={loading} 
              error={error} 
              fetchData={fetchData} 
            />
          } />
          <Route path="/sobre" element={
            <div className="text-center py-20">
              <h1 className="text-4xl font-black mb-4">Sobre o Projeto</h1>
              <p className="max-w-xl mx-auto opacity-70 leading-relaxed">
                BrasilTour é uma plataforma Fullstack desenvolvida para exemplificar a 
                integração entre React e Node.js em tempo real.
              </p>
            </div>
          } />
          <Route path="/contato" element={
            <div className="text-center py-20">
              <h1 className="text-4xl font-black mb-4">Contacto</h1>
              <p className="opacity-70">Estamos disponíveis para suporte através dos nossos canais oficiais.</p>
            </div>
          } />
        </Routes>
      </main>

      {/* Rodapé fixo */}
      <Footer tema={tema} />
    </div>
  );
}