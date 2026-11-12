#!/usr/bin/env bash
# Lanceur du publieur Dev Digest, appelé par le Planificateur de tâches
# Windows via wsl.exe (voir install-task.ps1). Les arguments sont transmis
# à run.js (ex. --dry-run).
set -uo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
STATE_DIR="${BLOG_DIGEST_STATE_DIR:-$HOME/.local/state/blog-digest}"
LOG_DIR="$STATE_DIR/logs"
mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/$(date +%Y-%m).log"

# Une seule exécution à la fois (ouverture de session + déclencheur quotidien).
exec 9>"$STATE_DIR/run.lock"
if ! flock -n 9; then
  echo "[$(date -Is)] exécution déjà en cours, abandon" >> "$LOG"
  exit 0
fi

# Shell non interactif : charger nvm (node, npm, firebase) et ~/.local/bin (claude).
export NVM_DIR="$HOME/.nvm"
# shellcheck disable=SC1091
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" >/dev/null
export PATH="$HOME/.local/bin:$PATH"

main() {
  echo "===== $(date -Is) — publieur Dev Digest ====="
  cd "$REPO" || return 1

  # Juste après l'ouverture de session, le réseau peut mettre un moment.
  for _ in $(seq 1 30); do
    getent hosts imap.gmail.com >/dev/null 2>&1 && break
    sleep 10
  done

  if ! git pull --rebase --autostash origin main; then
    git rebase --abort >/dev/null 2>&1
    echo "⚠ git pull en échec : on continue avec la copie locale"
  fi

  local lock_sum
  lock_sum="$(sha1sum package-lock.json | cut -d' ' -f1)"
  if [ "$(cat "$STATE_DIR/package-lock.sha1" 2>/dev/null)" != "$lock_sum" ]; then
    npm ci --no-audit --no-fund && echo "$lock_sum" > "$STATE_DIR/package-lock.sha1"
  fi

  node scripts/blog-digest/run.js "$@"
}

main "$@" >> "$LOG" 2>&1
code=$?
echo "[$(date -Is)] code de sortie : $code" >> "$LOG"
exit "$code"
