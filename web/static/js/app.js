import {Socket} from "phoenix"

class App {
  static init() {
    var $message  = $("#message")
    var $username = $("#username")

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
