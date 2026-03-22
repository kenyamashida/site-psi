import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Substitua este link pelo URL exato que o Render lhe deu (sem a barra / no final)
const API_URL = 'https://brasiltour-https://site-psi.onrender.com.onrender.com';

// Importação de componentes modulares
// Certifique-se de que os nomes dos ficheiros em disco coincidem exatamente (incluindo maiúsculas)
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

// Importação de páginas
import Home from './pages/Home';

/**
 * App.jsx - Orquestrador da Aplicação
 * Responsável pelas rotas, estado do tema e comunicação com o Backend.
 */
export default function App() {
  const [tema, setTema] = useState('claro');
  const [statusBackend, setStatusBackend] = useState('offline');
  const [cidades, setCidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Função para procurar dados no servidor Node.js
   */
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Verifica se o servidor está online
      const statusRes = await fetch('http://localhost:5000/api/health');
      if (!statusRes.ok) throw new Error('Health check failed');
      const statusJson = await statusRes.json();
      const isOnline = statusJson.status === 'ok';
      if (!isOnline) throw new Error('Backend returned bad status');

      setStatusBackend('online');

      // 2. Procura a lista de psicólogos
      const profissionaisRes = await fetch('http://localhost:5000/api/professionals/');
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