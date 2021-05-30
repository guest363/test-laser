<script lang="ts">
  import { activeItem } from "../store/activ-item.store";

  export let param = { name: "", description: "", measureUnit: "" };
  let activeItemGromStore = "";
  /**
   * Подписываемся на изменение стора, чтобы
   * проставлять класс для выбранного эллемента
   */
  const subscription = activeItem.subscribe((val) => {
    activeItemGromStore = val;
  });

</script>

<div
  class="row"
  class:activeRow={activeItemGromStore !== "" &&
    activeItemGromStore === param.name}
  on:click={() => {
    activeItem.set(param.name);
  }}
>
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
  .activeRow {
    background-color: var(--row-active-color);
  }

</style>
