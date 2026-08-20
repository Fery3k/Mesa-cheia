import React from 'react';
import { ShoppingBag, MapPin, Search, Sparkles, Store, Users, Scale, Clock } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  selectedAddress,
  openLocationModal,
  searchQuery,
  setSearchQuery,
  cartCount,
  cartTotal,
  openCartDrawer
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-200">
      {/* Top Banner - MVP Simulation Notice */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white text-xs font-medium py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
        <span>
          <strong>Mesa Cheia MVP:</strong> O iFood dos supermercados — Compare preços dos mercados parceiros em tempo real e receba rápido!
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
              <ShoppingBag className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-gray-900 font-sans">
                  Mesa<span className="text-emerald-600">Cheia</span>
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                  MVP
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium hidden sm:block">
                Comparador & Delivery de Mercado
              </p>
            </div>
          </div>

          {/* Location Selector Simulator */}
          <button
            onClick={openLocationModal}
            className="hidden md:flex items-center gap-2.5 px-3.5 py-2 bg-gray-50 hover:bg-emerald-50/80 border border-gray-200 hover:border-emerald-300 rounded-full text-xs transition-all text-left group max-w-[260px] truncate"
            title="Clique para simular localização"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="truncate">
              <span className="text-[10px] font-semibold uppercase text-emerald-700 block tracking-wide">
                Entregar em:
              </span>
              <span className="text-xs font-medium text-gray-800 truncate block">
                {selectedAddress ? selectedAddress.address : 'Av. Brasil, 1500 - Centro'}
              </span>
            </div>
          </button>

          {/* Global Product Search Input */}
          <div className="flex-1 max-w-md relative hidden sm:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Busque por arroz, feijão, leite..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100/80 hover:bg-gray-100 focus:bg-white text-xs sm:text-sm rounded-full border border-transparent focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 font-bold bg-gray-200 hover:bg-gray-300 w-5 h-5 rounded-full flex items-center justify-center"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Navigation Links & Cart Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Mobile Location button */}
            <button
              onClick={openLocationModal}
              className="md:hidden p-2 text-gray-600 hover:text-emerald-600 hover:bg-gray-100 rounded-full"
              title="Endereço"
            >
              <MapPin className="w-5 h-5 text-emerald-600" />
            </button>

            {/* Nav Tabs */}
            <nav className="hidden lg:flex items-center bg-gray-100 p-1 rounded-full text-xs font-semibold">
              <button
                onClick={() => setActiveTab('home')}
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  activeTab === 'home'
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Mercados</span>
              </button>
              <button
                onClick={() => setActiveTab('comparator')}
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  activeTab === 'comparator'
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Comparador</span>
              </button>
              <button
                onClick={() => setActiveTab('registration')}
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  activeTab === 'registration'
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Cadastros</span>
              </button>
            </nav>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={openCartDrawer}
              className="relative flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-full font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg shadow-emerald-600/20 active:scale-95 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Carrinho</span>
              <span className="bg-white text-emerald-800 text-xs font-extrabold px-2 py-0.5 rounded-full shadow-inner">
                {cartCount}
              </span>
              {cartTotal > 0 && (
                <span className="hidden md:inline border-l border-emerald-400/40 pl-2 text-xs font-bold">
                  R$ {cartTotal.toFixed(2).replace('.', ',')}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Row */}
        <div className="lg:hidden flex items-center justify-around py-2 border-t border-gray-100 text-xs font-medium">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${
              activeTab === 'home' ? 'bg-emerald-100 text-emerald-800 font-bold' : 'text-gray-600'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Mercados</span>
          </button>
          <button
            onClick={() => setActiveTab('comparator')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${
              activeTab === 'comparator' ? 'bg-emerald-100 text-emerald-800 font-bold' : 'text-gray-600'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Comparador</span>
          </button>
          <button
            onClick={() => setActiveTab('registration')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${
              activeTab === 'registration' ? 'bg-emerald-100 text-emerald-800 font-bold' : 'text-gray-600'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Cadastros</span>
          </button>
        </div>

        {/* Mobile Search input bar */}
        <div className="pb-3 sm:hidden">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar produtos em todos os mercados..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 text-xs rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>

      </div>
    </header>
  );
}
