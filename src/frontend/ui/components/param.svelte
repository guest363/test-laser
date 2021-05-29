<script lang="ts">
    export let param = { name: '', description: '', measureUnit: '' };
</script>

<style>
 
</style>

<div class="param">
  <span>{param.name}, {param.measureUnit}</span>
  <span>{param.description}</span>
</div>