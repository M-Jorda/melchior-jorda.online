---
title: "SSHole, PostgreSQL and Rust 1.100: supply chain under pressure"
date: 2026-11-15
type: weekly
summary: "SSHole, CI secret theft, 52 PostgreSQL flaws, Rust 1.100 and a stalled C++26: a week that tested the software supply chain."
tags: ["Security", "PostgreSQL", "Node.js", "Rust", "C++"]
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
lang: en
---

Week 46 hit the most ordinary development tools: SSH server, CI, Git, Node.js and PostgreSQL. Meanwhile, Rust 1.100 hardens Cargo against poisoned packages, while C++26 stumbles over contracts.

## Key points

- **SSHole**: an OpenSSH flaw on Alpine Linux granted access with an overly long password, and it was exploited within hours.
- **GitHub Actions**: the "wfx" campaign relies on thousands of compromised accounts to steal CI secrets.
- **Git, Node.js and PostgreSQL**: three major security updates shipped, including 52 fixed flaws in PostgreSQL.
- **Rust 1.100 and C++26**: Cargo can now skip overly recent versions, while the final C++26 draft was rejected.
- **100,000 CVEs**: the mark was passed this year, a rise attributed to AI-assisted vulnerability research.

## SSHole and "wfx": SSH access and CI targeted

OpenSSH 10.6p2 shipped as an emergency fix for SSHole (CVE-2026-123158). On Alpine, musl's `crypt()` function returns `*` as an error signal beyond 256 bytes. An account without a password also stores `*`, so sshd compares `*` with `*` and grants access.

- According to [The Hacker News](https://thehackernews.com/2026/11/hackers-exploited-openssh-sshole-flaw.html), a honeypot was taken over as root less than 9 hours after the CVE was published.
- Systems based on glibc, PAM, Dropbear and cloud-init images are not affected.
- Alpine is fixed on four branches, from 3.21.10 to 3.24.4, and sshd must be restarted.
- Per the [OpenSSH release notes](https://www.openssh.org/releasenotes.html), the fix is a workaround: the root cause remains in musl.

The severity is still debated between NIST and OpenSSH ([Next](https://next.ink/266066/une-faille-dans-alpine-linux-permet-de-se-connecter-avec-un-mot-de-passe-trop-long/)).

Since November 10, the "wfx" campaign has opened pull requests titled "docs: dependency audit notes" to target GitHub Actions. The script steals GitHub secrets, cloud, npm, PyPI and SSH credentials, as well as AI API keys.

- 4,837 compromised accounts, according to [Aikido](https://www.aikido.dev/blog/compromised-github-accounts-push-ci-secret-stealer-to-tens-of-thousands-of-repositories);
- 61,764 repositories targeted, at least 1,806 of which ran the code;
- 8,093 repositories modified according to [SafeDep](https://safedep.io/blog/github-actions-wfx-credential-stealer), 771 of them through a `postinstall` script.

These figures are minimums, since only public repositories are visible. GitHub now offers an actions lock file, and Hugo van Kemenade [explains how to set it up](https://hugovk.dev/blog/2026/lock-github-actions/).

> **For you:** update Alpine and restart sshd, lock your GitHub Actions and run `npm install --ignore-scripts` on any unfamiliar project.

## Git, Node.js, PostgreSQL: three priority updates

[Git 2.56.1](https://github.blog/open-source/git/git-security-vulnerabilities-announced-7/) fixes six flaws. The most serious allowed code execution during a `git clone --recursive`: a very long path passed the check, then was truncated into a sensitive name such as `.git`. Copies of Git bundled in other tools also need updating.

On the [Node.js](https://nodejs.org/en/blog/vulnerability/november-2026-security-releases) side:

- 16 flaws fixed, 7 of them high severity;
- patched versions: 22.23.5, 24.22.3 and 26.13.1;
- over HTTPS, `res.flushHeaders()` followed by `res.end()` could send server memory back, including the TLS private key.

PostgreSQL shipped an unusually large update, according to the [official announcement](https://www.postgresql.org/about/news/postgresql-187-1712-1616-1520-1425-and-19-rc-2-released-3442/):

- 52 flaws and more than 140 bugs fixed;
- the most serious, CVE-2026-6460, is rated 8.8 out of 10;
- its origin dates back to 2004, according to researcher Mehmet Ince quoted by [The Hacker News](https://thehackernews.com/2026/11/postgresql-patches-52-flaws-including.html);
- PostgreSQL 14 receives its final update.

This flaw is a type confusion: a prepared query rereads an old value with a new type. A user able to create objects can thus run code with the server's privileges, which mainly exposes shared hosting. No real-world attack is reported, but no workaround exists.

> **For you:** after updating PostgreSQL, recompile your C extensions and apply the "post-update actions" described in the announcement.

## Claude Code and Fireworks AI: secrets leak around the code

An Apiiro study, covered by [The Hacker News](https://thehackernews.com/2026/11/claude-codes-dont-ask-again-file.html) and [RuntimeWire](https://runtimewire.com/article/claude-code-dont-ask-again-secrets-public-github-settings-files), looks at Claude Code's "Yes, and don't ask again" option. The tool then copies the exact command into `.claude/settings.local.json`, password included. The file is excluded from Git at the machine's global level, never in the project's `.gitignore`.

- 104,185 copies of the file found in public repositories;
- 1,122 contain at least one secret;
- 1,379 distinct secrets, including 379 database passwords;
- gitleaks caught only 564 of these copies, TruffleHog 643.

Inference provider Fireworks AI suffered two intrusions in October, one through the host of its research machines ([The Register](https://www.theregister.com/cyber-crime/2026/11/10/fireworks-ai-gets-burned-twice-as-customer-data-exposure-widens/5308722)). Notion confirms the theft of conversations from its AI assistant, affecting about 1% of its customers ([TechCrunch](https://techcrunch.com/2026/11/12/cyberattack-on-fireworks-ai-allowed-hackers-to-access-notion-customers-chat-transcripts/)). Uber also reports stolen driver's license data for at least 7,870 drivers ([TechCrunch](https://techcrunch.com/2026/11/13/uber-confirms-hackers-stole-thousands-of-drivers-license-information-in-data-breach/)).

> **For you:** pass secrets through environment variables rather than inside commands, and explicitly add agent-generated files to your `.gitignore`.

## Rust 1.100, C++26 and llama.cpp: systems languages on the move

[Rust 1.100.0](https://blog.rust-lang.org/2026/11/12/Rust-1.100.0/) was released on November 12:

- the "never" type `!` is stabilized, after ten years and five attempts;
- the core of the `Allocator` API is stable and usable with `Vec` and `Box`;
- Cargo flags unused dependencies, excluding test dependencies;
- the `global-min-publish-age` option skips recently published versions, for example those less than three days old.

Poisoned versions are often spotted within hours or days, hence the value of this delay. The announcement notes, however, that the protection is not complete.

The final C++26 draft was rejected on October 23, apparently a first, mainly over contracts (P2900). According to [The Register](https://www.theregister.com/devops/2026/11/13/c26-stumbles-at-finish-line-over-contracts-dispute/5309526), the vote was:

- 13 in favor;
- 9 against, above the 25% threshold tolerated by ISO;
- 12 abstentions.

[Andreas Fertig](https://andreasfertig.com/blog/2026/11/cpp26-dis-failed-how-does-cpp-survive), a committee member, points out that vote details are not necessarily published. The committee meets in Brazil from November 16 to remove, move or fix contracts. The standard may slip to 2027.

Finally, [llama.cpp 1.0.0](https://github.com/ggml-org/llama.cpp/releases/tag/v1.0.0) freezes a stable C API: any breaking change will require a new major version. The release removes 35 deprecated functions and covers more than 150 model architecture variants ([ggml team](https://huggingface.co/blog/ggml-org/llama-cpp-v1)).

> **For you:** before migrating to llama.cpp 1.0, check that your code calls none of the removed deprecated functions.

## 100,000 CVEs: finding flaws is outpacing fixing them

According to VulnCheck, quoted by [The Register](https://www.theregister.com/security/2026/11/13/this-years-bug-count-just-passed-100k/5309882), 100,222 CVEs were published in 2026, more than double 2025. VulnCheck's Josh Bressers sums it up: "It's AI."

- about 1.4% of these CVEs were exploited;
- the median time to exploitation dropped from 120 to 80 days;
- the Project Glasswing tally lists 37,966 findings, 217 of them fixed as of November 2 ([VulnCheck](https://www.vulncheck.com/blog/anthropic-glasswing-november-update)).

VulnCheck's assessment is disputed, since the company has a commercial interest. In June, the [Cloud Security Alliance](https://labs.cloudsecurityalliance.org/research/csa-research-note-glasswing-ai-vuln-patching-deficit-2026060/) reported that independent experts had judged 90.6% of the examined findings valid.

On the Linux kernel side, Lorenzo Stoakes is cutting back on reviews: in his words, AI-generated patches make up "half of what I see" ([The Register](https://www.theregister.com/ai-and-ml/2026/11/13/another-linux-kernel-developer-steps-back-from-some-duties-due-to-overload/5309628)). Greg Kroah-Hartman notes a shortage of reviewers. Both articles come from the same outlet.

> **For you:** prioritize patches based on CISA's KEV catalog and service exposure, rather than the severity score alone.

## Weekly analysis

Several of this week's flaws rest on an implicit assumption between components. With SSHole, an error value is mistaken for valid data. In Git, truncation happens after validation, and in PostgreSQL, a value is reread with a different type than the original.

For a TypeScript and Node.js stack, risk increasingly sits around the code: CI workflows, `postinstall` scripts, agent-generated files and AI providers. Cargo's publication delay shows a simple countermeasure against poisoned packages. [NEXUS](/nexus), Melchior JORDA's self-hosted assistant, combines several of these dependencies: a Fastify API on Node.js, PostgreSQL and calls to Gemini and Claude.

Several points remain to watch. It remains to be seen whether musl gets a proper fix, and what outcome the Brazil meeting gives C++26 contracts. The Glasswing tally and the overload of Linux maintainers raise the same question: who will verify this growing stream of reports.
