# GUIA DE VALIDAÇÃO - JornaApp

## ✅ Checklist de Funcionalidades

### 1. HOME (Pautas)
- [ ] Página carrega com 2 pautas exemplo
- [ ] Busca de pautas por título funciona
- [ ] Filtro por status (todos/pendente/em-andamento/concluído) funciona
- [ ] Clique em EDITAR abre modal com dados preenchidos
- [ ] Clique em LIXEIRA deleta a pauta
- [ ] Botão + adiciona nova pauta
- [ ] Modal salva nova pauta corretamente
- [ ] Deadline mostra "X dias" corretamente
- [ ] Deadline com 2 ou menos dias muda para vermelho
- [ ] Status muda cor de acordo (amarelo/azul/verde)

### 2. FONTES (Banco de Fontes)
- [ ] Página carrega com 2 fontes exemplo
- [ ] Busca funciona por nome e categoria
- [ ] Clique em EDITAR abre modal preenchido
- [ ] Clique em LIXEIRA deleta a fonte
- [ ] Botão + adiciona nova fonte
- [ ] Modal salva nova fonte corretamente
- [ ] Badge "Oficial" aparece apenas em fontes oficiais
- [ ] Contato e categoria aparecem corretamente

### 3. GUIAS
- [ ] Guia "Verificador de Fontes" carrega
- [ ] Textarea para verificação funciona
- [ ] Botão "Verificar Fonte" faz simulação (esperar ~2s)
- [ ] Resultado mostra score e detalhes
- [ ] Templates aparecem corretamente (3 templates)
- [ ] Guias práticos aparecem corretamente (3 guias)

### 4. PERFIL
- [ ] Avatar com iniciais JD aparece
- [ ] Dados do perfil mostram corretamente
- [ ] Contadores de pautas/fontes/concluídas aparecem
- [ ] Botões (notificações, sincronizar, sair) aparecem

### 5. NAVEGAÇÃO
- [ ] Bottom nav com 4 abas (Pautas/Fontes/Guias/Perfil)
- [ ] Aba ativa fica azul destacada
- [ ] Clicar em aba muda de view
- [ ] Busca limpa ao trocar de aba (Pautas e Fontes)

### 6. INTERFACE GERAL
- [ ] Header azul com logo "📰 JornaApp"
- [ ] Sino (Bell) aparece no header
- [ ] Responsive em telas menores
- [ ] Cores de gradiente aplicadas corretamente
- [ ] Ícones do lucide-react carregam corretamente
- [ ] Sem erros no console do navegador

## 🚀 Como Usar

1. Abra http://localhost:5173 no navegador
2. Execute os testes acima
3. Se algo não funcionar, verifique o console do navegador (F12)
4. Para adicionar/editar: clique no ícone de lápis ou botão +
5. Para deletar: clique no ícone de lixeira

## 📱 Próximos Passos (Para Mobile)

Quando quiser expandir para Android/iOS:
- Use React Native ou Flutter
- Mantenha a mesma lógica do estado
- Use a mesma API backend (quando implementada)
- O design é totalmente responsivo e pronto para mobile
