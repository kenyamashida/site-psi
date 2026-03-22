# 📋 CHECKLIST DE REQUISITOS - Site-psi

## ✅ Configuração do Projeto

### Diretório Raiz
```
c:\Users\kenya\Documents\Projects\Site-psi\
├── .git/               ✅ Repo Git
├── backend/            ⚠️ Verificar arquivos
├── frontend/           ✅ Estrutura OK
├── Browser             ⚠️ Faltam arquivos
└── Projeto-base/       ⚠️ JÁ FOI MOVIDO/DELETADO
```

---

## 🔴 PROBLEMAS ENCONTRADOS

### Backend (`Site-psi/backend/`)

**Arquivo: package.json**
```json
  "dependencies": {
    "cors": "^2.8.6",
    "express": "^5.2.1"
    ❌ sqlite3 - FALTANDO!
```

**Problemas:**
- ❌ **sqlite3 não está instalado** - É essencial para o banco de dados
- ❌ Script `npm run dev` não existe (só tem `npm start`)
  - Esperado: `"dev": "nodemon server.js"`
- ❌ Faltam arquivos estruturais:
  - `db/database.js` - ✓ Deve existir
  - `models/psychologist.js` - ✓ Deve existir
  - `models/contactRequest.js` - ✓ Deve existir
  - `controllers/` - ✓ Deve existir
  - `scripts/seed.js` - ✓ Deve existir

**Estrutura Encontrada:**
```
backend/
├── node_modules/
├── routes/
│   └── (arquivos)
├── package.json
├── package-lock.json
└── server.js
```

**Estrutura Esperada:**
```
backend/
├── db/
│   └── database.js
├── models/
│   ├── psychologist.js
│   └── contactRequest.js
├── controllers/
│   ├── psychologistController.js
│   └── contactRequestController.js
├── routes/
│   ├── professionals.js
│   └── contacts.js
├── scripts/
│   └── seed.js
├── server.js
├── config.js
├── package.json
└── node_modules/
```

---

### Frontend (`Site-psi/frontend/`)

**Arquivo: package.json**
```json
  "dependencies": {
    "lucide-react": "^0.577.0",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "react-router-dom": "^7.13.1"
    ❌ axios - FALTANDO!
```

**Problemas:**
- ❌ **axios não está instalado** - É essencial para chamadas HTTP à API
- ⚠️ TypeScript não foi convertido para JavaScript (tsconfig.json ainda existe)

**Estrutura Encontrada:** ✅
```
frontend/
├── src/
├── public/
├── node_modules/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
└── [documentação]
```

---

## 🛠️ AÇÕES NECESSÁRIAS

### 1. FIX Backend - Adicionar sqlite3

```bash
cd Site-psi\backend
npm install sqlite3
```

### 2. FIX Backend - Atualizar package.json scripts

**Adicionar:**
```json
"scripts": {
  "dev": "nodemon server.js",      ← ADICIONAR
  "start": "node server.js",        ← JÁ EXISTE
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

### 3. FIX Backend - Verificar arquivos faltando

Precisam existir:
- [ ] `backend/db/database.js`
- [ ] `backend/models/psychologist.js`
- [ ] `backend/models/contactRequest.js`
- [ ] `backend/controllers/psychologistController.js`
- [ ] `backend/controllers/contactRequestController.js`
- [ ] `backend/config.js`
- [ ] `backend/scripts/seed.js`

### 4. FIX Frontend - Adicionar axios

```bash
cd Site-psi\frontend
npm install axios
```

---

## 📊 STATUS RESUMIDO

| Componente | Status | Detalhes |
|-----------|--------|----------|
| **Backend** | 🔴 **INCOMPLETO** | Falta sqlite3, estrutura de arquivos, scripts |
| **Frontend** | 🟡 **PARCIAL** | Estrutura OK, mas falta axios |
| **Banco de Dados** | ❓ **INCERTO** | Verificar se db.sqlite3 existe |
| **CORS** | ❓ **PRECISA VERIFICAR** | Backend deve ter CORS configurado |
| **Documentação** | ✅ **OK** | Frontend tem README e docs |
| **Node.js** | ✅ **INSTALADO** | node_modules existe em ambos |

---

## 🚀 PRÓXIMOS PASSOS

### Fase 1: Correções Imediatas
1. [ ] Instalar sqlite3 no backend
2. [ ] Adicionar axios ao frontend
3. [ ] Atualizar scripts do backend (add dev)
4. [ ] Verificar se todos os arquivos estruturais existem

### Fase 2: Verificação
1. [ ] Testar `npm run dev` no backend
2. [ ] Testar `npm run dev` no frontend
3. [ ] Verificar conexão entre backend e frontend

### Fase 3: Testes
1. [ ] Verificar endpoints da API
2. [ ] Testar formulário de contato
3. [ ] Verificar integração completa

---

**Relatório Gerado:** `$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')`

