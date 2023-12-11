### NodeJS

## Qu'est-ce que Node ?

- Interpréteur JavaScript open source permettant de mettre ne place un seveur web.
- Gratuit fonctionnant sur différents os

## Extension

- Application tierces que l'on ajoute à notre projet avec un manager de paquets
- NodeJS utilise le gestionnaire de packet npm

## Avantages de Node ?

Node fonctionne en programmation :

- évenmentielle
- non-bloquante (asynchrone)
- à fil unqiue (mon-thread) (https://www.jesuisundev.com/comprendre-les-worker-threads-de-nodejs/)

Comprendre le single-thread en JS => (https://www.jesuisundev.com/comprendre-javascript-en-5-minutes/),(https://www.youtube.com/watch?v=8aGhZQkoFbQ)

## Evenementiel, multi-thread, mono-thread

- Comment fonctionne un serveur classique (Apache-PHP) :

  - Il envoie la tâche au système de fichiers de l'ordinateur
  - Il attend la réponse du système de fichier
  - Quand il a obtenu la réponse, il renvoie le contenu au client
  - Il traite ensuite la demande suivante

- Comment nodejs traite une demande de fichiers :
  - Envoie la tâche au système de fichier de l'ordinateur
  - Traite la demande suivante sans attendre la réponse du système de fichier : la demande asynchrone (logique AJAX : ancêtre lourd de node)
  - Lorsque le système de fichier renvoie la réponse au serveur, le serveur met en pause les actions en cours, renvoie le contenu au client puis reprend ses actions en cours

## Qu'est ce qu'un fichier node ?

- Les fichiers nodes contiennent des tâches qui seront exécuter à l'occasion de certains événement
- Les fichier Node doivent être sur le serveur pour avoir un effet.
- Les fichiers Node ont toujours l'extension '.js'

## Que peut-faire Node ?

- Node peut générer du contenu de page dynamique
- Il peut créer, ouvrir, lire, écrire, supprimer et fermer les des fichiers sur le serveur.
- Il peut collecter les données de formulaire
- Il peut ajouter, supprimer, modifier des données en bdd.

## Les codes d'erreur

En savoir plus sur les codes d'erreurs => (https://kb.planethoster.com/guide/astuces-techniques/codes-d-erreur-http/)

- 200 réussites
- 300 redirection
- 400 Erreur Client
- 500 Erreur Server

## API

- Interface logicielle qui pemrmet de connecter un logiciel ou in service à un autre logiciel afin d'échanger des données et des fonctionnalités

## Middleware

- Logiciel agissant comme une passerelle entre les autres applications, outils et base de donénes pour offrir aux utilisateurs des services unifiés.

## API Rest

En savoir plus sur les API REST => (https://www.redhat.com/fr/topics/api/what-is-a-rest-api)

- Respecte les contraintes du style d'architectures client-server
- Une architecture client-server constitué de clients et de serveur (backend et frontend séparé en 2 applications)
- Des communications client-server stateless (informations du client jamais stockées entre les requetes GET, qui doivent être traité séparémment de manière indépendante)
- La possibilité de mettre en cache des données
- Un système à couches, invisibles pour le client qui permet de hiérarchiser les différents types de serveurs (pour la sécurité, l'équilibrage des charges, etc.)
