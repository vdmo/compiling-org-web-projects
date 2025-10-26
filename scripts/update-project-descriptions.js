#!/usr/bin/env node

/**
 * Update Project Descriptions Helper
 * 
 * This script helps verify and update project descriptions with README content.
 * It reads the sync-metadata.json and provides recommendations for updates.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYNC_METADATA_PATH = path.join(__dirname, '../.github/sync-metadata.json');
const PROJECTS_FILE = path.join(__dirname, '../src/data/projects.ts');

async function main() {
  console.log('📋 Checking project descriptions...\n');

  try {
    // Read sync metadata
    const syncData = JSON.parse(await fs.readFile(SYNC_METADATA_PATH, 'utf-8'));
    const projectsContent = await fs.readFile(PROJECTS_FILE, 'utf-8');

    console.log(`Last sync: ${new Date(syncData.lastSync).toLocaleString()}`);
    console.log(`Projects synced: ${syncData.projects.length}\n`);

    // Check each project
    for (const project of syncData.projects) {
      const [owner, repo] = project.repo.split('/');
      console.log(`\n📦 ${owner}/${repo}`);
      console.log(`   Description: ${project.description}`);
      console.log(`   README Preview: ${project.readmePreview}`);
      console.log(`   Stars: ${project.stars}`);
      console.log(`   Topics: ${project.topics.join(', ') || 'none'}`);

      // Check if description matches
      if (project.description === project.readmePreview) {
        console.log('   ⚠️  Description and README preview are identical');
        console.log('   💡 Consider fetching full README for more detail');
      } else {
        console.log('   ✅ Has distinct description and README content');
      }
    }

    console.log('\n\n📝 Recommendations:');
    console.log('1. Run `npm run sync-projects` to fetch latest README content');
    console.log('2. Review .github/sync-metadata.json for updated descriptions');
    console.log('3. Manually update src/data/projects.ts with comprehensive information');
    console.log('4. Include specific features from README in fullDescription field');
    console.log('5. Add relevant tags based on README topics');

    console.log('\n✨ To update a specific project:');
    console.log('   1. Check GitHub README at https://github.com/[owner]/[repo]');
    console.log('   2. Copy key features and capabilities');
    console.log('   3. Update fullDescription in src/data/projects.ts');
    console.log('   4. Update tags to match README topics and technologies');
    console.log('   5. Run `npm run build` to verify changes');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code === 'ENOENT') {
      console.log('\n💡 Run `npm run sync-projects` first to generate sync metadata.');
    }
  }
}

main();
