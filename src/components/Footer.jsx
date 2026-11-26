import React from 'react';
import { ShoppingBag, ShieldCheck, Heart, Sparkles, ArrowUpRight } from 'lucide-react';
import brandLogo from '../assets/logo.jpg';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-[#0B201A] text-stone-300 pt-16 pb-12 border-t border-emerald-950/80 relative overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg shadow-emerald-950/40 border border-emerald-600/40 bg-black flex items-center justify-center shrink-0 p-0.5">
                <img src={brandLogo} alt="Mesa Cheia Mascote" className="w-full h-full object-contain" />
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-[#F4EFEA]">
                Mesa<span className="text-emerald-400">Cheia</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 max-w-md leading-relaxed">
              O ecossistema inteligente de entrega e comparação de preços em supermercados locais. Economize tempo e dinheiro em cada compra com frete cumulativo transparente por item.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Todos os sistemas e APIs locais operando com 100% de estabilidade</span>
            </div>
          </div>

          {/* Supermercados Parceiros */}
          <div>
            <h4 className="font-mono font-bold text-xs uppercase tracking-widest text-emerald-300 mb-4">
              Supermercados Parceiros
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-medium">
              <li 
                onClick={() => setActiveTab('home')}
                className="hover:text-emerald-400 cursor-pointer transition-colors flex items-center justify-between group"
              >
                <span>Supermercado Centro (35 min)</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </li>
              <li 
                onClick={() => setActiveTab('home')}
                className="hover:text-emerald-400 cursor-pointer transition-colors flex items-center justify-between group"
              >
                <span>SuperMais (Entrega 20 min)</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </li>
              <li 
                onClick={() => setActiveTab('home')}
                className="hover:text-emerald-400 cursor-pointer transition-colors flex items-center justify-between group"
              >
                <span>Mercado Econômico (Menor Preço)</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </li>
            </ul>
          </div>

          {/* Portais */}
          <div>
            <h4 className="font-mono font-bold text-xs uppercase tracking-widest text-emerald-300 mb-4">
              Portais de Acesso
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-medium">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-emerald-400 transition-colors">
                  Dashboard do Cliente
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('comparator')} className="hover:text-emerald-400 transition-colors">
                  Comparador de Preços
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('registration')} className="hover:text-emerald-400 transition-colors">
                  Cadastro de Mercados & Entregadores
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Design Watermark */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-mono">
          <div>
            © 2026 Mesa Cheia. Projeto desenvolvido com régua de design Awwwards.
          </div>
          <div className="flex items-center gap-1.5 text-stone-400">
            <span>Desenvolvido com</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current inline" />
            <span>para o trabalho da Letícia</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
