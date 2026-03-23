import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../ui/card';
import { User, Users, Briefcase, BrainCircuit } from 'lucide-react';

const services = [
  {
    icon: <User className="w-8 h-8 text-accent" />,
    title: 'Terapia Individual',
    description:
      'Um espaço seguro e confidencial para explorar suas emoções, pensamentos e desafios pessoais com um profissional dedicado.',
  },
  {
    icon: <Users className="w-8 h-8 text-accent" />,
    title: 'Terapia de Casal',
    description:
      'Fortaleça a comunicação e a conexão em seu relacionamento, superando conflitos com a ajuda de um terapeuta especializado.',
  },
  {
    icon: <Briefcase className="w-8 h-8 text-accent" />,
    title: 'Orientação Vocacional',
    description:
      'Descubra seus talentos e paixões, e encontre clareza para tomar decisões importantes sobre sua carreira e futuro profissional.',
  },
  {
    icon: <BrainCircuit className="w-8 h-8 text-accent" />,
    title: 'Avaliação Psicológica',
    description:
      'Processo de avaliação detalhado para identificar pontos fortes e áreas de dificuldade, auxiliando no diagnóstico e plano de tratamento.',
  },
];

export default function Services() {
  return (
    <section id="servicos" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Nossos Serviços</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
            Oferecemos uma variedade de serviços para atender às suas
            necessidades de saúde mental e bem-estar.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Card
              key={service.title}
              className="bg-card border-none shadow-none flex items-start gap-6 p-6"
            >
              <div className="bg-accent/10 p-3 rounded-full">{service.icon}</div>
              <div className="text-left">
                <CardTitle className="text-xl font-semibold mb-2">
                  {service.title}
                </CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
