#!/bin/bash

# Mitopia GitHub Repository Setup Script
# Run this script to create and push to GitHub repository

echo "🚀 Setting up Mitopia GitHub Repository..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Step 1: Create GitHub Repository${NC}"
echo "Please go to https://github.com/new and create a new repository with:"
echo "  - Repository name: mitopia"
echo "  - Description: Mitopia - Your Meeting Utopia. AI-powered video calls with real-time transcription and translation."
echo "  - Visibility: Public (or Private if preferred)"
echo "  - DO NOT initialize with README, .gitignore, or license (we already have these)"
echo ""
echo -e "${YELLOW}Press Enter when you've created the repository...${NC}"
read -r

echo -e "${BLUE}Step 2: Push to GitHub${NC}"
echo "Pushing code to GitHub repository..."

# Check if remote exists and update it
if git remote get-url origin >/dev/null 2>&1; then
    echo "Updating remote origin..."
    git remote set-url origin https://github.com/IchuRisco/mitopia.git
else
    echo "Adding remote origin..."
    git remote add origin https://github.com/IchuRisco/mitopia.git
fi

# Push to GitHub
echo "Pushing main branch..."
if git push -u origin main; then
    echo -e "${GREEN}✅ Successfully pushed to GitHub!${NC}"
else
    echo -e "${RED}❌ Failed to push to GitHub${NC}"
    echo "You may need to authenticate. Try:"
    echo "git push -u origin main"
    echo ""
    echo "If authentication fails, you can:"
    echo "1. Use GitHub CLI: gh auth login"
    echo "2. Use personal access token in the URL"
    echo "3. Set up SSH keys"
    exit 1
fi

echo ""
echo -e "${GREEN}🎉 Mitopia is now on GitHub!${NC}"
echo ""
echo -e "${BLUE}Repository URL:${NC} https://github.com/IchuRisco/mitopia"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. 🔧 Configure GitHub repository settings:"
echo "   - Add repository description and topics"
echo "   - Enable GitHub Pages (optional)"
echo "   - Set up branch protection rules"
echo ""
echo "2. 🔐 Add GitHub Secrets for CI/CD:"
echo "   Go to: Settings > Secrets and variables > Actions"
echo "   Add these secrets:"
echo "   - PRODUCTION_SSH_KEY (SSH private key for deployment)"
echo "   - PRODUCTION_HOST (Production server IP address)"
echo "   - PRODUCTION_USER (SSH username for deployment)"
echo "   - SLACK_WEBHOOK (Slack webhook URL for notifications)"
echo ""
echo "3. 🚀 Deploy to production:"
echo "   - Follow PRODUCTION_DEPLOYMENT.md guide"
echo "   - Set up your production server"
echo "   - Configure domain and SSL certificates"
echo ""
echo "4. 📊 Monitor your application:"
echo "   - GitHub Actions will run on every push"
echo "   - Check the Actions tab for build status"
echo "   - Set up monitoring and alerts"
echo ""
echo -e "${GREEN}Mitopia is ready for production! 🌟${NC}"
