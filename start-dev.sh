#!/bin/bash

# Script para iniciar o JornaApp com NVM
# Uso: ./start-dev.sh

cd "$(dirname "$0")"

# Carregar NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
  echo "📦 Instalando dependências..."
  npm install
fi

# Iniciar servidor dev
echo "🚀 Iniciando JornaApp em http://localhost:5173"
npm run dev
