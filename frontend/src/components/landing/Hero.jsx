import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

export default function Hero() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.4], [0, -50]);

  return (
    <section
      ref={targetRef}
      id="inicio"
      className="relative h-[150vh] bg-background"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -z-10" />

        <motion.div
          style={{ opacity, scale, y }}
          className="max-w-4xl mx-auto"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider text-accent uppercase bg-accent/10 rounded-full"
          >
            Saúde Mental para o Futuro
          </motion.span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-8">
            Redefina sua <span className="text-accent">jornada</span> interior.
          </h1>
          <p className="max-w-2xl mx-auto text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12">
            Uma abordagem moderna e humanizada para o seu bem-estar emocional.
            Conecte-se com especialistas hoje.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              asChild
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 h-14 rounded-full shadow-xl shadow-accent/20"
            >
              <Link to="/contato">Agendar Consulta</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-8 h-14 rounded-full"
            >
              <Link to="/servicos">Explorar Serviços</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
