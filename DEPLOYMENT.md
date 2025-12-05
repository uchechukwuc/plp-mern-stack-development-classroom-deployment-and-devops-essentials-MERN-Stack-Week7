# 🚀 Deployment Guide

This guide provides step-by-step instructions for deploying the MERN Todo application to production.

## 📋 Prerequisites

Before deploying, ensure you have:

1. **GitHub Repository**: Push your code to GitHub
2. **MongoDB Atlas**: Set up a MongoDB Atlas cluster
3. **Cloud Accounts**: Create accounts on deployment platforms
4. **Environment Variables**: Configure all required environment variables

## 🗄️ Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Create a free account

2. **Create a Cluster**
   - Choose "FREE" tier
   - Select your preferred cloud provider and region
   - Create cluster (takes 5-10 minutes)

3. **Set up Database Access**
   - Go to "Database Access" → "Add New Database User"
   - Create user with read/write permissions
   - Note down username and password

4. **Configure Network Access**
   - Go to "Network Access" → "Add IP Address"
   - Add `0.0.0.0/0` for development (restrict in production)
   - Or add your server's IP address

5. **Get Connection String**
   - Go to "Clusters" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

## 🔧 Backend Deployment

### Option 1: Render (Recommended)

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure service:
     - **Name**: `mern-backend`
     - **Runtime**: `Node`
     - **Build Command**: `cd server && npm install`
     - **Start Command**: `cd server && npm start`

3. **Environment Variables**
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   FRONTEND_URL=https://your-frontend-domain.com
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note the service URL

### Option 2: Railway

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create Project**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

3. **Environment Variables**
   - Add the same variables as Render

4. **Deploy**
   - Railway auto-deploys on push to main branch

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Configure project:
     - **Framework Preset**: `Create React App` or `Vite`
     - **Root Directory**: `./client`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

3. **Environment Variables**
   ```
   VITE_API_URL=https://your-backend-url.com
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel provides a `.vercel.app` domain

### Option 2: Netlify

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Deploy Site**
   - Drag & drop the `client/dist` folder
   - Or connect GitHub repository
   - Configure build settings:
     - **Base directory**: `client`
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`

3. **Environment Variables**
   - Add `VITE_API_URL` in site settings

## 🔄 CI/CD Setup

### GitHub Actions

The repository includes GitHub Actions workflows in `.github/workflows/ci.yml`:

1. **Automatic Triggers**
   - Runs on push to `main` and `develop` branches
   - Runs on pull requests

2. **Workflow Steps**
   - Backend testing and linting
   - Frontend building and linting
   - Automatic deployment on successful builds

3. **Required Secrets**
   - `VERCEL_TOKEN`: Vercel authentication token
   - `VERCEL_PROJECT_ID`: Vercel project ID
   - `VERCEL_ORG_ID`: Vercel organization ID
   - `RENDER_DEPLOY_HOOK_URL`: Render deploy webhook URL

## 🌐 Custom Domain Setup

### Backend (Render)
1. Go to your Render service settings
2. Add custom domain
3. Update DNS records as instructed
4. Update `FRONTEND_URL` environment variable

### Frontend (Vercel)
1. Go to project settings → Domains
2. Add custom domain
3. Update DNS records
4. Update `VITE_API_URL` if backend domain changed

## 🔒 Security Checklist

- [ ] Environment variables configured
- [ ] Database IP whitelist restricted
- [ ] JWT secrets are strong and unique
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Rate limiting active
- [ ] Helmet security headers enabled

## 📊 Monitoring Setup

1. **Health Checks**
   - Backend: `https://your-backend.com/api/health`
   - Frontend: `https://your-frontend.com`

2. **Uptime Monitoring**
   - Set up UptimeRobot or similar service
   - Monitor both frontend and backend URLs

3. **Error Tracking**
   - Consider Sentry for error monitoring
   - Set up alerts for critical errors

## 🔄 Maintenance

### Regular Tasks
- Monitor server resources
- Review error logs
- Update dependencies
- Backup database regularly

### Backup Strategy
```bash
# Run backup script weekly
./scripts/backup.sh mern-todo ./backups
```

### Updates
- Test updates in staging environment first
- Use CI/CD for automated deployments
- Have rollback plan ready

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check build logs in deployment platform
   - Verify environment variables
   - Ensure dependencies are properly installed

2. **Database Connection Issues**
   - Verify MongoDB Atlas connection string
   - Check network access settings
   - Confirm database user credentials

3. **CORS Errors**
   - Verify `FRONTEND_URL` matches actual frontend domain
   - Check CORS configuration in backend

4. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names match code expectations
   - Verify values are correct

### Rollback Procedure
```bash
# Rollback to previous version
./scripts/rollback.sh render previous
```

## 📞 Support

For deployment issues:
1. Check deployment platform documentation
2. Review application logs
3. Verify configuration settings
4. Test locally before deploying