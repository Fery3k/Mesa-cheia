import React from 'react';
import { ShoppingBag, MapPin, Search, Sparkles, Store, Users, Scale, ArrowRight, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import brandLogo from '../assets/logo.png';

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
  const navTabs = [
    { id: 'home', label: 'Mercados', icon: Store },
    { id: 'comparator', label: 'Comparador', icon: Scale },
    { id: 'registration', label: 'Cadastros', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      
      {/* Editorial Top Ticker Bar */}
      <div className="bg-[#0B201A] text-[#F4EFEA] text-[11px] font-medium py-2 px-4 border-b border-emerald-950/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 truncate">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-300 uppercase tracking-widest text-[9px] px-1.5 py-0.5 rounded bg-emerald-900/60 border border-emerald-700/40">
              Mesa Cheia
            </span>
            <span className="truncate text-stone-300 text-xs">
              O iFood dos supermercados — Compare preços dos mercados parceiros em tempo real e receba rápido!
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 shrink-0 text-[11px] text-stone-400 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              Frete Cumulativo por Item Ativo
            </span>
            <span className="text-stone-600">|</span>
            <span className="text-emerald-300 font-semibold">3 Mercados Conectados</span>
          </div>
        </div>
      </div>

      {/* Main Glass Navigation Bar */}
      <div className="bg-[#FAF8F5]/85 backdrop-blur-xl border-b border-[#E8E2D5]/80 shadow-[0_4px_24px_rgba(28,25,23,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Brand Logo & Editorial Signature */}
            <div 
              onClick={() => setActiveTab('home')}
              data-cursor="Home"
              className="flex items-center gap-3 cursor-pointer group shrink-0"
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg shadow-emerald-950/15 group-hover:scale-105 transition-all duration-300 border border-emerald-600/30 bg-emerald-500/10 flex items-center justify-center p-0.5">
                  <img src={brandLogo} alt="Mesa Cheia Mascote" className="w-full h-full object-contain drop-shadow" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-[8px] font-bold text-stone-900 shadow-sm">
                  ✓
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-extrabold text-2xl tracking-tight text-stone-900 leading-none">
                    Mesa<span className="text-[#059669]">Cheia</span>
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 font-medium tracking-tight mt-0.5 hidden sm:block">
                  Comparador & Delivery de Mercado
                </p>
              </div>
            </div>

            {/* Location Selector Pill */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={openLocationModal}
              data-cursor="Mudar CEP"
              className="hidden md:flex items-center gap-3 px-4 py-2 bg-white/90 hover:bg-white border border-[#E8E2D5] hover:border-emerald-500 rounded-full text-xs shadow-sm transition-all text-left group max-w-[280px]"
              title="Clique para simular localização"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="truncate pr-1">
                <span className="text-[10px] font-bold uppercase text-emerald-800 block tracking-wider font-mono">
                  Entregar em:
                </span>
                <span className="text-xs font-semibold text-stone-800 truncate block">
                  {selectedAddress ? selectedAddress.address : 'Av. Brasil, 1500 - Centro'}
                </span>
              </div>
            </motion.button>

            {/* Global Search with Editorial Look */}
            <div className="flex-1 max-w-md relative hidden sm:block">
              <div className="relative group">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-emerald-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Busque por arroz, feijão, leite..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-10 py-2.5 bg-white/90 hover:bg-white focus:bg-white text-xs sm:text-sm text-stone-900 rounded-full border border-[#E8E2D5] focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all placeholder:text-stone-400 font-medium shadow-sm"
                />
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 w-5 h-5 rounded-full flex items-center justify-center font-bold"
                  >
                    ×
                  </button>
                ) : (
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-mono font-semibold text-stone-400 bg-stone-100 border border-stone-200 px-1.5 py-0.5 rounded">
                    /
                  </span>
                )}
              </div>
            </div>

            {/* Navigation Tabs & Cart Action */}
            <div className="flex items-center gap-3">
              
              {/* Mobile Location button */}
              <button
                onClick={openLocationModal}
                className="md:hidden p-2.5 text-stone-700 hover:text-emerald-700 hover:bg-white border border-[#E8E2D5] rounded-full transition-all"
                title="Endereço"
              >
                <MapPin className="w-4 h-4" />
              </button>

              {/* Desktop Nav Tabs with Floating Pill Physics */}
              <nav className="hidden lg:flex items-center bg-[#ECE6DB]/60 p-1.5 rounded-full text-xs font-semibold border border-[#E8E2D5]/70">
                {navTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      data-cursor={tab.label}
                      className={`relative px-4 py-2 rounded-full transition-all flex items-center gap-2 z-10 ${
                        isActive
                          ? 'text-stone-900 font-bold'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNavTab"
                          className="absolute inset-0 bg-white rounded-full shadow-sm border border-[#E8E2D5]/60 -z-10"
                          transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                        />
                      )}
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-700' : 'text-stone-500'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Shopping Cart Drawer Trigger (Awwwards Style) */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={openCartDrawer}
                data-cursor="Carrinho"
                className="relative flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-[#064E3B] to-[#047857] hover:from-[#065F46] hover:to-[#059669] text-white rounded-full font-semibold text-xs sm:text-sm shadow-md hover:shadow-xl shadow-emerald-950/20 active:scale-95 transition-all group border border-emerald-700/50"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 group-hover:rotate-6 transition-transform" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                  )}
                </div>
                <span className="hidden sm:inline font-display tracking-tight font-bold">Carrinho</span>
                <span className="bg-white text-emerald-950 text-xs font-extrabold px-2 py-0.5 rounded-full shadow-inner">
                  {cartCount}
                </span>
                {cartTotal > 0 && (
                  <span className="hidden md:inline border-l border-emerald-600/60 pl-2 text-xs font-mono font-bold text-emerald-100">
                    R$ {cartTotal.toFixed(2).replace('.', ',')}
                  </span>
                )}
              </motion.button>
            </div>

          </div>

          {/* Mobile Navigation Row */}
          <div className="lg:hidden flex items-center justify-around py-2.5 border-t border-[#E8E2D5] text-xs font-semibold">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Search Input */}
          <div className="pb-3 sm:hidden">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Buscar produtos em todos os mercados..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white text-xs text-stone-900 rounded-full border border-[#E8E2D5] focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-sm"
              />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
