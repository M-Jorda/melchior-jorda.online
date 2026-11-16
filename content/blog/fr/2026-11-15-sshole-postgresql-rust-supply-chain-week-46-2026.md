---
title: "SSHole, PostgreSQL et Rust 1.100 : la chaîne logicielle sous pression"
date: 2026-11-15
type: weekly
summary: "SSHole, vol de secrets en CI, 52 failles PostgreSQL, Rust 1.100 et C++26 bloqué : la semaine où la chaîne logicielle a été mise à l'épreuve."
tags: ["Sécurité", "PostgreSQL", "Node.js", "Rust", "C++"]
sources:
  - title: "OpenSSH – Release notes"
    url: "https://www.openssh.org/releasenotes.html"
  - title: "Next – Faille SSHole dans Alpine Linux"
    url: "https://next.ink/266066/une-faille-dans-alpine-linux-permet-de-se-connecter-avec-un-mot-de-passe-trop-long/"
  - title: "The Hacker News – SSHole exploitée"
    url: "https://thehackernews.com/2026/11/hackers-exploited-openssh-sshole-flaw.html"
  - title: "Aikido – Comptes GitHub compromis"
    url: "https://www.aikido.dev/blog/compromised-github-accounts-push-ci-secret-stealer-to-tens-of-thousands-of-repositories"
  - title: "SafeDep – wfx credential stealer"
    url: "https://safedep.io/blog/github-actions-wfx-credential-stealer"
  - title: "Hugo van Kemenade – Lock GitHub Actions"
    url: "https://hugovk.dev/blog/2026/lock-github-actions/"
  - title: "GitHub Blog – Git security vulnerabilities"
    url: "https://github.blog/open-source/git/git-security-vulnerabilities-announced-7/"
  - title: "Node.js – November 2026 security releases"
    url: "https://nodejs.org/en/blog/vulnerability/november-2026-security-releases"
  - title: "PostgreSQL – Annonce des versions 18.7 et suivantes"
    url: "https://www.postgresql.org/about/news/postgresql-187-1712-1616-1520-1425-and-19-rc-2-released-3442/"
  - title: "The Hacker News – PostgreSQL corrige 52 failles"
    url: "https://thehackernews.com/2026/11/postgresql-patches-52-flaws-including.html"
  - title: "The Hacker News – Claude Code « Don't ask again »"
    url: "https://thehackernews.com/2026/11/claude-codes-dont-ask-again-file.html"
  - title: "RuntimeWire – Secrets dans les fichiers de configuration Claude Code"
    url: "https://runtimewire.com/article/claude-code-dont-ask-again-secrets-public-github-settings-files"
  - title: "The Register – Fireworks AI"
    url: "https://www.theregister.com/cyber-crime/2026/11/10/fireworks-ai-gets-burned-twice-as-customer-data-exposure-widens/5308722"
  - title: "TechCrunch – Fireworks AI et Notion"
    url: "https://techcrunch.com/2026/11/12/cyberattack-on-fireworks-ai-allowed-hackers-to-access-notion-customers-chat-transcripts/"
  - title: "TechCrunch – Fuite de données Uber"
    url: "https://techcrunch.com/2026/11/13/uber-confirms-hackers-stole-thousands-of-drivers-license-information-in-data-breach/"
  - title: "Rust Blog – Rust 1.100.0"
    url: "https://blog.rust-lang.org/2026/11/12/Rust-1.100.0/"
  - title: "The Register – C++26 et les contrats"
    url: "https://www.theregister.com/devops/2026/11/13/c26-stumbles-at-finish-line-over-contracts-dispute/5309526"
  - title: "Andreas Fertig – C++26 DIS failed"
    url: "https://andreasfertig.com/blog/2026/11/cpp26-dis-failed-how-does-cpp-survive"
  - title: "Hugging Face – llama.cpp v1"
    url: "https://huggingface.co/blog/ggml-org/llama-cpp-v1"
  - title: "GitHub – llama.cpp v1.0.0"
    url: "https://github.com/ggml-org/llama.cpp/releases/tag/v1.0.0"
  - title: "The Register – 100 000 CVE en 2026"
    url: "https://www.theregister.com/security/2026/11/13/this-years-bug-count-just-passed-100k/5309882"
  - title: "The Register – Surcharge des mainteneurs Linux"
    url: "https://www.theregister.com/ai-and-ml/2026/11/13/another-linux-kernel-developer-steps-back-from-some-duties-due-to-overload/5309628"
  - title: "VulnCheck – Glasswing November update"
    url: "https://www.vulncheck.com/blog/anthropic-glasswing-november-update"
  - title: "Cloud Security Alliance – Glasswing research note"
    url: "https://labs.cloudsecurityalliance.org/research/csa-research-note-glasswing-ai-vuln-patching-deficit-2026060/"
indexable: true
lang: fr
---

La semaine 46 a touché les outils les plus ordinaires du développement : serveur SSH, CI, Git, Node.js et PostgreSQL. Dans le même temps, Rust 1.100 renforce Cargo contre les paquets piégés, tandis que C++26 bute sur les contrats.

## L'essentiel

- **SSHole** : une faille d'OpenSSH sur Alpine Linux accordait l'accès avec un mot de passe trop long, et elle a été exploitée en quelques heures.
- **GitHub Actions** : la campagne « wfx » s'appuie sur des milliers de comptes compromis pour voler les secrets de CI.
- **Git, Node.js et PostgreSQL** : trois mises à jour de sécurité importantes sont sorties, dont 52 failles corrigées pour PostgreSQL.
- **Rust 1.100 et C++26** : Cargo peut désormais ignorer les versions trop récentes, alors que le projet final de C++26 a été rejeté.
- **100 000 CVE** : le cap a été franchi cette année, une hausse attribuée à la recherche de failles assistée par IA.

## SSHole et « wfx » : l'accès SSH et la CI visés

OpenSSH 10.6p2 est sortie en urgence pour corriger SSHole (CVE-2026-123158). Sur Alpine, la fonction `crypt()` de musl renvoie `*` comme signal d'erreur au-delà de 256 octets. Or un compte sans mot de passe stocke lui aussi `*` : sshd compare alors `*` à `*` et accorde l'accès.

- Selon [The Hacker News](https://thehackernews.com/2026/11/hackers-exploited-openssh-sshole-flaw.html), un pot de miel a été pris en root moins de 9 heures après la publication de la CVE.
- Les systèmes basés sur glibc, PAM, Dropbear et les images cloud-init ne sont pas concernés.
- Alpine est corrigée sur quatre branches, de 3.21.10 à 3.24.4, et sshd doit être redémarré.
- D'après les [notes de version OpenSSH](https://www.openssh.org/releasenotes.html), le correctif est un contournement : la cause profonde reste dans musl.

La gravité reste discutée entre le NIST et OpenSSH ([Next](https://next.ink/266066/une-faille-dans-alpine-linux-permet-de-se-connecter-avec-un-mot-de-passe-trop-long/)).

Depuis le 10 novembre, la campagne « wfx » ouvre des pull requests intitulées « docs: dependency audit notes » pour viser GitHub Actions. Le script vole les secrets GitHub, les identifiants cloud, npm, PyPI et SSH, ainsi que des clés d'API d'IA.

- 4 837 comptes compromis, selon [Aikido](https://www.aikido.dev/blog/compromised-github-accounts-push-ci-secret-stealer-to-tens-of-thousands-of-repositories) ;
- 61 764 dépôts ciblés, dont au moins 1 806 ont exécuté le code ;
- 8 093 dépôts modifiés selon [SafeDep](https://safedep.io/blog/github-actions-wfx-credential-stealer), dont 771 via un script `postinstall`.

Ces chiffres sont des minimums, car seuls les dépôts publics sont visibles. GitHub propose désormais un fichier de verrouillage des actions, dont Hugo van Kemenade [détaille la mise en place](https://hugovk.dev/blog/2026/lock-github-actions/).

> **Pour vous :** mettez à jour Alpine puis redémarrez sshd, verrouillez vos actions GitHub et lancez `npm install --ignore-scripts` sur tout projet inconnu.

## Git, Node.js, PostgreSQL : trois mises à jour prioritaires

[Git 2.56.1](https://github.blog/open-source/git/git-security-vulnerabilities-announced-7/) corrige six failles. La plus grave permettait d'exécuter du code lors d'un `git clone --recursive` : un chemin très long passait le contrôle, puis était tronqué en un nom sensible comme `.git`. Les copies de Git intégrées à d'autres outils doivent aussi être mises à jour.

Côté [Node.js](https://nodejs.org/en/blog/vulnerability/november-2026-security-releases) :

- 16 failles corrigées, dont 7 graves ;
- versions correctives : 22.23.5, 24.22.3 et 26.13.1 ;
- en HTTPS, `res.flushHeaders()` suivi de `res.end()` pouvait renvoyer de la mémoire du serveur, y compris la clé privée TLS.

PostgreSQL a publié une mise à jour d'une ampleur inhabituelle, selon l'[annonce officielle](https://www.postgresql.org/about/news/postgresql-187-1712-1616-1520-1425-and-19-rc-2-released-3442/) :

- 52 failles et plus de 140 bugs corrigés ;
- la plus grave, CVE-2026-6460, est notée 8,8 sur 10 ;
- son origine remonte à 2004, selon le chercheur Mehmet Ince cité par [The Hacker News](https://thehackernews.com/2026/11/postgresql-patches-52-flaws-including.html) ;
- PostgreSQL 14 reçoit sa dernière mise à jour.

Cette faille est une confusion de type : une requête préparée relit une ancienne valeur avec un nouveau type. Un utilisateur capable de créer des objets peut ainsi exécuter du code avec les droits du serveur, ce qui expose surtout les hébergements partagés. Aucune attaque réelle n'est signalée, mais aucun contournement n'existe.

> **Pour vous :** après la mise à jour de PostgreSQL, recompilez vos extensions C et appliquez les « actions après mise à jour » décrites dans l'annonce.

## Claude Code et Fireworks AI : les secrets fuient autour du code

Une étude d'Apiiro, reprise par [The Hacker News](https://thehackernews.com/2026/11/claude-codes-dont-ask-again-file.html) et [RuntimeWire](https://runtimewire.com/article/claude-code-dont-ask-again-secrets-public-github-settings-files), vise l'option « Oui, et ne plus demander » de Claude Code. L'outil recopie alors la commande exacte dans `.claude/settings.local.json`, mot de passe compris. Le fichier est exclu de Git au niveau global de la machine, jamais dans le `.gitignore` du projet.

- 104 185 copies du fichier trouvées dans des dépôts publics ;
- 1 122 contiennent au moins un secret ;
- 1 379 secrets distincts, dont 379 mots de passe de bases de données ;
- gitleaks n'a repéré que 564 de ces copies, TruffleHog 643.

Le fournisseur d'inférence Fireworks AI a subi deux intrusions en octobre, dont une via l'hébergeur de ses machines de recherche ([The Register](https://www.theregister.com/cyber-crime/2026/11/10/fireworks-ai-gets-burned-twice-as-customer-data-exposure-widens/5308722)). Notion confirme le vol de conversations de son assistant IA, touchant environ 1 % de ses clients ([TechCrunch](https://techcrunch.com/2026/11/12/cyberattack-on-fireworks-ai-allowed-hackers-to-access-notion-customers-chat-transcripts/)). Uber signale aussi des données de permis de conduire volées pour au moins 7 870 chauffeurs ([TechCrunch](https://techcrunch.com/2026/11/13/uber-confirms-hackers-stole-thousands-of-drivers-license-information-in-data-breach/)).

> **Pour vous :** passez vos secrets par des variables d'environnement plutôt que dans les commandes, et ajoutez explicitement au `.gitignore` les fichiers générés par les agents.

## Rust 1.100, C++26 et llama.cpp : les langages système en mouvement

[Rust 1.100.0](https://blog.rust-lang.org/2026/11/12/Rust-1.100.0/) est sortie le 12 novembre :

- le type « jamais » `!` est stabilisé, après dix ans et cinq tentatives ;
- le cœur de l'API `Allocator` est stable et utilisable avec `Vec` et `Box` ;
- Cargo signale les dépendances inutilisées, hors dépendances de test ;
- l'option `global-min-publish-age` ignore les versions publiées trop récemment, par exemple depuis moins de trois jours.

Les versions piégées sont souvent repérées en quelques heures ou quelques jours, d'où l'intérêt de ce délai. L'annonce précise toutefois que la protection n'est pas complète.

Le projet final de C++26 a été rejeté le 23 octobre, apparemment une première, surtout à cause des contrats (P2900). Selon [The Register](https://www.theregister.com/devops/2026/11/13/c26-stumbles-at-finish-line-over-contracts-dispute/5309526), le vote donne :

- 13 voix pour ;
- 9 contre, au-delà du seuil de 25 % toléré par l'ISO ;
- 12 abstentions.

[Andreas Fertig](https://andreasfertig.com/blog/2026/11/cpp26-dis-failed-how-does-cpp-survive), membre du comité, rappelle que le détail des votes n'est pas forcément publié. Le comité se réunit au Brésil à partir du 16 novembre pour retirer, déplacer ou corriger les contrats. La norme risque de glisser à 2027.

Enfin, [llama.cpp 1.0.0](https://github.com/ggml-org/llama.cpp/releases/tag/v1.0.0) fige une API C stable : tout changement incompatible imposera une nouvelle version majeure. La version supprime 35 fonctions dépréciées et couvre plus de 150 variantes d'architectures de modèles ([équipe ggml](https://huggingface.co/blog/ggml-org/llama-cpp-v1)).

> **Pour vous :** avant de migrer vers llama.cpp 1.0, vérifiez que votre code n'appelle aucune des fonctions dépréciées supprimées.

## 100 000 CVE : trouver des failles va plus vite que les corriger

Selon VulnCheck, cité par [The Register](https://www.theregister.com/security/2026/11/13/this-years-bug-count-just-passed-100k/5309882), 100 222 CVE ont été publiées en 2026, plus du double de 2025. Josh Bressers, de VulnCheck, résume : « C'est l'IA. »

- environ 1,4 % de ces CVE ont été exploitées ;
- le délai médian avant exploitation est passé de 120 à 80 jours ;
- le bilan de Project Glasswing compte 37 966 découvertes, dont 217 corrigées au 2 novembre ([VulnCheck](https://www.vulncheck.com/blog/anthropic-glasswing-november-update)).

Le bilan de VulnCheck est contesté, car l'entreprise a un intérêt commercial. En juin, la [Cloud Security Alliance](https://labs.cloudsecurityalliance.org/research/csa-research-note-glasswing-ai-vuln-patching-deficit-2026060/) rapportait que des experts indépendants avaient jugé valides 90,6 % des découvertes examinées.

Côté noyau Linux, Lorenzo Stoakes réduit ses relectures : selon lui, les patchs générés par IA représentent « la moitié de ce que je vois » ([The Register](https://www.theregister.com/ai-and-ml/2026/11/13/another-linux-kernel-developer-steps-back-from-some-duties-due-to-overload/5309628)). Greg Kroah-Hartman constate un manque de relecteurs. Ces deux articles viennent du même site.

> **Pour vous :** priorisez vos correctifs selon le catalogue KEV de la CISA et l'exposition du service, plutôt que sur la seule note de gravité.

## Analyse de la semaine

Plusieurs failles de la semaine reposent sur une hypothèse implicite entre composants. Avec SSHole, une valeur d'erreur se confond avec une donnée valide. Dans Git, la troncature intervient après la validation, et dans PostgreSQL, une valeur est relue avec un autre type que celui d'origine.

Pour une stack TypeScript et Node.js, le risque se situe de plus en plus autour du code : workflows de CI, scripts `postinstall`, fichiers créés par des agents et fournisseurs d'IA. Le délai de publication introduit par Cargo montre une parade simple face aux paquets piégés. [NEXUS](/nexus), l'assistant auto-hébergé de Melchior JORDA, cumule plusieurs de ces dépendances : une API Fastify sur Node.js, PostgreSQL et des appels à Gemini et Claude.

Plusieurs points restent à surveiller. Reste à voir si musl recevra une correction de fond, et quelle issue la réunion du Brésil donnera aux contrats de C++26. Le bilan de Glasswing et la saturation des mainteneurs Linux posent enfin la même question : qui vérifiera ce flux croissant de signalements.
