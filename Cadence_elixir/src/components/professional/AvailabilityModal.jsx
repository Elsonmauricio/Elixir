import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/services/api";

const AvailabilityModal = ({ onClose }) => {
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Campos para novo horário
  const [newDay, setNewDay] = useState("");
  const [newStart, setNewStart] = useState("");
  const [newEnd, setNewEnd] = useState("");

  useEffect(() => {
    const fetchAvailability = async () => {
      setLoading(true);
      try {
        const data = await apiFetch("/api/professional/availability");
        setAvailability(data.availability || []);
      } catch {
        setAvailability([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAvailability();
  }, []);

  const handleAdd = () => {
    if (!newDay || !newStart || !newEnd) return;
    setAvailability([
      ...availability,
      { day: newDay, start: newStart, end: newEnd },
    ]);
    setNewDay("");
    setNewStart("");
    setNewEnd("");
  };

  const handleRemove = (idx) => {
    setAvailability(availability.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiFetch("/api/professional/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ availability }),
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
        className="bg-white rounded-xl shadow-xl p-8 w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold mb-4">Definir Disponibilidade</h2>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <>
            <div className="mb-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Dia (ex: Segunda)"
                  value={newDay}
                  onChange={(e) => setNewDay(e.target.value)}
                />
                <Input
                  placeholder="Início"
                  value={newStart}
                  onChange={(e) => setNewStart(e.target.value)}
                  type="time"
                />
                <Input
                  placeholder="Fim"
                  value={newEnd}
                  onChange={(e) => setNewEnd(e.target.value)}
                  type="time"
                />
                <Button onClick={handleAdd} disabled={saving}>
                  Adicionar
                </Button>
              </div>
            </div>
            <div className="mb-4">
              <ul>
                {availability.map((slot, idx) => (
                  <li key={idx} className="flex items-center gap-2 mb-2">
                    <span>
                      <b>{slot.day}</b>: {slot.start} - {slot.end}
                    </span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemove(idx)}
                      disabled={saving}
                    >
                      Remover
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
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

export default AvailabilityModal;