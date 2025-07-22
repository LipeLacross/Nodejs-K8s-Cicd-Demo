FROM node:18-alpine

WORKDIR /app

# Instala dependências apenas quando necessário
COPY package*.json ./
RUN npm install

# Copia os arquivos de configuração e código fonte
COPY tsconfig.json ./
COPY src ./src

# Compila o código TypeScript
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
