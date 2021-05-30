<script lang="ts">
  export let fields = [];

</script>

{#each fields as field}
  <div class="header-item">{field}</div>
{/each}

<style>
  .header-item {
    text-transform: uppercase;
    font-family: "pr-regular", serif;
    font-size: 10pt;
    color: var(--header-color);
    height: 30px;
    background-color: var(--header-bg);
  }

</style>
