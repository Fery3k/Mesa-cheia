import React from 'react';
import { X, Scale, Sparkles, ShoppingBag, Clock, Truck } from 'lucide-react';
import { SUPERMARKETS, PRODUCTS } from '../mockData';

export default function PriceComparatorModal({ isOpen, onClose, selectedProduct, onAddToCart }) {
  if (!isOpen) return null;

  const productList = selectedProduct ? [selectedProduct] : PRODUCTS;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-100 flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1.5 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-md">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200 block">
                Matriz Comparativa de Preços & Taxas
              </span>
              <h2 className="text-xl font-bold">
                {selectedProduct ? `Comparando: ${selectedProduct.name}` : 'Comparativo Geral com Frete Cumulativo'}
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Body - Table View */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200 text-xs text-orange-900 flex items-start gap-3">
            <Truck className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold mb-0.5">Regra de Cálculo de Frete:</strong>
              Cada produto traz sua própria taxa de entrega associada (ex: Arroz = R$ 3,00; Feijão = R$ 2,50). No carrinho, as taxas são **somadas multiplicadas pelas quantidades selecionadas**.
            </div>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 font-bold uppercase tracking-wider border-b border-gray-200">
                  <th className="p-4">Produto & Taxa Frete</th>
                  {SUPERMARKETS.map((store) => (
                    <th key={store.id} className="p-4 min-w-[170px]">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{store.logo}</span>
                        <div>
                          <div className="font-extrabold text-gray-900">{store.name}</div>
                          <div className="text-[10px] font-medium text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-orange-500" /> {store.deliveryTimeMinutes} min
                          </div>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {productList.map((product) => {
                  const prices = Object.values(product.prices);
                  const minPrice = Math.min(...prices);
                  const itemDeliveryFee = product.deliveryFee || 2.00;

                  return (
                    <tr key={product.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4 font-semibold text-gray-900">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{product.image}</span>
                          <div>
                            <div className="font-bold text-gray-900">{product.name}</div>
                            <div className="text-[10px] text-gray-400">{product.unit}</div>
                            <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-extrabold text-orange-700 bg-orange-100/80 px-2 py-0.5 rounded">
                              <Truck className="w-3 h-3" /> Frete: R$ {itemDeliveryFee.toFixed(2).replace('.', ',')} /un
                            </span>
                          </div>
                        </div>
                      </td>

                      {SUPERMARKETS.map((store) => {
                        const price = product.prices[store.id];
                        const isCheapest = price === minPrice;

                        return (
                          <td key={store.id} className={`p-4 ${isCheapest ? 'bg-emerald-50/60 font-bold' : ''}`}>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5">
                                <span className={`text-sm font-extrabold ${isCheapest ? 'text-emerald-700' : 'text-gray-900'}`}>
                                  R$ {price.toFixed(2).replace('.', ',')}
                                </span>
                                {isCheapest && (
                                  <span className="bg-emerald-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                                    Melhor Preço
                                  </span>
                                )}
                              </div>
                              <button
                                onClick={() => {
                                  onAddToCart(product, store);
                                  onClose();
                                }}
                                className={`mt-2 py-1.5 px-3 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1 ${
                                  isCheapest
                                    ? 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700'
                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                }`}
                              >
                                <ShoppingBag className="w-3 h-3" />
                                <span>Comprar</span>
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

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all"
          >
            Fechar Tabela
          </button>
        </div>

      </div>
    </div>
  );
}
