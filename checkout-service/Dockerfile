# checkout-service/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copia apenas os arquivos de dependências primeiro (Clean Code / Otimização de camadas de cache)
COPY package*.json ./

RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta interna do container
EXPOSE 3000

CMD ["npm", "start"]