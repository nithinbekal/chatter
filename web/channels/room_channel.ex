defmodule Chat.RoomChannel do
  use Phoenix.Channel

  def join("rooms:lobby", message, socket) do
    {:ok, socket}
  end
end
