# Quick Start Guide

## What's New? 🎉

### 6 New Projects Added
Your website now showcases **17 projects** (up from 10), including:
- NUWE Stripped (Audio/Visual performance)
- Modurust VST HexoDSP (VST3 plugin)
- PD-RS Synth (Pure Data synthesizer)
- Rust Fractal Shader Engine
- Stream Diffusion RS (AI/ML framework)
- NFT Blockchain Interactive

### Automatic GitHub Sync ✨
The website now automatically syncs with GitHub repositories!

## Using the Sync System

### Manual Sync (Local)
```bash
# Sync project data from GitHub
npm run sync-projects
```

This will:
- ✅ Fetch README content from all GitHub repositories
- ✅ Get repository metadata (stars, topics, descriptions)
- ✅ Save results to `.github/sync-metadata.json`

### Automatic Sync (GitHub Actions)
Once you push to GitHub, the workflow will:
- 🕐 Run daily at 6 AM UTC
- 🔍 Check for changes in repository READMEs
- 📝 Create a PR if changes are detected
- 🏷️ Label it as `automated` / `sync` / `documentation`

### Triggering Manual Sync on GitHub
1. Go to your repository on GitHub
2. Click **Actions** tab
3. Select **Sync Projects from GitHub** workflow
4. Click **Run workflow**

## Files Created

```
.github/
  ├── workflows/
  │   └── sync-projects.yml       # GitHub Actions workflow
  └── sync-metadata.json           # Will be created after first sync

scripts/
  └── sync-projects.js             # Sync script

SYNC_GUIDE.md                      # Detailed documentation
CHANGELOG.md                       # Change history
QUICK_START.md                     # This file
```

## Files Modified

```
src/data/projects.ts               # +6 new projects, fixed GitHub URLs
package.json                       # Added sync-projects script
package-lock.json                  # @octokit/rest dependency
README.md                          # Added sync documentation
```

## Next Steps

### 1. Install Dependencies (if needed)
```bash
npm install
```

### 2. Test the Sync Script
```bash
npm run sync-projects
```

### 3. Review Changes
```bash
git status
git diff
```

### 4. Commit and Push
```bash
git add .
git commit -m "feat: add 6 new projects and automatic GitHub sync system"
git push
```

### 5. Enable GitHub Actions
- Ensure GitHub Actions is enabled in your repository settings
- The workflow will start running automatically

### 6. Review Sync PRs
- When the workflow detects changes, it creates a PR
- Review the sync metadata in `.github/sync-metadata.json`
- Update `src/data/projects.ts` manually if you want better descriptions
- Merge the PR

## Testing Locally

### Test the Development Server
```bash
npm run dev
```

Visit http://localhost:5173 and check:
- ✅ All 17 projects appear
- ✅ New projects have proper colors and descriptions
- ✅ Links to GitHub repositories work
- ✅ Project detail pages load correctly

### Test the Build
```bash
npm run build
npm run preview
```

## Customization

### Change Sync Schedule
Edit `.github/workflows/sync-projects.yml`:
```yaml
schedule:
  - cron: '0 6 * * *'  # Daily at 6 AM UTC
```

### Add More Projects
1. Add project to `src/data/projects.ts`
2. Include `github` field with repository URL
3. Commit and push
4. Sync will automatically track it

## Documentation

- **SYNC_GUIDE.md** - Complete sync system documentation
- **CHANGELOG.md** - Detailed change history
- **README.md** - Main project documentation

## Troubleshooting

### Sync Script Fails
- Check you have `@octokit/rest` installed: `npm install`
- Check GitHub API rate limits (60/hour without token)
- Set `GITHUB_TOKEN` for higher limits: `export GITHUB_TOKEN=ghp_...`

### Workflow Not Running
- Check Actions tab in GitHub for errors
- Ensure workflows are enabled in repository settings
- Verify workflow syntax with GitHub Actions validator

### No Projects Show on Website
- Check `src/data/projects.ts` syntax
- Run `npm run dev` and check console for errors
- Ensure all required fields are present

## Support

For detailed information:
- See [SYNC_GUIDE.md](./SYNC_GUIDE.md) for sync system
- See [README.md](./README.md) for general documentation
- Check GitHub Actions logs for workflow issues

---

**Summary**: You now have 17 projects with automatic GitHub syncing! 🚀
