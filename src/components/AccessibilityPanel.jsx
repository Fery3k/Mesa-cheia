import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Accessibility,
  X,
  MousePointer2,
  Contrast,
  Type,
  Zap,
  Moon,
  Smartphone,
  Vibrate,
  BookOpen,
  Target
} from 'lucide-react';

export default function AccessibilityPanel({ settings, onToggle }) {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    {
      key: 'largeTouchTargets',
      icon: Target,
      label: 'Botões Maiores (Fácil Toque)',
      badge: 'Mobile',
      description: 'Expande os botões para no mínimo 48px, facilitando o toque sem errar.',
    },
    {
      key: 'hapticFeedback',
      icon: Vibrate,
      label: 'Vibração ao Tocar (Tátil)',
      badge: 'Mobile',
      description: 'Emite uma leve vibração ao adicionar itens ou interagir na tela.',
    },
    {
      key: 'largerText',
      icon: Type,
      label: 'Texto Ampliado',
      description: 'Aumenta as fontes em toda a página para facilitar a leitura.',
    },
    {
      key: 'readableFont',
      icon: BookOpen,
      label: 'Modo Leitura / Dislexia',
      description: 'Aumenta o espaçamento entre letras e linhas para reduzir fadiga visual.',
    },
    {
      key: 'highContrast',
      icon: Contrast,
      label: 'Alto Contraste',
      description: 'Aumenta o contraste das cores e bordas para leitura sob sol.',
    },
    {
      key: 'darkMode',
      icon: Moon,
      label: 'Modo Escuro',
      description: 'Troca para tema escuro, reduzindo o brilho da tela à noite.',
    },
    {
      key: 'reducedMotion',
      icon: Zap,
      label: 'Reduzir Animações',
      description: 'Desativa animações e movimentos contínuos.',
    },
    {
      key: 'customCursor',
      icon: MousePointer2,
      label: 'Ponteiro Magnético',
      badge: 'PC / Mouse',
      description: 'Ponteiro especial com atração magnética aos botões (computador).',
    },
  ];

  const handleToggleClick = (key) => {
    if (settings.hapticFeedback && navigator.vibrate) {
      navigator.vibrate(30);
    }
    onToggle(key);
  };

  return (
    <>
      {/* Floating Accessibility Button (FAB) - Optimized for Mobile Touch */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => {
          if (settings.hapticFeedback && navigator.vibrate) navigator.vibrate(25);
          setIsOpen(!isOpen);
        }}
        aria-label="Abrir menu de acessibilidade e ajustes visuais"
        className="fixed bottom-6 left-4 sm:left-6 z-[60] w-14 h-14 rounded-full bg-gradient-to-br from-[#064E3B] to-[#047857] text-white shadow-xl shadow-emerald-950/30 flex items-center justify-center hover:shadow-2xl transition-all border-2 border-emerald-400/40 active:scale-90 touch-manipulation focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
      >
        <Accessibility className="w-6 h-6" />
        
        {/* Pulse ring indicator */}
        <span className="absolute inset-0 rounded-full border-2 border-emerald-400/50 animate-ping opacity-30 pointer-events-none" />
      </motion.button>

      {/* Accessibility Panel / Bottom Sheet on Mobile */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[61] bg-black/40 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Panel (Bottom Sheet on Mobile, Floating Drawer on Desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="fixed bottom-0 sm:bottom-24 left-0 sm:left-6 right-0 sm:right-auto z-[62] w-full sm:w-[380px] max-h-[85vh] sm:max-h-[80vh] bg-[#FAF8F5] rounded-t-[2.5rem] sm:rounded-3xl shadow-2xl border border-[#E8E2D5] overflow-hidden flex flex-col"
              role="dialog"
              aria-label="Painel de Acessibilidade"
            >
              {/* Mobile Drag Handle Bar */}
              <div className="w-12 h-1.5 bg-stone-300 rounded-full mx-auto mt-3 mb-1 sm:hidden shrink-0" />

              {/* Panel Header */}
              <div className="bg-gradient-to-r from-[#064E3B] to-[#047857] p-5 text-white relative shrink-0">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full text-emerald-200 hover:text-white hover:bg-white/15 transition-all min-w-[40px] min-h-[40px] flex items-center justify-center"
                  aria-label="Fechar painel de acessibilidade"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
                    <Accessibility className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-lg leading-tight">
                      Acessibilidade & Inclusão
                    </h3>
                    <p className="text-[11px] text-emerald-200 font-medium mt-0.5">
                      Personalize para toque, tela e leitura
                    </p>
                  </div>
                </div>
              </div>

              {/* Options List with Touch Padding */}
              <div className="p-4 space-y-2.5 overflow-y-auto flex-1">
                {options.map((opt) => {
                  const Icon = opt.icon;
                  const isActive = settings[opt.key];

                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleToggleClick(opt.key)}
                      role="switch"
                      aria-checked={isActive}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-start gap-3 active:scale-[0.99] touch-manipulation min-h-[56px] ${
                        isActive
                          ? 'bg-emerald-50 border-emerald-400 shadow-sm'
                          : 'bg-white border-[#E8E2D5] hover:border-emerald-500/50 hover:bg-emerald-50/20'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                          isActive
                            ? 'bg-emerald-700 text-white shadow-sm'
                            : 'bg-[#F4EFEA] text-stone-500'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 min-w-0 pr-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span
                              className={`font-bold text-sm ${
                                isActive ? 'text-emerald-950 font-extrabold' : 'text-stone-800'
                              }`}
                            >
                              {opt.label}
                            </span>
                            {opt.badge && (
                              <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                                {opt.badge}
                              </span>
                            )}
                          </div>

                          {/* Toggle Switch */}
                          <div
                            className={`relative rounded-full transition-all shrink-0 ${
                              isActive ? 'bg-emerald-600' : 'bg-stone-300'
                            }`}
                            style={{ width: 44, height: 24 }}
                          >
                            <motion.div
                              layout
                              className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md"
                              style={{
                                left: isActive ? 22 : 2,
                              }}
                              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                            />
                          </div>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                          {opt.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Panel Footer */}
              <div className="px-4 py-3.5 border-t border-[#E8E2D5] bg-[#F4EFEA]/80 shrink-0">
                <p className="text-[11px] text-stone-500 text-center font-medium">
                  ♿ Mesa Cheia — Projetado para todos os dispositivos e necessidades
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
