import React, { useState } from 'react';
import { MapPin, Navigation, Check, X, Building, Compass, Sparkles, ArrowRight } from 'lucide-react';
import { SIMULATED_ADDRESSES } from '../mockData';
import { motion, AnimatePresence } from 'framer-motion';

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
    }, 1100);
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
          className="relative bg-[#FAF8F5] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E8E2D5] transform transition-all z-10"
        >
          {/* Modal Header */}
          <div className="bg-[#0B201A] p-6 sm:p-7 text-white relative border-b border-emerald-950">
            <button 
              onClick={onClose}
              data-cursor="Fechar"
              className="absolute top-6 right-6 text-stone-400 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-emerald-900/60 border border-emerald-700/40 rounded-2xl text-emerald-300">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-300 block">
                  Geolocalização Mesa Cheia
                </span>
                <h2 className="text-xl font-display font-extrabold text-[#F4EFEA]">Onde você quer receber?</h2>
              </div>
            </div>
            <p className="text-xs text-stone-300 mt-1">
              Selecione seu endereço ou simule via GPS/CEP para listar os mercados mais próximos.
            </p>
          </div>

          <div className="p-6 sm:p-7 space-y-5">
            {/* GPS Simulation Action */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSimulateGps}
              disabled={isLocating}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#064E3B] to-[#047857] hover:from-[#065F46] hover:to-[#059669] text-white rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2.5"
            >
              <Navigation className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
              <span>{isLocating ? 'Obtendo coordenadas GPS...' : 'Usar Localização Atual (GPS Simulado)'}</span>
            </motion.button>

            {/* CEP Input Form */}
            <form onSubmit={handleCepSubmit} className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block">
                Ou informe seu CEP:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ex: 01310-100"
                  value={customCep}
                  onChange={(e) => setCustomCep(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-white border border-[#E8E2D5] rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono shadow-sm"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors"
                >
                  Buscar
                </button>
              </div>
            </form>

            {/* Simulated Address List */}
            <div className="space-y-2.5 pt-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 block">
                Endereços Frequentes Salvos:
              </span>
              
              {SIMULATED_ADDRESSES.map((item) => {
                const isSelected = selectedAddress?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectAddress(item);
                      onClose();
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-white border-emerald-600 ring-2 ring-emerald-600/20 shadow-sm'
                        : 'bg-white hover:bg-[#FAF8F5] border-[#E8E2D5]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-xl mt-0.5 ${isSelected ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-500'}`}>
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-display font-bold text-xs text-stone-900">{item.title}</div>
                        <div className="text-xs text-stone-600 mt-0.5">{item.address}</div>
                        <div className="text-[10px] text-stone-400 font-mono mt-0.5">{item.distanceText}</div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-emerald-700 shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
