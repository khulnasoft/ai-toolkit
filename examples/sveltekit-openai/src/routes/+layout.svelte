<script lang="ts">
  import { createAIContext } from '@ai-tools/svelte';
  import '../app.css';
  let { children } = $props();

  createAIContext();
</script>

{@render children()}
