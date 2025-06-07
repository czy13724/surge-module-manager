# Surge Module Manager

A modern web application for managing Surge modules, built with Next.js and deployable to Vercel.

## Features

- Local and remote mode support
- Bilingual support (English/Chinese)
- GitHub OAuth authentication
- Module import and export
- HTTP and Cron type scripts management
- Modern responsive interface
- Real-time preview and editing
- One-click copy and download

## Getting Started

### Online Usage

Visit: [Surge Module Manager](https://your-domain)

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

### 1. Basic Operations

#### Local Mode
- No login required, data stored in browser
- Import/export module files
- Direct module editing and management

#### Remote Mode
- GitHub account login required
- Sync with GitHub Gist
- Online sharing and collaboration

### 2. Module Management

#### Create New Module
1. Fill in basic module information:
   - Module name (required)
   - Module description (optional)

2. Add scripts:
   - Click "Add Script" button
   - Choose script type (HTTP or Cron)
   - Fill in corresponding parameters

#### Import Existing Module
1. Click "Import Module" button in the top bar
2. Select a .sgmodule file
3. System will automatically parse and load the module content

### 3. Script Configuration

#### HTTP Type Script
- **Required Parameters**:
  - Name
  - Type (http-request/http-response)
  - URL pattern
  - Script path
- **Auto-added Parameters**:
  - requires-body=1
  - max-size=0
  - script-update-interval=604800

#### Cron Type Script
- **Required Parameters**:
  - Name
  - Cron expression
  - Script path
- **Auto-added Parameters**:
  - timeout=6000
  - script-update-interval=604800

### 4. Editing Feature

1. View all scripts in the "Existing Scripts" section on the right
2. Click the "Edit" button of a script
3. The form on the left will be auto-filled with the script's information
4. Click "Add" button after modification to save changes

### 5. Export and Share

- **Copy to Clipboard**: Click "Copy" button
- **Download File**: Click "Download" button to save as .sgmodule file
- **Remote Mode**: Direct save to GitHub Gist (login required)

## Developer Guide

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXTAUTH_URL` | Application deployment URL | `https://your-domain` |
| `NEXTAUTH_SECRET` | NextAuth.js encryption key | Generate using `openssl rand -base64 32` or surf: https://generate-secret.vercel.app/32|
| `GITHUB_ID` | GitHub OAuth App client ID | Get from GitHub developer settings |
| `GITHUB_SECRET` | GitHub OAuth App client secret | Get from GitHub developer settings |

### Project Structure

```
├── components/          # React components
├── contexts/           # React contexts
├── pages/             # Next.js pages
├── public/            # Static assets
└── styles/            # Style files
```

## Important Notes

1. **Module Format**
   - Ensure imported modules follow Surge module specifications
   - File extension must be .sgmodule

2. **Script Path**
   - HTTPS links recommended
   - Ensure scripts are accessible by Surge

3. **Security**
   - Remote mode requires GitHub authorization
   - Local mode data is stored in browser only

## FAQ

Q: Why can't I import modules?
A: Ensure file format is correct and it's a valid .sgmodule file

Q: How to switch language?
A: Click the language switch button in the top navigation bar

Q: How to backup data?
A: Export files in local mode, auto-save to GitHub in remote mode

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

[中文文档](./README_CN.md)
