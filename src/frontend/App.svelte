<script lang="ts">
  import { onMount } from "svelte";
  import { jsonSocketClientMessages } from "../backend/socket-client-events";
  import Header from "./components/header.svelte";
  import Param from "./components/param.svelte";
  import Row from "./components/row.svelte";
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
    <Row><Param {param} /></Row>
  {/each}
</div>

<style>
</style>
