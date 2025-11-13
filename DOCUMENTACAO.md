# 📋 Documentação - JornaApp

## 🚀 Iniciar em Desenvolvimento

```bash
# Usando o script
./start-dev.sh

# Ou manualmente
npm run dev
```

Acesse: http://localhost:5173

## 🏗️ Build para Produção

```bash
npm run build
```

Isso gera a pasta `dist/` com os arquivos otimizados para produção.

## 👀 Preview da Build

```bash
npm run preview
```

Mostra como ficaria em produção (sem hot-reload).

## 📁 Estrutura do Projeto

```
jornasa/
├── src/
│   ├── JornalismoApp.jsx     # Componente principal
│   ├── main.jsx              # Entry point
│   └── index.css             # Estilos globais (Tailwind)
├── index.html                # HTML template
├── vite.config.js            # Configuração Vite
├── tailwind.config.cjs       # Configuração Tailwind
├── postcss.config.cjs        # Configuração PostCSS
├── package.json              # Dependências
└── .env.example              # Variáveis de exemplo
```

## 🎨 Customização

### Alterar Cores
Edite `tailwind.config.cjs`:
```javascript
theme: {
  colors: {
    // Customize aqui
  }
}
```

### Adicionar Novas Páginas
1. Crie um novo componente em `src/`
2. Importe em `JornalismoApp.jsx`
3. Adicione uma nova view seguindo o padrão das existentes

### Conectar com Backend
1. Substitua as chamadas `setPautas()`, `setFontes()` por chamadas de API
2. Use `fetch` ou `axios` para requisições
3. Configure a URL em `.env`

## 🔗 Para Android/iOS

Use React Native com a mesma lógica:
```javascript
import { View, Text, ScrollView } from 'react-native';
// Mesmos hooks (useState, etc)
// Mesma lógica de estado
```

Ou use Flutter para mais performance em mobile.

## 📦 Dependências

- **React 18.2**: UI library
- **Vite 5.0**: Build tool super rápido
- **Tailwind 3.3**: Utility-first CSS
- **lucide-react 0.323**: Ícones bonitos

## ✅ Checklist Final

- [x] React configurado
- [x] Tailwind configurado
- [x] Hot module replacement (HMR)
- [x] Componentes funcionando
- [x] Navegação funcionando
- [x] Modal funcionando
- [x] CRUD de pautas funcionando
- [x] CRUD de fontes funcionando
- [x] Responsivo
- [x] Sem erros no console

## 🐛 Troubleshooting

**"command not found: npm"**
```bash
source ~/.nvm/nvm.sh
npm --version
```

**Porta 5173 já em uso**
```bash
# Matar processo
lsof -ti:5173 | xargs kill -9
# Ou usar outra porta
npm run dev -- --port 5174
```

**Tailwind não funciona**
```bash
npm run dev
# Limpe cache do navegador (Ctrl+Shift+R ou Cmd+Shift+R)
```

## 📞 Suporte

Para questões sobre:
- **React**: https://react.dev
- **Vite**: https://vitejs.dev
- **Tailwind**: https://tailwindcss.com
