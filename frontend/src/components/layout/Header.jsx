import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import Logo from '../Logo';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/servicos', label: 'Serviços' },
  { href: '/psicologos', label: 'Psicólogos' },
  { href: '/contato', label: 'Contato' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-border py-3'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-6 md:px-8">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'text-sm font-medium transition-all hover:text-primary',
                (link.href === '/' ? location.pathname === '/' : location.pathname.startsWith(link.href))
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-6">
          <Button
            asChild
            variant="ghost"
            className="text-muted-foreground hover:text-primary rounded-full"
          >
            <Link to="/login">Admin</Link>
          </Button>
          <Button
            asChild
            className="rounded-full px-8 shadow-sm hover:shadow-md transition-all bg-accent text-accent-foreground"
          >
            <Link to="/contato">Agendar Consulta</Link>
          </Button>
        </div>
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-full"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          <nav className="flex flex-col items-center gap-6 py-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'text-lg font-medium transition-colors',
                  (link.href === '/' ? location.pathname === '/' : location.pathname.startsWith(link.href)) ? 'text-primary' : 'text-foreground'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild variant="ghost" className="rounded-full">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                Admin
              </Link>
            </Button>
            <Button
              asChild
              className="w-[240px] rounded-full bg-accent text-accent-foreground"
            >
              <Link to="/contato" onClick={() => setIsMenuOpen(false)}>
                Agendar Consulta
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
