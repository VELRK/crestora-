#!/bin/bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEPLOYPATH="${DEPLOYPATH:-$HOME/crestoraproperties.in/public_html}"

cd "$ROOT"

if [ ! -f "$ROOT/dist/index.html" ]; then
  echo "dist/index.html is missing. Build the frontend before deploy. This server does not install node_modules." >&2
  exit 1
fi

mkdir -p "$DEPLOYPATH"
rm -rf "$DEPLOYPATH/assets"
cp -a "$ROOT/dist/." "$DEPLOYPATH/"

DBFILE="$DEPLOYPATH/crestora-api/application/config/database.php"
UPLOADS="$DEPLOYPATH/crestora-api/uploads"
KEEPDB=""
KEEPUPLOADS=""
if [ -f "$DBFILE" ]; then
  KEEPDB="$(mktemp)"
  cp "$DBFILE" "$KEEPDB"
fi
if [ -d "$UPLOADS" ]; then
  KEEPUPLOADS="$(mktemp -d)"
  cp -a "$UPLOADS/." "$KEEPUPLOADS/"
fi

rm -rf "$DEPLOYPATH/crestora-api"
mkdir -p "$DEPLOYPATH/crestora-api"
tar -C "$ROOT/crestora-api" \
  --exclude=seed/cookies.txt \
  --exclude=seed/cookies-clean.txt \
  --exclude=seed/cookies-ui.txt \
  --exclude=application/logs \
  --exclude=application/cache \
  -cf - . | tar -C "$DEPLOYPATH/crestora-api" -xf -

mkdir -p "$DEPLOYPATH/crestora-api/application/logs" "$DEPLOYPATH/crestora-api/application/cache" "$DEPLOYPATH/crestora-api/uploads"
printf '%s\n' '<html><body></body></html>' > "$DEPLOYPATH/crestora-api/application/logs/index.html"
printf '%s\n' '<html><body></body></html>' > "$DEPLOYPATH/crestora-api/application/cache/index.html"

if [ -n "$KEEPDB" ]; then
  cp "$KEEPDB" "$DBFILE"
  rm -f "$KEEPDB"
fi
if [ -n "$KEEPUPLOADS" ]; then
  cp -a "$KEEPUPLOADS/." "$DEPLOYPATH/crestora-api/uploads/"
  rm -rf "$KEEPUPLOADS"
fi

cat > "$DEPLOYPATH/crestora-api/.htaccess" <<'EOF'
RewriteEngine On
RewriteBase /crestora-api/
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php/$1 [L,QSA]
EOF

cat > "$DEPLOYPATH/.htaccess" <<'EOF'
RewriteEngine On
RewriteRule ^crestora-api(/|$) - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
EOF

chmod -R u+rwX,g+rwX "$DEPLOYPATH/crestora-api/uploads" "$DEPLOYPATH/crestora-api/application/cache" "$DEPLOYPATH/crestora-api/application/logs"

echo "Deployed to $DEPLOYPATH"
echo "Site: https://crestoraproperties.in/"
echo "Admin: https://crestoraproperties.in/crestora-api/admin"
echo "Set crestora-api/application/config/database.php on the server once if this is the first deploy."
