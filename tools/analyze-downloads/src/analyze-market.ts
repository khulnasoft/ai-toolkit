#!/usr/bin/env tsx

// @ts-ignore - Node.js modules for tsx runtime
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
            new Error(`Failed to fetch ${url}. Status code: ${res.statusCode}`),
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
    // Core AI Toolkit
    'ai',

    // Major AI Providers
    'openai',
    '@anthropic-ai/sdk',
    'langchain',

    // AWS
    '@aws-sdk/client-bedrock-runtime',

    // Google GenAI (comprehensive coverage)
    '@google/generative-ai',
    '@google-cloud/vertexai',
    '@google-cloud/aiplatform',
    '@google/generative-ai-testing',
    'google-generative-ai',
    'vertex-ai',
    'google-gemini-api',
    '@google/ai-sdk',

    // Other providers
    '@xenova/transformers',
    '@mistralai/mistralai',
    'llamaindex',
    '@instructor-ai/instructor',
    'together-ai',

    // Additional Google AI packages
    'google-cloud-speech',
    'google-cloud-vision',
    'google-cloud-language',
    'google-cloud-translate',
    'google-cloud-dialogflow',
    'google-cloud-automl',
  ];
  const results: Array<{
    package: string;
    'weekly downloads': number;
    percentage: string;
    category: string;
  }> = [];

  try {
    for (const pkg of packages) {
      const url = `https://www.npmjs.com/package/${pkg}`;
      const html = await fetchPage(url);
      const weeklyDownloads = parseWeeklyDownloads(html);

      // Categorize packages for better analysis
      let category = 'Other';
      if (pkg === 'ai') {
        category = 'AI Toolkit';
      } else if (['openai', '@anthropic-ai/sdk', 'langchain'].includes(pkg)) {
        category = 'Major AI Providers';
      } else if (['@aws-sdk/client-bedrock-runtime'].includes(pkg)) {
        category = 'AWS';
      } else if (
        pkg.includes('google') ||
        pkg.includes('vertex') ||
        pkg.includes('gemini')
      ) {
        category = 'Google GenAI';
      } else if (
        [
          '@xenova/transformers',
          '@mistralai/mistralai',
          'llamaindex',
          '@instructor-ai/instructor',
          'together-ai',
        ].includes(pkg)
      ) {
        category = 'Other Providers';
      }

      results.push({
        package: pkg,
        'weekly downloads': weeklyDownloads,
        percentage: '0%', // Initial placeholder
        category,
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

    console.log('📊 AI Package Market Analysis');
    console.log('================================');
    console.table(results);

    // Generate category summary
    const categorySummary = results.reduce(
      (acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = {
            count: 0,
            totalDownloads: 0,
            packages: [],
          };
        }
        acc[item.category].count++;
        acc[item.category].totalDownloads += item['weekly downloads'];
        acc[item.category].packages.push(item.package);
        return acc;
      },
      {} as Record<
        string,
        { count: number; totalDownloads: number; packages: string[] }
      >,
    );

    console.log('\n📈 Category Summary:');
    console.log('===================');
    Object.entries(categorySummary)
      .sort(([, a], [, b]) => b.totalDownloads - a.totalDownloads)
      .forEach(([category, data]) => {
        const categoryPercentage = (
          (data.totalDownloads / totalDownloads) *
          100
        ).toFixed(1);
        console.log(
          `${category}: ${data.count} packages, ${data.totalDownloads.toLocaleString()} downloads (${categoryPercentage}%)`,
        );
      });

    // Highlight Google GenAI ecosystem
    const googleGenAI = categorySummary['Google GenAI'];
    if (googleGenAI) {
      const googlePercentage = (
        (googleGenAI.totalDownloads / totalDownloads) *
        100
      ).toFixed(1);
      console.log(
        `\n🎯 Google GenAI Ecosystem: ${googleGenAI.totalDownloads.toLocaleString()} downloads (${googlePercentage}%)`,
      );
      console.log(
        `Top Google packages: ${googleGenAI.packages.slice(0, 3).join(', ')}`,
      );
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
