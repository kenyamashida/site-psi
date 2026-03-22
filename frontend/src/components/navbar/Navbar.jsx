import React from 'react';
import { Link } from 'react-router-dom';
import { Map, Sun, Moon } from 'lucide-react';

export default function Navbar({ tema, titulo, setTema }) {
  const isDark = tema === 'escuro';
  
  return (
    <nav className={`flex items-center justify-between px-8 py-4 sticky top-0 z-50 transition-colors duration-300 ${
      isDark ? 'bg-zinc-900 text-white border-b border-zinc-800' : 'bg-white text-zinc-900 shadow-sm border-b border-zinc-100'
    }`}>
      <Link to="/" className="flex items-center gap-2 font-bold text-xl no-underline text-inherit">
        <div className="bg-blue-600 p-1.5 rounded-lg text-white">
          <Map size={20} />
        </div>
        <span>{titulo}</span>
      </Link>
      
      <div className="flex items-center gap-6">
        <Link to="/" className="hover:text-blue-600 transition-colors font-medium no-underline text-inherit">Início</Link>
        <Link to="/sobre" className="hover:text-blue-600 transition-colors font-medium no-underline text-inherit">Sobre</Link>
        <Link to="/contato" className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-all text-sm font-bold shadow-md no-underline">
          Contacto
        </Link>
        
        <button 
          onClick={() => setTema(isDark ? 'claro' : 'escuro')}
          className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-100 hover:bg-zinc-200'}`}
        >
          {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-zinc-600" />}
        </button>
      </div>
    </nav>
  );
}