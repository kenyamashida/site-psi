import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { authHeaders } from '../../lib/auth';
import {
  LogOut,
  Users,
  Mail,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
} from 'lucide-react';

export default function AdminDashboard({ user, onLogout, API_URL }) {
  const [psychologists, setPsychologists] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('psychologists');
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    crp: '',
    specialty: '',
    description: '',
    full_bio: '',
    education: '',
    photo_url: '',
  });

  const fetchPsychologists = async () => {
    const res = await fetch(`${API_URL}/api/admin/psychologists`, {
      headers: authHeaders(),
    });
    if (res.ok) {
      const data = await res.json();
      setPsychologists(Array.isArray(data) ? data : []);
    }
  };

  const fetchRequests = async () => {
    const res = await fetch(`${API_URL}/api/admin/requests`, {
      headers: authHeaders(),
    });
    if (res.ok) {
      const data = await res.json();
      setRequests(Array.isArray(data) ? data : []);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchPsychologists(), fetchRequests()]);
      setLoading(false);
    };
    load();
  }, [API_URL]);

  const resetForm = () => {
    setForm({
      name: '',
      crp: '',
      specialty: '',
      description: '',
      full_bio: '',
      education: '',
      photo_url: '',
    });
    setEditingId(null);
    setFormOpen(false);
  };

  const handleEdit = (p) => {
    setForm({
      name: p.name,
      crp: p.crp,
      specialty: p.specialty,
      description: p.description || '',
      full_bio: p.full_bio || '',
      education: p.education || '',
      photo_url: p.photo_url || '',
    });
    setEditingId(p.id);
    setFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId
      ? `${API_URL}/api/admin/psychologists/${editingId}`
      : `${API_URL}/api/admin/psychologists`;
    const method = editingId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      resetForm();
      fetchPsychologists();
    } else {
      const data = await res.json();
      alert(data.error || 'Erro ao salvar');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Remover este psicólogo?')) return;
    const res = await fetch(`${API_URL}/api/admin/psychologists/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (res.ok) fetchPsychologists();
  };

  const markAsRead = async (id) => {
    await fetch(`${API_URL}/api/admin/requests/${id}/read`, {
      method: 'PATCH',
      headers: authHeaders(),
    });
    fetchRequests();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ChevronLeft size={20} /> Voltar ao site
            </Link>
            <span className="text-sm text-muted-foreground">
              {user?.name} ({user?.email})
            </span>
          </div>
          <Button variant="ghost" onClick={onLogout} className="gap-2">
            <LogOut size={18} /> Sair
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-2 mb-8">
          <Button
            variant={activeTab === 'psychologists' ? 'default' : 'outline'}
            onClick={() => setActiveTab('psychologists')}
            className="gap-2"
          >
            <Users size={18} /> Psicólogos ({psychologists.length})
          </Button>
          <Button
            variant={activeTab === 'requests' ? 'default' : 'outline'}
            onClick={() => setActiveTab('requests')}
            className="gap-2"
          >
            <Mail size={18} /> Solicitações ({requests.length})
          </Button>
        </div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 rounded-xl animate-pulse bg-muted" />
            ))}
          </div>
        ) : activeTab === 'psychologists' ? (
          <div>
            {!formOpen ? (
              <Button
                onClick={() => {
                  resetForm();
                  setFormOpen(true);
                }}
                className="mb-6 gap-2"
              >
                <Plus size={18} /> Novo psicólogo
              </Button>
            ) : (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>{editingId ? 'Editar' : 'Novo'} psicólogo</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Nome</Label>
                        <Input
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          required
                          placeholder="Dr. João Silva"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>CRP</Label>
                        <Input
                          value={form.crp}
                          onChange={(e) => setForm({ ...form, crp: e.target.value })}
                          required
                          placeholder="06/12345"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Especialidade</Label>
                      <Input
                        value={form.specialty}
                        onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                        required
                        placeholder="Terapia Cognitivo-Comportamental"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Descrição (resumo)</Label>
                      <Input
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        placeholder="Breve descrição"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Bio completa</Label>
                      <Textarea
                        value={form.full_bio}
                        onChange={(e) => setForm({ ...form, full_bio: e.target.value })}
                        rows={3}
                        placeholder="Biografia detalhada"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Formação</Label>
                      <Input
                        value={form.education}
                        onChange={(e) => setForm({ ...form, education: e.target.value })}
                        placeholder="Psicologia - USP; Especialização em TCC"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>URL da foto</Label>
                      <Input
                        value={form.photo_url}
                        onChange={(e) => setForm({ ...form, photo_url: e.target.value })}
                        placeholder="https://..."
                        type="url"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit">Salvar</Button>
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {psychologists.map((p) => (
                <Card key={p.id}>
                  <div className="aspect-video overflow-hidden rounded-t-lg bg-muted">
                    {p.photo_url ? (
                      <img
                        src={p.photo_url}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <Users size={48} />
                      </div>
                    )}
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-bold text-lg">{p.name}</h3>
                    <p className="text-sm text-muted-foreground">CRP: {p.crp}</p>
                    <p className="text-accent font-medium">{p.specialty}</p>
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(p)}
                        className="gap-1"
                      >
                        <Pencil size={14} /> Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(p.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.length === 0 ? (
              <p className="text-muted-foreground">Nenhuma solicitação de contato.</p>
            ) : (
              requests.map((r) => (
                <Card
                  key={r.id}
                  className={!r.is_read ? 'border-accent/50 bg-accent/5' : ''}
                >
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold">{r.name}</p>
                        <p className="text-sm text-muted-foreground">{r.email}</p>
                        {r.phone && (
                          <p className="text-sm text-muted-foreground">{r.phone}</p>
                        )}
                        <p className="mt-2 text-sm">{r.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(r.created_at).toLocaleString('pt-BR')}
                        </p>
                      </div>
                      {!r.is_read && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => markAsRead(r.id)}
                        >
                          Marcar como lida
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
