<script lang="ts">
import { jsonSocketClientMessages } from "../socket-client-events";
import { socket } from "./constants";


 socket.on(jsonSocketClientMessages.update, (respons) => {
  console.log(respons);
  
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
   
  </header>
</div>