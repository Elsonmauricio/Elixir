import React from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  FileText,
  Pill,
  MessageCircle,
  Video,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PatientDashboard = ({
  onStartChat,
  onStartUrgent,
  onViewCalendar,
  onViewReminders,
  onViewHistory,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-4 md:px-10 py-4 md:py-10"
    >
      {[
        {
          delay: 0.1,
          title: "Próximas Consultas",
          desc: "Veja suas próximas teleconsultas agendadas",
          icon: <CalendarCheck size={32} className="text-yellow-600" />,
          bgIcon: "bg-yellow-100",
          button: (
            <Button
              onClick={onViewCalendar}
              className="w-full h-12 md:h-14 text-sm md:text-base font-semibold rounded-xl border border-yellow-300 text-yellow-700 hover:bg-yellow-50 transition-colors shadow-sm"
            >
              Ver Calendário
            </Button>
          ),
        },
        {
          delay: 0.2,
          title: "Histórico de Consultas",
          desc: "Acesse consultas anteriores.",
          icon: <FileText size={32} className="text-cyan-600" />,
          bgIcon: "bg-cyan-100",
          button: (
            <Button
              onClick={onViewHistory}
              className="w-full h-12 md:h-14 text-sm md:text-base font-semibold rounded-xl bg-cyan-200 text-cyan-800 hover:bg-cyan-300 transition-colors shadow-sm"
            >
              Ver Histórico
            </Button>
          ),
        },
        {
          delay: 0.3,
          title: "Lembretes de Medicação",
          desc: "Receba lembretes para suas medicações.",
          icon: <Pill size={32} className="text-pink-600" />,
          bgIcon: "bg-pink-100",
          button: (
            <Button
              onClick={onViewReminders}
              className="w-full h-12 md:h-14 text-sm md:text-base font-semibold rounded-xl bg-pink-200 text-pink-800 hover:bg-pink-300 transition-colors shadow-sm"
            >
              Ver Lembretes
            </Button>
          ),
        },
        {
          delay: 0.4,
          title: "Precisa de Ajuda?",
          desc: "Converse com nosso suporte ou equipe médica.",
          icon: <MessageCircle size={32} className="text-indigo-600" />,
          bgIcon: "bg-indigo-100",
          button: (
            <Button
              onClick={onStartChat}
              className="w-full h-12 md:h-14 text-sm md:text-base font-semibold rounded-xl bg-indigo-200 text-indigo-800 hover:bg-indigo-300 transition-colors shadow-sm"
            >
              Iniciar Chat
            </Button>
          ),
        },
        {
          delay: 0.5,
          title: "Teleconsulta Urgente",
          desc: "Atendimento rápido e emergencial por vídeo.",
          icon: <Video size={32} className="text-red-600" />,
          bgIcon: "bg-red-100",
          button: (
            <Button
              onClick={onStartUrgent}
              className="w-full h-12 md:h-14 text-sm md:text-base font-semibold rounded-xl bg-red-200 text-red-800 hover:bg-red-300 transition-colors shadow-sm"
            >
              Iniciar Consulta
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
          <Card className="flex flex-col justify-between h-full p-5 md:p-8 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-0 mb-4 md:mb-6 flex items-center space-x-4">
              <div className={`p-3 md:p-4 rounded-xl flex-shrink-0 ${item.bgIcon}`}>
                {item.icon}
              </div>
              <div>
                <CardTitle className="text-lg md:text-xl font-semibold text-gray-900">
                  {item.title}
                </CardTitle>
                <CardDescription className="mt-1 text-sm text-gray-600">
                  {item.desc}
                </CardDescription>
              </div>
            </CardHeader>
            <div className="mt-auto">{item.button}</div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PatientDashboard;
