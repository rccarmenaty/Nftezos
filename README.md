# TravelShare

Repositorio para practica y proyecto de la asignatura "Cloud Computing" del Master en Ingenieria Informática de la Universidad de Granada, curso 22-23.

## Hito 3

### Contenedor para pruebas

En este hito se crea un entorno de pruebas utilizando contenedores, especificamente Docker. De acuerdo con la estructura con la que cuenta el presente proyecto, se necesita crear el contendor propio de la aplicación y además vincularlo con el contendor de la base de datos, que será una imagen de Postgres.

Para utilizar Docker en la plataforma Macos ARM64, se puede descargar el instalador existente para dicha arquitectura desde la pagina oficial, [aquí](https://docs.docker.com/desktop/install/mac-install/)

Para realizar la tareas corespondientes al hito, se han definido dos archivos principales, un `Dockerfile` y un `docker-compose` archivos en los cuáles quedan recogidas las instrucciones para crear el contenedor de la apliacación y las especificaciones del stack necesario para el funcionamiento de las pruebas respectivamente.

[Aquí](./docs/docker.md) se pueden ver en detalle los procedimientos realizados.
