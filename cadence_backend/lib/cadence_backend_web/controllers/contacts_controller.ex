defmodule CadenceBackendWeb.ContactsController do
  use CadenceBackendWeb, :controller
  alias CadenceBackend.Accounts

  def index(conn, _params) do
    current_user = conn.assigns[:current_user]
    IO.inspect(current_user, label: "USUÁRIO LOGADO")

    user_role = current_user[:role] || current_user["role"]
    opposite_role =
      case user_role do
        "professional" -> "patient"
        "patient" -> "professional"
        _ -> "professional" # fallback
      end

    # Buscar todos usuários do tipo oposto
    contacts = Accounts.list_users_by_role(opposite_role)
    IO.inspect(contacts, label: "CONTATOS ENCONTRADOS")

    json(conn, contacts)
  end
end
