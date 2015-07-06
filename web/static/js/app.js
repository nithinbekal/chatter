import {Socket} from "phoenix"

class App {
  static init() {
    console.log("Hello, world!")
  }
}

$( () => App.init() )

export default App
