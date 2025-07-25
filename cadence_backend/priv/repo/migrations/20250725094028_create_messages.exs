defmodule CadenceBackend.Repo.Migrations.CreateMessages do
  use Ecto.Migration

  def change do
    create table(:messages) do
      add :from_id, :integer
      add :to_id, :integer
      add :text, :string

      timestamps()
    end
  end
end
