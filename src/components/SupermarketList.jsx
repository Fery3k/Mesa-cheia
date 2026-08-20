import React from 'react';
import { Clock, Star, Zap, DollarSign, MapPin, ChevronRight, CheckCircle2, ShieldCheck, Award } from 'lucide-react';
import { SUPERMARKETS } from '../mockData';

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
      return list.sort((a, b) => a.deliveryFee - b.deliveryFee);
    }
    if (activeFilter === 'rating') {
      return list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  };

  const filteredList = getFilteredSupermarkets();

  return (
    <section className="mb-10">
      
      {/* Section Title & Quick Filters Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Supermercados Parceiros
            </span>
            <span className="text-xs text-gray-500 font-medium">3 opções na sua região</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Escolha o Supermercado Ideal
          </h2>
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
              activeFilter === 'all'
                ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span>Todos</span>
          </button>

          <button
            onClick={() => setActiveFilter('fastest')}
            className={`px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
              activeFilter === 'fastest'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-500 shadow-md shadow-orange-500/20'
                : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300 hover:bg-orange-50/50'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>Menor Tempo (SuperMais - 20 min)</span>
          </button>

          <button
            onClick={() => setActiveFilter('cheapest')}
            className={`px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
              activeFilter === 'cheapest'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Menor Preço (Mercado Econômico)</span>
          </button>

          <button
            onClick={() => setActiveFilter('rating')}
            className={`px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
              activeFilter === 'rating'
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current text-yellow-400" />
            <span>Melhor Avaliados</span>
          </button>
        </div>
      </div>

      {/* Supermarket Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredList.map((store) => {
          const isSelected = selectedStoreId === store.id;

          return (
            <div
              key={store.id}
              onClick={() => setSelectedStoreId(isSelected ? null : store.id)}
              className={`relative bg-white rounded-3xl p-6 border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'border-emerald-500 ring-2 ring-emerald-500/30 shadow-xl scale-[1.02]'
                  : 'border-gray-100 hover:border-emerald-300 hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              {/* Highlight Badge */}
              {store.isFastest && (
                <div className="absolute -top-3 left-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-current" />
                  <span>DESTAQUE: {store.badge} ({store.deliveryTimeMinutes} min)</span>
                </div>
              )}

              {store.isCheapest && (
                <div className="absolute -top-3 left-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  <span>DESTAQUE: Taxa R$ {store.deliveryFee.toFixed(2).replace('.', ',')}</span>
                </div>
              )}

              {!store.isFastest && !store.isCheapest && (
                <div className="absolute -top-3 left-6 bg-gray-900 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-400" />
                  <span>{store.badge}</span>
                </div>
              )}

              <div>
                {/* Store Top Info */}
                <div className="flex items-start justify-between gap-3 mt-2 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
                      {store.logo}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-lg text-gray-900 group-hover:text-emerald-600 transition-colors">
                        {store.name}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium line-clamp-1">
                        {store.tagline}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Badges & Stats */}
                <div className="grid grid-cols-2 gap-2 my-4 bg-gray-50/80 p-3 rounded-2xl border border-gray-100 text-xs">
                  <div className="flex items-center gap-2">
                    <Clock className={`w-4 h-4 ${store.isFastest ? 'text-orange-500 font-bold' : 'text-gray-500'}`} />
                    <div>
                      <span className="text-[10px] text-gray-400 block font-medium">Tempo Entrega</span>
                      <span className={`font-bold ${store.isFastest ? 'text-orange-600 text-sm' : 'text-gray-800'}`}>
                        {store.deliveryTimeMinutes} min
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="text-[10px] text-gray-400 block font-medium">Distância</span>
                      <span className="font-bold text-gray-800">{store.distanceKm} km</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1 border-t border-gray-200/60 col-span-2 justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-gray-900">{store.rating}</span>
                      <span className="text-[10px] text-gray-400">({store.reviewsCount})</span>
                    </div>
                    <div className="text-[11px] font-semibold text-gray-600">
                      Taxa: <span className="font-bold text-emerald-700">R$ {store.deliveryFee.toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-gray-100 hover:bg-emerald-600 hover:text-white text-gray-800'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Filtrado por este mercado</span>
                    </>
                  ) : (
                    <>
                      <span>Ver produtos no {store.name}</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
