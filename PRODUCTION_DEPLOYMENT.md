# Mitopia Production Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Domain name (e.g., mitopia.com)
- SSL certificates
- Production server with Docker and Docker Compose
- GitHub account for CI/CD

### 1. Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.21.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create application directory
sudo mkdir -p /opt/mitopia
sudo chown $USER:$USER /opt/mitopia
```

### 2. Clone Repository
```bash
cd /opt/mitopia
git clone https://github.com/IchuRisco/mitopia.git .
```

### 3. Configure Environment
```bash
# Copy production environment template
cp .env.production .env

# Edit environment variables
nano .env
```

**Required Environment Variables:**
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `OPENAI_API_KEY` - OpenAI API key for AI features
- `STRIPE_SECRET_KEY` - Stripe secret key for payments
- `JWT_SECRET` - Secure JWT secret key
- `DOMAIN` - Your domain name

### 4. SSL Certificate Setup
```bash
# Create SSL directory
mkdir -p nginx/ssl

# Copy your SSL certificates
cp your-domain.crt nginx/ssl/mitopia.com.crt
cp your-domain.key nginx/ssl/mitopia.com.key
```

### 5. Database Setup
```bash
# Run database migrations
docker-compose -f docker-compose.production.yml run --rm api npx prisma migrate deploy

# Seed initial data (optional)
docker-compose -f docker-compose.production.yml run --rm api npx prisma db seed
```

### 6. Deploy Application
```bash
# Build and start all services
docker-compose -f docker-compose.production.yml up -d

# Check service status
docker-compose -f docker-compose.production.yml ps

# View logs
docker-compose -f docker-compose.production.yml logs -f
```

### 7. Verify Deployment
```bash
# Health checks
curl -f https://api.mitopia.com/health
curl -f https://mitopia.com/health

# Test API endpoints
curl -X POST https://api.mitopia.com/auth/register -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"password123"}'
```

## 🔧 Configuration

### Domain Configuration
Update your DNS records:
```
A    mitopia.com           -> YOUR_SERVER_IP
A    www.mitopia.com       -> YOUR_SERVER_IP
A    api.mitopia.com       -> YOUR_SERVER_IP
A    signaling.mitopia.com -> YOUR_SERVER_IP
```

### Nginx Configuration
The production setup includes a complete Nginx configuration with:
- SSL/TLS termination
- Load balancing
- WebSocket support
- Security headers
- Gzip compression

### Database Configuration
Supported databases:
- **PostgreSQL** (Recommended for production)
- **MySQL** (Alternative option)
- **SQLite** (Development only)

### Redis Configuration
Redis is used for:
- Session storage
- Caching
- Real-time data
- Rate limiting

## 📊 Monitoring

### Prometheus Metrics
Access metrics at: `http://your-server:9090`

### Grafana Dashboards
Access dashboards at: `http://your-server:3001`
- Default login: admin/admin (change immediately)

### Log Aggregation
Logs are collected by Promtail and stored in Loki:
- Application logs: `/opt/mitopia/logs/`
- Container logs: Automatically collected

## 🔒 Security

### SSL/TLS
- Use Let's Encrypt for free SSL certificates
- Enable HTTP/2 and HSTS
- Configure secure cipher suites

### Firewall Configuration
```bash
# Allow only necessary ports
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable
```

### Security Headers
The Nginx configuration includes:
- Content Security Policy
- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options

## 🚀 CI/CD Pipeline

### GitHub Actions Setup
1. Add repository secrets:
   - `PRODUCTION_SSH_KEY` - SSH private key for deployment
   - `PRODUCTION_HOST` - Production server IP
   - `PRODUCTION_USER` - SSH username
   - `SLACK_WEBHOOK` - Slack webhook for notifications

2. The pipeline automatically:
   - Runs tests on every push
   - Builds Docker images
   - Deploys to production on main branch
   - Performs security scans
   - Runs performance tests

### Manual Deployment
```bash
# Pull latest changes
git pull origin main

# Update images
docker-compose -f docker-compose.production.yml pull

# Restart services
docker-compose -f docker-compose.production.yml up -d --remove-orphans

# Clean up
docker image prune -f
```

## 📈 Scaling

### Horizontal Scaling
- Use Docker Swarm or Kubernetes
- Load balance across multiple instances
- Scale individual services based on demand

### Database Scaling
- Read replicas for PostgreSQL
- Connection pooling
- Database sharding for large datasets

### CDN Integration
- CloudFlare for global content delivery
- AWS CloudFront for static assets
- Image optimization and compression

## 🔧 Maintenance

### Backup Strategy
```bash
# Database backup
docker-compose -f docker-compose.production.yml exec postgres pg_dump -U mitopia_user mitopia_prod > backup.sql

# File backup
tar -czf mitopia-backup-$(date +%Y%m%d).tar.gz /opt/mitopia
```

### Updates
```bash
# Update application
git pull origin main
docker-compose -f docker-compose.production.yml up -d --build

# Update system packages
sudo apt update && sudo apt upgrade -y
```

### Log Rotation
```bash
# Configure logrotate
sudo nano /etc/logrotate.d/mitopia
```

## 🆘 Troubleshooting

### Common Issues

**Service won't start:**
```bash
# Check logs
docker-compose -f docker-compose.production.yml logs service-name

# Check resource usage
docker stats

# Restart specific service
docker-compose -f docker-compose.production.yml restart service-name
```

**Database connection issues:**
```bash
# Test database connection
docker-compose -f docker-compose.production.yml exec api npx prisma db ping

# Check database logs
docker-compose -f docker-compose.production.yml logs postgres
```

**SSL certificate issues:**
```bash
# Verify certificate
openssl x509 -in nginx/ssl/mitopia.com.crt -text -noout

# Test SSL configuration
openssl s_client -connect mitopia.com:443
```

### Performance Optimization

**Database optimization:**
- Enable query logging
- Analyze slow queries
- Add appropriate indexes
- Configure connection pooling

**Application optimization:**
- Enable Redis caching
- Optimize Docker images
- Use production builds
- Enable gzip compression

## 📞 Support

For production support:
- Create GitHub issues for bugs
- Check documentation at `/docs`
- Monitor application logs
- Use health check endpoints

## 🎯 Production Checklist

- [ ] Domain configured with SSL
- [ ] Environment variables set
- [ ] Database migrations applied
- [ ] Monitoring configured
- [ ] Backups scheduled
- [ ] Security headers enabled
- [ ] Firewall configured
- [ ] CI/CD pipeline working
- [ ] Performance testing completed
- [ ] Load testing passed

Your Mitopia production deployment is now ready! 🎉
