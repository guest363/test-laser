<script lang="ts">
  export let value = 0;
  /**
   * Считаем ширину инпута в зависимости от символов в нем
   */
  let initWidth = (value.toLocaleString("ru").length + 1) * 7 + "pt";

</script>

<input
  class="value"
  type="number"
  style="width: {initWidth}"
  {value}
  on:keydown={function () {
    initWidth = (this.value.length + 1) * 7 + "pt";
  }}
/>

<style>
  .value {
    font-family: "pr-semibold", serif;
    font-size: 14pt;
    color: var(--text-value-color);
    outline: none;
    border: none;
    padding: 5pt 10pt;
  }
  .value:focus {
    background-color: var(--header-bg);
    color: var(--text-main-color);
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }

</style>
