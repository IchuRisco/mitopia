# TalkFlow Deployment Guide

This guide covers deploying TalkFlow using free or very cheap services to minimize costs while maintaining production quality.

## Free Service Tiers Overview

### Database Options (Choose One)

| Service | Free Tier | Pros | Cons |
|---------|-----------|------|------|
| **Railway PostgreSQL** | 500MB, 1M rows | Easy integration, good performance | Limited storage |
| **Supabase** | 500MB, unlimited API requests | Real-time features, good dashboard | Bandwidth limits |
| **PlanetScale** | 1GB storage, 1B row reads/month | Serverless MySQL, branching | MySQL instead of PostgreSQL |
| **Neon** | 512MB, 3GB data transfer | Serverless PostgreSQL, auto-scaling | Data transfer limits |

### Redis/Cache Options (Choose One)

| Service | Free Tier | Pros | Cons |
|---------|-----------|------|------|
| **Railway Redis** | 100MB | Easy integration with Railway | Small storage |
| **Upstash Redis** | 10K commands/day, 256MB | Serverless, good free tier | Command limits |
| **Redis Cloud** | 30MB | Managed Redis | Very limited storage |

### Hosting Options

| Service | Free Tier | Best For |
|---------|-----------|----------|
| **Railway** | $5 credit/month | Full-stack apps, databases |
| **Vercel** | Unlimited static sites | Frontend hosting |
| **Render** | 750 hours/month | Backend services |
| **Fly.io** | 3 shared VMs | Global deployment |

## Recommended Free Setup

### Option 1: Railway (Simplest)
- **Frontend**: Railway static site
- **Backend Services**: Railway containers
- **Database**: Railway PostgreSQL (free tier)
- **Cache**: Railway Redis (free tier)
- **Total Cost**: ~$0-5/month

### Option 2: Mixed Services (Best Performance)
- **Frontend**: Vercel (free)
- **Backend**: Railway or Render (free tier)
- **Database**: Supabase PostgreSQL (free)
- **Cache**: Upstash Redis (free)
- **Total Cost**: $0/month

## Deployment Steps

### 1. Railway Deployment (Recommended)

1. **Create Railway Account**
   ```bash
   npm install -g @railway/cli
   railway login
   ```

2. **Initialize Project**
   ```bash
   railway init talkflow
   cd talkflow
   ```

3. **Set Environment Variables**
   ```bash
   # Database
   railway variables set DATABASE_PROVIDER=postgresql
   railway variables set JWT_SECRET=your_secure_jwt_secret_here
   railway variables set OPENAI_API_KEY=your_openai_api_key
   
   # Add other required variables from .env.example
   ```

4. **Deploy Services**
   ```bash
   # Deploy all services
   railway up
   ```

### 2. Alternative: Vercel + Supabase + Railway

1. **Frontend on Vercel**
   ```bash
   cd apps/web
   npm install -g vercel
   vercel --prod
   ```

2. **Database on Supabase**
   - Create account at supabase.com
   - Create new project
   - Copy connection string
   - Run migrations: `npx prisma migrate deploy`

3. **Backend on Railway**
   - Deploy API and other services to Railway
   - Connect to Supabase database

## Environment Variables Setup

### Required Variables

```bash
# Database (choose one)
DATABASE_PROVIDER=postgresql
DATABASE_URL=postgresql://user:pass@host:port/db

# Authentication
JWT_SECRET=your_super_secure_jwt_secret_minimum_32_characters

# AI Services
OPENAI_API_KEY=sk-your_openai_api_key

# Redis (choose one)
REDIS_URL=redis://user:pass@host:port

# Email/SMS (optional, for invitations)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Twilio (for SMS invitations)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890
```

## Cost Optimization Tips

1. **Use SQLite for Development**
   - Keep `DATABASE_PROVIDER=sqlite` locally
   - Only use PostgreSQL in production

2. **Optimize Database Usage**
   - Implement data retention policies
   - Archive old meetings and transcripts
   - Use database connection pooling

3. **Cache Strategically**
   - Cache frequently accessed data
   - Use Redis for session management
   - Implement cache expiration policies

4. **Monitor Usage**
   - Set up alerts for service limits
   - Monitor database size and connections
   - Track API usage and costs

## Scaling Considerations

### When to Upgrade

- **Database**: When approaching 500MB or 1M rows
- **Redis**: When hitting command limits or storage
- **Hosting**: When exceeding free tier limits

### Upgrade Paths

1. **Railway**: Upgrade to paid plans ($5-20/month)
2. **Supabase**: Pro plan ($25/month)
3. **PlanetScale**: Scaler plan ($29/month)
4. **Dedicated hosting**: DigitalOcean, AWS, etc.

## Monitoring and Maintenance

### Health Checks
- All services include `/health` endpoints
- Railway automatically monitors service health
- Set up uptime monitoring (UptimeRobot, etc.)

### Backup Strategy
- Database: Automated backups via service provider
- Files: Store in cloud storage (Cloudinary, etc.)
- Code: Git repository with proper branching

### Security
- Use environment variables for secrets
- Enable HTTPS/SSL certificates
- Implement rate limiting
- Regular security updates

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Check connection string format
   - Verify network access
   - Check service status

2. **Memory Limits**
   - Optimize Docker images
   - Reduce model sizes for AI services
   - Implement pagination

3. **API Rate Limits**
   - Implement caching
   - Add retry logic
   - Monitor usage patterns

### Support Resources

- Railway: [docs.railway.app](https://docs.railway.app)
- Supabase: [supabase.com/docs](https://supabase.com/docs)
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Community: GitHub Issues and Discussions
