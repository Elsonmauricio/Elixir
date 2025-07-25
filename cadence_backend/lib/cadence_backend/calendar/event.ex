defmodule CadenceBackend.Calendar.Event do
  use Ecto.Schema
  import Ecto.Changeset

  schema "events" do
    field :date, :date
    field :time, :string
    field :title, :string
    field :participants, {:array, :string}
    field :user_id, :id

    timestamps()
  end

  @doc false
  def changeset(event, attrs) do
    event
    |> cast(attrs, [:title, :date, :time, :participants])
    |> validate_required([:title, :date, :time, :participants])
  end
end
