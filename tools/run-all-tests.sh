#!/usr/bin/env bash
# Runs static checks, unit tests and browser tests; writes raw logs to tests/logs/.
# Usage: bash tools/run-all-tests.sh   (set NODE_PATH if Playwright is installed globally)
set -uo pipefail
cd "$(dirname "$0")/.."
mkdir -p tests/logs
status=0
{ echo "# $(date -u +%FT%TZ) node $(node --version)"; node tools/check.js; } > tests/logs/static.log 2>&1 || status=1
node --test tests/unit/*.test.js > tests/logs/unit.tap 2>&1 || status=1
node --test --test-concurrency=1 tests/e2e/*.e2e.test.js > tests/logs/e2e.tap 2>&1 || status=1
for f in tests/logs/unit.tap tests/logs/e2e.tap; do
  echo "== $f"; grep -E '^# (tests|suites|pass|fail|cancelled|skipped|todo|duration_ms)' "$f"
done
tail -1 tests/logs/static.log
exit $status
