import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, HelpCircle, ChevronDown, User, Settings, LogOut, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import NotificationsPopup from '@/components/layout/NotificationsPopup';
import { useAuth } from '@/lib/authContext';

const ProfilePopup = ({ isVisible, onClose, onLogout }) => {
  const popupRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!isVisible) return;
      const button = document.querySelector('.profile-button');
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        (!button || !button.contains(event.target))
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isVisible, onClose]);

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 10, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="absolute right-0 mt-2 w-72 md:w-80 rounded-xl shadow-2xl z-40"
          style={{
            backgroundColor: '#f9fafb',
            border: '1px solid #d1d5db',
            color: '#111827',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          }}
          ref={popupRef}
        >
          <div className="p-5 border-b" style={{ borderColor: 'rgba(17, 24, 39, 0.1)' }}>
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={user?.avatar_url || '/placeholder-avatar.jpg'} />
                <AvatarFallback>
                  {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-900">{user?.name || 'Usuário'}</p>
                <p className="text-sm text-gray-600">{user?.email || 'email@dominio.com'}</p>
              </div>
            </div>
          </div>

          <div className="p-3 space-y-2">
            <button
              onClick={() => handleNavigate('/profile')}
              className="flex items-center w-full gap-3 px-4 py-2 rounded-lg hover:bg-gray-200 transition text-gray-900 text-sm font-medium"
            >
              <User size={20} />
              Perfil
            </button>
            <button
              onClick={() => handleNavigate('/account')}
              className="flex items-center w-full gap-3 px-4 py-2 rounded-lg hover:bg-gray-200 transition text-gray-900 text-sm font-medium"
            >
              <Info size={20} />
              Minha conta
            </button>
            <button
              onClick={() => handleNavigate('/settings')}
              className="flex items-center w-full gap-3 px-4 py-2 rounded-lg hover:bg-gray-200 transition text-gray-900 text-sm font-medium"
            >
              <Settings size={20} />
              Configurações
            </button>
          </div>

          <div className="border-t p-3" style={{ borderColor: 'rgba(17, 24, 39, 0.1)' }}>
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="flex items-center w-full gap-3 px-4 py-2 rounded-lg hover:bg-red-100 transition text-red-600 font-semibold text-sm"
            >
              <LogOut size={20} />
              Sair
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Header = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const { user } = useAuth();

  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 Esta funcionalidade ainda não foi implementada...",
      duration: 3000,
    });
  };

  const handleLogout = () => {
    toast({
      title: "Terminando sessão...",
      duration: 1500,
    });
    setTimeout(() => navigate('/auth'), 1500);
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-64 right-0 h-16 flex items-center justify-between px-6 z-20 bg-white border-b border-border-color"
    >
    

      <div className="flex items-center space-x-4">
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full transition-colors hover:bg-white/10 text-text-light-secondary bg-transparent"
          >
            <Bell size={20} />
            {/* Ping de notificação visível dinamicamente */}
            <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-color-primary" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-color-primary" />
            </span>
          </motion.button>
          <NotificationsPopup isVisible={showNotifications} onClose={() => setShowNotifications(false)} />
        </div>

      
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 p-2 rounded-lg transition-colors text-text-light-primary profile-button"
            onClick={() => setShowProfilePopup(!showProfilePopup)}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar_url || '/placeholder-avatar.jpg'} />
              <AvatarFallback>{user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}</AvatarFallback>
            </Avatar>
            <div className="text-left hidden md:block">
              <div className="text-sm font-medium">{user?.name || 'Usuário'}</div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full status-online"></div>
                <span className="text-xs text-text-light-secondary">Online</span>
              </div>
            </div>
            <ChevronDown size={16} className="text-text-light-secondary" />
          </motion.button>

          <ProfilePopup
            isVisible={showProfilePopup}
            onClose={() => setShowProfilePopup(false)}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
