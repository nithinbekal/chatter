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

    channel.on("new:message", msg => {
      console.log(msg.body)
    })

    $message
      .off("keypress")
      .on("keypress", e => {
        if(e.keyCode == 13) {
          channel.push("new:message", {
            user: $username.val(),
            message: $message.val()
          })
        }
      })
  }
}

$( () => App.init() )

export default App
