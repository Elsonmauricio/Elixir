defmodule CadenceBackend.CalendarTest do
  use CadenceBackend.DataCase

  alias CadenceBackend.Calendar

  describe "events" do
    alias CadenceBackend.Calendar.Event

    import CadenceBackend.CalendarFixtures

    @invalid_attrs %{date: nil, time: nil, title: nil, participants: nil}

    test "list_events/0 returns all events" do
      event = event_fixture()
      assert Calendar.list_events() == [event]
    end

    test "get_event!/1 returns the event with given id" do
      event = event_fixture()
      assert Calendar.get_event!(event.id) == event
    end

    test "create_event/1 with valid data creates a event" do
      valid_attrs = %{date: ~D[2025-07-23], time: "some time", title: "some title", participants: ["option1", "option2"]}

      assert {:ok, %Event{} = event} = Calendar.create_event(valid_attrs)
      assert event.date == ~D[2025-07-23]
      assert event.time == "some time"
      assert event.title == "some title"
      assert event.participants == ["option1", "option2"]
    end

    test "create_event/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Calendar.create_event(@invalid_attrs)
    end

    test "update_event/2 with valid data updates the event" do
      event = event_fixture()
      update_attrs = %{date: ~D[2025-07-24], time: "some updated time", title: "some updated title", participants: ["option1"]}

      assert {:ok, %Event{} = event} = Calendar.update_event(event, update_attrs)
      assert event.date == ~D[2025-07-24]
      assert event.time == "some updated time"
      assert event.title == "some updated title"
      assert event.participants == ["option1"]
    end

    test "update_event/2 with invalid data returns error changeset" do
      event = event_fixture()
      assert {:error, %Ecto.Changeset{}} = Calendar.update_event(event, @invalid_attrs)
      assert event == Calendar.get_event!(event.id)
    end

    test "delete_event/1 deletes the event" do
      event = event_fixture()
      assert {:ok, %Event{}} = Calendar.delete_event(event)
      assert_raise Ecto.NoResultsError, fn -> Calendar.get_event!(event.id) end
    end

    test "change_event/1 returns a event changeset" do
      event = event_fixture()
      assert %Ecto.Changeset{} = Calendar.change_event(event)
    end
  end
end
