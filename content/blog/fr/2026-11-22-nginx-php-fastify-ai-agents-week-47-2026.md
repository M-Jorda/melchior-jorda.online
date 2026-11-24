---
title: "nginx, PHP, Fastify : correctifs urgents face aux agents IA"
date: 2026-11-22
type: weekly
summary: "Failles nginx, PHP et Fastify, paquets piégés, agents IA qui exploitent seuls : la semaine 47 impose d'accélérer les mises à jour."
tags: ["Sécurité", "IA", "PHP", "Node.js", "nginx"]
sources:
  - title: "Google Threat Intelligence Group"
    url: "https://cloud.google.com/blog/topics/threat-intelligence/agentic-threat-activity-crosses-a-significant-threshold"
  - title: "AWS Security Blog"
    url: "https://aws.amazon.com/blogs/security/chinese-nexus-actors-cairn-ai-agents-found-a-zero-day-on-their-own/"
  - title: "Calif – Java4Shell"
    url: "https://calif.io/java4shell/"
  - title: "Project Zero"
    url: "https://projectzero.google/2026/11/disclosure-policy.html"
  - title: "Wiz – nginx"
    url: "https://www.wiz.io/blog/nginx-http2-rce-vulnerabilities"
  - title: "Ruby"
    url: "https://www.ruby-lang.org/en/news/2026/11/18/multiple-vulnerabilities-in-regexp-and-string/"
  - title: "The Hacker News – PHP"
    url: "https://thehackernews.com/2026/11/php-fixes-7-critical-flaws-including.html"
  - title: "PHP RFC – Session security defaults"
    url: "https://wiki.php.net/rfc/session_security_defaults"
  - title: "Fastify – avis GHSA-662w"
    url: "https://github.com/fastify/fastify-express/security/advisories/GHSA-662w-h4p6-jq4p"
  - title: "Wiz – agent-framework"
    url: "https://www.wiz.io/blog/malicious-version-of-microsofts-agent-framework-published-to-pypi"
  - title: "BleepingComputer – Docker Hub"
    url: "https://www.bleepingcomputer.com/news/security/cloud-keys-leaked-in-docker-hub-images-are-stolen-within-seconds/"
  - title: "Report URI – Optimizely"
    url: "https://blog.report-uri.com/worlds-largest-brands-infected-with-malware-via-optimizely/"
  - title: "Dragos"
    url: "https://www.dragos.com/blog/ai-supply-chain-security-canary-tokens"
  - title: "OpenAI – GPT-6.2"
    url: "https://openai.com/index/introducing-gpt-6-2-astra-sol/"
  - title: "Google – Gemini 4 Neon"
    url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/"
  - title: "Microsoft Research – TokenEconomizer"
    url: "https://www.microsoft.com/en-us/research/blog/tokeneconomizer-learning-from-experience-to-make-ai-coding-agents-more-efficient/"
  - title: "Google – Gemini API Tool Retrieval"
    url: "https://blog.google/innovation-and-ai/technology/developers-tools/gemini-api-tool-retrieval/"
indexable: true
lang: fr
---

La semaine 47 a apporté des failles critiques dans nginx, PHP et Fastify. Plusieurs rapports montrent aussi que des agents d'IA accélèrent la recherche et l'exploitation de failles.

## L'essentiel

- **Agents IA offensifs** : Google, Amazon et Calif décrivent des agents qui trouvent ou exploitent des failles avec peu ou pas d'aide humaine.
- **Project Zero** : Google ramènera par étapes son délai de divulgation à 30 jours d'ici 2028, en invoquant l'IA.
- **nginx, PHP, Ruby et Fastify** : des failles critiques, liées à la mémoire ou au routage, imposent des mises à jour rapides.
- **Chaîne d'approvisionnement** : un paquet officiel de Microsoft sur PyPI, des images Docker Hub et des scripts Optimizely ont servi à voler des secrets.
- **GPT-6.2 et Gemini 4 Neon** : OpenAI et Google se disputent le prix par tâche, pendant que de nouveaux outils réduisent le contexte envoyé aux agents.

## Les agents IA raccourcissent le délai d'exploitation

Le Google Threat Intelligence Group a découvert [exploit_agent](https://cloud.google.com/blog/topics/threat-intelligence/agentic-threat-activity-crosses-a-significant-threshold). Cet outil compare une application web avant et après son correctif, puis il écrit l'exploit et le lance. Le rapport compte 8 zero-days exploités par mois en 2025, contre 11 en moyenne en 2026.

[Amazon](https://aws.amazon.com/blogs/security/chinese-nexus-actors-cairn-ai-agents-found-a-zero-day-on-their-own/) décrit de son côté des agents lancés avec Cairn, un outil libre de test d'intrusion. Après plusieurs échecs, ils ont exploité une traversée de chemin dans MONAI Label jusqu'à obtenir un accès root. Un humain est intervenu ponctuellement, et les détails viennent d'une source unique.

[Java4Shell](https://calif.io/java4shell/) est une faille du décodage Base64 d'OpenJDK. Selon Calif, elle a été trouvée avec Codex pour moins de 200 dollars de calcul. [Project Zero](https://projectzero.google/2026/11/disclosure-policy.html) invoque ce type de menace pour publier ses découvertes après un délai fixe, que la faille soit corrigée ou non :

- 90 jours dès maintenant ;
- 60 jours à partir du 2 février 2027 ;
- 30 jours à partir du 3 janvier 2028.

> **Pour vous :** automatisez la mise à jour de vos dépendances (Dependabot, Renovate) et réduisez tout nom de fichier reçu à son nom de base, ou générez-le côté serveur.

## nginx, PHP, Ruby et Fastify : la couche serveur sous pression

Le 18 novembre, F5 a publié cinq failles critiques dans nginx, toutes notées 9,2 en CVSS v4. La principale se trouve dans le contrôle de flux HTTP/2 et existe depuis la version 1.9.5, sortie en 2015. Selon [Wiz](https://www.wiz.io/blog/nginx-http2-rce-vulnerabilities), désactiver HTTP/2 ne bloque que deux des cinq failles.

Versions corrigées publiées cette semaine :

- nginx : 1.30.7 et 1.31.9 ;
- PHP : 8.2.36, 8.3.37, 8.4.28, 8.5.13 et la nouvelle 8.6.0 ;
- [Ruby](https://www.ruby-lang.org/en/news/2026/11/18/multiple-vulnerabilities-in-regexp-and-string/) : 4.0.10, 3.4.13 et 3.3.14 ;
- @fastify/express : 4.0.10, puis 4.0.11, qui modifie aussi l'ordre des middlewares.

Côté PHP, [phpAfterShell](https://thehackernews.com/2026/11/php-fixes-7-critical-flaws-including.html) exploite un fichier de session à moitié écrit pour faire désérialiser un objet piégé. Presque toutes les failles exigent une configuration non standard, et aucune attaque réelle n'est signalée. [PHP 8.6](https://wiki.php.net/rfc/session_security_defaults) active par défaut le mode strict, HttpOnly et SameSite=Lax pour les cookies de session, sauf si un ancien `php.ini` impose d'autres valeurs.

Dans [@fastify/express](https://github.com/fastify/fastify-express/security/advisories/GHSA-662w-h4p6-jq4p), le routeur de Fastify et celui des middlewares Express ne lisent pas toujours un chemin de la même façon. Une requête vers `/tenant/` pouvait ainsi sauter le middleware `auth` tout en atteignant le handler. Ce type de bug, appelé « parser differential », touche aussi les proxys et les pare-feu.

> **Pour vous :** vérifiez vos versions avec `nginx -V`, `php -v` et `npm ls @fastify/express`, puis redémarrez complètement nginx après la mise à jour, car un simple reload laisse tourner l'ancien programme.

## Chaîne d'approvisionnement : des secrets volés en quelques secondes

Le 17 novembre, deux versions piégées d'agent-framework ont été publiées sur PyPI. Cette bibliothèque Python est l'outil officiel de Microsoft pour les agents d'IA. Selon [Wiz](https://www.wiz.io/blog/malicious-version-of-microsofts-agent-framework-published-to-pypi), un fichier `.pth` s'exécutait au démarrage de Python, sans aucun import, pour voler les identifiants Azure, Git, Docker et Hugging Face.

L'étude « Gone in 8 Seconds » de l'université Stony Brook a mesuré la vitesse de ces vols à l'aide d'[images Docker pièges](https://www.bleepingcomputer.com/news/security/cloud-keys-leaked-in-docker-hub-images-are-stolen-within-seconds/) :

- première utilisation d'une clé : 7,86 secondes après publication ;
- la moitié des clés utilisées en moins de 51 secondes ;
- les 100 clés AWS exploitées en moins de 15 minutes.

Les robots lisent directement les couches d'image, où un fichier supprimé ensuite reste lisible. Selon [Report URI](https://blog.report-uri.com/worlds-largest-brands-infected-with-malware-via-optimizely/), qui vend des outils de surveillance, les scripts de tests A/B d'Optimizely ont diffusé du code malveillant chez 178 organisations. [Dragos](https://www.dragos.com/blog/ai-supply-chain-security-canary-tokens), source unique, affirme que trois hébergeurs de modèles ont été piratés. Dans deux cas, même des requêtes « zero data retention » ont été volées.

> **Pour vous :** ne placez aucun secret dans un Dockerfile ni dans un prompt, utilisez `RUN --mount=type=secret` et figez vos dépendances Python avec empreintes (`pip install --require-hashes`).

## Modèles et agents : la bataille du coût par tâche

OpenAI a lancé [GPT-6.2 Astra et Sol](https://openai.com/index/introducing-gpt-6-2-astra-sol/) le 17 novembre. Google a suivi le lendemain avec [Gemini 4 Neon](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/). Les performances annoncées viennent des éditeurs et n'ont pas été vérifiées de façon indépendante.

Prix par million de tokens, en entrée puis en sortie :

- GPT-6.2 Astra : 8 $ et 40 $ ;
- GPT-6.2 Sol : 2 $ et 10 $ ;
- Gemini 4 Neon : 3 $ et 15 $, avec une fenêtre de contexte d'un million de tokens.

D'autres outils cherchent à réduire le contexte envoyé aux agents. Selon ses propres mesures, [TokenEconomizer](https://www.microsoft.com/en-us/research/blog/tokeneconomizer-learning-from-experience-to-make-ai-coding-agents-more-efficient/), un module libre de Microsoft Research, baisserait le coût moyen par tâche de 18,4 % à 30,9 %. [Gemini Tool Retrieval](https://blog.google/innovation-and-ai/technology/developers-tools/gemini-api-tool-retrieval/), en préversion, ne charge le schéma d'un outil que lorsque le modèle en a besoin. Google ne publie aucun chiffre d'économie.

> **Pour vous :** marquez les outils rarement utilisés avec `defer_loading: true` dans l'API Gemini et tenez à jour un fichier de notes projet (AGENTS.md, CLAUDE.md) pour éviter qu'un agent ne refasse un travail déjà fait.

## Analyse de la semaine

Plusieurs failles majeures de la semaine touchent du code C ou C++ ancien : nginx, le moteur de regex de Ruby, l'intrinsèque JIT de la JVM. Des agents savent désormais tirer un exploit d'un correctif, et Project Zero s'appuie sur ce constat pour raccourcir ses délais. Pour une stack Node.js, PHP ou Vue.js, la cadence de mise à jour des dépendances et des serveurs compte donc davantage.

Les incidents de chaîne d'approvisionnement ont un point commun : ils visent des secrets, qu'il s'agisse de jetons de CI, de clés cloud ou de clés d'API de modèles. [NEXUS](/nexus), l'assistant auto-hébergé de Melchior JORDA, combine une API Fastify, Docker et des appels à Gemini ou Claude, et présente donc ces trois surfaces. La faille @fastify/express ne le concernerait que s'il réutilisait des middlewares Express.

Reste à voir si les gains annoncés par OpenAI, Google et Microsoft se vérifient en dehors de leurs propres benchmarks. Il faudra aussi suivre combien de machines ont installé les versions piégées d'agent-framework.
