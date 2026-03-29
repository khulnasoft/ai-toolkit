<script lang="ts">
  import { createAIContext } from '@ai-toolkit/svelte';
  import '../app.css';
  let { children } = $props();

  createAIContext();
</script>

{@render children()}
