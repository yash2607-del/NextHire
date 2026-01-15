# Railway Environment Variables - Quick Setup

Copy and paste these into Railway Dashboard → Your Project → Variables

## Required Variables

```bash
MONGO_URL=mongodb+srv://yash2602:yash_26@nexthirecluster.n3vavg6.mongodb.net/nexthire
JWT_SECRET=nexthire-production-secret-change-me
NODE_ENV=production
CORS_ORIGIN=${{RAILWAY_STATIC_URL}}
```

## Important Notes

1. **CORS_ORIGIN**: Use `${{RAILWAY_STATIC_URL}}` - Railway will auto-fill this with your app's URL
2. **JWT_SECRET**: Change to a strong random string in production!
3. **PORT**: Railway sets this automatically - don't override unless necessary
4. **MONGO_URL**: Ensure your MongoDB Atlas allows connections from Railway IPs (0.0.0.0/0 for testing)

## After Setting Variables

1. Click "Deploy" or push to GitHub
2. Wait 3-5 minutes for build to complete
3. Visit your Railway URL to test
4. Check logs if any issues: Railway Dashboard → Deployments → View Logs

## Security Checklist

- [ ] Changed JWT_SECRET from default
- [ ] MongoDB IP whitelist configured
- [ ] .env files not committed to Git
- [ ] CORS_ORIGIN matches your domain
- [ ] All API endpoints tested in production
