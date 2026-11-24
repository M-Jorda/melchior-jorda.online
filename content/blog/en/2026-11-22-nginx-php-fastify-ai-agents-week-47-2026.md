---
title: "nginx, PHP, Fastify: urgent patches as AI agents speed up exploits"
date: 2026-11-22
type: weekly
summary: "nginx, PHP and Fastify flaws, poisoned packages and AI agents exploiting bugs on their own: week 47 makes faster patching a must."
tags: ["Security", "AI", "PHP", "Node.js", "nginx"]
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
lang: en
---

Week 47 brought critical flaws in nginx, PHP and Fastify. Several reports also show AI agents speeding up how vulnerabilities are found and exploited.

## Key points

- **Offensive AI agents**: Google, Amazon and Calif describe agents that find or exploit flaws with little or no human help.
- **Project Zero**: Google will cut its disclosure deadline to 30 days in stages by 2028, and cites AI as the reason.
- **nginx, PHP, Ruby and Fastify**: critical memory and routing flaws call for fast updates.
- **Supply chain**: an official Microsoft package on PyPI, Docker Hub images and Optimizely scripts were all used to steal secrets.
- **GPT-6.2 and Gemini 4 Neon**: OpenAI and Google compete on price per task, while new tools cut the context sent to agents.

## AI agents shorten the time to exploitation

The Google Threat Intelligence Group found [exploit_agent](https://cloud.google.com/blog/topics/threat-intelligence/agentic-threat-activity-crosses-a-significant-threshold). The tool compares a web application before and after a patch, then writes the exploit and runs it. The report counts 8 exploited zero-days per month in 2025, against an average of 11 in 2026.

[Amazon](https://aws.amazon.com/blogs/security/chinese-nexus-actors-cairn-ai-agents-found-a-zero-day-on-their-own/) describes agents launched with Cairn, an open-source penetration testing tool. After several failures, they exploited a path traversal in MONAI Label and gained root access. A human stepped in occasionally, and the details come from a single source.

[Java4Shell](https://calif.io/java4shell/) is a flaw in OpenJDK's Base64 decoding. According to Calif, it was found with Codex for less than 200 dollars of compute. [Project Zero](https://projectzero.google/2026/11/disclosure-policy.html) cites this kind of threat for its new rule: details are published after a fixed deadline, patched or not:

- 90 days from now on;
- 60 days from February 2, 2027;
- 30 days from January 3, 2028.

> **For you:** automate dependency updates (Dependabot, Renovate), and reduce any uploaded filename to its base name or generate it on the server.

## nginx, PHP, Ruby and Fastify: the server layer under pressure

On November 18, F5 disclosed five critical nginx flaws, each rated 9.2 in CVSS v4. The main one sits in HTTP/2 flow control and dates back to version 1.9.5, released in 2015. According to [Wiz](https://www.wiz.io/blog/nginx-http2-rce-vulnerabilities), disabling HTTP/2 blocks only two of the five flaws.

Fixed versions released this week:

- nginx: 1.30.7 and 1.31.9;
- PHP: 8.2.36, 8.3.37, 8.4.28, 8.5.13 and the new 8.6.0;
- [Ruby](https://www.ruby-lang.org/en/news/2026/11/18/multiple-vulnerabilities-in-regexp-and-string/): 4.0.10, 3.4.13 and 3.3.14;
- @fastify/express: 4.0.10, then 4.0.11, which also changes middleware ordering.

On the PHP side, [phpAfterShell](https://thehackernews.com/2026/11/php-fixes-7-critical-flaws-including.html) uses a half-written session file to get a booby-trapped object deserialized. Almost all the flaws require a non-standard configuration, and no real-world attack has been reported. [PHP 8.6](https://wiki.php.net/rfc/session_security_defaults) turns on strict mode, HttpOnly and SameSite=Lax for session cookies by default, unless an older `php.ini` sets other values.

In [@fastify/express](https://github.com/fastify/fastify-express/security/advisories/GHSA-662w-h4p6-jq4p), Fastify's router and the Express middleware router do not always read a path the same way. A request to `/tenant/` could skip the `auth` middleware and still reach the handler. This class of bug, called a "parser differential", also affects proxies and firewalls.

> **For you:** check your versions with `nginx -V`, `php -v` and `npm ls @fastify/express`, then fully restart nginx after updating, because a plain reload leaves the old binary running.

## Supply chain: secrets stolen within seconds

On November 17, two poisoned versions of agent-framework were published on PyPI. This Python library is Microsoft's official tool for AI agents. According to [Wiz](https://www.wiz.io/blog/malicious-version-of-microsofts-agent-framework-published-to-pypi), a `.pth` file ran at Python startup, with no import needed, and stole Azure, Git, Docker and Hugging Face credentials.

Stony Brook University's study "Gone in 8 Seconds" measured how fast this happens using [honeypot Docker images](https://www.bleepingcomputer.com/news/security/cloud-keys-leaked-in-docker-hub-images-are-stolen-within-seconds/):

- first use of a key: 7.86 seconds after publication;
- half of the keys used within 51 seconds;
- all 100 AWS keys exploited within 15 minutes.

The bots read image layers directly, so a file deleted in a later layer can still be read. According to [Report URI](https://blog.report-uri.com/worlds-largest-brands-infected-with-malware-via-optimizely/), which sells monitoring tools, Optimizely's A/B testing scripts delivered malicious code to 178 organizations. [Dragos](https://www.dragos.com/blog/ai-supply-chain-security-canary-tokens), a single source, reports that three model hosting providers were breached. In two cases, even "zero data retention" requests were stolen.

> **For you:** keep secrets out of Dockerfiles and prompts, use `RUN --mount=type=secret`, and pin Python dependencies with hashes (`pip install --require-hashes`).

## Models and agents: the cost-per-task race

OpenAI launched [GPT-6.2 Astra and Sol](https://openai.com/index/introducing-gpt-6-2-astra-sol/) on November 17. Google followed the next day with [Gemini 4 Neon](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/). The vendors published the performance claims themselves, and no one has verified them independently.

Price per million tokens, input then output:

- GPT-6.2 Astra: $8 and $40;
- GPT-6.2 Sol: $2 and $10;
- Gemini 4 Neon: $3 and $15, with a one-million-token context window.

Other tools aim to cut the context sent to agents. By its own measurements, [TokenEconomizer](https://www.microsoft.com/en-us/research/blog/tokeneconomizer-learning-from-experience-to-make-ai-coding-agents-more-efficient/), an open-source module from Microsoft Research, lowers average cost per task by 18.4% to 30.9%. [Gemini Tool Retrieval](https://blog.google/innovation-and-ai/technology/developers-tools/gemini-api-tool-retrieval/), in preview, loads a tool's schema only when the model needs it. Google publishes no savings figure.

> **For you:** mark rarely used tools with `defer_loading: true` in the Gemini API, and keep a project notes file (AGENTS.md, CLAUDE.md) up to date so agents do not repeat work already done.

## Weekly analysis

Several of the week's major flaws sit in old C or C++ code: nginx, Ruby's regex engine and the JVM's JIT intrinsic. Agents can now turn a patch into an exploit, and Project Zero uses this to justify shorter deadlines. For a Node.js, PHP or Vue.js stack, how often dependencies and servers get updated therefore matters more.

The supply chain incidents share one target: secrets, whether CI tokens, cloud keys or model API keys. [NEXUS](/nexus), Melchior JORDA's self-hosted assistant, combines a Fastify API, Docker and calls to Gemini or Claude, so it has all three surfaces. The @fastify/express flaw would only affect it if it reused Express middleware.

It remains to be seen whether the gains claimed by OpenAI, Google and Microsoft hold up outside their own benchmarks. It is also worth tracking how many machines installed the poisoned agent-framework versions.
