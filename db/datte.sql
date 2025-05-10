-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 07 fév. 2025 à 17:29
-- Version du serveur : 11.3.2-MariaDB
-- Version de PHP : 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `datte`
--

CREATE DATABASE datte;
USE datte;

-- --------------------------------------------------------

--
-- Structure de la table `auth_token`
--

DROP TABLE IF EXISTS `auth_token`;
CREATE TABLE IF NOT EXISTS `auth_token` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `token` varchar(512) NOT NULL,
  `createdAt` timestamp NOT NULL,
  `expiresAt` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_26b580c89e141c75426f44317b` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `auth_token`
--

INSERT INTO `auth_token` (`id`, `user_id`, `token`, `createdAt`, `expiresAt`) VALUES
('AmVLStKR6FLEp9PQ', 'WCN23fnqj1WSA4ti', 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJXQ04yM2ZucWoxV1NBNHRpIiwianRpIjoiQW1WTFN0S1I2RkxFcDlQUSIsImlhdCI6MTczODk0OTI0MywiZXhwIjoxNzM4OTUyODQzLCJyb2xlIjpbIjEyM3NXOGVSMXRaNFVTRVIiXX0.r1s3cgdygniEU_pifO0esk9QilAdsLDvHx8FvFH3WawzTJFRrkp5DvjMtIvilFWM6cgx2BIL19Ao5Z4mLJOGug', 1739993931566, 1739994031297),
('J80c50WnrZzsM9rm', 'Ttz6HOipLcc89syP', 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJUdHo2SE9pcExjYzg5c3lQIiwianRpIjoiSjgwYzUwV25yWnpzTTlybSIsImlhdCI6MTczODk0OTIwMCwiZXhwIjoxNzM4OTUyODAwLCJyb2xlIjpbIjEyM3NXOGVSMXRaNFVTRVIiXX0.dFgFWUDv7ctJXE9P_7jD0YpfuLVhi4hFqd70NSu9a5cNgHeArNO6EQtszLMd4kdpZw4rG6Wsy6WX1C66BURC7A', 1739993931566, 1739994031297);

-- --------------------------------------------------------

--
-- Structure de la table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` varchar(255) NOT NULL,
  `action` varchar(255) NOT NULL,
  `resource` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `permissions`
--

INSERT INTO `permissions` (`id`, `action`, `resource`, `description`) VALUES
('aQ5sW8eR1tZ4vC9m', 'UPDATE', 'USERS', 'Mettre à jour un utilisateur'),
('dS8fG2hJ4kL9oP3q', 'MANAGE', 'PERMISSIONS', 'Gérer les permissions'),
('eW3rT6yU8iK2lO7p', 'DELETE', 'USERS', 'Supprimer un utilisateur'),
('hK7jG5fD4sA2lK9o', 'READ', 'ROLES', 'Lire les rôles'),
('mN3bV7cX2zQ1wE4r', 'READ', 'USERS', 'Lire la liste des utilisateurs'),
('nM3bV7cX2zQ1wE4r', 'ACCESS', 'PRIVATE_DATA', 'Accéder aux données privées'),
('oL6pK9jI8hG7tF5d', 'MANAGE', 'SETTINGS', 'Gérer les paramètres'),
('pL6oK9jI8hG7tF5d', 'CREATE', 'USERS', 'Créer un utilisateur'),
('rT9yU8iO3pL2qW4e', 'MANAGE', 'ROLES', 'Gérer les rôles'),
('xZ1cV5bN7mM8kL2j', 'READ', 'PERMISSIONS', 'Lire les permissions');

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_648e3f5447f725579d7d4ffdfb` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`) VALUES
('123sW8eR1tZ4USER', 'USER', 'Just a chill user'),
('qA5sW8eR1tZ4vC9m', 'ADMIN', 'Accès total à toutes les ressources'),
('wE3rT6yU8iK2lO7p', 'MANAGER', 'Gère les utilisateurs et les permissions avec certaines restrictions');

-- --------------------------------------------------------

--
-- Structure de la table `role_permission`
--

DROP TABLE IF EXISTS `role_permission`;
CREATE TABLE IF NOT EXISTS `role_permission` (
  `role_id` varchar(255) NOT NULL,
  `permission_id` varchar(255) NOT NULL,
  PRIMARY KEY (`role_id`,`permission_id`),
  KEY `FK_e3a3ba47b7ca00fd23be4ebd6cf` (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `role_permission`
--

INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES
('qA5sW8eR1tZ4vC9m', 'aQ5sW8eR1tZ4vC9m'),
('wE3rT6yU8iK2lO7p', 'aQ5sW8eR1tZ4vC9m'),
('qA5sW8eR1tZ4vC9m', 'dS8fG2hJ4kL9oP3q'),
('qA5sW8eR1tZ4vC9m', 'eW3rT6yU8iK2lO7p'),
('qA5sW8eR1tZ4vC9m', 'hK7jG5fD4sA2lK9o'),
('wE3rT6yU8iK2lO7p', 'hK7jG5fD4sA2lK9o'),
('qA5sW8eR1tZ4vC9m', 'mN3bV7cX2zQ1wE4r'),
('wE3rT6yU8iK2lO7p', 'mN3bV7cX2zQ1wE4r'),
('qA5sW8eR1tZ4vC9m', 'nM3bV7cX2zQ1wE4r'),
('qA5sW8eR1tZ4vC9m', 'oL6pK9jI8hG7tF5d'),
('qA5sW8eR1tZ4vC9m', 'pL6oK9jI8hG7tF5d'),
('wE3rT6yU8iK2lO7p', 'pL6oK9jI8hG7tF5d'),
('qA5sW8eR1tZ4vC9m', 'rT9yU8iO3pL2qW4e'),
('qA5sW8eR1tZ4vC9m', 'xZ1cV5bN7mM8kL2j'),
('wE3rT6yU8iK2lO7p', 'xZ1cV5bN7mM8kL2j');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `pseudo` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `tel_number` varchar(255) DEFAULT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`data`)),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `pseudo`, `email`, `password`, `salt`, `createdAt`, `updatedAt`, `tel_number`, `data`) VALUES
('Ttz6HOipLcc89syP', NULL, NULL, NULL, 'emilia@clarke.com', 'de3cd3d7e14dd319c87fcbde3b31552152f25e5d796e54fbe2e14014a1e9ed70b2d29c7686c2958fc874744130344c3904eb18f483068e9512c4579b541388ce', 'TlawJCrqqMKWls30', '2025-02-07 17:26:40.458590', '2025-02-07 17:26:40.458590', NULL, NULL),
('WCN23fnqj1WSA4ti', NULL, NULL, NULL, 'admin@dmin.com', 'a589b0f038c04b8927f45a672b98d147437b52578c717d4217d23199c8c81e57855b5a703aabbf63d47847a710617b17363ecbcfa86fa82bc301ea23ca7d4c6a', 'LXnP9xPT0l7cCsEi', '2025-02-07 17:27:23.025238', '2025-02-07 17:27:23.025238', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
CREATE TABLE IF NOT EXISTS `user_role` (
  `user_id` varchar(255) NOT NULL,
  `role_id` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FK_32a6fc2fcb019d8e3a8ace0f55f` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user_role`
--

INSERT INTO `user_role` (`user_id`, `role_id`) VALUES
('Ttz6HOipLcc89syP', '123sW8eR1tZ4USER'),
('WCN23fnqj1WSA4ti', '123sW8eR1tZ4USER'),
('WCN23fnqj1WSA4ti', 'qA5sW8eR1tZ4vC9m'),
('WCN23fnqj1WSA4ti', 'wE3rT6yU8iK2lO7p');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `auth_token`
--
ALTER TABLE `auth_token`
  ADD CONSTRAINT `FK_26b580c89e141c75426f44317bc` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Contraintes pour la table `role_permission`
--
ALTER TABLE `role_permission`
  ADD CONSTRAINT `FK_3d0a7155eafd75ddba5a7013368` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_e3a3ba47b7ca00fd23be4ebd6cf` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Contraintes pour la table `user_role`
--
ALTER TABLE `user_role`
  ADD CONSTRAINT `FK_32a6fc2fcb019d8e3a8ace0f55f` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_d0e5815877f7395a198a4cb0a46` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
