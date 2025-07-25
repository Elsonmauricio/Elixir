defmodule CadenceBackend.CalendarFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `CadenceBackend.Calendar` context.
  """

  @doc """
  Generate a event.
  """
  def event_fixture(attrs \\ %{}) do
    {:ok, event} =
      attrs
      |> Enum.into(%{
        date: ~D[2025-07-23],
        participants: ["option1", "option2"],
        time: "some time",
        title: "some title"
      })
      |> CadenceBackend.Calendar.create_event()

    event
  end
end
