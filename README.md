# API REST de Usuarios – Node.js, Express y PostgreSQL

Práctica 3 – Desarrollo Web (Unidad 3: Lenguaje del lado del servidor – Back-End).

API REST que gestiona usuarios almacenados en una base de datos PostgreSQL, implementando las operaciones CRUD y probada con Postman.

## Tecnologías utilizadas

- **Node.js** – entorno de ejecución de JavaScript
- **Express** – framework para crear la API REST
- **PostgreSQL** – base de datos relacional
- **pg** – conector entre Node.js y PostgreSQL
- **dotenv** – manejo de variables de entorno
- **Postman** – pruebas de los endpoints

## Estructura del proyecto

```
api-usuarios/
├── database/
│   └── database.sql              # Script de creación de la tabla
├── src/
│   ├── config/db.js              # Conexión a PostgreSQL
│   ├── controllers/usuarios.controller.js  # Lógica CRUD y validaciones
│   ├── routes/usuarios.routes.js # Definición de rutas
│   └── index.js                  # Servidor Express
├── .env.example
├── package.json
└── README.md
```

## Funcionalidades implementadas

| Método | Endpoint        | Descripción            | Respuesta exitosa |
|--------|-----------------|------------------------|-------------------|
| POST   | /usuarios       | Registrar un usuario   | 201 Created       |
| GET    | /usuarios       | Consultar todos        | 200 OK            |
| GET    | /usuarios/:id   | Consultar por ID       | 200 OK            |
| PUT    | /usuarios/:id   | Actualizar un usuario  | 200 OK            |
| DELETE | /usuarios/:id   | Eliminar un usuario    | 200 OK            |

### Manejo de errores

| Código | Caso |
|--------|------|
| 400 | Faltan campos obligatorios, correo o edad inválidos, id no numérico o JSON mal formado |
| 404 | Usuario o ruta no encontrados |
| 409 | El correo ya está registrado |
| 500 | Error interno del servidor o de la base de datos |

### Ejemplo de body (JSON)

```json
{
  "nombre": "Ana Torres",
  "correo": "ana@mail.com",
  "edad": 21
}
```

## Instalación y ejecución

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd api-usuarios
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Crear la tabla ejecutando `database/database.sql` en pgAdmin.
4. Copiar `.env.example` como `.env` y colocar los datos de conexión.
5. Iniciar el servidor:
   ```bash
   npm run dev
   ```
6. La API queda disponible en `http://localhost:3000/usuarios`.
