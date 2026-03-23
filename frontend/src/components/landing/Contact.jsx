import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

export default function Contact({ API_URL }) {
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone') || '',
      message: formData.get('message'),
    };

    if (!data.name || data.name.length < 3) {
      setStatus({ type: 'error', message: 'Nome deve ter pelo menos 3 caracteres.' });
      return;
    }
    if (!data.message || data.message.length < 10) {
      setStatus({ type: 'error', message: 'Mensagem deve ter pelo menos 10 caracteres.' });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const res = await fetch(`${API_URL}/api/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: 'Mensagem enviada com sucesso!' });
        form.reset();
      } else {
        setStatus({ type: 'error', message: json.error || 'Erro ao enviar.' });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Não foi possível conectar ao servidor. Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contato" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Entre em Contato</h2>
            <p className="text-lg text-muted-foreground">
              Estamos aqui para ajudar. Preencha o formulário e nossa equipe
              entrará em contato para agendar sua consulta e tirar suas dúvidas.
            </p>
            <p className="text-muted-foreground">
              Se preferir, entre em contato pelo telefone{' '}
              <strong className="text-accent-foreground">(11) 98765-4321</strong>{' '}
              ou email{' '}
              <strong className="text-accent-foreground">
                contato@sitepsicologia.com
              </strong>
              .
            </p>
          </div>
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Envie sua mensagem</CardTitle>
              <CardDescription>Responderemos o mais breve possível.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone (opcional)</Label>
                  <Input id="phone" name="phone" placeholder="(11) 99999-9999" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Como podemos ajudar?"
                    required
                  />
                </div>
                {status.message && (
                  <p
                    className={`text-sm font-medium ${
                      status.type === 'success' ? 'text-primary' : 'text-destructive'
                    }`}
                  >
                    {status.message}
                  </p>
                )}
                <Button
                  type="submit"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Enviar Mensagem'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
