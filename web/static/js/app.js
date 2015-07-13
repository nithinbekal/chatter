import {Socket} from "phoenix"

class App {
  static init() {
    var $message  = $("#message")
    var $username = $("#username")
    var $messages = $("#messages")

    var socket = new Socket("/ws")
    socket.connect()
    socket.onClose( e => console.log("Closed") )

    var channel = socket.chan("rooms:lobby", {})
    channel.join()
      .receive("error", () => console.log("Failed to connect"))
      .receive("ok", () => console.log("Connected!"))

    channel.on("new:message", msg => this.appendMessage(msg))

    $message
      .off("keypress")
      .on("keypress", e => {
        if(e.keyCode == 13) {
          channel.push("new:message", {
            user: $username.val(),
            body: $message.val()
          })
          $message.val("")
        }
      })
  }

  static sanitize(msg) { return $("<div />").text(msg).html() }

  static appendMessage(message) {
    var $messages = $("#messages")
    var username = this.sanitize(message.user || "New User")
    var message  = this.sanitize(message.body)

    $messages.append(`<p><b>[${username}]</b>: ${message}</p>`)
  }
}

$( () => App.init() )

export default App
