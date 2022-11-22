## Entorno de pruebas

Instalar Jest desde el gestor de dependencias npm o yarn:
`npm install --save-dev jest`

Instalar Supertest desde el gestor de dependencias:
`npm install --save-dev supertest`

Instalar Cross Env desde el gestor de dependencias:
`npm install --save-dev cross-env`

Configurar scripts de `package.json` para cambiar de entorno y ejecutar pruebas:

`````json
{
    "scripts": {
    "test": "cross-env NODE_ENV=test jest --detectOpenHandles"
    }
}```
En esta orden especificamos que cuando npm ejecute el script _test_, se cambiará al entorno de test y luego especificamos una bandera que indica, que si existe alguna operación pendiente que no deja que las pruebas terminen, la indique y así se puede determinar más fácilmente que operación obstaculiza la teminación de las pruebas. También sería posible especificar `--testTimeout=N` con N siendo un número en milisegundos, en caso que se necesite mas tiempo para la terminación de las pruebas.

### Pruebas

En la carpeta pruebas existe el archivo `user.test.js` en el cual se definen algunas pruebas relacionadas con la creación de nuevos usuarios así como el acceso e identificación en el sistema.

Un ejemplo a continuación en el que se trata de registrar un usuario con información incompleta, se realiza la petición al endpoint correspondiente "/api/auth/register" con el campo *name* vacío, y en la respuesta se espera un código 400 indicando que el registro no se ha podido realizar, un campo *error* con un mensaje que lee *User info should be complete*.

````javascript
describe("User Register Endpoints", () => {
    it("Should fail registering an user with information incomplete", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "",
      lastname: "Almeida Gilart",
      username: "juanalmeida",
      email: "juan@test.com",
      password: "almeidagilart10",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("User info should be complete");
  });
});
`````
