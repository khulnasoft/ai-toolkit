// @ts-nocheck
import { generateText, streamText } from 'ai-toolkit';

// Test generateText with both roundtrip types
await generateText({
  model,
  maxToolRoundtrips: 3,
  maxAutomaticRoundtrips: 2
});

// Test streamText with just maxToolRoundtrips
await streamText({
  model,
  maxToolRoundtrips: 5
});

// Test streamText with subsequent maxToolRoundtrips
await streamText({
  model,
  maxToolRoundtrips: 67
});

// Test streamText with no roundtrips
await streamText({
  model
});

// Test generateText with just maxAutomaticRoundtrips
await generateText({
  model,
  maxAutomaticRoundtrips: 4
});

// Test generateText with subsequent maxToolRoundtrips
await generateText({
  model,
  maxToolRoundtrips: 42
});

// Test generateText with no roundtrips
await generateText({
  model
});

// Test property access
const result = await generateText({ model });
console.log(result.roundtrips.length);
