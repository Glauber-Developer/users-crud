FROM node:16-alpine

# Instala o bash
RUN apk update && apk add bash

# Define o diretório de trabalho
WORKDIR /app

# Copia o package.json e o package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante da aplicação
COPY . .

# Copia o script wait-for-it.sh
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Expõe a porta da aplicação
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["wait-for-it.sh", "db:5432", "--", "node", "src/main/index.js"]
