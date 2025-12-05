  plp-mern-stack-development-classroo-kappa.vercel.app
  
# 🚀 MERN Stack Todo Application - Production Deployment

A full-stack MERN (MongoDB, Express.js, React, Node.js) Todo application with production-ready deployment, CI/CD pipelines, and monitoring setup.

## 🌟 Features

- ✅ **Full MERN Stack**: React frontend, Express.js backend, MongoDB database
- ✅ **Production Ready**: Optimized build, security headers, error handling
- ✅ **CI/CD Pipeline**: GitHub Actions for automated testing and deployment
- ✅ **Containerized**: Docker support for consistent deployments
- ✅ **Monitoring**: Health checks, logging, and maintenance scripts
- ✅ **Multi-Platform**: Deploy to Render, Vercel, Railway, Netlify, or Heroku

## 🚀 Live Demo

- **Frontend**: [https://mern-todo-frontend.vercel.app](https://mern-todo-frontend.vercel.app) *(Replace with your actual URL)*
- **Backend API**: [https://mern-todo-backend.onrender.com](https://mern-todo-backend.onrender.com) *(Replace with your actual URL)*
- **API Health Check**: [https://mern-todo-backend.onrender.com/api/health](https://mern-todo-backend.onrender.com/api/health)

## 📋 Prerequisites

- Node.js 18+
- MongoDB Atlas account
- GitHub account
- Accounts on deployment platforms (Render/Vercel recommended)

## 🛠️ Local Development

### Quick Setup (Recommended)

1. **Clone and setup automatically**
   ```bash
   git clone https://github.com/your-username/mern-deployment-project.git
   cd mern-deployment-project
   chmod +x setup.sh
   ./setup.sh
   ```

### Manual Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mern-deployment-project.git
   cd mern-deployment-project
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   # Or install individually:
   # npm install          # Root dependencies
   # cd server && npm install && cd ..
   # cd client && npm install && cd ..
   ```

3. **Environment Setup**
   ```bash
   # Backend environment variables
   cp server/.env.example server/.env
   # Edit server/.env with your MongoDB connection string

   # Frontend environment variables
   cp client/.env.example client/.env
   # Edit client/.env with your backend API URL
   ```

4. **MongoDB Setup** (Choose one option)

   **Option A: MongoDB Atlas (Recommended for deployment)**
   - Create account at [mongodb.com/atlas](https://mongodb.com/atlas)
   - Create free cluster and get connection string
   - Update `MONGODB_URI` in `server/.env`

   **Option B: Local MongoDB**
   - Install MongoDB locally
   - Start MongoDB service
   - Use default connection: `mongodb://127.0.0.1:27017/mern-todo`

   **Option C: Docker MongoDB**
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

5. **Start development servers**
   ```bash
   npm run dev                    # Start both frontend and backend
   # Or start individually:
   # Backend:  cd server && npm run dev
   # Frontend: cd client && npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000
   - Health Check: http://localhost:5000/api/health

### Demo Mode

The application works without MongoDB! If the database isn't connected, it will show demo todos and continue running normally.

## 🏗️ Project Structure

```
mern-deployment-project/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express.js backend
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── .github/workflows/      # CI/CD pipelines
├── monitoring/             # Monitoring configurations
├── scripts/                # Maintenance scripts
├── Dockerfile              # Container configuration
├── docker-compose.yml      # Local development setup
├── render.yaml             # Render deployment config
├── vercel.json             # Vercel deployment config
└── DEPLOYMENT.md           # Detailed deployment guide
```

## 🚀 Deployment

### Quick Deploy

1. **Database**: Set up MongoDB Atlas cluster
2. **Backend**: Deploy to Render (recommended)
3. **Frontend**: Deploy to Vercel (recommended)
4. **CI/CD**: GitHub Actions automatically deploys on push

### Detailed Instructions

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment guides.

## 🔧 API Endpoints

### Todos
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

### Health Check
- `GET /api/health` - Server health status

## 📊 CI/CD Pipeline

### GitHub Actions Workflow
- **Triggers**: Push to main/develop, Pull requests
- **Backend**: Tests, linting, security checks
- **Frontend**: Build, linting, optimization
- **Deployment**: Automatic deployment on successful builds

### Workflow Status
![CI/CD Status](https://github.com/your-username/mern-deployment-project/workflows/CI/CD%20Pipeline/badge.svg)

## 🔍 Monitoring & Maintenance

### Health Monitoring
- Application health checks every 30 seconds
- Database connection monitoring
- Memory and CPU usage tracking

### Maintenance Scripts
```bash
# Database backup
./scripts/backup.sh

# Rollback deployment
./scripts/rollback.sh [platform] [version]
```

### Recommended Monitoring Services
- **Uptime**: UptimeRobot (free tier)
- **Errors**: Sentry (error tracking)
- **Performance**: New Relic (application monitoring)

## 🐳 Docker Support

### Local Development
```bash
docker-compose up
```

### Production Build
```bash
docker build -t mern-todo .
docker run -p 5000:5000 mern-todo
```

## 🔒 Security Features

- Helmet.js security headers
- CORS configuration
- Rate limiting
- Input validation
- Environment variable protection
- HTTPS enforcement

## 📈 Performance Optimizations

- React code splitting
- Gzip compression
- Database connection pooling
- Caching strategies
- Optimized bundle size

## 🧪 Testing

```bash
# Backend tests
cd server && npm test

# Frontend linting
cd client && npm run lint

# Full CI pipeline
npm run test
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- MERN Stack community
- Open source contributors
- Deployment platform providers

## 📞 Support

For support and questions:
- Create an issue in this repository
- Check the [DEPLOYMENT.md](./DEPLOYMENT.md) guide
- Review deployment platform documentation

---

**Note**: This project was created as part of a DevOps and deployment learning assignment. The URLs and badges shown are examples - replace them with your actual deployed application URLs and CI/CD status badges.