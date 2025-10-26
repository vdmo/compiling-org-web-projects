# Project Sync Guide

This document explains how to keep the website's project data automatically synced with GitHub repositories.

## Overview

The project sync system automatically fetches README content and repository metadata from GitHub and creates pull requests when changes are detected.

## How It Works

### 1. Sync Script (`scripts/sync-projects.js`)

The sync script:
- Reads all GitHub URLs from `src/data/projects.ts`
- Fetches README content and repository metadata using the GitHub API
- Extracts descriptions from README files
- Saves sync metadata to `.github/sync-metadata.json`

### 2. GitHub Actions Workflow (`.github/workflows/sync-projects.yml`)

The workflow runs:
- **Daily at 6 AM UTC** (scheduled)
- **Manually** via GitHub Actions UI
- **On push** when workflow or script files change

When changes are detected, it:
- Creates a pull request with updated metadata
- Labels it with `automated`, `sync`, `documentation`
- Provides a summary of changes

## Manual Sync

To manually sync project data:

```bash
# Set your GitHub token (optional, for higher rate limits)
export GITHUB_TOKEN=your_github_token

# Run the sync script
npm run sync-projects
```

This will:
1. Fetch data from all GitHub repositories
2. Create/update `.github/sync-metadata.json`
3. Show a summary of synced projects

## Updating Project Descriptions

After sync:

1. Review `.github/sync-metadata.json` for the latest README content
2. Manually update `src/data/projects.ts` if you want to improve descriptions
3. The `readmePreview` field contains extracted text from each README

## Adding New Projects

To add a new project and enable auto-sync:

1. **Add to `src/data/projects.ts`**:
```typescript
{
  id: "my-project",
  title: "My Project",
  tagline: "Short tagline",
  description: "Brief description",
  fullDescription: "Detailed description",
  href: "/projects/my-project",
  github: "https://github.com/compiling-org/my-project", // Required for sync
  status: "active",
  tags: ["Tag1", "Tag2"],
  color: "#hexcolor",
}
```

2. **Commit and push**

3. The workflow will automatically start tracking the new project

## Configuration

### GitHub Token

The workflow uses `GITHUB_TOKEN` which is automatically provided by GitHub Actions. No configuration needed!

For local development, you can optionally set your own token for higher rate limits:

```bash
export GITHUB_TOKEN=ghp_your_token_here
```

### Sync Frequency

To change the sync schedule, edit `.github/workflows/sync-projects.yml`:

```yaml
schedule:
  - cron: '0 6 * * *'  # Daily at 6 AM UTC
```

Cron syntax:
- `0 6 * * *` - Daily at 6 AM
- `0 */6 * * *` - Every 6 hours
- `0 0 * * 0` - Weekly on Sunday

## Sync Metadata Structure

`.github/sync-metadata.json`:

```json
{
  "lastSync": "2025-10-26T07:00:00.000Z",
  "projects": [
    {
      "repo": "compiling-org/project-name",
      "description": "GitHub repo description",
      "topics": ["rust", "webgpu"],
      "stars": 42,
      "readmePreview": "First paragraph from README..."
    }
  ]
}
```

## Workflow Permissions

The workflow requires:
- `contents: write` - To commit metadata changes
- `pull-requests: write` - To create pull requests

These are configured in the workflow file.

## Troubleshooting

### Workflow Not Running

- Check the Actions tab in GitHub
- Ensure workflows are enabled for the repository
- Verify the workflow file syntax

### Rate Limiting

GitHub API has rate limits:
- **Unauthenticated**: 60 requests/hour
- **Authenticated**: 5,000 requests/hour

The workflow uses authenticated requests automatically.

### No Pull Request Created

If no changes are detected, no PR is created. This is normal when:
- READMEs haven't changed
- Repository metadata is the same
- Topics/descriptions are unchanged

## Best Practices

1. **Review PRs promptly** - Automated PRs should be reviewed and merged regularly
2. **Manual updates** - For important copy changes, manually edit `projects.ts` instead of relying solely on README sync
3. **Keep READMEs updated** - Ensure your repository READMEs have good first paragraphs
4. **Use consistent formatting** - Start READMEs with a title and clear first paragraph

## Future Enhancements

Possible improvements:
- Automatic PR merging when CI passes
- Direct updates to `projects.ts` (currently manual)
- Webhook-based sync instead of scheduled
- Sync images from repositories
- Track repository activity metrics
