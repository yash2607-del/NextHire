# Railway Deployment Guide for NextHire

## Prerequisites
- Railway account (sign up at railway.app)
- MongoDB Atlas account with connection string
- GitHub repository (optional but recommended)

## Deployment Steps

### Option 1: Deploy from GitHub (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Railway deployment"
   git push origin main
   ```

2. **Create a new Railway project**
   - Go to [Railway Dashboard](https://railway.app/dashboard)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your NextHire repository
   - Railway will automatically detect the project

3. **Configure Environment Variables**
   In Railway Dashboard → Your Project → Variables, add:
   
   ```
   MONGO_URL=mongodb+srv://yash2602:yash_26@nexthirecluster.n3vavg6.mongodb.net/nexthire
   JWT_SECRET=nexthire
   NODE_ENV=production
   PORT=5000
   CORS_ORIGIN=${{RAILWAY_STATIC_URL}}
   ```
   
   Note: `${{RAILWAY_STATIC_URL}}` is a Railway variable that auto-fills with your app URL

4. **Deploy**
   - Railway will automatically build and deploy
   - Wait for the build to complete (3-5 minutes)
   - Your app will be available at the generated Railway URL

### Option 2: Deploy using Railway CLI

1. **Install Railway CLI**
   ```bash
   npm i -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Initialize Railway project**
   ```bash
   railway init
   ```

4. **Link to your project**
   ```bash
   railway link
   ```

5. **Set environment variables**
   ```bash
   railway variables set MONGO_URL="mongodb+srv://yash2602:yash_26@nexthirecluster.n3vavg6.mongodb.net/nexthire"
   railway variables set JWT_SECRET="nexthire"
   railway variables set NODE_ENV="production"
   railway variables set CORS_ORIGIN="https://your-app.up.railway.app"
   ```

6. **Deploy**
   ```bash
   railway up
   ```

## Build Process

Railway will execute these commands in order:

1. **Install Dependencies**
   ```bash
   npm install
   npm run install:client
   npm run install:server
   ```

2. **Build Client**
   ```bash
   npm run build:client
   ```

3. **Start Server**
   ```bash
   cd server && npm start
   ```

## Configuration Files

### package.json (root)
Contains scripts for building and deploying the full-stack app:
- `npm run build` - Builds the React client
- `npm start` - Starts the Express server
- `npm run deploy` - Builds client then starts server

### railway.toml
Railway-specific configuration for build and deploy settings

### nixpacks.toml
Nixpacks configuration for Railway's build system

## Environment Variables Required

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URL` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT tokens | `nexthire` |
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port (auto-set by Railway) | `5000` |
| `CORS_ORIGIN` | Allowed CORS origins | Your Railway URL |

## Troubleshooting

### Build Fails
- Check Railway logs for specific errors
- Ensure all environment variables are set
- Verify MongoDB connection string is correct

### App Crashes After Deploy
- Check server logs: `railway logs`
- Verify PORT variable is not hardcoded
- Check MongoDB Atlas allows Railway IP addresses

### 404 Errors on Routes
- Server must serve `index.html` for client-side routing
- Verify static file serving is configured (already done in server.js)

### CORS Errors
- Update `CORS_ORIGIN` to match your Railway domain
- Format: `https://your-app.up.railway.app`

## Post-Deployment

1. **Test your deployment**
   - Visit your Railway URL
   - Test login/signup
   - Test all major features

2. **Set up custom domain (optional)**
   - Railway Dashboard → Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

3. **Monitor your app**
   - Railway Dashboard → Metrics
   - Check CPU, Memory, and Request stats

## Updating Your Deployment

### Automatic Deploys (GitHub)
Push to your main branch:
```bash
git add .
git commit -m "Update feature"
git push origin main
```
Railway will automatically redeploy.

### Manual Deploys (CLI)
```bash
railway up
```

## Security Recommendations

1. **Change JWT_SECRET** to a strong random string (32+ characters)
2. **Enable MongoDB IP Whitelist** (add Railway's IPs)
3. **Use environment variables** for all secrets
4. **Never commit .env files** to Git

## Cost Estimation

Railway free tier includes:
- $5 credit per month
- Sleep after 30 mins of inactivity
- 500 hours of usage

For production apps, consider upgrading to a paid plan.

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- NextHire Issues: [Your GitHub Repo]/issues
