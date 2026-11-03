# API de tareas con login y JWT

Servicio web hecho con Node.js, Express y MongoDB para la clase de Ingeniería de Software (Universidad Anáhuac Mayab). Cada persona puede crear su cuenta, entrar con su correo y manejar su propia lista de pendientes. El acceso a los pendientes se controla con un token JWT que viaja en el encabezado de cada petición, así que nadie puede ver ni tocar lo que le pertenece a otro.

Código base trabajado durante la clase.

## Organización de carpetas

```
├── config/
│   └── db.js                  # Conecta con la base de datos
├── controllers/
│   ├── tarea.Controllers.js   # Operaciones sobre los pendientes
│   └── usersController.js     # Alta, acceso y perfil de usuarios
├── middleware/
│   ├── authMiddleware.js      # Filtro "protect" que revisa el token
│   └── error.Middleware.js    # Respuestas de error
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

## Qué necesitas tener

- Node.js versión 18 o más reciente
- Un cluster gratuito en MongoDB Atlas con su usuario de acceso

## Puesta en marcha

1. Descarga el proyecto:
   ```
   git clone https://github.com/DAJUPREMIUM/Backend-JWT-Tareas.git
   cd Backend-JWT-Tareas
   ```
2. Instala los paquetes:
   ```
   npm install
   ```
3. Crea un archivo llamado `.env` en la carpeta principal, copiando los nombres de `.env.example`:
   ```
   PORT=5000
   MONGO_DB=mongodb+srv://USUARIO:CONTRASEÑA@cluster0.xxxxx.mongodb.net/tareasdb
   JWT_SECRET=escribe_aqui_una_frase_larga_y_privada
   NODE_ENV=development
   ```

Ese archivo está ignorado por Git, así que tus datos privados no se publican.

## Arrancar el servidor

```
npm start
```

Deberías ver en la consola:

```
Servidor iniciado en el puerto 5000
MongoDB Connected: ...
```

Las peticiones se envían a `http://localhost:5000`.

## Rutas disponibles

### Cuentas (`/api/users`)

| Método | Ruta | Para qué sirve | ¿Pide token? |
|---|---|---|---|
| POST | `/api/users` | Crear una cuenta nueva | No |
| POST | `/api/users/login` | Entrar y recibir el JWT | No |
| GET | `/api/users/datos` | Ver el perfil de quien envía el token | Sí |

### Pendientes (`/api/tareas`)

Todas pasan primero por el filtro `protect`.

| Método | Ruta | Para qué sirve | ¿Pide token? |
|---|---|---|---|
| GET | `/api/tareas` | Ver únicamente los pendientes de quien está conectado | Sí |
| POST | `/api/tareas` | Agregar un pendiente a nombre de quien está conectado | Sí |
| PUT | `/api/tareas/:id` | Editar un pendiente propio | Sí |
| DELETE | `/api/tareas/:id` | Borrar un pendiente propio | Sí |

## Medidas de protección

- Las claves se almacenan cifradas con bcrypt.
- Los pendientes y el perfil requieren el encabezado `Authorization: Bearer <token>`. Si falta o no es válido, la respuesta es `401 Unauthorized`.
- La identidad se toma del contenido del token (`req.user`) y jamás de los datos que mande el cliente.
- Cada pendiente almacena quién lo creó y las búsquedas se limitan a ese dueño. Si alguien intenta editar o borrar algo ajeno, recibe un error y el registro queda intacto.

## Autor

Diego Jonapa, Ingeniería de Software, Universidad Anáhuac Mayab.
