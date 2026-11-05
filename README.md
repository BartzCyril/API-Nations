# API Nations — conteneurisation et déploiement Kubernetes

> Une API REST de données sur les pays du monde et son interface React, conteneurisées avec Docker, publiées automatiquement sur Docker Hub et déployées sur Kubernetes avec mise à jour progressive (rolling update).

![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?logo=kubernetes&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=githubactions&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?logo=nginx&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)

## Sujet

Projet de formation centré sur l'**infrastructure**. Le point de départ est une application existante, développée par Alexis Metton lors d'une évaluation : une API Express qui diffuse les données de `countries.json` pour l'association ANNA, et son interface React. Mon travail a consisté à rendre cette application déployable et scalable :

1. Réorganiser le dépôt en deux services (`backend/`, `frontend/`) et écrire leurs **Dockerfiles**
2. Automatiser la construction et la publication des images sur **Docker Hub** avec **GitHub Actions**
3. Écrire les manifestes **Kubernetes** (Deployments + Services), avec une variante en **rolling update**

## L'application déployée

- **3 niveaux de détail** pour les pays : `/full` (toutes les données), `/normal` (nom, devises, langues, capitale, population…), `/short` (nom, codes ISO, drapeau)
- **Recherche** de pays
- **Authentification JWT** et **contrôle d'accès par rôle** : un administrateur gère la liste des personnes autorisées, seules capables de modifier les données des pays
- **Tests** unitaires et fonctionnels avec Jest et Supertest

## Infrastructure

```
GitHub (push sur main)
   └── GitHub Actions : build des images backend et frontend, push sur Docker Hub
                                   │
Kubernetes                         ▼
   ├── Deployment backend   (3 réplicas)  → Service ClusterIP (interne)
   └── Deployment frontend  (3 réplicas)  → Service LoadBalancer (port 80, exposé)
```

| Fichier | Rôle |
| --- | --- |
| `backend/Dockerfile` | Image Node.js de l'API |
| `frontend/Dockerfile` | Build multi-étapes : compilation React avec Node, puis service des fichiers statiques par Nginx |
| `.github/workflows/docker-image.yml` | Build et push des deux images sur Docker Hub (Buildx, QEMU) |
| `backend-deployment.yaml`, `frontend-deployment.yaml` | Déploiement de base : 3 réplicas par service |
| `rolling-update-*-deployment.yaml` | Même déploiement avec stratégie `RollingUpdate` (`maxSurge: 1`) pour mettre à jour sans interruption |

## Compétences acquises

- **Docker** : écriture de Dockerfiles, build multi-étapes pour alléger l'image du front (Nginx)
- **CI/CD** : pipeline GitHub Actions qui construit et publie les images, gestion des secrets (identifiants Docker Hub)
- **Kubernetes** : Deployments, réplicas, Services `ClusterIP` vs `LoadBalancer`
- **Déploiement sans interruption** avec la stratégie de rolling update
- **Haute disponibilité** : plusieurs réplicas de chaque service derrière un Service Kubernetes
- **Lecture et reprise** d'un projet existant écrit par quelqu'un d'autre

## Lancer le projet

### Avec Docker

```bash
docker build -t api-nations-back ./backend
docker build -t api-nations-front ./frontend
```

### Sur Kubernetes (Minikube, kind…)

```bash
kubectl apply -f backend-deployment.yaml -f frontend-deployment.yaml
# ou, pour la stratégie de mise à jour progressive :
kubectl apply -f rolling-update-backend-deployment.yaml -f rolling-update-frontend-deployment.yaml
kubectl get pods,services
```

### En local, sans conteneur

```bash
cd backend/app
cp .env.example .env     # renseigner PORT, JWT_SECRET, URL_ORIGIN
npm install
npm run dev
npm test

cd ../../frontend/app
npm install
npm start
```
