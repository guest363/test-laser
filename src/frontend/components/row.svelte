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
    grid-template-columns: var(--common-grid);
    grid-template-rows: min-content;
    align-items: center;
    background-color: var(--row-bg);
    border-top: var(--table--border);
    border-bottom: var(--table--border);
  }
  .row:nth-child(2) {
    justify-content: center;
  }
  .activeRow {
    background-color: var(--row-active-color);
  }

</style>
