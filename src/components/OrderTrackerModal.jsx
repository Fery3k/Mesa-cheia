import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, MapPin, Bike, Store, Package, Check, X, Phone, MessageSquare, Sparkles, Truck, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OrderTrackerModal({ isOpen, onClose, orderDetails }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(35 * 60); // 35 min simulated countdown

  const steps = [
    { id: 0, title: 'Pedido Recebido', desc: 'Aguardando confirmação do supermercado', icon: Package, time: 'Agora' },
    { id: 1, title: 'Confirmado pelo Mercado', desc: 'Separador já recebeu a lista de compras', icon: Store, time: 'Há 1 min' },
    { id: 2, title: 'Separando Produtos', desc: 'Conferindo itens e validade dos produtos', icon: CheckCircle2, time: 'Há 3 min' },
    { id: 3, title: 'Entrega em Andamento', desc: 'Entregador parceiro a caminho do seu endereço', icon: Bike, time: 'Em rota' },
    { id: 4, title: 'Pedido Entregue', desc: 'Mesa cheia e compra concluída com sucesso!', icon: Check, time: 'Concluído' }
  ];

  // Wizard of Oz status step simulation
  useEffect(() => {
    if (!isOpen) return;

    setCurrentStep(0);

    const timer1 = setTimeout(() => setCurrentStep(1), 2500);
    const timer2 = setTimeout(() => setCurrentStep(2), 6500);
    const timer3 = setTimeout(() => setCurrentStep(3), 11000);
    const timer4 = setTimeout(() => setCurrentStep(4), 16000);

    // Live countdown interval
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearInterval(interval);
    };
  }, [isOpen]);

  if (!isOpen || !orderDetails) return null;

  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0B201A]/65 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-[#FAF8F5] rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-[#E8E2D5] flex flex-col z-10"
        >
          {/* Header - Realtime Status */}
          <div className="bg-[#0B201A] p-6 sm:p-7 text-white relative border-b border-emerald-950">
            <button
              onClick={onClose}
              data-cursor="Fechar"
              className="absolute top-6 right-6 text-stone-400 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-900/80 text-emerald-300 font-mono text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 border border-emerald-700/50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Rastreamento em Tempo Real
              </span>
              <span className="text-xs text-stone-400 font-mono">Pedido #MC-{Math.floor(1000 + Math.random() * 9000)}</span>
            </div>

            <h2 className="text-2xl font-display font-black text-[#F4EFEA]">
              {steps[currentStep].title}
            </h2>
            <p className="text-xs text-emerald-200/80 mt-1">
              {steps[currentStep].desc}
            </p>

            {/* Countdown Badge */}
            <div className="mt-4 inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-amber-300 border border-white/15">
              <Clock className="w-3.5 h-3.5" />
              <span>Previsão de Entrega: {minutes}m {seconds < 10 ? '0' : ''}{seconds}s</span>
            </div>
          </div>

          {/* Stepper Content */}
          <div className="p-6 sm:p-7 overflow-y-auto flex-1 space-y-6">
            
            {/* Timeline Steps */}
            <div className="space-y-4">
              {steps.map((s, idx) => {
                const Icon = s.icon;
                const isPassed = currentStep > idx;
                const isCurrent = currentStep === idx;

                return (
                  <div key={s.id} className="flex items-start gap-4 relative group">
                    {idx < steps.length - 1 && (
                      <div className={`absolute left-5 top-10 bottom-0 w-0.5 -ml-px ${
                        isPassed ? 'bg-emerald-600' : 'bg-[#E8E2D5]'
                      }`} />
                    )}

                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 z-10 transition-all ${
                      isPassed
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : isCurrent
                        ? 'bg-[#064E3B] text-emerald-300 ring-4 ring-emerald-600/20 shadow-md scale-105'
                        : 'bg-[#F4EFEA] text-stone-400 border border-[#E8E2D5]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 pt-1 pb-3">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-sm font-display font-bold ${
                          isCurrent ? 'text-emerald-900' : isPassed ? 'text-stone-900' : 'text-stone-400'
                        }`}>
                          {s.title}
                        </h4>
                        <span className="text-[10px] font-mono text-stone-400">{s.time}</span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Receipt Summary */}
            <div className="bg-white rounded-3xl p-5 border border-[#E8E2D5] space-y-3 shadow-sm">
              <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-stone-400 pb-2 border-b border-[#E8E2D5]">
                <span>Resumo da Compra</span>
                <span>Itens: {orderDetails.cartItems.reduce((acc, i) => acc + i.quantity, 0)}</span>
              </div>

              {/* Delivery Address & Payment Info from Checkout */}
              <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#E8E2D5] text-xs space-y-1.5">
                <div className="flex items-start gap-2 text-stone-700">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900 block">Endereço de Entrega:</span>
                    <span className="text-stone-600 font-mono text-[11px]">{orderDetails.address || 'Av. Brasil, 1500 - Centro'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-stone-700 pt-1 border-t border-[#E8E2D5]/80">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-stone-900">Pagamento:</span>
                    <span className="text-emerald-800 font-mono text-[11px] font-bold">{orderDetails.paymentDetails || 'Confirmado via App'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1 text-xs text-stone-600 font-mono">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-stone-900">R$ {orderDetails.subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-amber-700 font-semibold">
                  <span>Frete Cumulativo (Distância × 3,5):</span>
                  <span className="font-extrabold text-amber-800">+ R$ {orderDetails.deliveryFee.toFixed(2).replace('.', ',')}</span>
                </div>
                {orderDetails.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Desconto Aplicado:</span>
                    <span>- R$ {orderDetails.discount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                <div className="border-t border-[#E8E2D5] pt-1.5 flex justify-between font-bold text-sm text-stone-900 font-display">
                  <span>Total Pago:</span>
                  <span className="text-emerald-700 font-mono">R$ {orderDetails.total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            </div>

            {/* Courier / Support Simulation Card */}
            <div className="bg-[#F4EFEA] rounded-2xl p-4 border border-[#E8E2D5] flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E8E2D5] flex items-center justify-center text-xl">
                  🛵
                </div>
                <div>
                  <div className="font-bold text-stone-900">Marcos Roberto (Entregador Parceiro)</div>
                  <div className="text-[10px] text-stone-500 font-mono">Honda CG 160 • Placa BRA-2026</div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button className="p-2 bg-white hover:bg-stone-100 text-stone-700 rounded-xl border border-[#E8E2D5] transition-colors" title="Ligar">
                  <Phone className="w-3.5 h-3.5" />
                </button>
                <button className="p-2 bg-white hover:bg-stone-100 text-stone-700 rounded-xl border border-[#E8E2D5] transition-colors" title="Chat">
                  <MessageSquare className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          <div className="p-4 sm:p-5 bg-white border-t border-[#E8E2D5] flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#064E3B] text-white text-xs font-bold rounded-xl hover:bg-[#065F46] transition-all"
            >
              Fechar Acompanhamento
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
