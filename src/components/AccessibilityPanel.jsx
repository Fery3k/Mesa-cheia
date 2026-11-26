import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accessibility, X, MousePointer2, Contrast, Type, Zap, Moon } from 'lucide-react';

export default function AccessibilityPanel({ settings, onToggle }) {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    {
      key: 'customCursor',
      icon: MousePointer2,
      label: 'Cursor Magnético Interativo',
      description: 'Ativa o ponteiro personalizado com efeito magnético nos botões.',
    },
    {
      key: 'highContrast',
      icon: Contrast,
      label: 'Alto Contraste',
      description: 'Aumenta o contraste das cores para melhor legibilidade.',
    },
    {
      key: 'largerText',
      icon: Type,
      label: 'Texto Maior',
      description: 'Aumenta o tamanho base das fontes em toda a página.',
    },
    {
      key: 'reducedMotion',
      icon: Zap,
      label: 'Reduzir Animações',
      description: 'Desativa animações e transições para reduzir estímulos visuais.',
    },
    {
      key: 'darkMode',
      icon: Moon,
      label: 'Modo Escuro',
      description: 'Troca para tema escuro, reduzindo o brilho da tela.',
    },
  ];

  return (
    <>
      {/* Floating Accessibility Button (FAB) */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir painel de acessibilidade"
        className="fixed bottom-6 left-6 z-[60] w-14 h-14 rounded-full bg-gradient-to-br from-[#064E3B] to-[#047857] text-white shadow-xl shadow-emerald-950/30 flex items-center justify-center hover:shadow-2xl transition-all border-2 border-emerald-400/30 group"
      >
        <Accessibility className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        
        {/* Pulse ring indicator */}
        <span className="absolute inset-0 rounded-full border-2 border-emerald-400/50 animate-ping opacity-30 pointer-events-none" />
      </motion.button>

      {/* Accessibility Panel Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[61] bg-black/30 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: -40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.95 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="fixed bottom-24 left-6 z-[62] w-[340px] max-w-[calc(100vw-3rem)] bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#E8E2D5] overflow-hidden"
            >
              {/* Panel Header */}
              <div className="bg-gradient-to-r from-[#064E3B] to-[#047857] p-5 text-white relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-1.5 rounded-full text-emerald-200 hover:text-white hover:bg-white/15 transition-all"
                  aria-label="Fechar painel"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
                    <Accessibility className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base leading-tight">
                      Acessibilidade
                    </h3>
                    <p className="text-[11px] text-emerald-200 font-medium mt-0.5">
                      Ajuste a experiência às suas necessidades
                    </p>
                  </div>
                </div>
              </div>

              {/* Options List */}
              <div className="p-4 space-y-2 max-h-[55vh] overflow-y-auto">
                {options.map((opt) => {
                  const Icon = opt.icon;
                  const isActive = settings[opt.key];

                  return (
                    <button
                      key={opt.key}
                      onClick={() => onToggle(opt.key)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-start gap-3 group ${
                        isActive
                          ? 'bg-emerald-50 border-emerald-300 shadow-sm'
                          : 'bg-white border-[#E8E2D5] hover:border-emerald-500/50 hover:bg-emerald-50/30'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                          isActive
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-[#F4EFEA] text-stone-500 group-hover:text-emerald-700 group-hover:bg-emerald-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`font-bold text-sm ${
                              isActive ? 'text-emerald-900' : 'text-stone-800'
                            }`}
                          >
                            {opt.label}
                          </span>

                          {/* Toggle Pill */}
                          <div
                            className={`relative w-10 h-5.5 rounded-full transition-all shrink-0 ${
                              isActive ? 'bg-emerald-600' : 'bg-stone-300'
                            }`}
                            style={{ width: 40, height: 22 }}
                          >
                            <motion.div
                              layout
                              className="absolute top-0.5 w-[18px] h-[18px] rounded-full bg-white shadow-sm"
                              style={{
                                left: isActive ? 20 : 2,
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
              <div className="px-4 py-3 border-t border-[#E8E2D5] bg-[#F4EFEA]/60">
                <p className="text-[10px] text-stone-400 text-center font-medium">
                  ♿ Mesa Cheia — Inclusão e acessibilidade para todos
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
