<script lang="ts">
  import { activeItem } from "../store/activ-item.store";
  import { activeEdit } from "../store/active-edit.store";

  export let value = 0;
  export let selfName = "";
  /**
   * Считаем ширину инпута в зависимости от символов в нем
   */
  let initWidth = (value.toLocaleString("ru").length + 1) * 7 + "pt";
  let activeItemGromStore = "";
  /**
   * Подписываемся на изменение стора, чтобы
   * проставлять класс для выбранного эллемента
   */
  const subscription = activeItem.subscribe((val) => {
    activeItemGromStore = val;
  });

</script>

<div class="wrapper--value">
  <input
    class="value"
    type="number"
    style="width: {initWidth}"
    {value}
    class:activeRow_input={activeItemGromStore !== "" &&
      activeItemGromStore === selfName}
    on:keydown={function () {
      initWidth = (this.value.length + 1) * 7 + "pt";
    }}
    on:focus={() => {
      activeEdit.set(selfName);
    }}
    on:blur={() => {
      activeEdit.set("");
    }}
  />
</div>

<style>
  .wrapper--value {
    padding: var(--default-padding);
  }
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
  .activeRow_input {
    background-color: var(--row-active-color);
  }

</style>
