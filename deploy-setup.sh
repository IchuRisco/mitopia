#!/bin/bash

# Mitopia Deployment Setup Script for Netlify + Railway
# This script helps you set up the deployment process

echo "🚀 Mitopia Deployment Setup - Netlify + Railway"
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

echo -e "${BLUE}This script will guide you through setting up Mitopia deployment.${NC}"
echo ""

# Check if we're in the right directory
if [ ! -f "netlify.toml" ]; then
    echo -e "${RED}❌ Error: netlify.toml not found. Please run this script from the Mitopia root directory.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Found Mitopia project files${NC}"
echo ""

# Step 1: Railway Setup
echo -e "${PURPLE}📦 Step 1: Railway Backend Setup${NC}"
echo "1. Go to https://railway.app and create an account"
echo "2. Create a new project"
echo "3. Add PostgreSQL database service"
echo "4. Add Redis service"
echo "5. Deploy each backend service:"
echo "   - API Service (services/api)"
echo "   - Signaling Service (services/signaling)"
echo "   - Translation Service (services/translation)"
echo "   - Billing Service (services/billing)"
echo "   - STT Service (services/stt)"
echo "   - Notes Service (services/notes)"
echo ""
echo -e "${YELLOW}Press Enter when you've completed Railway setup...${NC}"
read -r

# Step 2: Netlify Setup
echo -e "${PURPLE}🌐 Step 2: Netlify Frontend Setup${NC}"
echo "1. Go to https://netlify.com and create an account"
echo "2. Click 'New site from Git'"
echo "3. Choose GitHub and select 'IchuRisco/mitopia'"
echo "4. Configure build settings:"
echo "   - Build command: cd apps/web && npm run build"
echo "   - Publish directory: apps/web/dist"
echo "   - Base directory: /"
echo ""
echo -e "${YELLOW}Press Enter when you've completed Netlify setup...${NC}"
read -r

# Step 3: Environment Variables
echo -e "${PURPLE}🔧 Step 3: Environment Variables Setup${NC}"
echo ""
echo "You need to configure environment variables in both platforms:"
echo ""
echo -e "${BLUE}Railway Environment Variables (for each service):${NC}"
echo "DATABASE_URL=\${{Postgres.DATABASE_URL}}"
echo "REDIS_URL=\${{Redis.REDIS_URL}}"
echo "JWT_SECRET=your_super_secure_jwt_secret"
echo "OPENAI_API_KEY=sk-your-openai-api-key"
echo "STRIPE_SECRET_KEY=sk_live_your_stripe_key"
echo ""
echo -e "${BLUE}Netlify Environment Variables:${NC}"
echo "VITE_API_URL=https://your-api-service.up.railway.app"
echo "VITE_SIGNALING_URL=https://your-signaling-service.up.railway.app"
echo "VITE_TRANSLATION_URL=https://your-translation-service.up.railway.app"
echo "VITE_BILLING_URL=https://your-billing-service.up.railway.app"
echo "VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key"
echo ""
echo -e "${YELLOW}Press Enter when you've configured environment variables...${NC}"
read -r

# Step 4: GitHub Secrets
echo -e "${PURPLE}🔐 Step 4: GitHub Secrets Setup${NC}"
echo "Configure these secrets in GitHub repository settings:"
echo "Settings > Secrets and variables > Actions"
echo ""
echo "Required secrets:"
echo "- RAILWAY_TOKEN (from Railway dashboard)"
echo "- NETLIFY_AUTH_TOKEN (from Netlify user settings)"
echo "- NETLIFY_SITE_ID (from Netlify site settings)"
echo "- VITE_API_URL (your Railway API URL)"
echo "- VITE_SIGNALING_URL (your Railway Signaling URL)"
echo "- VITE_TRANSLATION_URL (your Railway Translation URL)"
echo "- VITE_BILLING_URL (your Railway Billing URL)"
echo "- VITE_STRIPE_PUBLISHABLE_KEY (your Stripe publishable key)"
echo "- SLACK_WEBHOOK (optional, for deployment notifications)"
echo ""
echo -e "${YELLOW}Press Enter when you've configured GitHub secrets...${NC}"
read -r

# Step 5: External Services
echo -e "${PURPLE}🔌 Step 5: External Services Setup${NC}"
echo ""
echo -e "${BLUE}Required API Keys:${NC}"
echo "1. OpenAI API Key:"
echo "   - Go to https://openai.com/api"
echo "   - Create account and generate API key"
echo "   - Add to Railway environment variables"
echo ""
echo "2. Stripe API Keys:"
echo "   - Go to https://stripe.com"
echo "   - Create account and get API keys"
echo "   - Add secret key to Railway"
echo "   - Add publishable key to Netlify"
echo ""
echo "3. Twilio (optional, for SMS):"
echo "   - Go to https://twilio.com"
echo "   - Get Account SID and Auth Token"
echo ""
echo -e "${YELLOW}Press Enter when you've configured external services...${NC}"
read -r

# Step 6: Database Migration
echo -e "${PURPLE}🗄️ Step 6: Database Migration${NC}"
echo "After your API service is deployed on Railway:"
echo "1. Go to Railway dashboard > API service"
echo "2. Open the service terminal or check deploy logs"
echo "3. The migration should run automatically"
echo "4. If not, manually run: npx prisma migrate deploy"
echo ""
echo -e "${YELLOW}Press Enter when database migration is complete...${NC}"
read -r

# Step 7: Testing
echo -e "${PURPLE}🧪 Step 7: Testing Your Deployment${NC}"
echo ""
echo "Test your deployment:"
echo "1. Visit your Netlify URL"
echo "2. Try registering a new account"
echo "3. Test login functionality"
echo "4. Create a test meeting"
echo "5. Test payment flow (use Stripe test cards)"
echo ""
echo -e "${YELLOW}Press Enter when testing is complete...${NC}"
read -r

# Step 8: Custom Domain (Optional)
echo -e "${PURPLE}🌍 Step 8: Custom Domain Setup (Optional)${NC}"
echo ""
echo "To use a custom domain:"
echo "1. Purchase domain from registrar"
echo "2. In Netlify: Site settings > Domain management > Add custom domain"
echo "3. In Railway: Each service > Settings > Networking > Custom domain"
echo "4. Configure DNS records as instructed"
echo ""
echo -e "${YELLOW}Skip this step if you're using default URLs. Press Enter to continue...${NC}"
read -r

# Final Summary
echo ""
echo -e "${GREEN}🎉 Deployment Setup Complete!${NC}"
echo ""
echo -e "${BLUE}Your Mitopia application should now be live at:${NC}"
echo "Frontend: https://your-app.netlify.app"
echo "API: https://your-api-service.up.railway.app"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo "1. 📊 Monitor your applications in Railway and Netlify dashboards"
echo "2. 📈 Set up analytics and monitoring"
echo "3. 🚀 Start marketing and acquiring users!"
echo "4. 💰 Monitor costs and scale as needed"
echo ""
echo -e "${BLUE}Useful Resources:${NC}"
echo "- Netlify Docs: https://docs.netlify.com"
echo "- Railway Docs: https://docs.railway.app"
echo "- Mitopia Deployment Guide: ./NETLIFY_RAILWAY_DEPLOYMENT.md"
echo "- GitHub Repository: https://github.com/IchuRisco/mitopia"
echo ""
echo -e "${GREEN}Happy deploying! 🚀${NC}"

# Create a deployment checklist file
cat > DEPLOYMENT_CHECKLIST.md << 'EOF'
# Mitopia Deployment Checklist

## ✅ Pre-Deployment
- [ ] GitHub repository created and code pushed
- [ ] Railway account created
- [ ] Netlify account created
- [ ] Domain purchased (optional)

## ✅ Railway Setup
- [ ] PostgreSQL database service created
- [ ] Redis service created
- [ ] API service deployed
- [ ] Signaling service deployed
- [ ] Translation service deployed
- [ ] Billing service deployed
- [ ] STT service deployed
- [ ] Notes service deployed
- [ ] Environment variables configured for all services

## ✅ Netlify Setup
- [ ] Site created from GitHub repository
- [ ] Build settings configured
- [ ] Environment variables configured
- [ ] Custom domain configured (optional)

## ✅ External Services
- [ ] OpenAI API key obtained and configured
- [ ] Stripe account created and keys configured
- [ ] Twilio account created (optional)
- [ ] Email service configured

## ✅ GitHub Configuration
- [ ] Repository secrets configured
- [ ] CI/CD workflow enabled
- [ ] Branch protection rules set up

## ✅ Database
- [ ] Migrations run successfully
- [ ] Initial data seeded (optional)
- [ ] Database backups configured

## ✅ Testing
- [ ] Frontend loads correctly
- [ ] User registration works
- [ ] User login works
- [ ] Meeting creation works
- [ ] Video/audio calling works
- [ ] Payment processing works
- [ ] AI features work (transcription, translation)

## ✅ Monitoring
- [ ] Error tracking set up (Sentry)
- [ ] Analytics configured (Google Analytics)
- [ ] Uptime monitoring set up
- [ ] Performance monitoring configured

## ✅ Security
- [ ] SSL certificates active
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Input validation working

## ✅ Go Live
- [ ] DNS records updated
- [ ] Custom domain working
- [ ] All services healthy
- [ ] Performance acceptable
- [ ] Ready for users!

## 📞 Support
If you encounter issues:
1. Check service logs in Railway/Netlify dashboards
2. Review environment variables
3. Test API endpoints manually
4. Check GitHub Actions for CI/CD issues
5. Create GitHub issue for bugs
EOF

echo ""
echo -e "${GREEN}📋 Created DEPLOYMENT_CHECKLIST.md for your reference${NC}"
echo ""
echo -e "${BLUE}Use this checklist to ensure everything is properly configured!${NC}"
