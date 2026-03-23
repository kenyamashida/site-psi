import { motion, useTransform, useScroll } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent } from '../ui/card';

export default function HorizontalScrollCarousel({ psychologists = [] }) {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ['10%', '-70%']);

  if (psychologists.length === 0) return null;

  return (
    <section
      ref={targetRef}
      id="psicologos"
      className="relative h-[300vh] bg-background"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute left-1/2 -translate-x-1/2 top-1/4 text-center z-20 px-4 w-full">
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 text-primary/90">
            Equipe de Cuidado.
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto font-medium">
            Conecte-se com profissionais dedicados ao seu desenvolvimento
            emocional.
          </p>
        </div>
        <motion.div style={{ x }} className="flex gap-16 pl-[5vw]">
          {psychologists.map((psychologist) => (
            <Card
              key={psychologist.id}
              className="group relative h-[450px] w-[320px] md:h-[600px] md:w-[450px] overflow-hidden border-none shadow-xl rounded-[2.5rem] bg-secondary/50 backdrop-blur-sm"
            >
              <img
                src={
                  psychologist.imageUrl ||
                  psychologist.photo_url ||
                  'https://picsum.photos/seed/2/400/400'
                }
                alt={psychologist.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              <CardContent className="absolute bottom-0 left-0 right-0 p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl font-bold mb-3 text-primary">
                  {psychologist.name}
                </h3>
                <p className="text-accent font-bold text-lg mb-4">
                  {psychologist.specialty}
                </p>
                <p className="text-muted-foreground text-sm line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 leading-relaxed">
                  {psychologist.bio || psychologist.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
