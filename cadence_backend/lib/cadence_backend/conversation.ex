defmodule CadenceBackend.Conversation do
  import Ecto.Query, warn: false
  alias CadenceBackend.Repo
  alias CadenceBackend.Conversation.Message

  def list_messages_between(user1_id, user2_id) do
    from(m in Message,
      where: (m.from_id == ^user1_id and m.to_id == ^user2_id) or
             (m.from_id == ^user2_id and m.to_id == ^user1_id),
      order_by: [asc: m.inserted_at]
    )
    |> Repo.all()
  end

  def create_message(attrs \\ %{}) do
    %Message{}
    |> Message.changeset(attrs)
    |> Repo.insert()
  end
end
