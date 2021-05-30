<script lang="ts">
  import { activeEdit } from "../store/active-edit.store";
  import Depends from "./depends.svelte";

  export let dependItems = [];
  export let value = null;
  export let selfName = "";
  let isExpand = false;
  let activeItemGromStore = "";
  /**
   * Подписываемся на изменение стора, чтобы
   * проставлять класс для выбранного эллемента
   */
  const subscription = activeEdit.subscribe((val) => {
    activeItemGromStore = val;
  });

</script>

<div class="edit">
  {#if value}
    <svg
      class="icon icon_edit"
      version="1.1"
      id="Capa_1"
      class:activeRow_icon={activeItemGromStore !== "" &&
        activeItemGromStore === selfName}
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
    </svg>
  {/if}
  {#if dependItems.length > 0 && !isExpand}
    <svg
      on:click={() => {
        isExpand = !isExpand;
      }}
      class="icon icon_down"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 491.996 491.996"
      style="enable-background:new 0 0 491.996 491.996;"
      xml:space="preserve"
    >
      <g>
        <g>
          <path
            d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848
			L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128
			c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084
			c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224
			C491.996,136.902,489.204,130.046,484.132,124.986z"
          />
        </g>
      </g>
    </svg>
  {/if}

  {#if dependItems.length > 0 && isExpand}
    <svg
      on:click={() => {
        isExpand = !isExpand;
      }}
      class="icon icon_up"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 492.002 492.002"
      style="enable-background:new 0 0 492.002 492.002;"
      xml:space="preserve"
    >
      <g>
        <g>
          <path
            d="M484.136,328.473L264.988,109.329c-5.064-5.064-11.816-7.844-19.172-7.844c-7.208,0-13.964,2.78-19.02,7.844
			L7.852,328.265C2.788,333.333,0,340.089,0,347.297c0,7.208,2.784,13.968,7.852,19.032l16.124,16.124
			c5.064,5.064,11.824,7.86,19.032,7.86s13.964-2.796,19.032-7.86l183.852-183.852l184.056,184.064
			c5.064,5.06,11.82,7.852,19.032,7.852c7.208,0,13.96-2.792,19.028-7.852l16.128-16.132
			C494.624,356.041,494.624,338.965,484.136,328.473z"
          />
        </g>
      </g>
    </svg>
  {/if}
</div>

{#if dependItems.length > 0 && isExpand}
  <Depends {dependItems} />
{/if}

<style>
  .edit {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .icon {
    fill: var(--icon-color);
  }
  .icon_edit {
    width: 14pt;
  }
  .icon_down {
    width: 8pt;
  }
  .icon_up {
    width: 8pt;
    fill: var(--icon-active-color);
  }
  .activeRow_icon {
    fill: var(--icon-active-color);
  }

</style>
