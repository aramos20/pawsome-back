# Imagen base con Node.js 23 y Alpine para mantenerlo ligero
FROM node:23-alpine

# Instalar pnpm globalmente en la imagen
RUN npm install -g pnpm

# Crear grupo y usuario no privilegiado
RUN addgroup -g 1001 -S nonrootgroup && adduser -u 1001 -S nonroot -G nonrootgroup

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias primero (para aprovechar el caché de Docker)
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias de producción con pnpm
RUN pnpm install --frozen-lockfile --prod

# Copiar el resto del código
COPY . .

# Configurar variables de entorno
ENV PORT=3000

# Exponer puerto
EXPOSE 3000

# Healthcheck (ajustado a un endpoint genérico, cámbialo si tienes uno específico)
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Cambiar a usuario no privilegiado
USER nonroot

# Comando para iniciar la aplicación
CMD ["node", "index.js"]