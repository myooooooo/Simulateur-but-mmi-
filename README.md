

# MMI SIM 2026 🎓

### Simulateur de moyenne intelligent pour le BUT Métiers du Multimédia et de l'Internet

---

## 💡 Le Projet

**MMI SIM 2026** est un outil pédagogique moderne conçu pour accompagner les étudiants face à la **Réforme du BUT 2024-2026**.

Le calcul de la moyenne en BUT est devenu d'une complexité rare : coefficients variables selon les parcours, distinction entre *Ressources* et *SAÉ*, et règles de compensation strictes. Ce simulateur intègre **l'intégralité de la matrice officielle des coefficients** (issue du référentiel pédagogique de 11 pages) et gère automatiquement les spécificités des 3 parcours :
*   🎨 **Création Numérique**
*   💻 **Développement Web**
*   📈 **Stratégie de Communication**

## ✨ Fonctionnalités Clés

### 📊 Visualisation Radar Temps Réel
Analyse instantanée des 5 compétences clés du diplôme via un **Radar Chart interactif** (propulsé par *Recharts*). Permet de repérer d'un coup d'œil les axes de progression par rapport au seuil de validation (10/20).

### 🎯 Algorithme Prédictif de Note Cible
Loin d'être une simple calculatrice, l'application anticipe les besoins de l'étudiant. Pour chaque module vide, elle calcule la **"Note Cible"** ($N_c$) exacte pour valider la compétence à 10,00.

$$ N_c = \frac{10 \times Total_{Coeffs} - \sum(Note_i \times Coeff_i)}{Coeff_{cible}} $$

### 🔄 Multi-Parcours & Dynamique
L'interface s'adapte instantanément : changement de coefficients, de noms de modules et de règles de calcul selon le semestre sélectionné et la spécialité choisie.

### 💾 Persistance & Robustesse
Sauvegarde automatique des données en local (*LocalStorage*) et options d'**Import/Export JSON** pour transférer ses simulations entre appareils.

## 🛠️ Stack Technique

Construit avec une architecture moderne axée sur la performance et l'UX :

*   **Core** : React 18, TypeScript, Vite
*   **Design** : Tailwind CSS (Responsive & Mobile First)
*   **Data Viz** : Recharts
*   **Icons** : Lucide React

## 🚀 Installation & Déploiement

1. **Installer les dépendances :**
   ```bash
   npm install
   ```

2. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   ```

## 👨‍💻 Crédits & Contact

Conçu et développé par **Zineb Anssafou**.
👉 **[Mon Portfolio Behance](https://www.behance.net/zineb-anssafou)**

> *Outil non-officiel développé pour aider la communauté étudiante MMI.*
