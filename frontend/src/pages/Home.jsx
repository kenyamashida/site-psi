import React from 'react';
import { MapPin, WifiOff, RefreshCw, ChevronRight } from 'lucide-react';

export default function Home({ tema, cidades, loading, error, fetchData }) {
  return (
    <div className="w-full animate-in fade-in duration-700">
      <header className="mb-16 text-center">
        <h1 className={`text-5xl md:text-6xl font-black mb-4 tracking-tight ${tema === 'escuro' ? 'text-white' : 'text-gray-900'}`}>
          Explore a <span className="text-blue-600">Plataforma</span> Real-Time
        </h1>
        <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${tema === 'escuro' ? 'text-zinc-400' : 'text-gray-500'}`}>
          Esta aplicação frontend consome dados diretamente de um servidor Node.js.
        </p>
      </header>

      {/* AQUI ESTÁ A CORREÇÃO: Mostramos a variável 'error' real em vez de texto fixo */}
      {error && (
        <div className="mb-12 p-5 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 text-red-500 max-w-3xl mx-auto shadow-sm">
          <WifiOff size={24} className="shrink-0" />
          <div className="grow text-left">
            <p className="font-bold">Aviso de Ligação</p>
            <p className="text-sm opacity-90">
              {typeof error === 'string' ? error : 'Não foi possível comunicar com o servidor Render.'}
            </p>
          </div>
          <button 
            onClick={fetchData} 
            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors shrink-0"
            title="Tentar Novamente"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          [1, 2, 3].map(i => (
            <div key={i} className={`h-72 rounded-2xl animate-pulse ${tema === 'escuro' ? 'bg-zinc-800' : 'bg-zinc-200'}`}></div>
          ))
        ) : (
          cidades.map((item, index) => (
            <div key={item.id || index} className={`group p-6 rounded-2xl shadow-lg border transition-all hover:shadow-xl ${
              tema === 'escuro' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100'
            }`}>
              <div className="bg-blue-600/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                <MapPin className="text-blue-600 group-hover:text-white transition-colors" size={24} />
              </div>
              
              {/* Adaptado para suportar dados de Psicólogos ou Cidades */}
              <h3 className={`text-xl font-bold mb-1 ${tema === 'escuro' ? 'text-white' : 'text-gray-800'}`}>
                {item.nome || item.name || 'Sem Nome'}
              </h3>
              <p className={`text-sm mb-6 ${tema === 'escuro' ? 'text-zinc-400' : 'text-gray-500'}`}>
                Detalhe: <span className="text-blue-500 font-semibold">{item.clima || item.specialty || item.email || 'Sem informação'}</span>
              </p>
              
              <button className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-bold">
                Ver Detalhes <ChevronRight size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}