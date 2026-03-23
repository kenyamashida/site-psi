import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { psychologistsFallback } from '../lib/data';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ChevronRight } from 'lucide-react';

export default function Psicologos({ API_URL }) {
  const [psychologists, setPsychologists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPsychologists = async () => {
      try {
        const res = await fetch(`${API_URL}/api/professionals/`);
        if (res.ok) {
          const data = await res.json();
          setPsychologists(
            Array.isArray(data)
              ? data.map((p) => ({
                  id: String(p.id),
                  name: p.name,
                  crp: p.crp,
                  specialty: p.specialty,
                  description: p.description,
                  full_bio: p.full_bio,
                  education: p.education,
                  photo_url: p.photo_url,
                }))
              : psychologistsFallback
          );
        } else {
          setPsychologists(psychologistsFallback);
        }
      } catch {
        setPsychologists(psychologistsFallback);
      } finally {
        setLoading(false);
      }
    };
    fetchPsychologists();
  }, [API_URL]);

  const list = psychologists.length > 0 ? psychologists : psychologistsFallback;

  if (loading) {
    return (
      <div className="pt-24 min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-[420px] rounded-[2rem] animate-pulse bg-muted"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-primary mb-6">
          Nossa Equipe
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-12">
          Conheça os profissionais dedicados ao seu bem-estar emocional.
        </p>
      </div>
      <div className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((p) => (
            <Card
              key={p.id}
              className="group flex flex-col overflow-hidden border border-border bg-card rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src={
                    p.photo_url ||
                    p.imageUrl ||
                    'https://picsum.photos/seed/' + (p.id || '2') + '/400/500'
                  }
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background/90 to-transparent" />
              </div>
              <CardContent className="flex-grow p-6 space-y-3">
                <h3 className="text-xl font-bold text-primary">{p.name}</h3>
                {p.crp && (
                  <p className="text-sm text-muted-foreground font-medium">
                    CRP: {p.crp}
                  </p>
                )}
                <p className="text-accent font-semibold">{p.specialty}</p>
                <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                  {p.description || p.full_bio || p.bio}
                </p>
                {p.education && (
                  <p className="text-xs text-muted-foreground line-clamp-2 pt-1 border-t border-border">
                    <span className="font-medium">Formação:</span> {p.education}
                  </p>
                )}
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button
                  asChild
                  className="w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Link to={`/psicologos/${p.id}`} className="flex items-center justify-center gap-2">
                    Ver perfil completo
                    <ChevronRight size={18} />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
