import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import Logo from '../Logo';

export default function Footer() {
  return (
    <footer className="bg-secondary/80 text-secondary-foreground border-t border-border">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2 space-y-6">
            <Link to="/">
              <Logo />
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Dedicados ao seu bem-estar emocional e crescimento pessoal através
              de uma psicologia moderna, humanizada e acessível.
            </p>
            <div className="flex space-x-6">
              <Link
                to="#"
                className="text-primary hover:text-accent transition-colors"
              >
                <Facebook size={24} />
              </Link>
              <Link
                to="#"
                className="text-primary hover:text-accent transition-colors"
              >
                <Instagram size={24} />
              </Link>
              <Link
                to="#"
                className="text-primary hover:text-accent transition-colors"
              >
                <Linkedin size={24} />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-primary mb-6">Navegação</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/servicos"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Serviços
                </Link>
              </li>
              <li>
                <Link
                  to="/psicologos"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Psicólogos
                </Link>
              </li>
              <li>
                <Link
                  to="/contato"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-primary mb-6">Contato</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>contato@sitepsicologia.com</li>
              <li>(11) 98765-4321</li>
              <li>Atendimento de Segunda a Sexta, das 08h às 20h.</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} SitePsicologia. Todos os direitos
            reservados.
          </p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-primary">
              Privacidade
            </Link>
            <Link to="#" className="hover:text-primary">
              Termos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
