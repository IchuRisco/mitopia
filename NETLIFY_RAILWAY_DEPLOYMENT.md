# Mitopia Deployment Guide: Netlify + Railway

## 🚀 Overview

This guide will help you deploy Mitopia using:
- **Netlify** for the frontend (React/Vite application)
- **Railway** for all backend services (API, Signaling, Translation, Billing, etc.)

**Total Cost Estimate:** $0-50/month (depending on usage)

## 📋 Prerequisites

- GitHub repository (✅ Already created: https://github.com/IchuRisco/mitopia)
- Netlify account (free tier available)
- Railway account (free tier available)
- Domain name (optional, but recommended)

## 🎯 Step 1: Deploy Backend Services to Railway

### 1.1 Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with your GitHub account
3. Connect your GitHub repository

### 1.2 Deploy Database (PostgreSQL)
1. In Railway dashboard, click "New Project"
2. Select "Provision PostgreSQL"
3. Note the connection details (DATABASE_URL)

### 1.3 Deploy Redis
1. In the same project, click "New Service"
2. Select "Redis"
3. Note the connection details (REDIS_URL)

### 1.4 Deploy API Service
1. Click "New Service" → "GitHub Repo"
2. Select `IchuRisco/mitopia`
3. Set root directory to `services/api`
4. Railway will auto-detect the Dockerfile
5. Add environment variables:
   ```
   NODE_ENV=production
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   REDIS_URL=${{Redis.REDIS_URL}}
   JWT_SECRET=your_super_secure_jwt_secret_here
   OPENAI_API_KEY=sk-your-openai-api-key
   STRIPE_SECRET_KEY=sk_live_your_stripe_key
   FRONTEND_URL=https://your-app.netlify.app
   ```

### 1.5 Deploy Signaling Service
1. Click "New Service" → "GitHub Repo"
2. Select `IchuRisco/mitopia`
3. Set root directory to `services/signaling`
4. Add environment variables:
   ```
   NODE_ENV=production
   REDIS_URL=${{Redis.REDIS_URL}}
   API_SERVICE_URL=${{API.RAILWAY_PRIVATE_DOMAIN}}
   ```

### 1.6 Deploy Translation Service
1. Click "New Service" → "GitHub Repo"
2. Select `IchuRisco/mitopia`
3. Set root directory to `services/translation`
4. Add environment variables:
   ```
   REDIS_URL=${{Redis.REDIS_URL}}
   API_SERVICE_URL=${{API.RAILWAY_PRIVATE_DOMAIN}}
   OPENAI_API_KEY=sk-your-openai-api-key
   ```

### 1.7 Deploy Billing Service
1. Click "New Service" → "GitHub Repo"
2. Select `IchuRisco/mitopia`
3. Set root directory to `services/billing`
4. Add environment variables:
   ```
   NODE_ENV=production
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   REDIS_URL=${{Redis.REDIS_URL}}
   STRIPE_SECRET_KEY=sk_live_your_stripe_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

### 1.8 Deploy STT Service
1. Click "New Service" → "GitHub Repo"
2. Select `IchuRisco/mitopia`
3. Set root directory to `services/stt`
4. Add environment variables:
   ```
   REDIS_URL=${{Redis.REDIS_URL}}
   API_SERVICE_URL=${{API.RAILWAY_PRIVATE_DOMAIN}}
   OPENAI_API_KEY=sk-your-openai-api-key
   ```

### 1.9 Deploy Notes Service
1. Click "New Service" → "GitHub Repo"
2. Select `IchuRisco/mitopia`
3. Set root directory to `services/notes`
4. Add environment variables:
   ```
   REDIS_URL=${{Redis.REDIS_URL}}
   API_SERVICE_URL=${{API.RAILWAY_PRIVATE_DOMAIN}}
   OPENAI_API_KEY=sk-your-openai-api-key
   ```

## 🌐 Step 2: Deploy Frontend to Netlify

### 2.1 Create Netlify Account
1. Go to [netlify.com](https://netlify.com)
2. Sign up with your GitHub account

### 2.2 Deploy Frontend
1. Click "New site from Git"
2. Choose GitHub and select `IchuRisco/mitopia`
3. Configure build settings:
   - **Build command:** `cd apps/web && npm run build`
   - **Publish directory:** `apps/web/dist`
   - **Base directory:** `/`

### 2.3 Configure Environment Variables
In Netlify dashboard → Site settings → Environment variables:
```
VITE_API_URL=https://your-api-service.up.railway.app
VITE_SIGNALING_URL=https://your-signaling-service.up.railway.app
VITE_TRANSLATION_URL=https://your-translation-service.up.railway.app
VITE_BILLING_URL=https://your-billing-service.up.railway.app
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
VITE_APP_URL=https://your-app.netlify.app
VITE_APP_NAME=Mitopia
VITE_APP_DESCRIPTION=Your Meeting Utopia
```

## 🔧 Step 3: Configure Custom Domain (Optional)

### 3.1 Netlify Domain Setup
1. In Netlify dashboard → Domain settings
2. Add custom domain (e.g., `mitopia.com`)
3. Configure DNS records:
   ```
   CNAME  www    your-app.netlify.app
   A      @      75.2.60.5
   ```

### 3.2 Railway Domain Setup
1. In Railway dashboard, go to each service
2. Click "Settings" → "Networking"
3. Add custom domain:
   - API: `api.mitopia.com`
   - Signaling: `signaling.mitopia.com`
   - Translation: `translation.mitopia.com`
   - Billing: `billing.mitopia.com`

## 🗄️ Step 4: Database Setup

### 4.1 Run Migrations
1. In Railway dashboard, go to API service
2. Click "Deploy" → "View Logs"
3. The migrations should run automatically, or manually trigger:
   ```bash
   npx prisma migrate deploy
   ```

### 4.2 Seed Initial Data (Optional)
```bash
npx prisma db seed
```

## 🔐 Step 5: Configure External Services

### 5.1 Stripe Setup
1. Create Stripe account at [stripe.com](https://stripe.com)
2. Get API keys from Dashboard → Developers → API keys
3. Set up webhooks pointing to `https://billing.mitopia.com/webhooks/stripe`

### 5.2 OpenAI Setup
1. Create OpenAI account at [openai.com](https://openai.com)
2. Generate API key from API section
3. Add to all services that need AI features

### 5.3 Twilio Setup (for SMS)
1. Create Twilio account at [twilio.com](https://twilio.com)
2. Get Account SID and Auth Token
3. Purchase phone number for SMS

## 📊 Step 6: Monitoring & Analytics

### 6.1 Netlify Analytics
- Enable Netlify Analytics in site settings
- Monitor frontend performance and usage

### 6.2 Railway Metrics
- Monitor service health in Railway dashboard
- Set up alerts for downtime or errors

### 6.3 External Monitoring
- Set up Sentry for error tracking
- Configure Google Analytics for user tracking

## 🚀 Step 7: Go Live!

### 7.1 Final Checklist
- [ ] All services deployed and healthy
- [ ] Database migrations completed
- [ ] Environment variables configured
- [ ] Custom domains configured (if using)
- [ ] SSL certificates active
- [ ] Payment processing tested
- [ ] Email/SMS notifications working

### 7.2 Test Everything
1. **Frontend:** Visit your Netlify URL
2. **Registration:** Create a test account
3. **Login:** Test authentication
4. **Meeting:** Create and join a meeting
5. **Payments:** Test subscription flow
6. **AI Features:** Test transcription and translation

## 💰 Cost Breakdown

### Netlify (Frontend)
- **Free Tier:** 100GB bandwidth, 300 build minutes
- **Pro:** $19/month for more bandwidth and features

### Railway (Backend)
- **Free Tier:** $5 credit monthly, shared CPU
- **Pro:** $20/month for dedicated resources
- **Usage-based:** Additional costs for high traffic

### External Services
- **Stripe:** 2.9% + 30¢ per transaction
- **OpenAI:** Pay-per-use (varies by usage)
- **Twilio:** Pay-per-SMS (~$0.0075 per message)

**Total Monthly Cost:** $0-50 for small to medium usage

## 🔧 Maintenance

### Auto-Deployments
- Both Netlify and Railway auto-deploy on git push
- Use different branches for staging/production

### Scaling
- Railway auto-scales based on traffic
- Monitor usage and upgrade plans as needed

### Backups
- Railway provides automatic database backups
- Set up additional backup strategies for critical data

## 🆘 Troubleshooting

### Common Issues

**Build Failures:**
- Check build logs in Netlify/Railway dashboards
- Verify environment variables are set correctly
- Ensure all dependencies are listed in package.json

**CORS Errors:**
- Update CORS_ORIGIN in backend services
- Ensure frontend URL matches exactly

**Database Connection Issues:**
- Verify DATABASE_URL is correctly formatted
- Check Railway PostgreSQL service status

**Payment Issues:**
- Verify Stripe keys are correct (test vs live)
- Check webhook endpoints are accessible

## 📞 Support

- **Netlify Support:** [docs.netlify.com](https://docs.netlify.com)
- **Railway Support:** [docs.railway.app](https://docs.railway.app)
- **Mitopia Issues:** [GitHub Issues](https://github.com/IchuRisco/mitopia/issues)

## 🎉 Success!

Your Mitopia application is now live and ready to serve users worldwide! The combination of Netlify + Railway provides excellent performance, scalability, and cost-effectiveness for a modern SaaS application.

**Frontend URL:** https://your-app.netlify.app
**API URL:** https://your-api.up.railway.app

Start marketing your application and acquiring users! 🚀
