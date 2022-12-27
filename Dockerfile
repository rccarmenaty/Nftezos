FROM alpine:3.16

ENV PGDATA="/var/lib/postgresql/data"

RUN apk upgrade bash

RUN apk add nodejs npm

RUN apk update

RUN apk add postgresql

RUN (addgroup -S postgres && adduser -S postgres -G postgres || true)

RUN mkdir -p /var/lib/postgresql/data

RUN mkdir -p /run/postgresql/

RUN chown -R postgres:postgres /run/postgresql/

RUN chown -R postgres:postgres /var/lib/postgresql/data

RUN chmod -R 0700 /var/lib/postgresql/data

WORKDIR /app/test

COPY script.sh .

RUN chmod +x script.sh

COPY package*.json ./

RUN npm install

USER postgres:postgres

RUN initdb

RUN ./script.sh

COPY . .

ENTRYPOINT [ "npm", "run", "docker_test" ]