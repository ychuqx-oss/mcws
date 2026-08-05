#!/usr/bin/env bash
set -euo pipefail

PACKAGE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_DIR="${1:-.}"
mkdir -p "$REPO_DIR/src/data/timeline"
cp "$PACKAGE_DIR/src/data/timeline/en-stories.json" "$REPO_DIR/src/data/timeline/en-stories.json"
echo "Applied final en-stories.json to $REPO_DIR/src/data/timeline/en-stories.json"
