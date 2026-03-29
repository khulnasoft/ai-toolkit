#!/usr/bin/env tsx

/**
 * Main execution function.
 */
async function main() {
  const packages = [
    '@ai-tools/amazon-bedrock',
    '@ai-tools/anthropic',
    '@ai-tools/assemblyai',
    '@ai-tools/azure',
    '@ai-tools/baseten',
    '@ai-tools/cerebras',
    '@ai-tools/cohere',
    '@ai-tools/deepgram',
    '@ai-tools/deepinfra',
    '@ai-tools/deepseek',
    '@ai-tools/elevenlabs',
    '@ai-tools/fal',
    '@ai-tools/fireworks',
    '@ai-tools/gladia',
    '@ai-tools/google',
    '@ai-tools/google-vertex',
    '@ai-tools/groq',
    '@ai-tools/huggingface',
    '@ai-tools/hume',
    '@ai-tools/klingai',
    '@ai-tools/lmnt',
    '@ai-tools/luma',
    '@ai-tools/mistral',
    '@ai-tools/openai',
    '@ai-tools/openai-compatible',
    '@ai-tools/perplexity',
    '@ai-tools/replicate',
    '@ai-tools/revai',
    '@ai-tools/togetherai',
    '@ai-tools/vercel',
    '@ai-tools/xai',

    'ollama-ai-provider',
    '@portkey-ai/vercel-provider',
    'workers-ai-provider',
    '@openrouter/ai-sdk-provider',
  ];
  const results: Array<{
    package: string;
    'past week': number;
    previous: number;
    diff: number;
    '%': string;
    'previous %': string;
    'diff %': string;
  }> = [];

  // timestamps
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const yesterdayTimestamp = d.toISOString().split('T')[0];
  d.setDate(d.getDate() - 6);
  const sevenDaysAgoTimestamp = d.toISOString().split('T')[0];
  d.setDate(d.getDate() - 1);
  const eightDaysAgoTimestamp = d.toISOString().split('T')[0];
  d.setDate(d.getDate() - 6);
  const fourteenDaysAgoTimestamp = d.toISOString().split('T')[0];

  console.log(
    `Fetching download stats from ${sevenDaysAgoTimestamp} to ${yesterdayTimestamp} and ${fourteenDaysAgoTimestamp} to ${eightDaysAgoTimestamp}...`,
  );

  try {
    for (const pkg of packages) {
      console.log(
        `Fetching stats from https://api.npmjs.org/downloads/point/${sevenDaysAgoTimestamp}:${yesterdayTimestamp}/${pkg} ...`,
      );
      const responseLastWeek = await fetchWithRetry(
        `https://api.npmjs.org/downloads/point/${sevenDaysAgoTimestamp}:${yesterdayTimestamp}/${pkg}`,
      );
      const dataLastWeek = await responseLastWeek.json();

      console.log(
        `Fetching stats from https://api.npmjs.org/downloads/point/${fourteenDaysAgoTimestamp}:${eightDaysAgoTimestamp}/${pkg} ...`,
      );
      const responsePrevWeek = await fetchWithRetry(
        `https://api.npmjs.org/downloads/point/${fourteenDaysAgoTimestamp}:${eightDaysAgoTimestamp}/${pkg}`,
      );
      const dataPrevWeek = await responsePrevWeek.json();

      results.push({
        package: pkg,
        'past week': dataLastWeek.downloads || 0,
        '%': '0%', // Initial placeholder
        previous: dataPrevWeek.downloads || 0,
        'previous %': '0%', // Initial placeholder
        diff: (dataLastWeek.downloads || 0) - (dataPrevWeek.downloads || 0),
        'diff %': '0%', // Initial placeholder
      });
    }

    // Calculate total downloads
    const pastWeektotalDownloads = results.reduce(
      (sum, item) => sum + item['past week'],
      0,
    );
    const previousTotalDownloads = results.reduce(
      (sum, item) => sum + item['previous'],
      0,
    );

    // Update percentages
    results.forEach(item => {
      const pastWeekPercentage =
        pastWeektotalDownloads > 0
          ? (item['past week'] / pastWeektotalDownloads) * 100
          : 0;
      item['%'] = `${pastWeekPercentage.toFixed(1)}%`;
      const previousPercentage =
        previousTotalDownloads > 0
          ? (item['previous'] / previousTotalDownloads) * 100
          : 0;
      item['previous %'] = `${previousPercentage.toFixed(1)}%`;
      const diffPercentage = pastWeekPercentage - previousPercentage;
      item['diff %'] =
        `${diffPercentage >= 0 ? '+' : ''}${diffPercentage.toFixed(1)}%`;
    });

    // Sort results by past week in descending order
    results.sort((a, b) => b['past week'] - a['past week']);

    console.table(results);
  } catch (err) {
    console.error('Error:', err);
  }
}

main();

function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = 3,
  backoff = 3000,
): Promise<Response> {
  return new Promise((resolve, reject) => {
    const attemptFetch = (n: number) => {
      fetch(url, options)
        .then(response => {
          if (!response.ok) {
            if (n > 0) {
              console.warn(
                `Fetch failed for ${url}. Retrying in ${backoff}ms... (${n} retries left)`,
              );
              setTimeout(() => attemptFetch(n - 1), backoff);
            } else {
              reject(
                new Error(`Failed to fetch ${url} after multiple attempts.`),
              );
            }
          } else {
            setTimeout(() => resolve(response), 1000);
          }
        })
        .catch(err => {
          if (n > 0) {
            console.warn(
              `Fetch error for ${url}: ${err}. Retrying in ${backoff}ms... (${n} retries left)`,
            );
            setTimeout(() => attemptFetch(n - 1), backoff);
          } else {
            reject(
              new Error(`Failed to fetch ${url} after multiple attempts.`),
            );
          }
        });
    };
    attemptFetch(retries);
  });
}
