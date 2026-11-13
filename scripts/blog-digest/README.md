# Publieur Dev Digest

Ce script transforme les e-mails « Dev Digest » en articles du blog, en FR et
en EN, puis construit et déploie le site sur Firebase Hosting. Il tourne sur ce
PC à l'aide du Planificateur de tâches Windows et ne dépend pas de GitHub
Actions.

## Fonctionnement

À chaque exécution (ouverture de session, puis chaque jour à 07:00), le script :

1. **Lit les e-mails** dont le sujet est `Dev Digest - AAAA-MM-JJ` ou
   `Dev Digest - AAAA-MM-JJ (n/m)`, reçus pendant les `LOOKBACK_DAYS` derniers
   jours, via IMAP en lecture seule. Les variantes `TEST`, `échec` et les
   anciens formats sont ignorés.
2. **Génère un article quotidien par date de digest**, en regroupant tous les
   digests de cette date. Le digest arrive vers 5 h 55 avec les nouvelles de la
   veille : l'article du jour est publié le jour même, par le premier run après
   `PUBLISH_AFTER` (07:00 par défaut). Un digest complémentaire reçu après cette
   publication n'est pas intégré. L'article est en `noindex`, avec le slug
   `dev-digest-AAAA-MM-JJ` (date du digest).
3. **Génère un récapitulatif hebdomadaire par semaine terminée** (du lundi au
   dimanche, daté du dimanche), à partir des articles quotidiens de la semaine,
   s'il y en a au moins `WEEKLY_MIN_DAILIES`. Il est indexable.
4. **Construit le site, commite les articles, déploie, puis pousse sur GitHub.**

Rien n'est publié deux fois : un article qui existe déjà n'est pas regénéré. Si
le PC est resté éteint, les jours manquants sont rattrapés au passage suivant.

### Génération et garde-fous

Les articles sont rédigés par `claude -p` (votre abonnement Claude Code), sans
aucun outil et avec une sortie JSON imposée par un schéma. Les prompts se
trouvent dans `prompts.js`. Le script contrôle ensuite le résultat :

- les sources et les liens du corps doivent provenir du digest, ou des projets
  réels listés dans `src/data/projects.json`. Tout autre lien est retiré ;
- le frontmatter est écrit par le script, puis validé avec les mêmes règles que
  le build (`build/blog/content.js`) ;
- un article rejeté est regénéré une fois avec la liste des erreurs. S'il
  échoue encore, il n'est pas publié, et il sera retenté au passage suivant ;
- si le build échoue, les nouveaux fichiers sont retirés : le dépôt reste
  toujours constructible ;
- la publication est refusée si le dépôt n'est pas sur `main` ;
- si le déploiement échoue, un marqueur `deploy-pending` le fait retenter au
  passage suivant. Un `git push` qui échoue est lui aussi retenté.

---

## Installation (une seule fois)

### 1. Mot de passe d'application Gmail

Les digests arrivent sur `dev.digest.mel@gmail.com`. Utilisez ce compte, et non
votre compte principal, pour limiter l'accès du script à cette seule boîte.

1. Connectez-vous à `dev.digest.mel@gmail.com` et activez la validation en deux
   étapes : https://myaccount.google.com/signinoptions/twosv
2. Créez un mot de passe d'application sur https://myaccount.google.com/apppasswords
   (nom : `blog-digest`). Gardez les 16 caractères affichés.

### 2. Clé du compte de service Firebase

1. Ouvrez https://console.cloud.google.com/iam-admin/serviceaccounts?project=melchior-75a9e
   puis cliquez sur **Create service account**. Nom : `blog-digest-deploy`.
   Cliquez sur **Create and continue**.
2. Dans **Role**, choisissez **Firebase Hosting Admin**, ajoutez un second rôle
   **Service Usage Consumer** (sans condition IAM), puis cliquez sur
   **Continue** et **Done**. Sans ce second rôle, la CLI répond
   « Failed to get Firebase project ». Les droits peuvent mettre quelques
   minutes à s'appliquer.
   Le compte doit être créé dans le projet `melchior-75a9e` : une clé issue
   d'un autre projet est refusée. Le publieur ignore un éventuel
   `firebase login` et déploie toujours avec cette clé.
3. Ouvrez le compte, onglet **Keys**, puis **Add key**, **Create new key**,
   **JSON**. Un fichier `.json` est téléchargé.
4. Déplacez-le dans WSL et protégez-le :
   ```bash
   mkdir -p ~/.config/blog-digest
   mv /mnt/c/Users/<vous>/Downloads/melchior-75a9e-*.json ~/.config/blog-digest/firebase-sa.json
   chmod 600 ~/.config/blog-digest/firebase-sa.json
   ```

### 3. Clone de publication

Le script publie depuis **un clone dédié, toujours sur `main`**, distinct de
votre copie de travail. Ainsi, un déploiement ne publie jamais une branche en
cours de développement.

```bash
git clone git@github.com:M-Jorda/melchior-jorda.online.git ~/blog-publisher
cd ~/blog-publisher && npm ci
```

Le clone n'a pas besoin de `src/config/emailjs.config.js` (ignoré par git) :
copiez-le depuis votre copie de travail, sinon le formulaire de contact du site
déployé sera cassé.

```bash
cp ~/Website/melchior-jorda.online/src/config/emailjs.config.js ~/blog-publisher/src/config/
```

Copiez de la même façon le fichier `.env` (`VITE_GA_ID`), pour garder Google
Analytics.

### 4. Configuration

```bash
cp ~/blog-publisher/scripts/blog-digest/config.env.example ~/.config/blog-digest/config.env
chmod 600 ~/.config/blog-digest/config.env
nano ~/.config/blog-digest/config.env   # IMAP_PASSWORD, chemin de la clé
```

### 5. Tests

```bash
cd ~/blog-publisher
# Génère sans rien toucher au dépôt (fichiers dans ~/.local/state/blog-digest/dry-run/) :
node scripts/blog-digest/run.js --dry-run
# Publication réelle, sans déploiement :
node scripts/blog-digest/run.js --no-deploy
# Publication complète :
scripts/blog-digest/run.sh
```

### 6. Tâche planifiée Windows

Dans PowerShell (côté Windows, sans droits administrateur) :

```powershell
powershell -ExecutionPolicy Bypass -File \\wsl$\Ubuntu\home\<user>\blog-publisher\scripts\blog-digest\install-task.ps1
Start-ScheduledTask -TaskName "Blog Dev Digest"   # test immédiat
```

Options : `-Time "07:30"` pour changer l'heure quotidienne, `-Distro` et
`-Script` si les chemins diffèrent.

---

## Au quotidien

- **Journaux** : `~/.local/state/blog-digest/logs/AAAA-MM.log`. Le dernier code
  de retour est aussi visible dans le Planificateur de tâches.
- **Options de `run.js`** : `--dry-run`, `--no-deploy`, `--only daily|weekly`,
  `--lookback N` (rattraper plus loin), `--date AAAA-MM-JJ` (une seule date ; avec
  `--dry-run`, régénère même une date déjà publiée), `--eml fichier.eml ...` (tester à partir
  d'e-mails enregistrés, sans IMAP).
- **Supprimer un article** : supprimez le fichier dans les deux langues sur
  `main`, poussez, puis relancez `run.sh` (ou `firebase deploy`). Pour qu'il ne
  soit pas regénéré, attendez que sa date sorte de la fenêtre `LOOKBACK_DAYS`,
  ou réduisez temporairement cette valeur.

## ⚠ Déploiement manuel

Les articles n'existent que dans le dépôt. **Un `firebase deploy` lancé depuis
une copie qui n'a pas les derniers articles les retire du site.** Avant tout
déploiement manuel, faites un `git pull` sur `main`, ou déployez depuis
`~/blog-publisher`.
