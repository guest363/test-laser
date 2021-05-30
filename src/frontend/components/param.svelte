<script lang="ts">
    export let param = { name: '', description: '', measureUnit: '' };
</script>

<style>
  @import url("https://fonts.googleapis.com/css?family=Montserrat:400,700|Roboto:100,300,400");
 .param{
  font-family: "pr-regular", serif;
 }
</style>

<div class="param">
  <span class="param__row1">{param.name}, {param.measureUnit}</span>
  <span class="param__row1">{param.description}</span>
</div>