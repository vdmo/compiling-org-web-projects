# Updating Project Information

This guide explains how to keep project information on the website in sync with GitHub repositories.

## Quick Workflow

### 1. Sync from GitHub
```bash
npm run sync-projects
```
This fetches README content and repository metadata from GitHub and saves it to `.github/sync-metadata.json`.

### 2. Check Status
```bash
npm run check-descriptions
```
This analyzes the synced data and provides recommendations for which projects need updates.

### 3. Update Projects
Manually update `src/data/projects.ts` with comprehensive information from GitHub READMEs.

### 4. Verify Changes
```bash
npm run build
```
Build the project to ensure all changes work correctly.

### 5. Test Locally
```bash
npm run dev
```
View the updated project pages at `http://localhost:8080/projects/[project-id]`

## Detailed Update Process

### For Each Project

1. **Check GitHub README**
   - Visit `https://github.com/[owner]/[repo]`
   - Read the full README to understand all features and capabilities

2. **Update Project Data**
   Edit the project entry in `src/data/projects.ts`:

   ```typescript
   {
     id: "project-id",
     title: "Project Title",
     tagline: "Short catchy tagline (60 chars max)",
     description: "Brief description for cards (150 chars)",
     fullDescription: "Comprehensive description with ALL features from README",
     href: "/projects/project-id",
     github: "https://github.com/owner/repo",
     status: "active" | "development" | "planned" | "maintained",
     tags: ["Tag1", "Tag2", "Tag3"], // From README topics + technologies
     featured: true, // Optional
     color: "#hexcolor",
     features: [ // Optional - custom feature list from README
       {
         icon: "🎵",
         title: "Feature Title",
         description: "Detailed feature description from README"
       },
       // Add 3-5 key features
     ],
   }
   ```

3. **Key Fields to Update**

   - **tagline**: Capture the essence in one line
   - **fullDescription**: Include:
     - Main purpose and capabilities
     - Key features (audio system, visual system, etc.)
     - Technologies used (Rust, Bevy, WebGPU, etc.)
     - Use cases (live performance, development, etc.)
   - **tags**: Should reflect:
     - Programming languages (Rust, JavaScript)
     - Frameworks (Bevy, Three.js)
     - Technologies (WebGPU, MIDI, WGSL)
     - Categories (Audio, Visuals, AI, Blockchain)
   - **features** (optional): Extract 3-5 major feature sections from README:
     - Use emoji icons that match the feature category
     - Copy feature titles from README section headers
     - Summarize feature descriptions from README details
     - If not provided, the Key Features section won't display

## Example: NUWE Stripped Update

**Before:**
```typescript
fullDescription: "NUWE Stripped is a powerful node-based audio-visual..."
tags: ["Rust", "Audio", "Visuals", "Real-time", "Node-based", "Performance"]
```

**After (from GitHub README):**
```typescript
tagline: "Immersive VJ System with Node-Based Architecture",
fullDescription: "NUWE-Rust is an immersive VJ system that combines powerful audio and visual capabilities in a unified node-based architecture. Features include Glicol live coding for real-time audio synthesis, full MIDI support with device detection and routing, real-time FFT analysis and beat detection, GPU-accelerated rendering using Bevy engine with Vulkan/DirectX support, shader hot-reload for live development, and a comprehensive post-processing pipeline. The visual node editor allows creating complex workflows with seamless integration between audio and visual processing...",
tags: ["Rust", "Bevy", "Glicol", "MIDI", "Live Coding", "VJ", "Real-time"],
features: [
  {
    icon: "🎵",
    title: "Audio System",
    description: "Glicol live coding for real-time audio synthesis, full MIDI support with device detection, real-time FFT analysis, beat detection, and spectral analysis with advanced synthesis capabilities."
  },
  {
    icon: "🎨",
    title: "Visual System",
    description: "GPU-accelerated rendering using Bevy engine with Vulkan/DirectX support, shader hot-reload for real-time development, customizable post-processing pipeline, and efficient asset management."
  },
  // ... more features from README sections
]
```

## Automation Notes

### What's Automated
- ✅ Fetching README content from GitHub
- ✅ Repository metadata (stars, topics, description)
- ✅ Saving to sync-metadata.json

### What's Manual
- ⚠️ Writing comprehensive `fullDescription` from README features
- ⚠️ Choosing appropriate tags
- ⚠️ Creating/updating taglines
- ⚠️ Updating Three.js demo components (if needed)

## Best Practices

1. **Use Full README Content**: The GitHub README often has much more detail than the basic description
2. **List Specific Features**: Include bullet points about audio system, visual system, node architecture, etc.
3. **Match GitHub Topics**: Use repository topics as tags when relevant
4. **Technology Stack**: Always include the main technologies (Rust, Bevy, WebGPU, etc.)
5. **Use Cases**: Mention what the project is perfect for (VJ performances, live coding, etc.)
6. **Keep It Updated**: Run sync-projects regularly, especially after README updates

## Verification Checklist

After updating a project:

- [ ] `fullDescription` includes all major features from README
- [ ] Tags reflect technologies and categories
- [ ] Tagline is catchy and accurate
- [ ] Build completes without errors (`npm run build`)
- [ ] Project page displays correctly (`npm run dev`)
- [ ] Three.js demo loads (if applicable)
- [ ] All links work (GitHub, demo)

## Troubleshooting

### Sync fails for a repository
- Check if the repository exists and is public
- Verify GitHub token is set (if rate-limited)
- Check repository has a README file

### Description seems short
- The sync only captures the first paragraph
- Manually read the full GitHub README
- Extract key features and capabilities
- Write comprehensive fullDescription

### Build fails after update
- Check for syntax errors in projects.ts
- Ensure all required fields are present
- Verify color hex codes are valid
- Check that tags are strings

## Related Files

- `src/data/projects.ts` - Main project data
- `scripts/sync-projects.js` - GitHub sync script
- `scripts/update-project-descriptions.js` - Status check script
- `.github/sync-metadata.json` - Cached sync data
- `src/components/three/demos/` - Three.js visualizations
