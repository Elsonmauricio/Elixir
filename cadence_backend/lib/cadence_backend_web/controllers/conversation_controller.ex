defmodule CadenceBackendWeb.ConversationController do
  use CadenceBackendWeb, :controller
  alias CadenceBackend.Conversation

  def index(conn, %{"from_id" => from_id, "to_id" => to_id}) do
    messages = Conversation.list_messages_between(String.to_integer(from_id), String.to_integer(to_id))
    json(conn, messages)
  end

  def create(conn, %{
    "from_id" => from_id,
    "to_id" => to_id,
    "text" => text,
    "from_type" => from_type,
    "to_type" => to_type
  }) do
    with {:ok, message} <- Conversation.create_message(%{
      "from_id" => from_id,
      "to_id" => to_id,
      "text" => text,
      "from_type" => from_type,
      "to_type" => to_type
    }) do
      json(conn, message)
    end
  end
  def index(conn, %{"from_id" => from_id, "to_id" => to_id} = params) do
    IO.inspect(conn.assigns[:current_user], label: "USUÁRIO LOGADO")
    IO.inspect(params, label: "PARAMS RECEBIDOS (index)")
    messages = Conversation.list_messages_between(String.to_integer(from_id), String.to_integer(to_id))
    json(conn, messages)
  end

  def create(conn, params) do
    IO.inspect(conn.assigns[:current_user], label: "USUÁRIO LOGADO")
    IO.inspect(params, label: "PARAMS RECEBIDOS (create)")
    with {:ok, message} <- Conversation.create_message(params) do
      json(conn, message)
    end
  end
end
