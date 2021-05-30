<script lang="ts">
  import { get } from "svelte/store";
  import { socket } from "../constants";
  import { activeItem } from "../store/activ-item.store";
  import { activeEdit } from "../store/active-edit.store";
  import { activeExpand } from "../store/active-expand";
  import { list } from "../store/list.store";

  export let value = 0;
  export let selfName = "";
  /**
   * Считаем ширину инпута в зависимости от символов в нем
   */
  let initWidth = (value.toLocaleString("ru")?.length + 1) * 7 + "pt";
  let activeItemGromStore = "";
  let ref;
  /**
   * Подписываемся на изменение стора, чтобы
   * проставлять класс для выбранного эллемента
   */
  const subscription = activeItem.subscribe((val) => {
    activeItemGromStore = val;
    if (selfName === activeItemGromStore) {
      ref?.focus();
    }
  });

</script>

<div class="wrapper--value">
  <input
    class="value"
    type="text"
    style="width: {initWidth}"
    {value}
    class:activeRow_input={activeItemGromStore !== "" &&
      activeItemGromStore === selfName}
    on:keydown={function () {
      initWidth = (this.value.length + 1) * 7 + "pt";
    }}
    on:change={(event) => {
      const inputValue = event.target?.value;
      const storeCopy = [...get(list)];
      const newStore = storeCopy.map((item) => {
        if (item.name === selfName) {
          item.value = inputValue;
        }
        return item;
      });
      socket.emit("json", {
        action: "update_json",
        message: newStore,
      });
    }}
    on:focus={() => {
      activeEdit.set(selfName);
      activeExpand.set("");
    }}
    on:blur={() => {
      activeEdit.set("");
    }}
    bind:this={ref}
  />
</div>

<style>
  .wrapper--value {
    padding: var(--default-padding);
    margin: 0 auto;
  }
  .value {
    font-family: "pr-semibold", serif;
    font-size: 14pt;
    color: var(--text-value-color);
    outline: none;
    border: none;
    padding: 5pt 10pt;
    border-radius: 5px;
    min-width: 40px;
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
