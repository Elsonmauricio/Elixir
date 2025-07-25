import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Header from "@/components/layout/Header";
import { useToast } from "@/components/ui/use-toast";
import MeetingItem from "@/components/meetings/MeetingItem";
import NotesModal from "@/components/meetings/NotesModal"; // Import NotesModal
import { apiFetch } from "@/services/api";

const ConsultationHistory = () => {
  const { toast } = useToast();
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedConsultation, setSelectedConsultation] = useState(null); // Add state for selected consultation
  const [showNotesModal, setShowNotesModal] = useState(false); // Add state for show notes modal

  const handleOpenNotes = (consultation) => {
    setSelectedConsultation(consultation);
    setShowNotesModal(true);
  };

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        setLoading(true);
        const data = await apiFetch("/api/meetings");
        setConsultations(data.meetings || []);
      } catch (error) {
        toast({
          title: "Erro ao carregar histórico.",
          description: "Não foi possível buscar as consultas do servidor.",
          variant: "destructive",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchConsultations();
  }, [toast]);

  return (
    <>
      <Helmet>
        <title>Histórico de Consultas - Cadence</title>
      </Helmet>
      <div className="relative flex min-h-screen font-sans bg-white text-gray-900">
        <Navbar />
        <div className="flex-1 ml-64 flex flex-col bg-white">
          <Header />
          <main className="pt-28 px-16 py-12 flex-1 max-w-4xl mx-auto w-full select-none">
            <motion.h1
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
              className="text-4xl font-semibold tracking-wide leading-tight mb-10"
            >
              Histórico de Consultas
            </motion.h1>
            {loading ? (
              <div className="text-center text-gray-600">Carregando histórico...</div>
            ) : consultations.length === 0 ? (
              <div className="text-center text-gray-600">Nenhuma consulta encontrada.</div>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.08 },
                  },
                }}
                className="space-y-4"
              >
                {consultations.map((consultation) => (
                  <MeetingItem
                    key={consultation.id}
                    meeting={consultation}
                    onOpenNotes={() => handleOpenNotes(consultation)}
                  />
                ))}
              </motion.div>
            )}
          </main>
        </div>
      </div>
      {showNotesModal && selectedConsultation && (
        <NotesModal
          consultation={selectedConsultation}
          onClose={() => setShowNotesModal(false)}
        />
      )}
    </>
  );
};

export default ConsultationHistory;