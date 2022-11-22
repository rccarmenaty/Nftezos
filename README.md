# TravelShare

Repositorio para practica y proyecto de la asignatura "Cloud Computing" del Master en Ingenieria Informática de la Universidad de Granada, curso 22-23.

## Hito 2

### Tests

En este hito se define el entorno que permite realizar las pruebas de software y se dejan establecidas varios tests que alcanzan una parte de la funcionalidad del proyecto.

Se decide utlizar **Jest** como testing framework, con el cual se obtiene también la parte correspondiente a la biblioteca de aserciones (matchers), evitando así tener que instalar otras bibliotecas externas como en el caso de **Mocha** que generalmente se utiliza con **Chai**.

**Jest** también funciona como test runner, capaz de ejecutar todas las pruebas escritas e informar sobre el resultado.
Como complemento se utiliza la bibioteca **Supertest** que proporciona una abstracción de alto nivel para probar HTTP y con ello poder verificar el funcionamiento de la api REST.

Se ha incluido en esta etapa, para facilitar la realización de pruebas y no intervenir con el entorno de desarrollo, la biblioteca **cross-env**, que permite fácilmente cambiar de entornos y así por ejemplo cuando se realizan las pruebas se utiliza una base de datos de prueba, evitando conflictos e inconsistencias en los datos empleados en las diferentes bases de datos.

Las pruebas a escribir estarán situadas en una carpeta llamada test en la raíz del proyecto, y cada archivo que contega pruebas deberá terminar con la extensión `test.js`, como lo indica la metodología de trabajo del framework.

[Aquí](./docs/pruebas.md) se puede ver de manera mas detallada el procedimiento de instalación y configuración del entorno de pruebas, así como algunas pruebas realizadas.
