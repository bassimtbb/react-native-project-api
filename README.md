# 🏰 Disney Explorer App

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/EXPO-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Axios](https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white)

Une application mobile performante développée avec **React Native (Expo)** et **TypeScript** permettant d'explorer les personnages de l'univers Disney via l'API officielle ([Disney API](https://disneyapi.dev/)). L'application offre des fonctionnalités avancées telles que la recherche optimisée et le scroll infini.

---

## ✨ Fonctionnalités

- 📱 **Affichage dynamique** : Liste des personnages avec images et noms.
- 🔁 **Pagination (Scroll Infini)** : Chargement automatique des pages suivantes lors du défilement.
- 🔍 **Recherche Optimisée** : Filtrage par nom avec système de debounce pour limiter les appels réseau inutiles.
- 🧭 **Navigation Fluide** : Passage intuitif de la liste vers une fiche détaillée complète du personnage.

---

## 🛠️ Stack Technique

- **Framework** : React Native (Expo)
- **Langage** : TypeScript
- **Client HTTP** : Axios
- **Routage** : React Navigation

---

## 👥 L'Équipe et Répartition des Tâches

| Étudiant | Rôle principal | Tâches clés |
|----------|---------------|-------------|
| **Bassim TABBEB** | Architecte API et Typage | Analyse API, Interfaces TypeScript, Service Axios & Intercepteurs. |
| **Celia MERABET** | Lead UI & Navigation | Configuration React Navigation, Écran de Détail, Transit de données. |
| **Mohamed BOUYABRI** | Lead Frontend | Écran de Liste, Scroll Infini (Pagination), Barre de recherche avec Debounce. |

---

## 📁 Structure du Projet

L'architecture du code source (`src/`) est organisée de manière modulaire :

```text
src/
├── components/   # Composants réutilisables (Cartes, Barres de recherche, Loaders)
├── screens/      # Écrans principaux de l'application (Home, Details)
├── services/     # Configuration d'Axios, intercepteurs et appels API
└── types/        # Interfaces et types TypeScript (Modèles de données, Navigation)
```

---

## 🚀 Installation et Lancement

1. **Cloner le projet** (si ce n'est pas déjà fait) :
   ```bash
   git clone <url-du-repo>
   cd mini-projet-react-API
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Lancer l'application** :
   ```bash
   npx expo start
   ```

Une fois le serveur Expo lancé, scannez le QR code avec l'application **Expo Go** (iOS / Android) sur votre téléphone, ou appuyez sur `a` / `i` pour lancer un émulateur.
