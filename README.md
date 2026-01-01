# API Nations

## Compétences acquises

L'objectif de ce projet était de concevoir une API robuste pour l'association l'ANNA, permettant de manipuler et de diffuser des données géographiques complexes (basées sur le standard countries.json) tout en garantissant un haut niveau de sécurité.

Architecture d'API et Transformation de Données
Nous avons appris à structurer une API capable de fournir différentes "vues" d'une même ressource selon les besoins de l'utilisateur. Nous avons implémenté trois niveaux de précision pour les données des pays :

Version Full : l'intégralité des données disponibles.

Version Normal : une sélection équilibrée (nom, devises, langues, capitales, population).

Version Short : un format ultra-léger pour des listes rapides (nom, codes ISO, drapeau).

## Sécurisation et Gestion des Accès

La sécurité étant une priorité absolue pour ce projet, nous avons mis en œuvre des mécanismes d'authentification et de gestion de sessions par cookies. Nous avons développé un système de contrôle d'accès (RBAC) permettant à un administrateur de gérer une liste de personnes autorisées, les seules capables de modifier les informations de la base de données.

## Qualité logicielle et Veille Cyber

Ce projet nous a permis de consolider nos bonnes pratiques de développement professionnel :

Code Propre : Utilisation rigoureuse de routeurs et de middlewares pour un code modulaire et maintenable.

Tests Automatisés : Mise en place de tests unitaires et fonctionnels pour assurer la fiabilité des endpoints.

Sensibilisation à la Cybersécurité : Intégration de protections contre les vulnérabilités courantes (comme les injections SQL) et réflexion sur les besoins de sécurité globaux d'une application.
