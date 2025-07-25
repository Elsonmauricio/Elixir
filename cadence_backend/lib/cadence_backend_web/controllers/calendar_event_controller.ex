defmodule CadenceBackendWeb.CalendarEventController do
  use CadenceBackendWeb, :controller
  alias CadenceBackend.Calendar
  alias CadenceBackend.Calendar.Event

  action_fallback CadenceBackendWeb.FallbackController

  # GET /api/calendar/events
  def index(conn, _params) do
    user_id = get_user_id(conn)
    events = Calendar.list_events(user_id)
    render(conn, "index.json", events: events)
  end

  # POST /api/calendar/events
  def create(conn, %{"event" => event_params}) do
    user_id = get_user_id(conn)
    event_params = Map.put(event_params, "user_id", user_id)
    with {:ok, %Event{} = event} <- Calendar.create_event(event_params) do
      conn
      |> put_status(:created)
      |> render("show.json", event: event)
    end
  end

  # PUT /api/calendar/events/:id
  def update(conn, %{"id" => id, "event" => event_params}) do
    user_id = get_user_id(conn)
    event = Calendar.get_event!(id, user_id)
    with {:ok, %Event{} = event} <- Calendar.update_event(event, event_params) do
      render(conn, "show.json", event: event)
    end
  end

  # DELETE /api/calendar/events/:id
  def delete(conn, %{"id" => id}) do
    user_id = get_user_id(conn)
    event = Calendar.get_event!(id, user_id)
    with {:ok, %Event{}} <- Calendar.delete_event(event) do
      send_resp(conn, :no_content, "")
    end
  end

  # Helper para extrair o user_id do token/session
  defp get_user_id(conn) do
    # Adapte para seu sistema de autenticação
    conn.assigns.current_user.id
  end
end
