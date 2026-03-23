import Contact from '../components/landing/Contact';

export default function Contato({ API_URL }) {
  return (
    <div className="pt-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-primary mb-6">
          Fale Conosco
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-12">
          Estamos à disposição para tirar suas dúvidas, ouvir suas sugestões ou
          ajudar você a encontrar o suporte que precisa.
        </p>
      </div>
      <Contact API_URL={API_URL} />
      <div className="container mx-auto px-4 pb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 bg-secondary/50 rounded-[2rem] text-center space-y-4">
          <h3 className="font-bold text-primary">Telefone</h3>
          <p className="text-muted-foreground">(11) 98765-4321</p>
        </div>
        <div className="p-8 bg-secondary/50 rounded-[2rem] text-center space-y-4">
          <h3 className="font-bold text-primary">Email</h3>
          <p className="text-muted-foreground">contato@sitepsicologia.com</p>
        </div>
        <div className="p-8 bg-secondary/50 rounded-[2rem] text-center space-y-4">
          <h3 className="font-bold text-primary">Localização</h3>
          <p className="text-muted-foreground">
            São Paulo - SP (Atendimento Online e Presencial)
          </p>
        </div>
      </div>
    </div>
  );
}
