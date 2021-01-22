@echo off
echo *** make private key ***
openssl genrsa -out private-key.pem 2048

echo.
echo *** make certificate ***
openssl req -new -x509 -days 365 -key private-key.pem -config configuration.cnf -out certificate.pem

echo.
echo *** move to project folder ***
move *.pem c:\nodelab\server\board

pause