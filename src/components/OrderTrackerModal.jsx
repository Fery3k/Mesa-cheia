import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, MapPin, Bike, Store, Package, Check, X, Phone, MessageSquare, Sparkles, Truck } from 'lucide-react';

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

    const timer1 = setTimeout(() => setCurrentStep(1), 2000);
    const timer2 = setTimeout(() => setCurrentStep(2), 5500);
    const timer3 = setTimeout(() => setCurrentStep(3), 9000);
    const timer4 = setTimeout(() => setCurrentStep(4), 15000);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/70 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-gray-100 flex flex-col">
        
        {/* Header - Realtime Status */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-800/80 text-emerald-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" /> Rastreamento Mágico de Oz (Tempo Real)
            </span>
          </div>

          <h2 className="text-xl font-extrabold">Pedido #MC-9824</h2>
          <p className="text-xs text-emerald-100 mt-0.5">
            Supermercados Parceiros • Frete Cumulativo por Item
          </p>

          {/* Time Remaining Card */}
          <div className="mt-4 bg-white/15 backdrop-blur-md p-4 rounded-2xl flex items-center justify-between border border-white/20">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-400 text-gray-900 rounded-xl font-extrabold">
                <Clock className="w-6 h-6 animate-spin" />
              </div>
              <div>
                <span className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider block">
                  Tempo Estimado Restante
                </span>
                <span className="text-2xl font-black tracking-tight">
                  {currentStep === 4 ? 'ENTREGUE!' : `${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`}
                </span>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-xs font-semibold text-emerald-100 block">Status Atual:</span>
              <span className="text-xs font-extrabold bg-white text-emerald-900 px-3 py-1 rounded-full shadow-sm">
                {steps[currentStep].title}
              </span>
            </div>
          </div>
        </div>

        {/* Body - Timeline Tracker */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* Step Progress Bar */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">
              Linha do Tempo da Entrega
            </h3>

            <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
              {steps.map((step) => {
                const isPassed = currentStep >= step.id;
                const isCurrent = currentStep === step.id;

                return (
                  <div key={step.id} className="relative flex items-start gap-4 group">
                    {/* Circle Icon */}
                    <div
                      className={`absolute -left-6 top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 scale-110 shadow-md'
                          : isPassed
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {isPassed ? <Check className="w-3.5 h-3.5" /> : step.id + 1}
                    </div>

                    {/* Step Card */}
                    <div
                      className={`flex-1 p-3.5 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'bg-emerald-50/80 border-emerald-300 shadow-sm'
                          : isPassed
                          ? 'bg-white border-gray-200'
                          : 'bg-gray-50/50 border-gray-100 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className={`text-xs font-extrabold ${isCurrent ? 'text-emerald-900' : 'text-gray-800'}`}>
                          {step.title}
                        </h4>
                        <span className="text-[10px] text-gray-400 font-semibold">{step.time}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Driver Info Card */}
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
                🛵
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider block">
                  Entregador Parceiro
                </span>
                <h4 className="font-extrabold text-xs text-gray-900">Carlos Silva</h4>
                <p className="text-[11px] text-gray-500">Honda CG 160 • Placa ABC-1234</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => alert('Simulador de Chamada: Ligando para o entregador Carlos Silva...')}
                className="p-2.5 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 rounded-xl transition-all"
                title="Ligar"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button 
                onClick={() => alert('Simulador de Mensagem: "Olá Carlos, estou no portão aguardando!"')}
                className="p-2.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl transition-all"
                title="Mensagem"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Resumo Financeiro com Somatória Cumulativa de Frete */}
          <div className="border-t border-gray-100 pt-4">
            <h4 className="text-xs font-bold text-gray-800 mb-2">Resumo Financeiro da Compra:</h4>
            <div className="bg-gray-50 p-3.5 rounded-xl space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal dos Produtos:</span>
                <span className="font-semibold text-gray-900">R$ {orderDetails.subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between font-semibold text-orange-700">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" /> Taxas de Entrega Cumulativas (Somadas):
                </span>
                <span className="font-extrabold text-orange-800">+ R$ {orderDetails.deliveryFee.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between font-black text-sm text-gray-900 pt-2 border-t border-gray-200">
                <span>Total Geral Pago ({orderDetails.paymentMethod.toUpperCase()}):</span>
                <span className="text-emerald-700">R$ {orderDetails.total.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          <span className="text-xs text-gray-500 font-medium">Status atualizado via Mágico de Oz</span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
}
