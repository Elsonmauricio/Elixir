defmodule CadenceBackendWeb.ProfessionalController do
  use CadenceBackendWeb, :controller

  # GET /api/professional/availability
  def get_availability(conn, _params) do
    user = conn.assigns[:current_user]
    availability = Map.get(user, :availability) || []
    json(conn, %{availability: availability})
  end

  # POST /api/professional/availability
  def set_availability(conn, %{"availability" => availability}) do
    user = conn.assigns[:current_user]
    case CadenceBackend.Accounts.update_user_availability(user.id, availability) do
      {:ok, updated_user} ->
        json(conn, %{availability: updated_user.availability})
      {:error, reason} ->
        conn |> put_status(:unprocessable_entity) |> json(%{error: "Erro ao salvar disponibilidade", details: inspect(reason)})
    end
  end
end
