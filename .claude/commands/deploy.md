# Deploy

Build and deploy the sauna guide website.

## Pre-deploy Checklist

```bash
npm run typecheck    # TypeScript errors
npm run lint         # Linting issues
npm run build        # Build succeeds
```

## Deploy Steps

1. Ensure all checks pass
2. Commit any pending changes
3. Push to main branch (Vercel auto-deploys)

## Post-deploy

1. Verify homepage loads
2. Test newsletter signup
3. Check sitemap at /sitemap.xml

$ARGUMENTS
