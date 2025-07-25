import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  FileText,
  MessageCircle,
  Video,
  Clock,
  Users,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AvailabilityModal from "@/components/professional/AvailabilityModal";

const ProfessionalDashboard = ({
  onStartChat,
  onStartUrgent,
  onViewCalendar,
}) => {
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 sm:p-6 md:p-10"
    >
      {/* Card Reutilizável */}
      {[
        {
          delay: 0.1,
          title: "Fila de Pacientes",
          desc: "Veja quem está aguardando atendimento",
          icon: <Users size={36} className="text-emerald-600" />,
          bgIcon: "bg-emerald-100",
          button: (
            <Button
              onClick={onViewCalendar}
              className="w-full h-12 md:h-14 text-base md:text-lg font-semibold rounded-xl border border-emerald-300 text-emerald-700 hover:bg-emerald-50 transition-colors shadow-sm"
            >
              <CalendarCheck className="mr-2" /> Ver Agenda
            </Button>
          ),
        },
        {
          delay: 0.2,
          title: "Disponibilidade",
          desc: "Defina seus horários para teleconsultas",
          icon: <Clock size={36} className="text-blue-600" />,
          bgIcon: "bg-blue-100",
          button: (
            <Button
              onClick={() => setShowAvailabilityModal(true)}
              className="w-full h-12 md:h-14 text-base md:text-lg font-semibold rounded-xl bg-blue-200 text-blue-800 hover:bg-blue-300 transition-colors shadow-sm"
            >
              Definir Disponibilidade
            </Button>
          ),
        },
        {
          delay: 0.3,
          title: "Resumo de Atividades",
          desc: "Veja seu histórico de atendimentos",
          icon: <FileText size={36} className="text-cyan-600" />,
          bgIcon: "bg-cyan-100",
          button: (
            <Button
              onClick={onViewCalendar}
              className="w-full h-12 md:h-14 text-base md:text-lg font-semibold rounded-xl bg-cyan-200 text-cyan-800 hover:bg-cyan-300 transition-colors shadow-sm"
            >
              Ver Histórico
            </Button>
          ),
        },
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: item.delay, duration: 0.6, ease: "easeOut" }}
        >
          <Card className="flex flex-col justify-between h-full p-6 md:p-10 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-0 mb-6 md:mb-8 flex items-center space-x-4 md:space-x-5">
              <div className={`p-4 md:p-5 rounded-xl flex-shrink-0 ${item.bgIcon}`}>
                {item.icon}
              </div>
              <div>
                <CardTitle className="text-xl md:text-2xl font-semibold text-gray-900">
                  {item.title}
                </CardTitle>
                <CardDescription className="mt-2 text-gray-600">
                  {item.desc}
                </CardDescription>
              </div>
            </CardHeader>
            {item.button}
          </Card>
        </motion.div>
      ))}

      {/* Atendimento Rápido */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        className="sm:col-span-2 lg:col-span-1"
      >
        <Card className="flex flex-col justify-between h-full p-6 md:p-10 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="p-0 mb-6 md:mb-8 flex items-center space-x-4 md:space-x-5">
            <div className="p-4 md:p-5 bg-indigo-100 rounded-xl flex-shrink-0">
              <MessageCircle size={36} className="text-indigo-600" />
            </div>
            <div>
              <CardTitle className="text-xl md:text-2xl font-semibold text-gray-900">
                Atendimento Rápido
              </CardTitle>
              <CardDescription className="mt-2 text-gray-600">
                Converse com pacientes via chat ou vídeo
              </CardDescription>
            </div>
          </CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <Button
              onClick={onStartChat}
              className="w-full h-12 md:h-14 text-base md:text-lg font-semibold rounded-xl bg-indigo-200 text-indigo-800 hover:bg-indigo-300 transition-colors shadow-sm"
            >
              <MessageCircle className="mr-2" /> Iniciar Chat
            </Button>
            <Button
              onClick={onStartUrgent}
              className="w-full h-12 md:h-14 text-base md:text-lg font-semibold rounded-xl bg-red-200 text-red-800 hover:bg-red-300 transition-colors shadow-sm"
            >
              <Video className="mr-2" /> Consulta Urgente
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Modal */}
      {showAvailabilityModal && (
        <AvailabilityModal onClose={() => setShowAvailabilityModal(false)} />
      )}
    </motion.div>
  );
};

export default ProfessionalDashboard;
