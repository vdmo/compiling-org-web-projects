# Changelog

## [Unreleased] - 2025-10-26

### Added

#### New Projects
Added 6 new projects from compiling-org repositories:
- **NUWE Stripped** - Node-based audio-visual performance system (Rust, Audio, Visuals)
- **Modurust VST HexoDSP** - VST3 plugin with modular synthesis (Rust, VST3, Audio)
- **PD-RS Synth** - Pure Data powered VST3 synthesizer (Pure Data, VST3, Synthesis)
- **Rust Fractal Shader Engine** - GPU-accelerated fractal rendering system (Rust, Bevy, Fractals)
- **Stream Diffusion RS** - Multimodal AI research framework in Rust (AI, ML, EEG, Neurofeedback)
- **NFT Blockchain Interactive** - Interactive NFT system with blockchain integration (Blockchain, NFT, Web3)

#### Automatic Sync System
- **Sync Script** (`scripts/sync-projects.js`)
  - Fetches README content from GitHub repositories
  - Extracts project descriptions automatically
  - Retrieves repository metadata (stars, topics, descriptions)
  - Saves sync data to `.github/sync-metadata.json`
  - NPM script: `npm run sync-projects`

- **GitHub Actions Workflow** (`.github/workflows/sync-projects.yml`)
  - Runs daily at 6 AM UTC
  - Can be triggered manually
  - Creates PRs when changes detected
  - Automatically labels PRs with `automated`, `sync`, `documentation`

- **Documentation**
  - `SYNC_GUIDE.md` - Comprehensive guide for the sync system
  - Updated main README with sync information
  - Instructions for adding new projects
  - Troubleshooting guide

### Changed
- Updated GitHub repository URLs to use `compiling-org` organization
- Fixed repository references for all projects
- Enhanced project descriptions with more detail

### Dependencies
- Added `@octokit/rest` for GitHub API integration

### Project Count
- Total projects: 17 (increased from 10)
- Featured projects: 7
- Active projects: 4
- In development: 11
- Planned: 2

## Benefits

### Automated Maintenance
- No manual checking of GitHub for updates
- Automatic notification via PRs when READMEs change
- Consistent project metadata

### Better Project Information
- Always up-to-date descriptions
- Accurate repository stats
- Synced tags and topics

### Developer Experience
- Simple command to sync: `npm run sync-projects`
- Clear documentation
- Easy to add new projects
- Automated workflow handles the heavy lifting

## Next Steps

1. Commit and push these changes
2. GitHub Actions will start monitoring repositories
3. Daily sync will keep project data fresh
4. Review automated PRs when they arrive
5. Manually update `projects.ts` descriptions as needed based on sync metadata
