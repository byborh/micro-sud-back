-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 04 fév. 2025 à 14:44
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


DROP TABLE IF EXISTS `auth_token`;
CREATE TABLE IF NOT EXISTS `auth_token` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `token` varchar(512) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  PRIMARY KEY (`id`),
  KEY `FK_auth_token_user` (`user_id`),
  CONSTRAINT `FK_auth_token_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Contraintes pour les tables déchargées
--

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

INSERT INTO permissions (id, action, resource, description) VALUES
('mN3bV7cX2zQ1wE4r', 'READ', 'USERS', 'Lire la liste des utilisateurs'),
('pL6oK9jI8hG7tF5d', 'CREATE', 'USERS', 'Créer un utilisateur'),
('aQ5sW8eR1tZ4vC9m', 'UPDATE', 'USERS', 'Mettre à jour un utilisateur'),
('eW3rT6yU8iK2lO7p', 'DELETE', 'USERS', 'Supprimer un utilisateur'),
('hK7jG5fD4sA2lK9o', 'READ', 'ROLES', 'Lire les rôles'),
('rT9yU8iO3pL2qW4e', 'MANAGE', 'ROLES', 'Gérer les rôles'),
('xZ1cV5bN7mM8kL2j', 'READ', 'PERMISSIONS', 'Lire les permissions'),
('dS8fG2hJ4kL9oP3q', 'MANAGE', 'PERMISSIONS', 'Gérer les permissions'),
('nM3bV7cX2zQ1wE4r', 'ACCESS', 'PRIVATE_DATA', 'Accéder aux données privées'),
('oL6pK9jI8hG7tF5d', 'MANAGE', 'SETTINGS', 'Gérer les paramètres');


INSERT INTO roles (id, name, description) VALUES
('qA5sW8eR1tZ4vC9m', 'ADMIN', 'Accès total à toutes les ressources'),
('wE3rT6yU8iK2lO7p', 'MANAGER', 'Gère les utilisateurs et les permissions avec certaines restrictions'),
('kH7jG5fD4sA2lK9o', 'USER', 'Accès limité aux ressources personnelles'),
('tR9yU8iO3pL2qW4e', 'GUEST', 'Accès uniquement aux endpoints publics');


INSERT INTO role_permission (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p WHERE r.name = 'ADMIN';


INSERT INTO role_permission (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p 
WHERE r.name = 'MANAGER' 
AND p.action IN ('READ', 'CREATE', 'UPDATE') 
AND p.resource IN ('USERS', 'ROLES', 'PERMISSIONS');


INSERT INTO role_permission (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p 
WHERE r.name = 'USER' 
AND p.action IN ('READ', 'ACCESS') 
AND p.resource IN ('USERS', 'PRIVATE_DATA');


INSERT INTO role_permission (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p 
WHERE r.name = 'GUEST' 
AND p.resource = 'USERS' 
AND p.action = 'READ';


