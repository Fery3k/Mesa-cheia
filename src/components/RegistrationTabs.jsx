import React, { useState } from 'react';
import { User, Store, Bike, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Building2, MapPin, Mail, Phone, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function RegistrationTabs() {
  const [activePortal, setActivePortal] = useState('user');
  const [submittedMessage, setSubmittedMessage] = useState('');

  // User form state
  const [userForm, setUserForm] = useState({ name: 'Maria Aparecida da Silva', email: 'maria.silva@email.com', phone: '(11) 99876-5432', address: 'Av. Paulista, 1000 - Apto 42' });
  // Store form state
  const [storeForm, setStoreForm] = useState({ storeName: 'Supermercado Vila Nova', cnpj: '12.345.678/0001-99', managerName: 'Carlos Alberto Santos', email: 'contato@vilanova.com.br', address: 'Rua das Flores, 250 - Centro', skus: '1000-5000' });
  // Driver form state
  const [driverForm, setDriverForm] = useState({ name: 'João Pedro Oliveira', cpf: '123.456.789-00', vehicle: 'moto', city: 'São Paulo', cnh: '98765432100' });

  const handleSubmit = (e, portalName) => {
    e.preventDefault();
    try {
      confetti({
        particleCount: 70,
        spread: 50,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    setSubmittedMessage(`Cadastro de ${portalName} enviado com sucesso! Nossa equipe entrará em contato.`);
    setTimeout(() => {
      setSubmittedMessage('');
    }, 4500);
  };

  return (
    <section className="max-w-4xl mx-auto my-12 px-4 sm:px-0">
      
      {/* Registration Portal Header */}
      <div className="text-center mb-10">
        <span className="bg-emerald-950 text-emerald-300 font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-3 border border-emerald-800">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Faça parte do Ecossistema Mesa Cheia
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-black text-stone-900 tracking-tight">
          Portais de Cadastro & Parcerias
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 max-w-lg mx-auto mt-2 leading-relaxed">
          Conectando Clientes que buscam economizar, Supermercados parceiros e Entregadores autônomos.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center justify-center p-1.5 bg-[#F4EFEA] rounded-full max-w-xl mx-auto mb-10 border border-[#E8E2D5]">
        {[
          { id: 'user', label: 'Sou Cliente', icon: User },
          { id: 'supermarket', label: 'Sou Supermercado', icon: Store },
          { id: 'driver', label: 'Sou Entregador', icon: Bike },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activePortal === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActivePortal(tab.id)}
              data-cursor={tab.label}
              className={`flex-1 py-3 px-4 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                isActive
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-white/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Success Banner */}
      <AnimatePresence>
        {submittedMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-8 p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center gap-3 text-emerald-900 text-xs font-semibold shadow-sm"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>{submittedMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E2D5] shadow-bento">
        
        {/* PORTAL 1: CLIENTE */}
        {activePortal === 'user' && (
          <form onSubmit={(e) => handleSubmit(e, 'Cliente')} className="space-y-6">
            <div className="border-b border-[#E8E2D5] pb-5">
              <h3 className="font-display font-bold text-xl text-stone-900">
                Cadastro de Cliente
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Crie sua conta para salvar endereços favoritos, acompanhar pedidos e receber ofertas exclusivas.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  value={userForm.name}
                  onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                  E-mail
                </label>
                <input
                  type="email"
                  required
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                  Celular / WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  value={userForm.phone}
                  onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                  Endereço de Entrega
                </label>
                <input
                  type="text"
                  required
                  value={userForm.address}
                  onChange={(e) => setUserForm({ ...userForm, address: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                data-cursor="Cadastrar"
                className="py-3 px-8 bg-gradient-to-r from-[#064E3B] to-[#047857] hover:from-[#065F46] hover:to-[#059669] text-white text-xs font-bold rounded-2xl shadow-md transition-all flex items-center gap-2"
              >
                <span>Finalizar Cadastro de Cliente</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* PORTAL 2: SUPERMERCADO */}
        {activePortal === 'supermarket' && (
          <form onSubmit={(e) => handleSubmit(e, 'Supermercado Parceiro')} className="space-y-6">
            <div className="border-b border-[#E8E2D5] pb-5">
              <h3 className="font-display font-bold text-xl text-stone-900">
                Seja um Supermercado Parceiro
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Conecte seu catálogo à plataforma e amplie suas vendas com entregas ultra-rápidas e cálculo transparente de frete.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                  Nome Fantasia
                </label>
                <input
                  type="text"
                  required
                  value={storeForm.storeName}
                  onChange={(e) => setStoreForm({ ...storeForm, storeName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                  CNPJ da Empresa
                </label>
                <input
                  type="text"
                  required
                  value={storeForm.cnpj}
                  onChange={(e) => setStoreForm({ ...storeForm, cnpj: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                  Responsável / Gerente
                </label>
                <input
                  type="text"
                  required
                  value={storeForm.managerName}
                  onChange={(e) => setStoreForm({ ...storeForm, managerName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                  E-mail Corporativo
                </label>
                <input
                  type="email"
                  required
                  value={storeForm.email}
                  onChange={(e) => setStoreForm({ ...storeForm, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                  Endereço do Estabelecimento
                </label>
                <input
                  type="text"
                  required
                  value={storeForm.address}
                  onChange={(e) => setStoreForm({ ...storeForm, address: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                  Quantidade Estimada de SKUs / Produtos
                </label>
                <select
                  value={storeForm.skus}
                  onChange={(e) => setStoreForm({ ...storeForm, skus: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="ate-1000">Até 1.000 produtos</option>
                  <option value="1000-5000">1.000 a 5.000 produtos</option>
                  <option value="mais-5000">Mais de 5.000 produtos</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                data-cursor="Credenciar"
                className="py-3 px-8 bg-gradient-to-r from-[#064E3B] to-[#047857] hover:from-[#065F46] hover:to-[#059669] text-white text-xs font-bold rounded-2xl shadow-md transition-all flex items-center gap-2"
              >
                <span>Solicitar Credenciamento de Supermercado</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* PORTAL 3: ENTREGADOR */}
        {activePortal === 'driver' && (
          <form onSubmit={(e) => handleSubmit(e, 'Entregador Autônomo')} className="space-y-6">
            <div className="border-b border-[#E8E2D5] pb-5">
              <h3 className="font-display font-bold text-xl text-stone-900">
                Seja um Entregador Parceiro
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Ganhe por entrega com repasses rápidos e flexibilidade de horários na sua região.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  value={driverForm.name}
                  onChange={(e) => setDriverForm({ ...driverForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                  CPF
                </label>
                <input
                  type="text"
                  required
                  value={driverForm.cpf}
                  onChange={(e) => setDriverForm({ ...driverForm, cpf: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                  Veículo de Entrega
                </label>
                <select
                  value={driverForm.vehicle}
                  onChange={(e) => setDriverForm({ ...driverForm, vehicle: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="moto">Moto</option>
                  <option value="carro">Carro / Utilitário</option>
                  <option value="bicicleta">Bicicleta</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                  Número da CNH
                </label>
                <input
                  type="text"
                  required
                  value={driverForm.cnh}
                  onChange={(e) => setDriverForm({ ...driverForm, cnh: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                data-cursor="Cadastrar"
                className="py-3 px-8 bg-gradient-to-r from-[#064E3B] to-[#047857] hover:from-[#065F46] hover:to-[#059669] text-white text-xs font-bold rounded-2xl shadow-md transition-all flex items-center gap-2"
              >
                <span>Cadastrar como Entregador</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

      </div>

    </section>
  );
}
