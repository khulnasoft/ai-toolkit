#!/usr/bin/env tsx

import * as https from 'https';

/**
 * Fetches the raw HTML text from the given URL using https.
 */
function fetchPage(url: string, retries = 10, delay = 4000): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(url, res => {
        if (res.statusCode === 429 && retries > 0) {
          // Handle rate limiting with exponential backoff
          const retryDelay = delay * 2;
          console.log(`Rate limited, retrying in ${delay}ms...`);
          setTimeout(() => {
            fetchPage(url, retries - 1, retryDelay)
              .then(resolve)
              .catch(reject);
          }, delay);
          return;
        }

        if (res.statusCode !== 200) {
          reject(
            new Error(`Failed to fetch page. Status code: ${res.statusCode}`),
          );
          return;
        }

        let rawData = '';
        res.on('data', chunk => (rawData += chunk));
        res.on('end', () => resolve(rawData));
      })
      .on('error', err => reject(err));
  });
}

/**
 * Extracts weekly downloads from the npm package page
 * using a regex-based search on the HTML.
 */
function parseWeeklyDownloads(html: string): number {
  // Look for the weekly downloads number in the new HTML structure
  const weeklyDownloadsRegex =
    /Weekly Downloads<\/h3>.*?<p[^>]*>([0-9,]+)<\/p>/s;
  const match = html.match(weeklyDownloadsRegex);

  if (!match) {
    return 0;
  }

  const downloadsStr = match[1].replace(/[^\d]/g, ''); // remove commas
  return parseInt(downloadsStr, 10) || 0;
}

/**
 * Main execution function.
 */
async function main() {
  const packages = [
    '@ai-toolkit/openai',
    '@ai-toolkit/openai-compatible',
    '@ai-toolkit/azure',
    '@ai-toolkit/anthropic',
    '@ai-toolkit/amazon-bedrock',
    '@ai-toolkit/google',
    '@ai-toolkit/google-vertex',
    '@ai-toolkit/mistral',
    '@ai-toolkit/xai',
    '@ai-toolkit/togetherai',
    '@langdb/khulnasoft-provider',
    '@ai-toolkit/cohere',
    '@ai-toolkit/fireworks',
    '@ai-toolkit/deepinfra',
    '@ai-toolkit/deepseek',
    '@ai-toolkit/cerebras',
    '@ai-toolkit/groq',
    '@ai-toolkit/replicate',

    'ollama-ai-provider',
    'chrome-ai',
    '@portkey-ai/khulnasoft-provider',
    'workers-ai-provider',
    '@openrouter/ai-toolkit-provider',
  ];
  const results: Array<{
    package: string;
    'weekly downloads': number;
    percentage: string;
  }> = [];

  try {
    for (const pkg of packages) {
      const url = `https://www.npmjs.com/package/${pkg}`;
      const html = await fetchPage(url);
      const weeklyDownloads = parseWeeklyDownloads(html);

      results.push({
        package: pkg,
        'weekly downloads': weeklyDownloads,
        percentage: '0%', // Initial placeholder
      });
    }

    // Calculate total downloads
    const totalDownloads = results.reduce(
      (sum, item) => sum + item['weekly downloads'],
      0,
    );

    // Update percentages
    results.forEach(item => {
      const percentage = (item['weekly downloads'] / totalDownloads) * 100;
      item['percentage'] = `${percentage.toFixed(1)}%`;
    });

    // Sort results by weekly downloads in descending order
    results.sort((a, b) => b['weekly downloads'] - a['weekly downloads']);

    console.table(results);
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
