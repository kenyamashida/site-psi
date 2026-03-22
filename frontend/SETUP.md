# Setup Frontend - Guia de Início

## ⚡ Quick Start

### 1. Instalar Dependências

```bash
cd Projeto-base/frontend
npm install
```

### 2. Iniciar Desenvolvimento

```bash
npm run dev
```

Acesse: `http://localhost:5173`

### 3. Compilar para Produção

```bash
npm run build
```

---

## 📋 Pré-requisitos

- Node.js 16+ instalado
- Backend rodando em `http://localhost:5000`
- NPM ou Yarn

---

## 🔧 Configurações Importantes

### 1. Backend URL

Se o backend não está em `localhost:5000`, atualize:

**Arquivo:** `src/lib/api.js`

```javascript
baseURL: 'http://localhost:5000/api', // Mude aqui
```

### 2. CORS

O backend deve permitir requisições do frontend:

**Check Backend CORS:**

```bash
curl -H "Origin: http://localhost:5173" http://localhost:5000
```

---

## 🏗️ Estrutura de Pastas

```
src/
├── components/        # Componentes reutilizáveis
├── pages/            # Páginas da aplicação
├── services/         # Serviços (API calls)
├── hooks/            # Custom React hooks
├── lib/              # Utilidades
├── assets/           # Imagens, fontes
├── App.jsx           # Componente raiz
├── main.jsx          # Entry point
└── index.css         # Estilos globais
```

---

## 📝 Scripts Disponíveis

```bash
npm run dev          # Inicia desenvolvimento
npm run build        # Build para produção
npm run preview      # Visualiza build local
npm run lint         # ESLint
```

---

## 🎨 Customização Visual

### Cores

Edite `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#0ea5e9',
      secondary: '#8b5cf6',
    }
  }
}
```

### Fonte

Adicione em `index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700');

body {
  font-family: 'Poppins', sans-serif;
}
```

---

## 🚀 Deploy

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Netlify

1. Push para Git
2. Conecte repositório em netlify.com
3. Build command: `npm run build`
4. Publish directory: `dist`

---

## 🤝 Integração com Backend

### Requisições Básicas

```javascript
import { psychologistService, contactService } from '@/services/api';

// Listar psicólogos
const psychologists = await psychologistService.list();

// Criar contato
await contactService.create({
  psychologist_id: 1,
  name: 'João',
  email: 'joao@email.com',
  phone: '...',
  message: '...'
});
```

---

## 🐛 Troubleshooting

### "Cannot GET /"

Backend não está rodando. Inicie com:

```bash
cd Projeto-base/backend
npm run dev
```

### CORS Error

Verifique se backend tem CORS habilitado e permite localhost:5173

### Módulo não encontrado

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Porta 5173 em uso

```bash
npm run dev -- --port 3000
```

---

## ✨ Features Implementadas

✅ Listagem de psicólogos com busca  
✅ Cards responsivos  
✅ Formulário de contato com validação  
✅ Integração com API Node.js  
✅ Interface mobile-first  
✅ Ícones Lucide React  
✅ Loading states  
✅ Erro handling  
✅ Smooth scrolling  
✅ SEO friendly  

---

## 📚 Recursos

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Lucide Icons](https://lucide.dev)

---

## 🎯 Próximas Melhorias

- [ ] Adicionar testes unitários (Vitest)
- [ ] Implementar dark mode
- [ ] Sistema de Login/Autenticação
- [ ] Dashboard Admin
- [ ] Agendamento de sessões
- [ ] Chat em tempo real
- [ ] Notificações push

---

## 💬 Suporte

Se encontrar problemas:

1. Verifique console do navegador (F12)
2. Verifique Network tab nas requisições
3. Verifique terminal do desenvolvimento
4. Consulte documentação dos pacotes

---

✨ Pronto para começar! 🚀
