# Usa la imagen oficial de Node.js 22
FROM node:22

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY package*.json ./
RUN npm install -g @angular/cli@17
RUN npm install

# Copia el resto del código fuente
COPY . .

# Expone el puerto 4200
EXPOSE 4200

# Comando para iniciar la app Angular en modo desarrollo
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
