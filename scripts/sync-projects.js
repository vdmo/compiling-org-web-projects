#!/usr/bin/env node

/**
 * Sync Project Data from GitHub
 * 
 * This script fetches README content from GitHub repositories and updates
 * the project descriptions in src/data/projects.ts
 */

import { Octokit } from "@octokit/rest";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const ORG_NAME = "compiling-org";
const PROJECTS_FILE = path.join(__dirname, "../src/data/projects.ts");

// Initialize Octokit
const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

/**
 * Extract description from README markdown
 * Takes the first paragraph after the title
 */
function extractDescription(readmeContent) {
  if (!readmeContent) return null;

  // Remove title lines (lines starting with #)
  const lines = readmeContent.split("\n");
  const contentLines = [];
  let foundContent = false;

  for (const line of lines) {
    const trimmed = line.trim();
    
    // Skip title lines and empty lines at the start
    if (!foundContent && (trimmed.startsWith("#") || !trimmed)) {
      continue;
    }
    
    foundContent = true;
    contentLines.push(trimmed);
    
    // Stop after first paragraph (empty line)
    if (!trimmed && contentLines.length > 1) {
      break;
    }
  }

  return contentLines.filter(Boolean).join(" ").slice(0, 500);
}

/**
 * Fetch README from GitHub repository
 */
async function fetchReadme(owner, repo) {
  try {
    const { data } = await octokit.repos.getReadme({
      owner,
      repo,
    });

    // Decode base64 content
    const content = Buffer.from(data.content, "base64").toString("utf-8");
    return content;
  } catch (error) {
    console.warn(`Could not fetch README for ${owner}/${repo}:`, error.message);
    return null;
  }
}

/**
 * Fetch repository details
 */
async function fetchRepoDetails(owner, repo) {
  try {
    const { data } = await octokit.repos.get({
      owner,
      repo,
    });

    return {
      description: data.description,
      topics: data.topics || [],
      stargazers_count: data.stargazers_count,
      updated_at: data.updated_at,
    };
  } catch (error) {
    console.warn(`Could not fetch details for ${owner}/${repo}:`, error.message);
    return null;
  }
}

/**
 * Extract repository owner and name from GitHub URL
 */
function parseGithubUrl(url) {
  if (!url) return null;
  
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) return null;
  
  return {
    owner: match[1],
    repo: match[2],
  };
}

/**
 * Read current projects from projects.ts
 */
async function readProjectsFile() {
  const content = await fs.readFile(PROJECTS_FILE, "utf-8");
  return content;
}

/**
 * Write updated projects to projects.ts
 */
async function writeProjectsFile(content) {
  await fs.writeFile(PROJECTS_FILE, content, "utf-8");
}

/**
 * Main sync function
 */
async function syncProjects() {
  console.log("🔄 Syncing projects from GitHub...\n");

  const projectsContent = await readProjectsFile();
  
  // Extract all GitHub URLs from the file
  const githubUrlRegex = /github:\s*"([^"]+)"/g;
  const matches = [...projectsContent.matchAll(githubUrlRegex)];
  
  if (matches.length === 0) {
    console.log("⚠️  No GitHub URLs found in projects.ts");
    return;
  }

  console.log(`Found ${matches.length} projects with GitHub links\n`);

  const updates = [];

  for (const match of matches) {
    const url = match[1];
    const parsed = parseGithubUrl(url);
    
    if (!parsed) {
      console.warn(`⚠️  Invalid GitHub URL: ${url}`);
      continue;
    }

    console.log(`📦 Processing: ${parsed.owner}/${parsed.repo}`);

    // Fetch README and repo details
    const [readme, details] = await Promise.all([
      fetchReadme(parsed.owner, parsed.repo),
      fetchRepoDetails(parsed.owner, parsed.repo),
    ]);

    if (readme || details) {
      updates.push({
        url,
        owner: parsed.owner,
        repo: parsed.repo,
        readme,
        details,
      });
      console.log(`  ✅ Fetched data successfully`);
    } else {
      console.log(`  ⚠️  No data available`);
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`  - Total projects: ${matches.length}`);
  console.log(`  - Successfully synced: ${updates.length}`);
  console.log(`  - Failed: ${matches.length - updates.length}`);

  // Save sync metadata
  const syncData = {
    lastSync: new Date().toISOString(),
    projects: updates.map((u) => ({
      repo: `${u.owner}/${u.repo}`,
      description: u.details?.description || null,
      topics: u.details?.topics || [],
      stars: u.details?.stargazers_count || 0,
      readmePreview: u.readme ? extractDescription(u.readme) : null,
    })),
  };

  const syncMetadataPath = path.join(__dirname, "../.github/sync-metadata.json");
  await fs.mkdir(path.dirname(syncMetadataPath), { recursive: true });
  await fs.writeFile(
    syncMetadataPath,
    JSON.stringify(syncData, null, 2),
    "utf-8"
  );

  console.log(`\n✅ Sync complete! Metadata saved to .github/sync-metadata.json`);
  console.log(`\n💡 You can now manually update project descriptions in src/data/projects.ts`);
  console.log(`   based on the fetched README content.`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  syncProjects().catch((error) => {
    console.error("❌ Sync failed:", error);
    process.exit(1);
  });
}

export { syncProjects, fetchReadme, fetchRepoDetails };
