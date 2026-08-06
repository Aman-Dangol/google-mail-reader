#!/usr/bin/env sh

echo "🎨 Running Prettier..."
pnpm exec prettier --check "$@" || {
  echo ""
  echo "❌ Prettier check failed."
  echo "💡 Run: pnpm pretty"
  exit 1
}