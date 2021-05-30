<script lang="ts">
  export let param = { name: "", description: "", measureUnit: "" };

</script>

<div class="param">
  <span class="param__row1">{param.name}, {param.measureUnit}</span>
  <span class="param__row2">{param.description}</span>
</div>

<style>
  .param {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    min-height: 60px;
    padding: var(--default-padding);
  }
  .param__row1 {
    font-family: "pr-semibold", serif;
    font-size: 14pt;
    padding: 15px 0 5px 0;
    color: var(--text-main-color);
    width: 100%;
  }
  .param__row2 {
    font-family: "pr-regular", serif;
    font-size: 12pt;
    width: 100%;
    padding: 5px 0 10px 0;
    color: var(--text-second-color);
  }

</style>
