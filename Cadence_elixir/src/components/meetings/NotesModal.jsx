import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Textarea from "@/components/ui/textarea";
import { apiFetch } from "@/services/api";

const NotesModal = ({ consultation, onClose }) => {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const data = await apiFetch(`/api/meetings/${consultation.id}/notes`);
        setNotes(data.notes ?? "");
      } catch {
        setNotes("");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [consultation.id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiFetch(`/api/meetings/${consultation.id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Notas e Receitas da Consulta</h2>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <>
            <Textarea
              className="w-full min-h-[120px] mb-4"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Digite aqui as notas ou receitas desta consulta..."
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose} disabled={saving}>
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                Salvar
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default NotesModal;