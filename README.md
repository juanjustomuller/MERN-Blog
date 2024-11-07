# MERN Blog

Aplicación de blog de pila completa construida con el stack MERN (MongoDB, Express, React, Node.js). Este proyecto demuestra cómo crear una plataforma de blogs simple con autenticación de usuarios, operaciones CRUD y un diseño responsivo.

## Características
- Autenticación de usuarios (registro/login)
- Crear, leer, actualizar y eliminar publicaciones de blog
- Diseño responsivo con CSS
- API RESTful usando Express y MongoDB
- Frontend desarrollado con React

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/juanjustomuller/MERN-Blog.git
   cd MERN-Blog
Instala las dependencias para el cliente y el servidor:

bash
Copiar código
# Para el cliente
cd client
npm install

# Para el servidor
cd ../server
npm install
Configura las variables de entorno en los archivos .env tanto para el cliente como para el servidor:

MONGO_URI (cadena de conexión de MongoDB)
JWT_SECRET (para autenticación)
PORT (para el puerto del servidor)
Ejecuta el proyecto:

bash
Copiar código
# Inicia el servidor
cd server
npm start

# En una terminal separada, inicia el cliente
cd client
npm start
Tecnologías utilizadas
MongoDB
Express
React
Node.js
Licencia
Este proyecto está bajo la licencia MIT - consulta el archivo LICENSE para más detalles.
