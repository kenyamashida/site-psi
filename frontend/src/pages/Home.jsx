import Hero from '../components/landing/Hero';
import Services from '../components/landing/Services';
import HorizontalScrollCarousel from '../components/landing/HorizontalScrollCarousel';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

export default function Home({ psychologists = [] }) {
  return (
    <div className="relative flex flex-col">
      <Hero />
      <Services />
      <HorizontalScrollCarousel psychologists={psychologists} />
      <div className="bg-background py-16 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
          Pronto para começar sua jornada?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto px-4">
          Encontre o equilíbrio emocional com nossa equipe de especialistas
          dedicados.
        </p>
        <Button
          asChild
          size="lg"
          className="rounded-full px-12 h-14 bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <Link to="/contato">Falar Conosco</Link>
        </Button>
      </div>
    </div>
  );
}
