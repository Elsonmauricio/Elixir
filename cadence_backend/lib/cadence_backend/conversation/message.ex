defmodule CadenceBackend.Conversation.Message do
  use Ecto.Schema
  import Ecto.Changeset

  schema "messages" do
    field :text, :string
    field :from_id, :integer
    field :to_id, :integer
    field :from_type, :string
    field :to_type, :string

    timestamps()
  end

  def changeset(message, attrs) do
    message
    |> cast(attrs, [:from_id, :to_id, :text, :from_type, :to_type])
    |> validate_required([:from_id, :to_id, :text, :from_type, :to_type])
  end
end
