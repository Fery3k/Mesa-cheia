import React from 'react';
import { Sparkles, TrendingDown, Zap, ShieldCheck, Scale, Truck } from 'lucide-react';

export default function EditorialMarquee() {
  const marqueeItems = [
    { icon: TrendingDown, text: 'Arroz Tipo 1 Tio João 5kg por R$ 25,90 no Mercado Econômico' },
    { icon: Sparkles, text: 'Peito de Frango Seara 1kg por R$ 17,49 no Mercado Econômico' },
    { icon: Zap, text: 'SuperMais: Menor tempo de entrega da cidade em apenas 20 min' },
    { icon: Truck, text: 'Novo: Frete calculado por Distância (km) × 3,5 — quanto mais perto, mais barato!' },
    { icon: TrendingDown, text: 'Cartela com 30 Ovos Mantiqueira por R$ 18,99 no Econômico' },
    { icon: Sparkles, text: 'Supermercado Centro: Mais Tradicional com 1.420 avaliações 4.8★' },
    { icon: Scale, text: 'Hortifrúti Fresco: Banana Prata R$ 5,49/kg e Tomate Italiano R$ 6,49/kg' },
    { icon: ShieldCheck, text: 'Economize até 25% na sua feira mensal comparando mercados' },
  ];

  return (
    <div className="editorial-marquee-bar relative w-full overflow-hidden border-y border-[#E8E2D5] bg-[#F4EFEA]/70 py-3 select-none mb-10">
      <div className="flex w-max animate-marquee space-x-8 text-xs font-semibold uppercase tracking-wider text-stone-700">
        {[...marqueeItems, ...marqueeItems].map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-center space-x-2.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <Icon className="w-3.5 h-3.5 text-emerald-700" />
              <span className="font-display tracking-normal text-stone-800">{item.text}</span>
              <span className="text-stone-300">/</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
