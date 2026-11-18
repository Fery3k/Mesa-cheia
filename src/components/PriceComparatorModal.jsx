import React from 'react';
import { X, Scale, Sparkles, ShoppingBag, Clock, Truck, Check, ArrowRight } from 'lucide-react';
import { SUPERMARKETS, PRODUCTS, getProductDeliveryFee } from '../mockData';
import { motion, AnimatePresence } from 'framer-motion';

export default function PriceComparatorModal({ isOpen, onClose, selectedProduct, onAddToCart }) {
  if (!isOpen) return null;

  const productList = selectedProduct ? [selectedProduct] : PRODUCTS;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0B201A]/65 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-[#FAF8F5] rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-[#E8E2D5] flex flex-col z-10"
        >
          
          {/* Modal Header */}
          <div className="bg-[#0B201A] p-6 sm:p-8 text-white relative border-b border-emerald-950">
            <button 
              onClick={onClose}
              data-cursor="Fechar"
              className="absolute top-6 right-6 text-stone-400 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-900/60 border border-emerald-700/40 rounded-2xl">
                <Scale className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-300 block mb-1">
                  Matriz Comparativa de Preços & Taxas
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-extrabold text-[#F4EFEA]">
                  {selectedProduct ? `Comparando: ${selectedProduct.name}` : 'Comparativo Geral com Frete Cumulativo'}
                </h2>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">

            {/* Critical Business Rule Box */}
            <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200/80 text-xs text-amber-950 flex items-start gap-3.5 shadow-xs">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <strong className="block font-bold text-amber-900 text-sm mb-1 font-display">Regra de Cálculo de Frete:</strong>
                Cada produto traz sua própria taxa de entrega associada (ex: Arroz = R$ 3,00; Feijão = R$ 2,50). No carrinho, as taxas são <strong>somadas multiplicadas pelas quantidades selecionadas</strong>.
              </div>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto rounded-3xl border border-[#E8E2D5] bg-white shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F4EFEA] text-stone-700 font-bold uppercase tracking-wider border-b border-[#E8E2D5] font-mono text-[11px]">
                    <th className="p-4 sm:p-5">Produto & Taxa Frete</th>
                    {SUPERMARKETS.map((store) => (
                      <th key={store.id} className="p-4 sm:p-5 min-w-[200px]">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{store.logo}</span>
                          <div>
                            <div className="font-display font-extrabold text-sm text-stone-900">{store.name}</div>
                            <div className="text-[10px] text-stone-500 font-medium lowercase">
                              {store.deliveryTimeMinutes} min • {store.badge}
                            </div>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#E8E2D5]">
                  {productList.map((product) => {
                    const fees = SUPERMARKETS.map((s) => getProductDeliveryFee(product, s.id));
                    const minFee = Math.min(...fees);
                    let minP = Infinity;
                    Object.values(product.prices).forEach((p) => {
                      if (p < minP) minP = p;
                    });

                    return (
                      <tr key={product.id} className="hover:bg-[#FAF8F5] transition-colors">
                        <td className="p-4 sm:p-5">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{product.image}</span>
                            <div>
                              <div className="font-display font-bold text-stone-900 text-sm">{product.name}</div>
                              <div className="text-[10px] text-stone-500 font-mono">{product.unit}</div>
                              <div className="mt-1 inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                <Truck className="w-3 h-3 text-amber-600" />
                                <span>Frete a partir de R$ {minFee.toFixed(2).replace('.', ',')}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {SUPERMARKETS.map((store) => {
                          const price = product.prices[store.id];
                          const storeDeliveryFee = getProductDeliveryFee(product, store.id);
                          const isLowest = price === minP;

                          return (
                            <td key={store.id} className="p-4 sm:p-5">
                              <div className={`p-3 rounded-2xl border transition-all ${
                                isLowest 
                                  ? 'bg-emerald-50/80 border-emerald-300' 
                                  : 'bg-[#FAF8F5] border-[#E8E2D5]'
                              }`}>
                                <div className="flex items-baseline justify-between mb-1.5">
                                  <span className={`font-mono text-base font-extrabold ${isLowest ? 'text-emerald-800' : 'text-stone-900'}`}>
                                    R$ {price.toFixed(2).replace('.', ',')}
                                  </span>
                                  {isLowest && (
                                    <span className="bg-emerald-700 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                                      Menor Preço
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center justify-between text-[10px] font-mono text-amber-800 bg-amber-50/80 px-2 py-0.5 rounded border border-amber-200/60 mb-2">
                                  <span className="flex items-center gap-1">
                                    <Truck className="w-3 h-3 text-amber-600" />
                                    <span>Frete mercado:</span>
                                  </span>
                                  <span className="font-bold">R$ {storeDeliveryFee.toFixed(2).replace('.', ',')}</span>
                                </div>

                                <button
                                  onClick={() => {
                                    onAddToCart(product, store);
                                    onClose();
                                  }}
                                  data-cursor="Adicionar"
                                  className={`w-full py-1.5 px-2.5 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all ${
                                    isLowest
                                      ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
                                      : 'bg-white hover:bg-stone-200 text-stone-700 border border-[#E8E2D5]'
                                  }`}
                                >
                                  <ShoppingBag className="w-3 h-3" />
                                  <span>Adicionar</span>
                                </button>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Modal Bottom Tip */}
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/80 text-xs text-emerald-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  <strong>Dica Mesa Cheia:</strong> O frete total do seu pedido acumula o valor de entrega de cada unidade adicionada ao carrinho.
                </span>
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
