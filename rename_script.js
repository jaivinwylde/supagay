/**
 * Supagay Rename Script
 * 
 * This script uses the GitHub API to download specific files from the Supabase repository,
 * renames all instances of "supabase" to "supagay" in various cases, and then saves them
 * to the local repository.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Files to download from Supabase repository
const filesToDownload = [
  { path: 'README.md', output: 'README.md' },
  { path: 'package.json', output: 'package.json' },
  { path: 'docker/docker-compose.yml', output: 'docker/docker-compose.yml' },
  { path: 'apps/www/pages/index.tsx', output: 'apps/www/pages/index.tsx' },
  { path: 'apps/www/components/Nav/index.tsx', output: 'apps/www/components/Nav/index.tsx' },
  { path: 'apps/docs/pages/index.mdx', output: 'apps/docs/pages/index.mdx' },
  { path: 'packages/supabase-js/src/index.ts', output: 'packages/supagay-js/src/index.ts' },
];

// Function to download a file from GitHub
function downloadFile(repoPath, outputPath) {
  return new Promise((resolve, reject) => {
    const url = `https://raw.githubusercontent.com/supabase/supabase/master/${repoPath}`;
    const dirPath = path.dirname(outputPath);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const file = fs.createWriteStream(outputPath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(`Failed to download ${repoPath}: ${response.statusCode}`);
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve(outputPath);
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {}); // Delete the file on error
      reject(`Error downloading ${repoPath}: ${err.message}`);
    });
  });
}

// Function to replace all instances of "supabase" with "supagay" in a file
function replaceInFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace all case variations
  content = content.replace(/Supabase/g, 'Supagay');
  content = content.replace(/supabase/g, 'supagay');
  content = content.replace(/SUPABASE/g, 'SUPAGAY');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Replaced in ${filePath}`);
}

async function main() {
  console.log('🏳️‍🌈 Starting Supagay rename process...');
  
  // Download and rename files
  for (const file of filesToDownload) {
    try {
      console.log(`Downloading ${file.path}...`);
      await downloadFile(file.path, file.output);
      console.log(`Renaming in ${file.output}...`);
      replaceInFile(file.output);
    } catch (error) {
      console.error(`Error processing ${file.path}: ${error}`);
    }
  }
  
  console.log('🎉 Supagay rename process complete!');
}

main().catch(console.error);