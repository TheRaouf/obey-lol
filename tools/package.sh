#!/usr/bin/env bash
# Builds dist/OBEY-LOL-v<version>.zip from the current source tree and verifies it.
set -euo pipefail
cd "$(dirname "$0")/.."
VERSION=$(node -p "require('./package.json').version")
NAME="OBEY-LOL-v${VERSION}"
OUT="dist/${NAME}.zip"
STAGE=$(mktemp -d)
trap 'rm -rf "$STAGE"' EXIT

mkdir -p dist "$STAGE/$NAME"
# Ship source, assets, docs, tests and tools; never node_modules or previous builds.
for item in index.html css js assets tests tools docs README.md CHANGELOG.md RELEASE-NOTES.md TEST-REPORT.md FEATURE-ROADMAP.md LICENSE ASSETS.md package.json; do
  cp -R "$item" "$STAGE/$NAME/"
done
find "$STAGE" -name '.DS_Store' -delete
rm -f "$OUT"
(cd "$STAGE" && zip -qr -X "$OLDPWD/$OUT" "$NAME")

echo "Built $OUT"
unzip -tq "$OUT"
# Extraction smoke test: entry point and key files exist after a clean unzip.
CHECK=$(mktemp -d)
unzip -q "$OUT" -d "$CHECK"
for f in index.html css/style.css js/ui/app.js js/core/engine.js assets/fonts/bagel-fat-one-latin.woff2 README.md TEST-REPORT.md LICENSE; do
  test -f "$CHECK/$NAME/$f" || { echo "MISSING in archive: $f"; exit 1; }
done
echo "Extraction check passed ($(unzip -Z1 "$OUT" | wc -l) entries, $(du -h "$OUT" | cut -f1))"
rm -rf "$CHECK"
