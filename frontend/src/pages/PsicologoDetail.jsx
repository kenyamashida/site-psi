import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { psychologistsFallback } from '../lib/data';

export default function PsicologoDetail({ API_URL }) {
  const { id } = useParams();
  const [psychologist, setPsychologist] = useState(null);

  useEffect(() => {
    const fetchPsychologist = async () => {
      try {
        const res = await fetch(`${API_URL}/api/professionals/${id}`);
        if (res.ok) {
          const p = await res.json();
          setPsychologist({
            id: String(p.id),
            name: p.name,
            specialty: p.specialty,
            bio: p.description || p.full_bio,
            crp: p.crp,
            education: p.education,
            imageUrl: p.photo_url,
          });
        } else {
          const fallback = psychologistsFallback.find(
            (f) => String(f.id) === String(id)
          );
          setPsychologist(fallback || psychologistsFallback[0]);
        }
      } catch {
        const fallback = psychologistsFallback.find(
          (f) => String(f.id) === String(id)
        );
        setPsychologist(fallback || psychologistsFallback[0]);
      }
    };
    fetchPsychologist();
  }, [API_URL, id]);

  if (!psychologist) {
    return (
      <div className="pt-24 min-h-screen bg-background flex items-center justify-center">
        <div className="h-96 w-80 rounded-2xl animate-pulse bg-muted" />
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          <div className="rounded-[2rem] overflow-hidden aspect-square max-w-md">
            <img
              src={
                psychologist.imageUrl ||
                psychologist.photo_url ||
                'https://picsum.photos/seed/2/600/600'
              }
              alt={psychologist.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-black text-primary">
              {psychologist.name}
            </h1>
            <p className="text-accent text-xl font-bold">
              {psychologist.specialty}
            </p>
            {psychologist.crp && (
              <p className="text-muted-foreground">CRP: {psychologist.crp}</p>
            )}
            <p className="text-foreground leading-relaxed text-lg">
              {psychologist.bio || psychologist.full_bio || psychologist.description}
            </p>
            {psychologist.education && (
              <div>
                <h3 className="font-bold text-primary mb-2">Formação</h3>
                <p className="text-muted-foreground">{psychologist.education}</p>
              </div>
            )}
            <Button
              asChild
              size="lg"
              className="rounded-full bg-accent text-accent-foreground"
            >
              <Link to="/contato">Agendar Consulta</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
