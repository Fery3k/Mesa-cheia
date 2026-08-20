import React, { useState } from 'react';
import { MapPin, Navigation, Check, X, Building, Compass, Sparkles } from 'lucide-react';
import { SIMULATED_ADDRESSES } from '../mockData';

export default function LocationModal({ isOpen, onClose, selectedAddress, onSelectAddress }) {
  const [customCep, setCustomCep] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  if (!isOpen) return null;

  const handleSimulateGps = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      onSelectAddress({
        id: 'gps-active',
        title: 'GPS em Tempo Real (Simulado)',
        address: 'Av. Paulista, 1000 - Bela Vista',
        city: 'São Paulo - SP (Raio de 2.5km)',
        distanceText: '3 supermercados parceiros encontrados a menos de 2.5km'
      });
      onClose();
    }, 1200);
  };

  const handleCepSubmit = (e) => {
    e.preventDefault();
    if (!customCep.trim()) return;
    onSelectAddress({
      id: 'custom-cep',
      title: `CEP: ${customCep}`,
      address: `Rua das Mercês, CEP ${customCep}`,
      city: 'São Paulo - SP',
      distanceText: 'Supermercados Centro, SuperMais e Mercado Econômico atendem esta região!'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 transform transition-all">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1.5 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-md">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200 block">
                Geolocalização Mesa Cheia
              </span>
              <h2 className="text-xl font-bold">Onde você quer receber?</h2>
            </div>
          </div>
          <p className="text-xs text-emerald-100/90 leading-relaxed">
            Simule a busca para encontrar quais supermercados parceiros entregam na sua região com as melhores taxas!
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">

          {/* Detect GPS Button */}
          <button
            onClick={handleSimulateGps}
            disabled={isLocating}
            className="w-full py-3.5 px-4 bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-500/40 rounded-2xl text-emerald-800 font-semibold text-sm flex items-center justify-center gap-3 transition-all group active:scale-98"
          >
            <Navigation className={`w-4 h-4 text-emerald-600 ${isLocating ? 'animate-spin' : 'group-hover:rotate-45 transition-transform'}`} />
            <span>{isLocating ? 'Localizando sua região...' : 'Quais supermercados estão perto de mim? (Usar GPS)'}</span>
          </button>

          <div className="flex items-center gap-3 my-2">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Ou escolha um endereço</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          {/* List of Simulated Addresses */}
          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
            {SIMULATED_ADDRESSES.map((item) => {
              const isSelected = selectedAddress?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectAddress(item);
                    onClose();
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/60 shadow-sm'
                      : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl mt-0.5 ${isSelected ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                      <Building className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">{item.title}</h4>
                      <p className="text-xs font-medium text-gray-600">{item.address}</p>
                      <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                        <Sparkles className="w-3 h-3" /> {item.distanceText}
                      </span>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Custom CEP Form */}
          <form onSubmit={handleCepSubmit} className="pt-2 border-t border-gray-100">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Digitar CEP ou Endereço manual:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ex: 01310-100"
                value={customCep}
                onChange={(e) => setCustomCep(e.target.value)}
                className="flex-1 px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all"
              >
                Buscar
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
}
