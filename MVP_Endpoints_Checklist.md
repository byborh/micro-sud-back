
# API Endpoints Checklist

| Méthode | Endpoint | Description | Complété |
|---------|----------|-------------|----------|
| **Utilisateurs** | | | |
| POST | /users/register | Inscrire un nouvel utilisateur | [ ] |
| POST | /users/login | Authentifier un utilisateur (connexion) | [ ] |
| GET | /users | Récupérer la liste de tous les utilisateurs | [✅] |
| GET | /users/{id} | Récupérer les détails d'un utilisateur spécifique | [✅] |
| POST | /users | Créer un nouvel utilisateur | [ ] |
| PUT | /users/{id} | Mettre à jour les informations d'un utilisateur | [ ] |
| DELETE | /users/{id} | Supprimer un utilisateur | [ ] |
| **Adresses** | | | |
| POST | /address | Créer une adresse | [ ] |
| GET | /address/{id} | Récupérer une adresse par ID | [ ] |
| PUT | /address/{id} | Mettre à jour une adresse | [ ] |
| DELETE | /address/{id} | Supprimer une adresse | [ ] |
| POST | /users/{userId}/address | Associer une adresse à un utilisateur | [ ] |
| POST | /companies/{companyId}/address | Associer une adresse à une entreprise | [ ] |
| **Rôles et Permissions** | | | |
| GET | /roles | Liste des rôles disponibles | [ ] |
| POST | /roles | Créer un nouveau rôle | [ ] |
| POST | /users/{userId}/roles/{roleId} | Assigner un rôle à un utilisateur | [ ] |
| DELETE | /users/{userId}/roles/{roleId} | Retirer un rôle d'un utilisateur | [ ] |
| **Genres** | | | |
| POST | /genders | Ajouter un genre | [ ] |
| GET | /genders/{id} | Récupérer les détails d'un genre | [ ] |
| PUT | /genders/{id} | Modifier un genre | [ ] |
| DELETE | /genders/{id} | Supprimer un genre | [ ] |
| **Postes (Métiers)** | | | |
| POST | /positions | Ajouter un poste (métier) | [ ] |
| GET | /positions | Récupérer la liste des postes | [ ] |
| GET | /positions/{id} | Récupérer les détails d'un poste spécifique | [ ] |
| PUT | /positions/{id} | Modifier un poste | [ ] |
| DELETE | /positions/{id} | Supprimer un poste | [ ] |
| **Entreprises** | | | |
| POST | /companies | Créer une entreprise | [ ] |
| GET | /companies | Récupérer la liste des entreprises | [ ] |
| GET | /companies/{id} | Récupérer les détails d'une entreprise | [ ] |
| PUT | /companies/{id} | Modifier une entreprise | [ ] |
| DELETE | /companies/{id} | Supprimer une entreprise | [ ] |
