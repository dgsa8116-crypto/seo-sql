# Deployment

## GitHub Pages Setup

1. Create a GitHub repository and push this project.
2. Open repository settings.
3. Go to Pages.
4. Set Source to GitHub Actions.
5. Push to the `main` branch or run the workflow manually.

## Build Output

The workflow deploys the `dist/` directory.

```bash
npm run build
npm run validate
```

## Repository Variables

Optional repository variables:

- `REGISTER_REDIRECT_URL`: overrides `src/config/site.js` CTA URL.
- `CONTACT_EMAIL`: overrides the public contact email.

No API keys, database passwords, admin tokens, or private credentials are required.

## Public URL

Default GitHub Pages URL:

```text
https://USERNAME.github.io/REPOSITORY_NAME/
```

The workflow sets `PUBLIC_BASE_URL` automatically from the GitHub repository owner and repository name.

## Custom Domain

If you add a custom domain, update DNS through your domain provider and add the domain in GitHub Pages settings. Then set `PUBLIC_BASE_URL` in the workflow or repository environment if you need canonical URLs to use the custom domain.

## Rollback

Use GitHub Actions to redeploy a previous successful commit, or revert the content/config commit and push to `main`.
