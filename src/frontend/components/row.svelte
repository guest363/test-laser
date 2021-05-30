<script lang="ts">
  export let param = { name: "", description: "", measureUnit: "" };

</script>

<div class="row">
  <slot />
</div>

<style>
  .row {
    display: grid;
    grid-template-columns: 4fr 2fr 1fr 1fr 2fr;
    grid-template-rows: min-content;
  }

</style>
