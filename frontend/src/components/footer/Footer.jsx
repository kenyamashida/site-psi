import React from 'react';
import { Instagram, Linkedin, Github } from 'lucide-react';

export default function Footer({ tema }) {
  const isDark = tema === 'escuro';

  return (
    <footer className={`py-12 px-6 text-center transition-colors duration-300 ${
      isDark ? 'bg-zinc-900 text-zinc-400 border-t border-zinc-800' : 'bg-white text-zinc-400 border-t border-zinc-100'
    }`}>
      <div className="max-w-4xl mx-auto">
        <p className="text-sm md:text-base mb-6 leading-relaxed font-medium">
          Explore o melhor do Brasil com a nossa plataforma Fullstack integrada.
        </p>
        
        <div className="flex justify-center gap-6 mb-8 text-zinc-500">
          <span className="cursor-pointer hover:text-blue-500 transition-colors"><Instagram size={20} /></span>
          <span className="cursor-pointer hover:text-blue-500 transition-colors"><Linkedin size={20} /></span>
          <span className="cursor-pointer hover:text-blue-500 transition-colors"><Github size={20} /></span>
        </div>
        
        <div className="text-[10px] uppercase tracking-widest opacity-60 font-bold">
          © 2026 BrasilTour Fullstack Project • Todos os direitos reservados
        </div>
      </div>
    </footer>
  );
}