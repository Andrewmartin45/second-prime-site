#!/bin/bash
# Push the current site to GitHub; Vercel auto-deploys from there (~1 min).
cd "$(dirname "$0")"
git add -A
git commit -m "${1:-Site update}" || echo "Nothing new to commit."
git push
echo "Pushed. Live at https://second-prime-site.vercel.app within ~1 minute."
