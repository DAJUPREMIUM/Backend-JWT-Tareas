API REST desarrollada con Node.js, Express y MongoDB para la materia de Ingeniería de Software (Universidad Anáhuac Mayab). Permite registrar usuarios, iniciar sesión y administrar tareas personales. Las rutas de tareas están protegidas con un Bearer Token (JWT), y cada usuario solo puede ver, modificar y eliminar sus propias tareas.

Estructura del proyecto
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
