# 🌟 Mitopia - Your Meeting Utopia

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://python.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://typescriptlang.org/)

> Welcome to Mitopia - your meeting utopia! Experience HD video calls, real-time language interpretation, AI-powered transcription, and intelligent summaries that transform global conversations into actionable insights. Premium subscription service with 30-day free trial.

## ✨ Features

### 🎥 **HD Video & Audio Calls**
- Crystal clear WebRTC-based video calls
- Support for up to 100 participants (Premium)
- Audio-only mode for bandwidth optimization
- TURN/STUN server integration for NAT traversal
- Screen sharing and recording capabilities

### 🌍 **Real-Time Language Interpretation**
- Live translation for 50+ languages
- AI-powered voice interpretation
- Text translation overlay
- Multi-language meeting support
- Cultural context awareness

### 🧠 **AI-Powered Intelligence**
- Real-time speech-to-text transcription
- Speaker identification and labeling
- Automatic content organization into:
  - **Themes**: Discussion topics and clusters
  - **Important Notes**: Key highlights and insights
  - **Decisions**: Agreed-upon outcomes
  - **Action Items**: Tasks and follow-ups
- Smart meeting summaries with GPT-4 integration

### 💳 **Subscription Model**
- **30-Day Free Trial**: Full access to all premium features
- **Flexible Plans**: Individual, Team, and Enterprise tiers
- **Secure Payments**: Bank details, credit cards, PayPal integration
- **Usage Analytics**: Meeting insights and productivity metrics
- **Priority Support**: 24/7 customer assistance

### 📤 **Multi-Platform Export**
- Export to Google Docs, Notion, Slack, Microsoft Teams
- Email summaries with attachments
- PDF downloads with rich formatting
- JSON/XML exports for custom integrations
- Calendar integration (Google, Outlook, Apple)

### 🔒 **Enterprise Security**
- End-to-end encryption
- SOC 2 Type II compliance
- GDPR and HIPAA compliant
- Single Sign-On (SSO) integration
- Advanced user management

### ⚡ **Premium Experience**
- Join meetings with room codes or direct links
- Phone/email/SMS invitations
- Progressive Web App (PWA) support
- Mobile apps for iOS and Android
- Offline meeting preparation

## 🏗️ Architecture

Mitopia is built as a modern monorepo with microservices architecture:

```
mitopia/
├── apps/
│   ├── web/                 # Next.js frontend application
│   ├── mobile/              # React Native mobile apps
│   └── admin/               # Admin dashboard
├── services/
│   ├── api/                 # Node.js REST API service
│   ├── signaling/           # WebRTC signaling service
│   ├── stt/                 # Python speech-to-text service
│   ├── translation/         # Python real-time translation service
│   ├── notes/               # Python AI notes processing
│   ├── billing/             # Node.js subscription & payment service
│   └── analytics/           # Python usage analytics service
├── packages/
│   └── shared/              # Shared TypeScript types
├── scripts/
│   └── maintenance.py       # Automated maintenance tasks
└── config/
    └── turnserver.conf      # TURN server configuration
```

### Technology Stack

**Frontend:**
- Next.js 14 with React 18
- TypeScript for type safety
- Tailwind CSS + shadcn/ui for styling
- Framer Motion for animations
- Socket.IO for real-time communication

**Backend Services:**
- Node.js with Express/Fastify
- Python with FastAPI
- PostgreSQL/SQLite database
- Redis for caching and sessions
- RabbitMQ for message queues

**AI & ML:**
- OpenAI GPT for summarization
- Sentence Transformers for clustering
- faster-whisper for speech recognition
- scikit-learn for content analysis

**Infrastructure:**
- Docker & Docker Compose
- Railway for deployment
- GitHub Actions for CI/CD
- Prisma for database management

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/pnpm
- Python 3.11+
- Docker and Docker Compose
- Git

### 1. Clone and Setup

```bash
git clone https://github.com/your-org/talkflow.git
cd talkflow

# Install dependencies
npm install
cd apps/web && npm install
cd ../../services/api && npm install
cd ../signaling && npm install

# Install Python dependencies
cd ../stt && pip install -r requirements.txt
cd ../notes && pip install -r requirements.txt
```

### 2. Environment Configuration

```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```

Required environment variables:
```env
# Database
DATABASE_URL="sqlite:./talkflow.db"

# Redis
REDIS_URL="redis://localhost:6379"

# OpenAI (optional, for enhanced summaries)
OPENAI_API_KEY="your-openai-key"

# JWT Secret
JWT_SECRET="your-secure-jwt-secret"

# TURN Server (optional)
TURN_SERVER_URL="turn:your-turn-server.com:3478"
TURN_USERNAME="username"
TURN_PASSWORD="password"
```

### 3. Start Development Environment

```bash
# Start all services with Docker Compose
docker-compose up -d

# Start the frontend development server
cd apps/web
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- API: http://localhost:8001
- Signaling: http://localhost:8002
- STT Service: http://localhost:8003
- Notes Service: http://localhost:8004

### 4. Database Setup

```bash
# Generate Prisma client
cd services/api
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed with sample data
npx prisma db seed
```

## 📱 Usage

### Creating a Meeting

1. **Sign up** or **log in** to your TalkFlow account
2. Click **"New Meeting"** on the dashboard
3. Enter meeting title and description
4. Toggle **"Enable AI Notes"** if desired
5. Click **"Create Meeting"** to generate room code

### Joining a Meeting

**Option 1: Room Code**
- Go to `/join/[room-code]`
- Enter your name to join

**Option 2: Direct Invitation**
- Click invitation link sent via email/SMS
- Automatically join the meeting

### Using AI Notes

1. **During the meeting**: Click **"Organize Notes"** button
2. **Real-time transcription** begins automatically
3. **After the meeting**: Access organized notes with:
   - Discussion themes and topics
   - Important highlights
   - Decisions made
   - Action items assigned

### Exporting Notes

1. Go to **Meeting Notes** page
2. Choose export format:
   - **Google Docs**: Direct integration
   - **Notion**: Webhook export
   - **Slack**: Channel posting
   - **Email**: PDF attachment
   - **PDF**: Direct download

## 🔧 Configuration

### Database Options

**SQLite (Development):**
```env
DATABASE_URL="sqlite:./talkflow.db"
```

**PostgreSQL (Production):**
```env
DATABASE_URL="postgresql://user:pass@host:5432/talkflow"
```

**Free Hosting Options:**
- Railway PostgreSQL (500MB free)
- Supabase (500MB free)
- PlanetScale (1GB free)
- Neon (512MB free)

### AI Configuration

**OpenAI Integration:**
```env
OPENAI_API_KEY="sk-..."
OPENAI_MODEL="gpt-3.5-turbo"  # or gpt-4
```

**Local AI Models:**
```env
SENTENCE_MODEL="all-MiniLM-L6-v2"
STT_MODEL="base"  # whisper model size
```

### TURN Server Setup

For production deployments behind NAT:

```env
TURN_SERVER_URL="turn:your-server.com:3478"
TURN_USERNAME="your-username"
TURN_PASSWORD="your-password"
```

Free TURN server options:
- Metered.ca (50GB/month free)
- Xirsys (500MB/month free)
- Self-hosted with coturn

## 🚀 Deployment

### Railway Deployment

1. **Connect Repository**:
   ```bash
   railway login
   railway link
   ```

2. **Set Environment Variables**:
   ```bash
   railway variables set DATABASE_URL=postgresql://...
   railway variables set REDIS_URL=redis://...
   railway variables set OPENAI_API_KEY=sk-...
   ```

3. **Deploy Services**:
   ```bash
   railway up
   ```

### Manual Deployment

1. **Build Services**:
   ```bash
   # Build frontend
   cd apps/web && npm run build
   
   # Build API
   cd ../../services/api && npm run build
   ```

2. **Deploy with Docker**:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Environment-Specific Configs

**Development:**
- SQLite database
- Local Redis
- Hot reloading enabled

**Staging:**
- PostgreSQL database
- Redis Cloud
- Source maps enabled

**Production:**
- Managed database
- CDN integration
- Optimized builds
- Error tracking

## 🔍 API Documentation

### Authentication Endpoints

```typescript
POST /auth/register
POST /auth/login
POST /auth/refresh
POST /auth/verify
```

### Meeting Management

```typescript
GET    /meetings              # List user meetings
POST   /meetings              # Create new meeting
GET    /meetings/:id          # Get meeting details
PUT    /meetings/:id          # Update meeting
DELETE /meetings/:id          # Delete meeting
POST   /meetings/:id/join     # Join meeting
POST   /meetings/:id/leave    # Leave meeting
```

### Notes & Transcription

```typescript
GET    /meetings/:id/transcripts    # Get transcripts
GET    /meetings/:id/notes          # Get organized notes
POST   /meetings/:id/exports        # Export notes
GET    /notes/:id/themes            # Get discussion themes
GET    /notes/:id/actions           # Get action items
```

Full API documentation available at `/api/docs` when running locally.

## 🧪 Testing

### Unit Tests
```bash
# Frontend tests
cd apps/web && npm test

# API tests
cd services/api && npm test

# Python service tests
cd services/stt && python -m pytest
cd services/notes && python -m pytest
```

### Integration Tests
```bash
# End-to-end tests
npm run test:e2e

# API integration tests
npm run test:integration
```

### Load Testing
```bash
# Meeting capacity test
npm run test:load

# WebRTC stress test
npm run test:webrtc
```

## 🔧 Maintenance

### Automated Tasks

Daily maintenance script handles:
- Cleanup of old transcripts (30+ days)
- Cleanup of processed notes (90+ days)
- Session data cleanup (24+ hours)
- API key rotation (weekly)
- Health monitoring and reporting

```bash
# Run maintenance manually
python scripts/maintenance.py

# Schedule with cron
0 2 * * * /usr/bin/python3 /app/scripts/maintenance.py
```

### Monitoring

Health check endpoints:
- API: `GET /health`
- Signaling: `GET /health`
- STT: `GET /health`
- Notes: `GET /health`

Metrics collected:
- Active meetings
- Transcription accuracy
- Processing latency
- Error rates
- Resource usage

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Code Standards

- TypeScript for all frontend code
- ESLint + Prettier for formatting
- Conventional commits
- 80%+ test coverage
- Documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenAI](https://openai.com/) for GPT models
- [Hugging Face](https://huggingface.co/) for Transformers
- [WebRTC](https://webrtc.org/) for real-time communication
- [Railway](https://railway.app/) for hosting platform
- [shadcn/ui](https://ui.shadcn.com/) for UI components

## 📞 Support

- 📧 Email: support@talkflow.com
- 💬 Discord: [TalkFlow Community](https://discord.gg/talkflow)
- 📖 Docs: [docs.talkflow.com](https://docs.talkflow.com)
- 🐛 Issues: [GitHub Issues](https://github.com/your-org/talkflow/issues)

---

**Made with ❤️ by the TalkFlow Team**

*Transform your meetings. Amplify your productivity.*
