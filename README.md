# Backend API REST con autenticación JWT

API REST desarrollada con Node.js, Express y MongoDB para la materia de Ingeniería de Software (Universidad Anáhuac Mayab). Permite registrar usuarios, iniciar sesión y administrar tareas personales. Las rutas de tareas están protegidas con un Bearer Token (JWT), y cada usuario solo puede ver, modificar y eliminar sus propias tareas.

Proyecto base desarrollado en clase de Ingeniería de Software.

## Estructura del proyecto

```
├── config/
│   └── db.js                  # Conexión a MongoDB
├── controllers/
│   ├── tarea.Controllers.js   # Lógica del CRUD de tareas
│   └── usersController.js     # Registro, login y datos del usuario
├── middleware/
│   ├── authMiddleware.js      # Middleware protect (valida el JWT)
│   └── error.Middleware.js    # Manejo de errores
├── models/
│   ├── tareaModels.js
│   └── user.Models.js
├── routes/
│   ├── tareas.routes.js
│   └── usersRoutes.js
├── .env.example
├── .gitignore
├── package.json
└── server.js
```

## Requisitos previos

- Node.js 18 o superior
- Una cuenta en MongoDB Atlas con un cluster y un usuario de base de datos

## Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/DAJUPREMIUM/Backend-JWT-Tareas.git
   cd Backend-JWT-Tareas
   ```
2. Instala las dependencias:
   ```
   npm install
   ```
3. Crea un archivo `.env` en la raíz, tomando como base `.env.example`:
   ```
   PORT=5000
   MONGO_DB=mongodb+srv://USUARIO:CONTRASEÑA@cluster0.xxxxx.mongodb.net/tareasdb
   JWT_SECRET=tu_clave_secreta
   NODE_ENV=development
   ```

El archivo `.env` está en el `.gitignore` y nunca debe subirse al repositorio.

## Ejecución

```
npm start
```

Si todo está bien, la terminal mostrará:

```
Servidor iniciado en el puerto 5000
MongoDB Connected: ...
```

La API queda disponible en `http://localhost:5000`.

## Endpoints

### Usuarios (`/api/users`)

| Método | Ruta | Descripción | ¿Requiere token? |
|---|---|---|---|
| POST | `/api/users` | Registrar un usuario | No |
| POST | `/api/users/login` | Iniciar sesión y obtener el JWT | No |
| GET | `/api/users/datos` | Datos del usuario dueño del token | Sí |

### Tareas (`/api/tareas`)

Todas las rutas de tareas pasan por el middleware `protect`.

| Método | Ruta | Descripción | ¿Requiere token? |
|---|---|---|---|
| GET | `/api/tareas` | Listar solo las tareas del usuario logueado | Sí |
| POST | `/api/tareas` | Crear una tarea asignada al usuario logueado | Sí |
| PUT | `/api/tareas/:id` | Modificar una tarea propia | Sí |
| DELETE | `/api/tareas/:id` | Eliminar una tarea propia | Sí |

## Seguridad

- Las contraseñas se guardan encriptadas con bcrypt.
- Las rutas de tareas y `/api/users/datos` exigen el header `Authorization: Bearer <token>`. Sin token o con un token inválido, la API responde `401 Unauthorized`.
- El id del usuario se obtiene del token (`req.user`), nunca del body ni de la URL.
- Cada tarea guarda el id de su dueño y todas las consultas filtran por ese id. Si un usuario intenta modificar o eliminar una tarea ajena, la API responde con un error y la tarea no cambia.

## Autor

Diego Jonapa: Universidad Anáhuac Mayab, Ingeniería de Software.
