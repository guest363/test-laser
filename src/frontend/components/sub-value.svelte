<script lang="ts">
  import { get } from "svelte/store";
  import { socket } from "../constants";
  import { activeItem } from "../store/activ-item.store";
  import { activeEdit } from "../store/active-edit.store";
  import { list } from "../store/list.store";

  export let value = 0;
  export let selfName = "";
  /**
   * Считаем ширину инпута в зависимости от символов в нем
   */
  let initWidth = (value.toLocaleString("ru")?.length + 1) * 7 + "pt";
  let activeItemFromStore = "";
  let ref;
  /**
   * Подписываемся на изменение стора, чтобы
   * проставлять класс для выбранного эллемента
   */
  activeItem.subscribe((val) => {
    activeItemFromStore = val;
  });
  activeEdit.subscribe((val) => {
    if (val === selfName) {
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
    class:activeRow_input={activeItemFromStore !== "" &&
      activeItemFromStore === selfName}
    on:keydown={function () {
      initWidth = (this.value.length + 1) * 7 + "pt";
    }}
    on:focus={() => {
      activeEdit.set(selfName);
    }}
    on:blur={() => {
      activeEdit.set("");
    }}
    bind:this={ref}
    on:change={(event) => {
      const inputValue = event.target?.value;
      const storeCopy = [...get(list)];
      const newStore = storeCopy.map((item) => {
        if (item.name === activeItemFromStore) {
          const newRealtions = item.relations?.map((relationItem) => {
            if (relationItem.name === selfName) {
              relationItem.value = inputValue;
            }
            return relationItem;
          });
          item.relations = newRealtions;
        }
        return item;
      });
      socket.emit("json", {
        action: "update_json",
        message: newStore,
      });
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
    border-radius: 5px;
    min-width: 40px;
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
