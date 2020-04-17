# Project-1

Documentation for project-1 Covid-19 API

module Authentification :

    - (Post) http://localhost:8080/auth/signin - body : email (string) / password(4 length +) (string) / firstName (string) / lastName (string) --> Route d'inscription
    - (Post) http://localhost:8080/auth/login - body : email (string) / password (string) --> Route de Login
    - (Post) http://localhost:8080/auth/postEmail - body : email (string) / client_id (string) --> Route d'inscription pour Oauth (non implémenté coté front)
    -- Ces méthodes retournent un JWT token qui peut être utilisé pour sécurisé l'accès aux routes de l'API

module Utilisateur :

    - (Get) http://localhost:8080/users/ --> Get tous les utilisateurs en base
    - (Get) http://localhost:8080/users/:userId - params : 'userID' type number --> Get un utilisateur par son userID
    - (Delete) http://localhost:8080/users/delete - body : userID (number) --> Delete un utilisateur par son userID
    - (Put) http://localhost:8080/users/:userId - params : 'userID' (number) - body : email (string) / password(4 length +) (string) / firstName (string) / lastName (string) --> Update un utilisateur par son userID
    - (Post) http://localhost:8080/users/saveSettingsUser/:id - params : 'userID' (number) - body : type (string) / options (string) --> Sauvegarder les préférences d'un utilisateur en base par son userID
    - (Get) http://localhost:8080/users/settingsForUser/:id - params : 'userID' (number) --> Get toutes les préférences d'un utilisateur en base par son userID
    - (Put) http://localhost:8080/users/updateSettingsUser/:userId/:settingsId - params : 'userID' (number) 'settingsID' (number) - body : type (string) / options (string) --> Update un settings d'un utilisateur en base par son userID et l'ID du settings a modifier