
# 🍃 Datte Project

Bienvenue dans **Datte**, une application modulaire et robuste conçue pour offrir des solutions complètes et flexibles pour la gestion des utilisateurs, des rôles, des droits et des ventes. Ce projet est construit avec une architecture claire et modulaire pour assurer une scalabilité et une maintenabilité optimale.

---

## 📁 Structure du projet

```
src/
└── users/
|    ├── controller/
|    ├── service/
|    └── repository/
|    └── .../      # Autres gestions
└── tests/
    ├── controller/
    |    └── .../
    └── service/
        └── .../
```

---

## 🛠️ Modules principaux - MVP (Minimum Viable Product)

### 1️⃣ **Module Utilisateur et Authentification**
- 🔐 Gestion complète des utilisateurs : inscription, connexion, déconnexion et suppression.
- 🔑 Authentification robuste : mots de passe sécurisés, jetons JWT, authentification à deux facteurs.
- 👤 Gestion des profils personnalisables : langues, notifications, préférences.
- ⚙️ Rôles et permissions intégrés avec le module Rôle/Droit.
- 🔔 Notifications de sécurité et gestion avancée des mots de passe.

---

## 📐 Design Patterns appliqués pour le MVP

- **Factory Method** : Création de rôles, utilisateurs et profils.
- **Strategy** : Calcul des frais de livraison, gestion des réductions.
- **Decorator** : Enrichissement des résumés de commande et gestion des profils.
- **Observer** : Suivi des événements de commandes et alertes de sécurité.
- **Composite** : Gestion hiérarchique des équipes.
- **Template Method** : Processus standardisés extensibles.

---

## ⚙️ Prérequis

- express 4.21
- ts-node 10.9
- typescript 5.7

---

## 🚀 Lancer le projet

1. **Cloner le dépôt** :
    ```bash
    git@gitlab.com:datte-company/datte-node.git
    cd datte-node
    ```

2. **Compiler et exécuter** :
    ```bash
    npm install
    npm run start
    ```

3. **Accéder à l'application** :
    - URL par défaut : [http://localhost:3000/api/v1.0.0](http://localhost:3000/api/v1.0.0)

---

## 🖥️ Endpoints principaux pour le MVP

| Méthode | Endpoint                                | Description                                           |
|---------|-----------------------------------------|-------------------------------------------------------|
| **Utilisateurs**                                                                                          |
| POST    | `/users/register`                       | Inscrire un nouvel utilisateur                        |
| POST    | `/users/login`                          | Authentifier un utilisateur (connexion)               |
| GET     | `/users`                                | Récupérer la liste de tous les utilisateurs           |
| GET     | `/users/{id}`                           | Récupérer les détails d'un utilisateur spécifique     |
| POST    | `/users`                                | Créer un nouvel utilisateur                           |
| PUT     | `/users/{id}`                           | Mettre à jour les informations d'un utilisateur       |
| DELETE  | `/users/{id}`                           | Supprimer un utilisateur                              |
|---------|-----------------------------------------|-------------------------------------------------------|
| **Adresses**                                                                                              |
| POST    | `/address`                              | Créer une adresse                                     |
| GET     | `/address/{id}`                         | Récupérer une adresse par ID                          |
| PUT     | `/address/{id}`                         | Mettre à jour une adresse                             |
| DELETE  | `/address/{id}`                         | Supprimer une adresse                                 |
| POST    | `/users/{userId}/address`               | Associer une adresse à un utilisateur                 |
| POST    | `/companies/{companyId}/address`        | Associer une adresse à une entreprise                 |
|---------|-----------------------------------------|-------------------------------------------------------|
| **Rôles et Permissions**                                                                                  |
| GET     | `/roles`                                | Liste des rôles disponibles                           |
| POST    | `/roles`                                | Créer un nouveau rôle                                 |
| POST    | `/users/{userId}/roles/{roleId}`        | Assigner un rôle à un utilisateur                     |
| DELETE  | `/users/{userId}/roles/{roleId}`        | Retirer un rôle d'un utilisateur                      |
|---------|-----------------------------------------|-------------------------------------------------------|
| **Genres**                                                                                                |
| POST    | `/genders`                              | Ajouter un genre                                      |
| GET     | `/genders/{id}`                         | Récupérer les détails d'un genre                      |
| PUT     | `/genders/{id}`                         | Modifier un genre                                     |
| DELETE  | `/genders/{id}`                         | Supprimer un genre                                    |
|---------|-----------------------------------------|-------------------------------------------------------|
| **Postes (Métiers)**                                                                                      |
| POST    | `/positions`                            | Ajouter un poste (métier)                             |
| GET     | `/positions`                            | Récupérer la liste des postes                         |
| GET     | `/positions/{id}`                       | Récupérer les détails d'un poste spécifique           |
| PUT     | `/positions/{id}`                       | Modifier un poste                                     |
| DELETE  | `/positions/{id}`                       | Supprimer un poste                                    |
|---------|-----------------------------------------|-------------------------------------------------------|
| **Entreprises**                                                                                           |
| POST    | `/companies`                            | Créer une entreprise                                  |
| GET     | `/companies`                            | Récupérer la liste des entreprises                    |  
| GET     | `/companies/{id}`                       | Récupérer les détails d'une entreprise                |
| PUT     | `/companies/{id}`                       | Modifier une entreprise                               |
| DELETE  | `/companies/{id}`                       | Supprimer une entreprise                              |


---

## 👨‍💻 Contributeurs
- **Kazakh** - Développeur principal
- **Kazakh** - Architecte logicielle
- **Kazakh** - Responsable des tests
- **Kazakh** - La personne qui se prend tout le travail

---

## 📝 License

Ce projet n'est pas sous licence MIT (MAIS BIENTÖT). Donc ne consultez pas le fichier `LICENSE` pour ne pas voir plus d'informations, qui n'existent pas.

---

## 🌟 Remerciements

Un grand merci à tous les contributeurs et testeurs pour leur aide précieuse (donc, qu'à moi pour le moment) 😘 !

---
