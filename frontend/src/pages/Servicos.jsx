import Services from '../components/landing/Services';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

export default function Servicos() {
  return (
    <div className="pt-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-primary mb-6">
          Nossos Serviços
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
          Oferecemos suporte especializado para diversas necessidades
          emocionais e psicológicas, sempre com uma abordagem humanizada e
          ética.
        </p>
      </div>
      <Services />
      <div className="container mx-auto px-4 pb-24 text-center">
        <div className="bg-secondary/30 p-12 rounded-[3rem] border border-border">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
            Não sabe qual serviço escolher?
          </h2>
          <p className="text-muted-foreground mb-8">
            Nossa equipe pode te ajudar a identificar a melhor abordagem para o
            seu momento atual.
          </p>
          <Button
            asChild
            className="rounded-full bg-accent text-accent-foreground"
          >
            <Link to="/contato">Solicitar Orientação</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
