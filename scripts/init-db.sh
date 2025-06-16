#!/bin/bash
echo "Waiting for MSSQL to be available..."
sleep 20
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong!Passw0rd -Q "CREATE DATABASE TestDB;"
echo "Database TestDB created."