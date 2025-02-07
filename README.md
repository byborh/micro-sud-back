# 🍃 Datte : La Fondation de Demain

Bienvenue sur **Datte-MVP**, la première pierre d'une révolution (pas autant quand même, mais oui sinon) dans l'univers des API modulables !  
Ici, vous découvrez une plateforme back-end générique et extensible, pensée pour s'adapter à une multitude de projets : gestion de contenu, e-commerce, prise de rendez-vous, et bien plus encore. Son objectif est d'arriver à être modulable pour tout type d'API.
**Attention :** Il s'agit d'un MVP (Minimum Viable Product), une base qui pose les fondations de Datte, mais qui reste en phase d'expérimentation pour l'instant. 🚀

---

## 🚀 Pourquoi Choisir Datte-MVP ?

- **Modularité Totale** : Chaque fonctionnalité est (DEVRAIT ETRE) un module indépendant, vous permettant d'ajouter, modifier ou supprimer des composants sans perturber l'ensemble.
- **Architecture Épurée** : Conçu selon des design patterns éprouvés et en respectant rigoureusement les principes SOLID, pour un code à la fois propre, maintenable et évolutif.
- **Technologies Modernes** : Fonctionne avec MySQL et TypeORM, garantissant une gestion efficace des données et une intégration fluide dans vos projets.
- **Vision d'Avenir** : Ce MVP n'est que le début. Il pose la base sur laquelle Datte-Core 1 viendra ajouter des fonctionnalités innovantes.

---

## 🗂️ Structure du Projet

L'organisation du code a été pensée pour être intuitive et évolutive :

```
src/
├── modules/          # Modules fonctionnels (utilisateurs, produits, etc.)
├── config/           # Configurations environnementales et de connexion (BDD, etc.)
└── repositories/     # Accès aux données via MySQL et TypeORM
...

```

Chaque dossier a pour but de faciliter l'ajout de nouvelles fonctionnalités tout en maintenant une séparation claire des responsabilités.

---

## 💡 Fonctionnalités Clés du MVP

### 1️⃣ Gestion Utilisateurs & Authentification
- **Inscription & Connexion Sécurisées** : Authentification par tokens JWT, gestion des sessions et sécurité avancée.
- **Profils Personnalisables** : Paramétrez les préférences, notifications et langues pour une expérience utilisateur sur-mesure.
- **Rôles & Permissions Intégrés** : Un module dédié assure une gestion fine et hiérarchisée des accès.

### 2️⃣ Intégration Technique Performante
- **Base de Données** : Utilisation native de MySQL avec TypeORM pour une gestion relationnelle robuste.
- **Design Patterns Appliqués** : Factory, Strategy, Observer, et bien d'autres, pour un code organisé et prêt à évoluer.
- **Respect des Principes SOLID** : Un engagement total pour un code modulaire, facile à maintenir et à développer.

---

## 🔮 Prochaines Évolutions : Datte-Core 1

L'aventure ne fait que commencer ! La prochaine version, **Datte-Core 1**, viendra enrichir la plateforme avec des fonctionnalités inédites :

- **Module IA Innovant** : Des endpoints dédiés permettront bientôt d'interagir avec une intelligence artificielle, ouvrant la voie à des conversations intelligentes et automatisées 🤖.
- **Support Multi-BDD** : Outre MySQL, vous aurez le choix d'utiliser MongoDB ou Redis dès l'installation, pour une flexibilité maximale selon vos besoins.
- **Modules Avancés pour l'E-commerce** : Gestion complète des produits, intégrant achats, ventes, gestion des paniers, et bien plus encore, pour transformer votre projet en une solution e-commerce intégrée.
- **Installation Personnalisée** : Un processus d'installation interactif vous permettra de choisir la base de données qui vous convient, optimisant ainsi l'usage de la plateforme dès le départ.

---

## 🛠️ Prérequis & Installation

### Prérequis
- **Node.js** (version recommandée 14+)
- **npm** ou **yarn**
- **MySQL** installé et configuré

### Installation

1. **Clonez le dépôt :**
   ```bash
   git clone LIEN-DE-MON-GIT
   cd datte-node
   ```

2. **Installez les dépendances :**
   ```bash
   npm install
   ```

3. **Démarrez l'application :**
   ```bash
   npm run datte
   ```

4. **Accédez à l'API :**  
   Rendez-vous sur [http://localhost:3000/api/v1.0.0](http://localhost:3000/api/v1.0.0) pour explorer les endpoints.

---

## 📊 Aperçu des Endpoints

Pour vous donner une idée, voici quelques endpoints clés disponibles dès maintenant :

- **Utilisateurs :**
  - Inscription : `/users`
  - Connexion : `/users/login`

- **Rôles & Permissions :**
  - Gestion des rôles : `/roles`
  - Attribution des rôles aux utilisateurs via `/users/{userId}/roles/{roleId}`

*Pour une liste complète des endpoints, veuillez consulter la documentation intégrée dans le code.*

---

## 🔐 Sécurisation par JWT

Pour garantir une sécurité optimale, tous nos endpoints sont protégés par des tokens JWT signés avec l'algorithme **ES256**. Voici ce que cela implique :

- 🗝️ **Clé Privée** : Utilisée pour signer et générer les tokens.
- 🔓 **Clé Publique** : Fournie dans le fichier `ec_public.pem`, elle permet de valider les signatures.

> **Important :** Assurez-vous de générer ces clés à l'aide d'outils cryptographiques fiables pour garantir l'intégrité et la sécurité de l'authentification.

---

## 👥 Contributeurs

- **Kazakh** - Développeur Principal & Architecte
- **Kazakh** - Responsable des Tests & Gestion de Projet
- **Kazakh** - L'esprit créatif derrière Datte

---

## 📜 License

Ce projet est actuellement en phase de développement et n'est pas encore sous licence MIT. Les modalités d'utilisation seront définies dans une prochaine version.

---

## 🙏 Remerciements

Un grand merci à tous les moi et les moi qui font vivre ce projet. Votre (mon) soutien et vos (mes) retours sont essentiels pour faire évoluer Datte vers de nouveaux horizons ! 💖

---

*Rejoignez l'aventure Datte et participez à la révolution des API modulables – ensemble, construisons le futur (ou pas... qui sait) !*
```