// src/pages/Dashboard.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MessageCircle,
  Video,
  CalendarCheck,
  Pill,
  FileText
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from "../lib/authContext";
import PatientDashboard from "./patient/PatientDashboard";
import ProfessionalDashboard from "./professional/ProfessionalDashboard";

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleStartSecureChat = () => {
    navigate('/conversations');
  };

  const handleStartUrgentConsultation = () => {
    toast({
      title: "A iniciar teleconsulta urgente...",
      duration: 1500,
    });
    navigate('/meeting/urgent-call');
  };

  const handleViewAppointmentDetails = () => {
    navigate('/calendar');
  };

  const handleViewMedicationReminders = () => {
    navigate('/activity');
    toast({ title: "Visualizando lembretes de medicação...", duration: 1500 });
  };

  const handleViewRecentDocuments = () => {
    navigate('/activity');
    toast({ title: "Visualizando documentos recentes...", duration: 1500 });
  };

  const { user, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;
  if (!user) return <div>Usuário não autenticado.</div>;

  console.log('user:', user);
  console.log('user.role:', user?.role);

  return (
    <>
      <Helmet>
        <title>Painel de Saúde - Cadence</title>
        <meta name="description" content="O seu portal de saúde Cadence: teleconsultas, agendamentos e lembretes de medicação." />
      </Helmet>

      <div className="relative flex min-h-screen font-sans bg-white text-gray-900">
        <Navbar />
        <div className="flex-1 ml-64 flex flex-col bg-white">
          <Header />
          <main className="pt-28 px-16 py-12 flex-1 max-w-7xl mx-auto w-full select-none">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="mb-16 max-w-4xl">
                <motion.h1
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.8, ease: 'easeOut' }}
                  className="text-5xl font-semibold tracking-wide leading-tight"
                  style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
                >
                  Bem-vindo ao Painel de Saúde Cadence, {user?.name ?? 'Usuário'}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
                  className="text-lg mt-4 text-gray-600 leading-relaxed"
                  style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
                >
                  Uma visão geral clara e simples para acompanhar suas consultas, mensagens e lembretes.
                </motion.p>
              </div>
              {/* Dashboard dinâmico */}
              {user.role === 'paciente' || user.role === 'patient' ? (
                <PatientDashboard
                  onStartChat={handleStartSecureChat}
                  onStartUrgent={handleStartUrgentConsultation}
                  onViewCalendar={handleViewAppointmentDetails}
                  onViewReminders={handleViewMedicationReminders}
                />
              ) : user.role === 'professional' || user.role === 'profissional' ? (
                <ProfessionalDashboard
                  onStartChat={handleStartSecureChat}
                  onStartUrgent={handleStartUrgentConsultation}
                  onViewCalendar={handleViewAppointmentDetails}
                />
              ) : (
                <div>Tipo de usuário desconhecido: {user.role}</div>
              )}
            </motion.div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
