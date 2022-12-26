FROM alpine:3.16

ENV PGDATA="/var/lib/postgresql/data"
RUN apk upgrade bash
RUN apk add nodejs npm

# ENV DATABASE_HOST: 127.0.0.1
# ENV POSTGRES_PASSWORD: postgres
# ENV POSTGRES_USER: postgres
# ENV POSTGRES_DB: travelshare

RUN apk update

RUN apk add postgresql

RUN (addgroup -S postgres && adduser -S postgres -G postgres || true)

RUN mkdir -p /var/lib/postgresql/data

RUN mkdir -p /run/postgresql/

RUN chown -R postgres:postgres /run/postgresql/

RUN chmod -R 777 /var/lib/postgresql/data

RUN chown -R postgres:postgres /var/lib/postgresql/data

COPY script.sh .

RUN chmod +x script.sh

USER postgres:postgres

RUN initdb

RUN ./script.sh

WORKDIR /app/test

COPY . .

ENTRYPOINT [ "npm", "run", "test" ]