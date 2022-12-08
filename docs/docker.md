## Creación del contenedor para pruebas

### Empaquetado de la aplicación

La aplicación está compuesta por un runtime de NodeJs, sobre el cual se ejecutan varios servicios conformando la api que es la funcionalidad principal. Teniendo esto en cuenta, se define un `Dockerfile` en el cual se especifican las instrucciones para crear el contenedor de la aplicación.
A continuación una breve descripsión de las órdenes utilizadas:  
`FROM`: Se parte de una imagen de Node versión 16.14.1, última versión LTS disponible  
`WORKDIR`: luego se establece el directorio de trabajo, que será donde vivirá la aplicación  
`COPY`: se copia el archivo package.json en el cual están definidas todas las dependencias  
`RUN`: se utiliza para ejecutar una orden, en este caso instalar dependencias  
`COPY`: copia los archivos al contendor  
`ENTRYPOINT`: especifica el ejecutable que usará el contenedor, en este caso realizar las pruebas

```
FROM node:16.14.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT[ "npm", "run", "test" ]
```

Con la secuencia anterior el contenedor de la aplicación está listo, pero para que las pruebas se puedan realizar correctamente, se necesita de otro servicio como es la base de datos, en este caso se utiliza PostgresSql. Para orquestar una estructura que permita desplegar la aplicación además de un servicio de base de datos, se utiliza la herramienta `docker-compose`, en la cual se definen los servicios que son necesarios, así como la manera en la que estos pueden interactuar.

### Orquestando la infraestructura

Se define el archivo `docker-compose.yaml` de la siguiente manera:

```javascript
version: "3.8"
services:
  db_test:
    image: postgres
    environment:
      DATABASE_HOST: 127.0.0.1
      POSTGRES_PASSWORD: travelshare
      POSTGRES_USER: postgres
      POSTGRES_DB: test
    volumes:
      - /var/lib/postgresql/data_test
    ports:
      - "5431:5432"
  rest:
    build: ./travelshare_api
    ports:
      - "3000:3000"
    volumes:
      - ./travelshare_api:/app
      - /app/node_modules
    depends_on:
      - db_test
```

En el archivo `docker-compose` se definen los servicios que serán desplegados, dentro del tag **services**, en el cual se han definido tres servicios principales, cada uno corresponde a un contenedor diferente. Se han nombrado **db_test** y **rest**, para la base de datos de prueba y la api respectivamente.

### Descripción del servicio de base de datos:

`image`: se define la imagen que se va a utilizar, en este caso **postgres**  
`environment`: variables de entorno a utilizar por el contenedor  
`volumes`: persistencia de los datos utilizados por el contenedor  
`ports`: relación entre puertos del anfitrión y puertos expuestos por éste

### Descripción del servicio rest api:

`build`: se indica una carpeta en la cual existe un `Dockerfile` y se toma este como referencia para construir el contenedor  
`ports`: relación entre puertos del anfitrión y puertos expuestos por éste  
`volumes`: persistencia de los datos utilizados por el contenedor  
`depends_on`: se especifica que el contenedor depende de otro servicio
\

Con la configuración lista, se puede proceder a ejecutar la orden `docker-compose up` para ejecutar los servicios anteriormente mencionados y se obtiene la siguiente respuesta:  
\
![Tests](./img/docker_test.png)
\
\
En la imagen anterior se puede apreciar que se han realizado las pruebas correspondientes en el contenedor que se ha creado para ello.
