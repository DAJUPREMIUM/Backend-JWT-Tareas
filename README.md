# Backend API REST con autenticación JWT
 
API REST desarrollada con **Node.js**, **Express** y **MongoDB** para la materia de Ingeniería de Software (Universidad Anáhuac Mayab). Permite registrar usuarios, iniciar sesión y administrar tareas personales. Las rutas de tareas están protegidas con un **Bearer Token (JWT)**, y cada usuario solo puede ver, modificar y eliminar sus propias tareas.
 
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
 
- [Node.js](https://nodejs.org/) 18 o superior
- Una cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas) con un cluster y un usuario de base de datos
## Instalación
 
1. Clona el repositorio:
```bash
   git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   cd TU_REPOSITORIO
```
2. Instala las dependencias:
```bash
   npm install
```
3. Crea un archivo `.env` en la raíz del proyecto, tomando como base `.env.example`:
```env
   PORT=5001
   JWT_SECRET=tu_clave_secreta
   MONGO_DB=mongodb+srv://USUARIO:CONTRASEÑA@cluster0.xxxxx.mongodb.net/todo
```
   > El archivo `.env` está en el `.gitignore` y nunca debe subirse al repositorio.
 
## Ejecución
 
Modo desarrollo (se reinicia solo al guardar cambios):
 
```bash
npm run dev
```
 
Si todo está bien, la terminal mostrará:
 
```
Servidor iniciado en el puerto 5001
MongoDB Connected: ...
```
 
La API queda disponible en `http://localhost:5001`.
 
## Endpoints
 
### Usuarios (`/api/users`)
 
| Método | Ruta | Descripción | ¿Requiere token? |
|--------|------|-------------|------------------|
| POST | `/api/users/register` | Registrar un usuario | No |
| POST | `/api/users/login` | Iniciar sesión y obtener el JWT | No |
| GET | `/api/users/datos` | Datos del usuario dueño del token | Sí |
 
### Tareas (`/api/tareas`)
 
Todas las rutas de tareas pasan por el middleware `protect`.
 
| Método | Ruta | Descripción | ¿Requiere token? |
|--------|------|-------------|------------------|
| GET | `/api/tareas` | Listar solo las tareas del usuario logueado | Sí |
| POST | `/api/tareas` | Crear una tarea asignada al usuario logueado | Sí |
| PUT | `/api/tareas/:id` | Modificar una tarea propia | Sí |
| DELETE | `/api/tareas/:id` | Eliminar una tarea propia | Sí |

## Seguridad
 
- Las contraseñas se guardan encriptadas con bcrypt.
- Las rutas de tareas y `/api/users/datos` exigen el header `Authorization: Bearer <token>`. Sin token o con un token inválido, la API responde `401 Unauthorized`.
- El id del usuario se obtiene del token (`req.user`), nunca del body ni de la URL.
- Cada tarea guarda el id de su dueño y todas las consultas filtran por ese id. Si un usuario intenta modificar o eliminar una tarea ajena, la API responde con un error y la tarea no cambia.

## Autora
 Jennifer Briceño — Universidad Anáhuac Mayab, Ingeniería de Software.
