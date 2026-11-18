import React from 'react';
import { Clock, Star, Zap, DollarSign, MapPin, ChevronRight, CheckCircle2, ShieldCheck, Award, ArrowUpRight } from 'lucide-react';
import { SUPERMARKETS } from '../mockData';
import { motion } from 'framer-motion';

export default function SupermarketList({
  activeFilter,
  setActiveFilter,
  selectedStoreId,
  setSelectedStoreId
}) {
  
  // Filter logic
  const getFilteredSupermarkets = () => {
    let list = [...SUPERMARKETS];
    if (activeFilter === 'fastest') {
      return list.sort((a, b) => a.deliveryTimeMinutes - b.deliveryTimeMinutes);
    }
    if (activeFilter === 'cheapest') {
      return list.sort((a, b) => (a.deliveryFee ?? a.baseStoreFee ?? 0) - (b.deliveryFee ?? b.baseStoreFee ?? 0));
    }
    if (activeFilter === 'rating') {
      return list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  };

  const filteredList = getFilteredSupermarkets();

  return (
    <section className="mb-14">
      
      {/* Section Title & Quick Filters Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-950 text-emerald-300 font-mono text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 border border-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Supermercados Parceiros
            </span>
            <span className="text-xs text-stone-500 font-medium">3 opções na sua região</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-stone-900 tracking-tight">
            Escolha o Supermercado Ideal
          </h2>
        </div>

        {/* Quick Filter Buttons (Pill Dock) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar p-1.5 bg-[#F4EFEA] rounded-full border border-[#E8E2D5]">
          <button
            onClick={() => setActiveFilter('all')}
            data-cursor="Todos"
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeFilter === 'all'
                ? 'bg-stone-900 text-white shadow-sm font-bold'
                : 'text-stone-700 hover:text-stone-950 hover:bg-white/60'
            }`}
          >
            <span>Todos</span>
          </button>

          <button
            onClick={() => setActiveFilter('fastest')}
            data-cursor="SuperMais"
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeFilter === 'fastest'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-sm font-bold'
                : 'text-stone-700 hover:text-amber-700 hover:bg-white/60'
            }`}
          >
            <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
            <span>Menor Tempo (SuperMais - 20 min)</span>
          </button>

          <button
            onClick={() => setActiveFilter('cheapest')}
            data-cursor="Econômico"
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeFilter === 'cheapest'
                ? 'bg-[#064E3B] text-white shadow-sm font-bold'
                : 'text-stone-700 hover:text-emerald-700 hover:bg-white/60'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Menor Preço (Mercado Econômico)</span>
          </button>

          <button
            onClick={() => setActiveFilter('rating')}
            data-cursor="Avaliações"
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeFilter === 'rating'
                ? 'bg-blue-600 text-white shadow-sm font-bold'
                : 'text-stone-700 hover:text-blue-700 hover:bg-white/60'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current text-yellow-300" />
            <span>Melhor Avaliados</span>
          </button>
        </div>
      </div>

      {/* Bento Grid: Supermarkets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredList.map((store, index) => {
          const isSelected = selectedStoreId === store.id;
          const fee = store.deliveryFee ?? store.baseStoreFee ?? 0;

          return (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedStoreId(isSelected ? null : store.id)}
              data-cursor={isSelected ? "Desmarcar" : "Filtrar"}
              className={`relative bg-white rounded-3xl p-7 border transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-bento ${
                isSelected
                  ? 'border-emerald-600 ring-4 ring-emerald-600/10 shadow-bento-hover'
                  : 'border-[#E8E2D5] hover:border-emerald-600/60 hover:shadow-bento-hover'
              }`}
            >
              {/* Highlight Badge */}
              {store.isFastest && (
                <div className="absolute -top-3.5 left-6 bg-gradient-to-r from-amber-600 to-orange-500 text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-amber-300/30">
                  <Zap className="w-3 h-3 fill-current" />
                  <span>DESTAQUE: {store.badge} ({store.deliveryTimeMinutes} min)</span>
                </div>
              )}

              {store.isCheapest && (
                <div className="absolute -top-3.5 left-6 bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-blue-300/30">
                  <DollarSign className="w-3 h-3" />
                  <span>DESTAQUE: Taxa R$ {fee.toFixed(2).replace('.', ',')}</span>
                </div>
              )}

              {!store.isFastest && !store.isCheapest && (
                <div className="absolute -top-3.5 left-6 bg-[#0B201A] text-stone-200 text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-stone-700">
                  <Award className="w-3 h-3 text-amber-400" />
                  <span>{store.badge}</span>
                </div>
              )}

              <div>
                {/* Store Top Info */}
                <div className="flex items-start justify-between gap-4 mt-3 mb-5">
                  <div className="flex items-center gap-3.5">
                    <div className="w-16 h-16 rounded-2xl bg-[#F4EFEA] border border-[#E8E2D5] flex items-center justify-center text-3xl shadow-inner group-hover:scale-105 group-hover:bg-emerald-50/50 transition-all duration-300">
                      {store.logo}
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-xl text-stone-900 group-hover:text-emerald-700 transition-colors">
                        {store.name}
                      </h3>
                      <p className="text-xs text-stone-500 font-medium line-clamp-1 mt-0.5">
                        {store.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 p-1.5 rounded-full bg-stone-50 group-hover:bg-emerald-50 text-stone-400 group-hover:text-emerald-700 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Badges & Stats Bento Box */}
                <div className="grid grid-cols-2 gap-2.5 my-5 bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#E8E2D5]/80 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-xl ${store.isFastest ? 'bg-amber-100 text-amber-700' : 'bg-stone-100 text-stone-600'}`}>
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-stone-400 block font-medium">Tempo Entrega</span>
                      <span className={`font-bold font-mono ${store.isFastest ? 'text-amber-700 text-sm' : 'text-stone-800'}`}>
                        {store.deliveryTimeMinutes} min
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-stone-400 block font-medium">Distância</span>
                      <span className="font-bold font-mono text-stone-800">{store.distanceKm} km</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2.5 border-t border-[#E8E2D5] col-span-2 justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <span className="font-bold text-stone-900 font-mono">{store.rating}</span>
                      <span className="text-[10px] text-stone-400">({store.reviewsCount})</span>
                    </div>
                    <div className="text-[11px] font-semibold text-stone-600">
                      Taxa: <span className="font-bold text-emerald-700 font-mono">R$ {fee.toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  className={`w-full py-3 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    isSelected
                      ? 'bg-[#064E3B] text-white shadow-md'
                      : 'bg-[#F4EFEA] hover:bg-[#064E3B] hover:text-white text-stone-800 group-hover:border-transparent'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      <span>Filtrado por este mercado</span>
                    </>
                  ) : (
                    <>
                      <span>Ver produtos no {store.name}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>

            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
