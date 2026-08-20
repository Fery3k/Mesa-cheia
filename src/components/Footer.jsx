import React from 'react';
import { ShoppingBag, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-gray-800">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                Mesa<span className="text-emerald-500">Cheia</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              O ecossistema inteligente de entrega e comparação de preços em supermercados locais. Economize tempo e dinheiro em cada compra.
            </p>
          </div>

          {/* Supermercados Parceiros */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-3">
              Supermercados Parceiros
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">Supermercado Centro (35 min)</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">SuperMais (Entrega 20 min)</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">Mercado Econômico (Menor Preço)</li>
            </ul>
          </div>

          {/* Portais */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-3">
              Portais de Acesso
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
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

          {/* MVP Scope Box */}
          <div className="bg-gray-800/80 p-4 rounded-2xl border border-gray-700 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Sparkles className="w-4 h-4" /> MVP Demonstrativo
            </div>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              Desenvolvido com cálculo de taxa fixa de R$ 9,90 e simulação em tempo real "Mágico de Oz" para rastreamento de entregas.
            </p>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Mesa Cheia - Todos os direitos reservados.</p>
          <div className="flex items-center gap-1 text-gray-400">
            <span>Interface desenvolvida para o MVP do trabalho</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
