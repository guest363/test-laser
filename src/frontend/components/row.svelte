<script lang="ts">
  export let param = { name: "", description: "", measureUnit: "" };

</script>

<div class="row">
  <slot />
</div>

<style>
  .row {
    display: grid;
    grid-template-columns: 5fr 3fr 3fr 2fr 2fr;
    grid-template-rows: min-content;
    align-items: center;
    background-color: var(--row-bg);
    border-top: var(--table--border);
    border-bottom: var(--table--border);
  }

</style>
