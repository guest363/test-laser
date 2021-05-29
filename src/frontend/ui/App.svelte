<script lang="ts">
import {
onMount
} from 'svelte';
import { jsonSocketClientMessages } from "../../backend/socket-client-events";
import Param from "./components/param.svelte";
import { socket } from "./constants";
import { list } from "./store/list.store";

/* При монтировании запросить данные */
 onMount(() => socket.emit('json', {action: "get_json"}));

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

<style>
  /* css will go here */
</style>

<div class="App">
  <header class="App-header">
    {#each $list as param}
    <Param {param}></Param>
  {/each}
  </header>
</div>