#!/usr/bin/env sh

echo "🎨 Running Prettier... chuck noris"
pnpm exec prettier --check "$@" || {
  echo ""
  echo "❌ Prettier check failed."
  echo "💡 Run: pnpm pretty"
  exit 1
}