# AutoDépenses

![image](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![image](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![image](https://img.shields.io/badge/VITE-323330?style=for-the-badge&logo=vite&logoColor=white)
![image](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=FFFFFF)
![image](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=FFFFFF)

## 🌦️ Présentation

AutoDépenses est une application web en cours de développement visant à centraliser et suivre facilement toutes les dépenses liées à mes véhicules : carburant, entretien, réparations, accessoires, et plus encore. L’objectif est d’offrir une vision claire de l’historique des coûts et d’aider à mieux anticiper les dépenses futures.  

Le projet est construit en deux volets complémentaires :   
 
1. Frontend — Gestion locale et interface utilisateur
*	Application web intuitive permettant d’ajouter, modifier et consulter toutes les dépenses.
*	Stockage des données directement dans le localStorage, garantissant une utilisation rapide et sans connexion.
*	Interface pensée pour être simple, efficace et agréable à utiliser.  

2. Backend — Authentification et base de données
*	Mise en place d’un système d’authentification utilisateur pour sécuriser l’accès aux données.
*	Stockage centralisé des dépenses dans une base de données, permettant la synchronisation entre plusieurs appareils.
*	API dédiée pour gérer les opérations CRUD et assurer une transition fluide entre la version locale et la version connectée.

----
# Si vous clonez le projet
Faire : npm install<br/>
Pour lancer le projet faire: npm run dev

----
# React + Vite

React + Vite permet un développement rapide et optimisé. Deux plugins sont disponibles 


- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)  qui utilise [Oxc](https://oxc.rs) pour un rafraîchissement rapide.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) qui utilise [SWC](https://swc.rs/) pour une compilation accélérée.


Pour une meilleure qualité de code, l'intégration de TypeScript et ESLint est recommandée. 
[TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) pour savoir comment utiliser [`typescript-eslint`](https://typescript-eslint.io) dans votre projet.
