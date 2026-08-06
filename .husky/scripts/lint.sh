#!/usr/bin/env sh

echo "🔍 Running ESLint..."
pnpm lint -- -- "$@" || {
  echo ""
  echo "❌ ESLint failed."
  exit 1
}