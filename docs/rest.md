# Creación de la api REST

Basándome en la descripción del proyecto y en las historias de usuarios definidas, se ha construido una api REST que permite hasta el momento la gestión de usuarios y la gestión de grupos. Cada endpoint excepto los de autenticación están protegidos por `token-authorization` por lo que cada petición realizada al servicio REST debe estar firmada con el token recibido al momento de la autenticación siguiendo un prtron `"Bearer token"`. Como ha sido mecionado en la descripción del Hito 3 para el desarrollo de las pruebas del servicio REST se han utilizado las bibliotecas Jest y Supertest conjuntamente, la última específicamente para probar las peticiones http a los diferentes recursos expuestos.

A continuación un breve descripción de los endpoints accesibles:

| Method | URL                     |                      Description                       |                               JSON Payload |       Status Code |
| :----- | :---------------------- | :----------------------------------------------------: | -----------------------------------------: | ----------------: |
| POST   | `/api/auth/register`    |                  Registro de usuario                   | {name, lastname, username,email, password} |          400, 200 |
| POST   | `/api/auth/login`       |                   Acceso al sistema                    |                       {username, password} |          403, 200 |
| GET    | `/api/auth/logout`      |                   Salida del sistema                   |                                            |          400, 200 |
| POST   | `/api/group/create`     |                  Crear un nuevo grupo                  |                        {name, description} |          400, 200 |
| GET    | `/api/group/read/:id`   | Recuperar información referente al grupo con id: `id`  |                                            |     403, 404, 200 |
| PUT    | `/api/group/add/:id`    |      Añadir nuevos usuarios al grupo con id: `id`      |                     [username1, username2] | 403, 400,404, 200 |
| PUT    | `/api/group/remove/:id` |        Eliminar usuarios del grupo con id: `id`        |                     [username1, username2] | 403, 400,404, 200 |
| PUT    | `/api/group/update/:id` | Actualizar información referente al grupo con id: `id` |                        {name, description} | 403, 400,404, 200 |
