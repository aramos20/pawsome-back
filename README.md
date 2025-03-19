# 🐾 Pawsome Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square) ![JavaScript](https://shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=000&style=flat-square) ![Fastify](https://img.shields.io/badge/Fastify-000000?style=flat-square&logo=fastify)

El **backend de Pawsome** es la columna vertebral de la plataforma, proporcionando servicios robustos y eficientes para gestionar refugios y sus operaciones. Este servidor está diseñado para manejar múltiples cargas de trabajo utilizando **Express** y **Fastify**, con TypeScript garantizando tipado y calidad en el código.

---

## 🚀 Tecnologías

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **JavaScript**: Proporciona velocidad, simplicidad y gran soporte por parte de la comunidad.
- **Fastify**: Framework web centrado en el rendimiento y bajo consumo de recursos.
- **ESLint**: Herramienta de linting para mantener el código limpio y consistente.

---

## 📂 Estructura del Proyecto

```plaintext
pawsome-backend
├── src/                # Código fuente principal
│   ├── config     /    # Configuraciones
│   ├── controllers/    # Lógica de control de rutas
│   ├── middlewares/    # Middlewares personalizados
│   ├── models/         # Definición de entidades y esquemas
│   ├── routes/         # Rutas para los endpoints
│   ├── services/       # Lógica de negocio
│   ├── utils/          # Funciones utilitarias
│   └── app.js          # Configuración principal de la aplicación
├── tests/              # Pruebas unitarias y de integración
├── index.js       # Punto de entrada del servidor
├── package.json        # Dependencias y scripts
└── README.md           # Documentación del proyecto
```

---

## 🛠️ Scripts

- `pnpm run dev`: Inicia el servidor en modo desarrollo.
- `pnpm run build`: Genera los archivos de producción.
- `pnpm run start`: Inicia el servidor en modo producción.
- `pnpm run lint`: Ejecuta ESLint para verificar el código.
- `pnpm run test`: Ejecuta las pruebas.

---

## ✨ Configuración Inicial

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/pawsome-back-v001.git
   cd pawsome-back-v001
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   - Crea un archivo `.env` en la raíz del proyecto.
   - Proporciona las siguientes claves:

     ```env
     PORT=3000
     DATABASE_URL=tu_url_de_base_de_datos
     JWT_SECRET=tu_secreto
     ```

4. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

---

## ✅ Pruebas

Ejecuta las pruebas unitarias y de integración con:
```bash
npm run test
```
Asegúrate de que todas las pruebas pasen antes de realizar un pull request.

---

## 🛡️ Contribuciones

1. **Forkea el repositorio** y clónalo localmente.
2. Crea una nueva rama para tus cambios:

   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Asegúrate de ejecutar `pnpm run lint` y `pnpm run test` antes de hacer un commit.
4. Haz un **pull request** con tus cambios.

---

## 📧 Contacto

¿Tienes preguntas o sugerencias? ¡Estamos encantados de escucharte!  
- **Email**: pawsome.wow@gmail.com  
- **LinkedIn**: [Pawsome](https://linkedin.com/company/pawsome-wow)

---

¡Gracias por contribuir al desarrollo de **Pawsome**! 🐾
