<script lang="ts">
  import { activeEdit } from "../store/active-edit.store";
  import SubValue from "./sub-value.svelte";

  export let dependItems = [];
  export let selfName = "";

  let activeItem = "";
  activeEdit.subscribe((val) => {
    activeItem = val;
  });

</script>

<div class="wrapper_depends">
  {#each dependItems as dependItem}
    <div />
    <div class="param">
      <span class="param__row1"
        >{dependItem.name}, {dependItem.measureUnit}</span
      >
    </div>
    <div
      on:click={() => {
        activeEdit.set(dependItem.name);
      }}
    >
      <SubValue value={dependItem?.value} selfName={dependItem.name} />
    </div>
    <div />
    <svg
      class="icon icon_edit"
      version="1.1"
      on:click={(event) => {
        event.stopPropagation();
        activeEdit.set(dependItem.name);
      }}
      class:activeRow_icon={activeItem !== "" && dependItem.name === activeItem}
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 512.001 512.001"
      style="enable-background:new 0 0 512.001 512.001;"
      xml:space="preserve"
    >
      <g>
        <g>
          <path
            d="M496.063,62.299l-46.396-46.4c-21.199-21.199-55.689-21.198-76.888,0C352.82,35.86,47.964,340.739,27.591,361.113
      c-2.17,2.17-3.624,5.054-4.142,7.875L0.251,494.268c-0.899,4.857,0.649,9.846,4.142,13.339c3.497,3.497,8.487,5.042,13.338,4.143
      L143,488.549c2.895-0.54,5.741-2.008,7.875-4.143l345.188-345.214C517.311,117.944,517.314,83.55,496.063,62.299z M33.721,478.276
      l14.033-75.784l61.746,61.75L33.721,478.276z M140.269,452.585L59.41,371.721L354.62,76.488l80.859,80.865L140.269,452.585z
       M474.85,117.979l-18.159,18.161l-80.859-80.865l18.159-18.161c9.501-9.502,24.96-9.503,34.463,0l46.396,46.4
      C484.375,93.039,484.375,108.453,474.85,117.979z"
          />
        </g>
      </g>
    </svg>{/each}
</div>

<style>
  .wrapper_depends {
    background-color: var(--depends-bg-color);
    grid-area: 2 / 1 / 2 / 6;
    grid-template-columns: var(--common-grid);
    grid-row-gap: 5px;
    display: grid;
    padding: 10px 0;
  }
  .icon {
    fill: var(--depends-icon-color);
  }
  .icon_edit {
    width: 14pt;
    margin-left: 17px;
  }
  .param {
    display: flex;
    align-items: center;
  }
  .param__row1 {
    font-family: "pr-semibold", serif;
    font-size: 12pt;
    color: var(--text-main-color);
    width: 100%;
    height: 12pt;
    text-align: center;
  }
  .activeRow_icon {
    fill: var(--icon-active-color);
  }

</style>
