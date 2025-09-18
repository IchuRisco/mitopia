#!/bin/sh

# Mitopia Frontend Docker Entrypoint
# Injects environment variables into the built application

set -e

# Function to replace environment variables in files
replace_env_vars() {
    local file="$1"
    
    # Replace VITE_ environment variables in the built files
    for var in $(env | grep '^VITE_' | cut -d= -f1); do
        value=$(eval echo \$$var)
        # Escape special characters for sed
        escaped_value=$(echo "$value" | sed 's/[[\.*^$()+?{|]/\\&/g')
        
        # Replace in JavaScript files
        find /usr/share/nginx/html -name "*.js" -type f -exec sed -i "s|__${var}__|${escaped_value}|g" {} \;
        
        # Replace in HTML files
        find /usr/share/nginx/html -name "*.html" -type f -exec sed -i "s|__${var}__|${escaped_value}|g" {} \;
    done
}

# Create runtime config file
cat > /usr/share/nginx/html/config.js << EOF
window.__MITOPIA_CONFIG__ = {
    API_URL: '${VITE_API_URL:-http://localhost:8001}',
    SIGNALING_URL: '${VITE_SIGNALING_URL:-http://localhost:8002}',
    TRANSLATION_URL: '${VITE_TRANSLATION_URL:-http://localhost:8004}',
    BILLING_URL: '${VITE_BILLING_URL:-http://localhost:8005}',
    STRIPE_PUBLISHABLE_KEY: '${VITE_STRIPE_PUBLISHABLE_KEY:-}',
    APP_NAME: '${VITE_APP_NAME:-Mitopia}',
    APP_DESCRIPTION: '${VITE_APP_DESCRIPTION:-Your Meeting Utopia}',
    APP_URL: '${VITE_APP_URL:-http://localhost:3000}',
    APP_VERSION: '${VITE_APP_VERSION:-1.0.0}',
    GOOGLE_ANALYTICS_ID: '${VITE_GOOGLE_ANALYTICS_ID:-}',
    SENTRY_DSN: '${VITE_SENTRY_DSN:-}',
    STUN_SERVER: '${VITE_STUN_SERVER:-stun:stun.l.google.com:19302}',
    TURN_SERVER: '${VITE_TURN_SERVER:-}',
    MAX_PARTICIPANTS: ${VITE_MAX_PARTICIPANTS:-100},
    MAX_MEETING_DURATION: ${VITE_MAX_MEETING_DURATION:-28800},
    DEFAULT_LANGUAGE: '${VITE_DEFAULT_LANGUAGE:-en}',
    SUPPORTED_LANGUAGES: '${VITE_SUPPORTED_LANGUAGES:-en,es,fr,de,it,pt,ru,zh,ja,ko,ar,hi}'.split(','),
    ENABLE_ANALYTICS: ${VITE_ENABLE_ANALYTICS:-true},
    ENABLE_ERROR_REPORTING: ${VITE_ENABLE_ERROR_REPORTING:-true}
};
EOF

# Replace environment variables in nginx config
envsubst '${VITE_API_URL} ${VITE_SIGNALING_URL}' < /etc/nginx/nginx.conf > /tmp/nginx.conf
mv /tmp/nginx.conf /etc/nginx/nginx.conf

# Replace environment variables in built files
replace_env_vars

echo "Mitopia Frontend starting..."
echo "API URL: ${VITE_API_URL:-http://localhost:8001}"
echo "Signaling URL: ${VITE_SIGNALING_URL:-http://localhost:8002}"

# Execute the main command
exec "$@"
