#!/bin/sh

pg_ctl start
psql -c "ALTER USER postgres WITH ENCRYPTED PASSWORD 'postgres';"
psql -c "CREATE DATABASE travelshare;"
pg_ctl stop