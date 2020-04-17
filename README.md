# Project-1

Documentation for project-1 Covid-19 API

module Authentification :

    - (Post) http://localhost:8080/auth/signin - body : email (string) / password(4 length +) (string) / firstName (string) / lastName (string) --> Route d'inscription
    - (Post) http://localhost:8080/auth/login - body : email (string) / password (string) --> Route de Login
    - (Post) http://localhost:8080/auth/postEmail - body : email (string) / client_id (string) --> Route d'inscription pour Oauth (non implémenté coté front)