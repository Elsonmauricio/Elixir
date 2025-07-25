defmodule CadenceBackend.Accounts do
  alias CadenceBackend.Firebase

  @doc """
  Busca um usuário pelo ID (Firebase UID) diretamente no Firestore.
  """
  def get_user_by_id(user_id) do
    case Firebase.get_user_by_id(user_id) do
      {:ok, user_data} ->
        map_firestore_user(user_data)

      {:error, :invalid_id} ->
        nil
      {:error, _reason} ->
        nil
    end
  end

  defp map_firestore_user(%{
    "id" => id,
    "name" => name,
    "email" => email,
    "role" => role,
    "avatar_url" => avatar_url,
    "member_since" => member_since
  }) do
    %{
      id: id,
      name: name,
      email: email,
      role: role,
      avatar_url: avatar_url,
      member_since: member_since
    }
  end

  defp map_firestore_user(_), do: nil

  @doc """
  Atualiza a disponibilidade do usuário (profissional) no Firestore.
  """
  def update_user_availability(user_id, availability) do
    case Firebase.update_document("users", user_id, %{availability: availability}) do
      {:ok, user_map} ->
        # Atualize o mapeamento se necessário
        {:ok, Map.put(map_firestore_user(user_map), :availability, availability)}
      {:error, reason} ->
        {:error, reason}
    end
  end
  def list_users_by_role(role) do
    case CadenceBackend.Firebase.list_documents("users") do
      {:ok, users} ->
        Enum.filter(users, fn u -> (u["role"] || u[:role]) == role end)
      _ -> []
    end
  end

end
