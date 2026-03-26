# PeerReject Production Deployment Checklist

## Pre-Deployment Checks

### 1. Environment Configuration
- [ ] K2_API_KEY is set and valid for production
- [ ] K2_API_URL points to production K2 API endpoint
- [ ] OTEL_EXPORTER_OTLP_ENDPOINT configured for production monitoring (if using)
- [ ] NODE_ENV is set to 'production'
- [ ] NEXT_TELEMETRY_DISABLED=1 is set

### 2. Next.js Build Verification
- [ ] Run `npm run build` locally to verify no build errors
- [ ] Verify standalone output is generated in `.next/standalone`
- [ ] Check for any TypeScript errors: `npx tsc --noEmit`
- [ ] Run linting: `npm run lint`
- [ ] Test PDF parsing functionality with sample PDFs
- [ ] Verify all API routes work: `/api/parse-pdf`, `/api/review`, `/api/synthesize`

### 3. Security Hardening
- [ ] Ensure K2 API key is not exposed in client-side code
- [ ] Review API routes for proper input validation
- [ ] Implement rate limiting on `/api/parse-pdf` to prevent abuse
- [ ] Validate uploaded PDF files (size limits, type checking)
- [ ] Enable security headers in next.config.ts:
  ```typescript
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
      ],
    },
  ]
  ```
- [ ] Review pdf-parse usage for potential vulnerabilities

### 4. Performance Optimization
- [ ] Verify `serverExternalPackages: ['pdf-parse']` is configured
- [ ] Enable image optimization for landing.png and other assets
- [ ] Check bundle size: `npx @next/bundle-analyzer`
- [ ] Configure appropriate caching headers for static assets
- [ ] Verify KaTeX CSS is properly loaded (for math rendering)

### 5. SEO & Metadata
- [ ] Verify sitemap.ts generates correct URLs
- [ ] Check robots.txt is properly configured
- [ ] Verify OpenGraph images work for blog posts
- [ ] Test llms.txt is accessible at /llms.txt
- [ ] Verify all locale files (en.json, ar.json) are complete

### 6. Monitoring & Observability
- [ ] Configure instrumentation.ts for production tracing
- [ ] Set up error tracking (Sentry recommended for Next.js)
- [ ] Configure logging for API routes (especially parse-pdf for debugging)
- [ ] Set up uptime monitoring for critical endpoints
- [ ] Monitor K2 API usage and costs

### 7. Docker Deployment
- [ ] Build Docker image: `docker build -t peer-reject .`
- [ ] Test container locally: `docker run -p 3000:3000 --env-file .env peer-reject`
- [ ] Verify health check endpoint works
- [ ] Test PDF upload functionality in containerized environment
- [ ] Verify multi-architecture build (amd64/arm64) works

### 8. CI/CD Pipeline
- [ ] GitHub Actions workflow passes all stages
- [ ] Docker image is pushed to container registry
- [ ] Deployment secrets are configured in GitHub:
  - `GITHUB_TOKEN` (automatic)
  - Production environment variables
- [ ] Set up deployment environment protection rules

### 9. Database/State (if applicable)
- [ ] Note: This app appears to be stateless - verify no persistent storage needed
- [ ] Review results page for client-side state management

### 10. Post-Deployment Verification
- [ ] Test full user flow: upload PDF → review → results
- [ ] Verify blog posts render correctly with markdown/KaTeX
- [ ] Test language switching (en/ar) functionality
- [ ] Check mobile responsiveness
- [ ] Verify 404 page works correctly
- [ ] Test all agent configurations from agentConfig.ts
- [ ] Monitor error rates for first 24 hours

## Rollback Plan
1. Keep previous Docker image tagged
2. Use container registry's image history
3. If using Vercel: instant rollback via dashboard
4. Document rollback procedure for team

## Performance Targets
- [ ] First Contentful Paint (FCP): < 1.5s
- [ ] Time to Interactive (TTI): < 3s
- [ ] PDF parsing: < 10s for typical academic paper
- [ ] API response time for /api/review: < 30s (depends on K2 API)

## Emergency Contacts
- K2 API Support: [Add contact]
- Infrastructure Team: [Add contact]
- On-call Engineer: [Add contact]
