<script lang="ts">
  import { onMount } from "svelte";
  import { jsonSocketClientMessages } from "../backend/socket-client-events";
  import Edit from "./components/edit.svelte";
  import Header from "./components/header.svelte";
  import Param from "./components/param.svelte";
  import Row from "./components/row.svelte";
  import Value from "./components/value.svelte";
  import { socket } from "./constants";
  import { list } from "./store/list.store";

  /* При монтировании запросить данные */
  onMount(() => socket.emit("json", { action: "get_json" }));

  socket.on(jsonSocketClientMessages.update, (respons) => {
    /* Устновить нове значение UI */
    list.set(respons);
  });
  socket.on(jsonSocketClientMessages.notify, (respons) => {
    /**
     * Оповещаем пользователя об успехе операции
     */
  });

</script>

<div class="App">
  <Row><Header fields={["Параметр", "Значение", "15 МИН.", "24 Ч.", ""]} /></Row
  >
  {#each $list as param}
    <Row {param}
      ><Param {param} /><Value value={param?.value} selfName={param.name} />
      <div />
      <div />
      <Edit
        dependItems={param?.relations}
        selfName={param.name}
        value={param?.value}
      />
    </Row>
  {/each}
</div>

<style>
  .App {
    height: 800px;
    overflow: scroll;
    overflow-x: hidden;
    max-width: 600px;
    margin: 0 auto;
    background-color: var(--row-bg);
  }

  .App::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 6px;
  }

  .App::-webkit-scrollbar-track {
    background-color: var(--scroll-bg-color);
  }

  .App::-webkit-scrollbar-thumb {
    background-color: var(--scroll-color);
  }

</style>
