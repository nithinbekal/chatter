import {Socket} from "phoenix"

class App {
  static init() {
    var $message  = $("#message")
    var $username = $("#username")

    var socket = new Socket("/ws")
    socket.connect()
    socket.onClose( e => console.log("Closed") )

    var channel = socket.chan("rooms:lobby", {})
    channel.join()
      .receive("error", () => console.log("Failed to connect"))
      .receive("ok", () => console.log("Connected!"))

    $message
      .off("keypress")
      .on("keypress", e => {
        if(e.keyCode == 13) {
          console.log(`[${$username.val()}] ${$message.val()}` )
        }
      })
  }
}

$( () => App.init() )

export default App
