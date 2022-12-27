# TravelShare

Repositorio para práctica y proyecto de la asignatura "Cloud Computing" del Master en Ingeniería Informática de la Universidad de Granada, curso 22-23.

---

## Hito 0

Documentación inicial sobre el proyecto a desarrollar, descripción del problema y configuración inicial de Git y Github, ver más [aquí](https://github.com/rccarmenaty/TravelShare/tree/hito0).

---

## Hito 1

### Concretando y planificando el proyecto.

En este hito, como resultado de la planificación del proyecto, se definen las historias de usuario así como milestones que serán la guía del desarrollo, ver más [aquí](https://github.com/rccarmenaty/TravelShare/tree/hito1).

---

## Hito 2

### Tests

En este hito se define el entorno que permite realizar las pruebas de software y se dejan establecidas varios tests que alcanzan una parte de la funcionalidad del proyecto, ver más [aquí](https://github.com/rccarmenaty/TravelShare/tree/hito2).

---

## Hito 3

### Contenedor para pruebas

En este hito se crea un entorno de pruebas utilizando contenedores, especificamente Docker. Se decide realizar dos implementaciones de un contenedor de Docker, uno en el que se parte de una imagen de la distro Alpine y sobre esta se ejecutan todos los servicios y se empaqueta la aplicación utilizando un `Dockerfile` como se muestra [aquí](https://github.com/rccarmenaty/TravelShare/tree/hito3), y luego se decide orquestar una infraestructura utlizando un contenedor de la base de datos de Postgres y orquestando todo con `docker-compose`, esta implementación se puede ver [aquí](https://github.com/rccarmenaty/TravelShare/tree/hito3.1).

## Hito 4

### Integración continua

En este hito se realizan la configuración necesaria para llevar a cabo la integración continua. Para ello se ha utilizado Travis y Github Actions.
Para mas detalle ver [aquí](https://github.com/rccarmenaty/TravelShare/tree/hito4).
