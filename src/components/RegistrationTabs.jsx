import React, { useState } from 'react';
import { User, Store, Bike, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Building2, MapPin, Mail, Phone } from 'lucide-react';

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
    setSubmittedMessage(`Cadastro de ${portalName} enviado com sucesso! Nossa equipe entrará em contato.`);
    setTimeout(() => {
      setSubmittedMessage('');
    }, 4000);
  };

  return (
    <section className="max-w-4xl mx-auto my-10">
      
      {/* Registration Portal Header */}
      <div className="text-center mb-8">
        <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Faça parte da Ecossistema Mesa Cheia
        </span>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">
          Portais de Cadastro & Parcerias
        </h2>
        <p className="text-xs text-gray-500 max-w-lg mx-auto mt-1">
          Conectando Clientes que buscam economizar, Supermercados parceiros e Entregadores autônomos.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center justify-center p-1.5 bg-gray-100 rounded-2xl max-w-xl mx-auto mb-8 border border-gray-200">
        <button
          onClick={() => setActivePortal('user')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activePortal === 'user'
              ? 'bg-white text-emerald-800 shadow-sm border border-gray-100'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <User className="w-4 h-4 text-emerald-600" />
          <span>Sou Cliente</span>
        </button>

        <button
          onClick={() => setActivePortal('supermarket')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activePortal === 'supermarket'
              ? 'bg-white text-emerald-800 shadow-sm border border-gray-100'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Store className="w-4 h-4 text-blue-600" />
          <span>Supermercado</span>
        </button>

        <button
          onClick={() => setActivePortal('driver')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activePortal === 'driver'
              ? 'bg-white text-emerald-800 shadow-sm border border-gray-100'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Bike className="w-4 h-4 text-orange-500" />
          <span>Entregador</span>
        </button>
      </div>

      {/* Feedback Banner */}
      {submittedMessage && (
        <div className="mb-6 p-4 bg-emerald-600 text-white text-xs font-bold rounded-2xl flex items-center justify-between shadow-lg animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>{submittedMessage}</span>
          </div>
          <button onClick={() => setSubmittedMessage('')} className="text-white/80 hover:text-white font-bold">
            ×
          </button>
        </div>
      )}

      {/* Portal Forms Container */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">

        {/* 1. USER REGISTRATION FORM */}
        {activePortal === 'user' && (
          <form onSubmit={(e) => handleSubmit(e, 'Cliente')} className="space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="p-3 bg-emerald-100 text-emerald-800 rounded-2xl">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-gray-900">Cadastro de Usuário / Cliente</h3>
                <p className="text-xs text-gray-500">Crie sua conta para salvar comparativos e acompanhar pedidos.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Maria Aparecida da Silva"
                  value={userForm.name}
                  onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">E-mail</label>
                <input
                  type="email"
                  required
                  placeholder="maria@email.com"
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Telefone / WhatsApp</label>
                <input
                  type="tel"
                  required
                  placeholder="(11) 99999-8888"
                  value={userForm.phone}
                  onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Endereço Principal</label>
                <input
                  type="text"
                  required
                  placeholder="Av. Paulista, 1000 - Apto 42"
                  value={userForm.address}
                  onChange={(e) => setUserForm({ ...userForm, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-4"
            >
              <span>Cadastrar como Cliente</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* 2. SUPERMARKET REGISTRATION FORM */}
        {activePortal === 'supermarket' && (
          <form onSubmit={(e) => handleSubmit(e, 'Supermercado Parceiro')} className="space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="p-3 bg-blue-100 text-blue-800 rounded-2xl">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-gray-900">Cadastro de Supermercado Parceiro</h3>
                <p className="text-xs text-gray-500">Cadastre sua rede e integre seu catálogo com o comparador Mesa Cheia.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nome Fantasia do Supermercado</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Supermercado São José"
                  value={storeForm.storeName}
                  onChange={(e) => setStoreForm({ ...storeForm, storeName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">CNPJ</label>
                <input
                  type="text"
                  required
                  placeholder="00.000.000/0001-00"
                  value={storeForm.cnpj}
                  onChange={(e) => setStoreForm({ ...storeForm, cnpj: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nome do Gerente Comercial</label>
                <input
                  type="text"
                  required
                  placeholder="Carlos Alberto"
                  value={storeForm.managerName}
                  onChange={(e) => setStoreForm({ ...storeForm, managerName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">E-mail Corporativo</label>
                <input
                  type="email"
                  required
                  placeholder="parceiro@supermercado.com.br"
                  value={storeForm.email}
                  onChange={(e) => setStoreForm({ ...storeForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">Endereço Completo da Loja Física</label>
                <input
                  type="text"
                  required
                  placeholder="Rua Central, 500 - Bairro Centro"
                  value={storeForm.address}
                  onChange={(e) => setStoreForm({ ...storeForm, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-4"
            >
              <span>Solicitar Integração de Parceiro</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* 3. DRIVER REGISTRATION FORM */}
        {activePortal === 'driver' && (
          <form onSubmit={(e) => handleSubmit(e, 'Entregador Parceiro')} className="space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="p-3 bg-orange-100 text-orange-800 rounded-2xl">
                <Bike className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-gray-900">Cadastro de Entregador Parceiro</h3>
                <p className="text-xs text-gray-500">Faça entregas para os mercados da sua região com horários flexíveis.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="João da Silva Santos"
                  value={driverForm.name}
                  onChange={(e) => setDriverForm({ ...driverForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">CPF</label>
                <input
                  type="text"
                  required
                  placeholder="000.000.000-00"
                  value={driverForm.cpf}
                  onChange={(e) => setDriverForm({ ...driverForm, cpf: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Veículo de Entrega</label>
                <select
                  value={driverForm.vehicle}
                  onChange={(e) => setDriverForm({ ...driverForm, vehicle: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-orange-400 focus:outline-none"
                >
                  <option value="moto">Motocicleta</option>
                  <option value="bike">Bicicleta / E-Bike</option>
                  <option value="carro">Carro / Utilitário</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Número da CNH (se aplicável)</label>
                <input
                  type="text"
                  placeholder="12345678900"
                  value={driverForm.cnh}
                  onChange={(e) => setDriverForm({ ...driverForm, cnh: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-4"
            >
              <span>Cadastrar como Entregador</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>

    </section>
  );
}
