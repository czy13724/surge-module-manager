# Surge Module Manager

A modern web application for managing Surge modules, built with Next.js and deployable to Vercel.

## Features

- GitHub OAuth authentication
- Edit module files from GitHub/Gist
- Support for HTTP and Cron type scripts
- Modern and responsive user interface
- Local and remote mode support
- Bilingual support (English/Chinese)

## Getting Started

### Deploy to Vercel

1. Fork this repository to your GitHub account

2. Create a new OAuth App in GitHub:
   - Go to Settings > Developer settings > OAuth Apps > New OAuth App
   - Set Homepage URL to your Vercel domain
   - Set Authorization callback URL to `https://your-domain/api/auth/callback/github`

3. Import project in Vercel:
   - Connect your GitHub repository
   - Set environment variables:
     ```
     NEXTAUTH_URL=https://your-domain
     # Generate a secret using: openssl rand -base64 32
     # Or use: https://generate-secret.vercel.app/32
     NEXTAUTH_SECRET=generated-secret
     GITHUB_ID=github-oauth-app-client-id
     GITHUB_SECRET=github-oauth-app-client-secret
     ```

4. After deployment, visit your Vercel domain to start using the app

### Remote Storage Options

In remote mode, you can choose where to store your module files:

1. **GitHub Repository**
   - Store modules as files in a repository
   - Supports private repositories
   - Better for version control and collaboration
   - Set repository name in settings

2. **GitHub Gist**
   - Store each module as a Gist
   - Supports private Gists
   - Better for individual module management
   - Quick sharing via Gist URLs

You can switch between these storage options in the app settings. The app will remember your preference for future saves.

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Copy `.env.local.example` to `.env.local` and fill in the configuration

3. Run development server:
```bash
npm run dev
```

## Usage Guide

1. **Authentication**
   - Sign in with your GitHub account (required for remote mode)
   - Local mode is available without authentication

2. **Module Management**
   - Import existing modules or create new ones
   - Edit module configurations
   - Add HTTP request or Cron type scripts
   - Save changes (auto-sync with GitHub/Gist in remote mode)

3. **Script Types**
   - HTTP Request: Configure pattern and MITM domain
   - Cron: Set pattern and timeout

## Important Notes

- GitHub OAuth App requires appropriate scopes (repo, gist)
- Ensure environment variables are correctly configured
- Custom domain is recommended
- All data in local mode is stored in the browser

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

[中文文档](./README_CN.md)
