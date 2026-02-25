#!/bin/bash

# Rentenauskunft Deployment Script
# Server: 212.132.97.22
# Domain: rentnerauskunft.de

set -e

echo "🚀 Deploying Rentenauskunft Service..."

# 1. Install dependencies
echo "📦 Installing dependencies..."
npm ci --production

# 2. Build Next.js
echo "🔨 Building Next.js application..."
npm run build

# 3. Create necessary directories
echo "📁 Creating directories..."
mkdir -p data
mkdir -p logs

# 4. Set permissions
echo "🔐 Setting permissions..."
chmod 755 data
chmod 755 logs

# 5. Initialize database
echo "💾 Initializing database..."
node scripts/init-db.js

# 6. Create systemd service
echo "⚙️  Creating systemd service..."
sudo tee /etc/systemd/system/rentenauskunft.service > /dev/null <<EOF
[Unit]
Description=Rentenauskunft Service
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/rentenauskunft
Environment=NODE_ENV=production
Environment=PORT=3005
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# 7. Create Nginx config
echo "🌐 Creating Nginx configuration..."
sudo tee /etc/nginx/sites-available/rentnerauskunft.de > /dev/null <<'EOF'
server {
    listen 80;
    server_name rentnerauskunft.de www.rentnerauskunft.de;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name rentnerauskunft.de www.rentnerauskunft.de;

    # SSL Configuration (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/rentnerauskunft.de/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/rentnerauskunft.de/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Logs
    access_log /var/log/nginx/rentnerauskunft.access.log;
    error_log /var/log/nginx/rentnerauskunft.error.log;

    # Proxy to Next.js
    location / {
        proxy_pass http://localhost:3005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files caching
    location /_next/static {
        proxy_pass http://localhost:3005;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Public files
    location /public {
        proxy_pass http://localhost:3005;
        proxy_cache_valid 200 7d;
        add_header Cache-Control "public, max-age=604800";
    }
}
EOF

# 8. Enable Nginx site
echo "🔗 Enabling Nginx site..."
sudo ln -sf /etc/nginx/sites-available/rentnerauskunft.de /etc/nginx/sites-enabled/

# 9. Test Nginx config
echo "✅ Testing Nginx configuration..."
sudo nginx -t

# 10. Reload services
echo "🔄 Reloading services..."
sudo systemctl daemon-reload
sudo systemctl enable rentenauskunft
sudo systemctl restart rentenauskunft
sudo systemctl reload nginx

echo "✅ Deployment complete!"
echo ""
echo "📊 Service status:"
sudo systemctl status rentenauskunft --no-pager
echo ""
echo "🌐 Site: https://rentnerauskunft.de"
echo "📝 Logs: journalctl -u rentenauskunft -f"
