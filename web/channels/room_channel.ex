defmodule Chat.RoomChannel do
  use Phoenix.Channel

  def join("rooms:lobby", message, socket) do
    {:ok, socket}
  end

  def handle_in("new:message", msg, socket) do
    broadcast! socket, "new:message", %{body: msg["message"]}
    {:noreply, socket}
  end
end
