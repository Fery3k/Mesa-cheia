import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Clock, ShieldCheck, ArrowRight, Truck, CreditCard, Sparkles, CheckCircle2, Calculator, Receipt } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onConfirmOrder
}) {
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Group items by store
  const itemsByStore = cartItems.reduce((acc, item) => {
    const storeId = item.store.id;
    if (!acc[storeId]) {
      acc[storeId] = {
        store: item.store,
        items: []
      };
    }
    acc[storeId].items.push(item);
    return acc;
  }, {});

  // Subtotal Calculation for Products
  const productsSubtotal = cartItems.reduce((sum, item) => {
    return sum + item.product.prices[item.store.id] * item.quantity;
  }, 0);

  // REGRA DE NEGÓCIO CRÍTICA: CÁLCULO DE TAXA DE ENTREGA CUMULATIVA POR ITEM
  // Sum of (product.deliveryFee * quantity) for all items in the cart
  const cumulativeDeliveryFee = cartItems.reduce((sum, item) => {
    const itemDeliveryFee = item.product.deliveryFee || 2.00;
    return sum + (itemDeliveryFee * item.quantity);
  }, 0);

  // Estimated delivery time (35 min default for Supermercado Centro, 20 min if SuperMais)
  const containsSuperMais = cartItems.some((item) => item.store.id === 'super-mais');
  const estimatedDeliveryMinutes = containsSuperMais ? 20 : 35;

  // Total Geral: Products Subtotal + Cumulative Delivery Fee
  const totalGeral = productsSubtotal + cumulativeDeliveryFee;

  const handleCheckoutSubmit = () => {
    setIsSubmitting(true);
    
    // Celebratory confetti trigger
    try {
      confetti({
        particleCount: 90,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {
      // safe fallback
    }

    setTimeout(() => {
      setIsSubmitting(false);
      onConfirmOrder({
        cartItems,
        subtotal: productsSubtotal,
        deliveryFee: cumulativeDeliveryFee,
        total: totalGeral,
        estimatedDeliveryMinutes,
        paymentMethod
      });
    }, 900);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0B201A]/60 backdrop-blur-md transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col border-l border-[#E8E2D5]"
            >
              
              {/* Drawer Header */}
              <div className="p-6 bg-white border-b border-[#E8E2D5] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-lg text-stone-900 leading-tight">
                      Seu Carrinho de Compras
                    </h2>
                    <p className="text-xs text-stone-500 font-mono">
                      {cartItems.reduce((acc, item) => acc + item.quantity, 0)} itens de {Object.keys(itemsByStore).length} mercado(s)
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  data-cursor="Fechar"
                  className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-20 px-4">
                    <div className="w-20 h-20 rounded-3xl bg-white border border-[#E8E2D5] flex items-center justify-center mx-auto mb-4 text-4xl shadow-sm">
                      🛒
                    </div>
                    <h3 className="font-display font-bold text-lg text-stone-800 mb-1">
                      Seu carrinho está vazio.
                    </h3>
                    <p className="text-xs text-stone-500 max-w-xs mx-auto mb-6">
                      Explore os produtos e compare os preços para começar a economizar!
                    </p>
                    <button
                      onClick={onClose}
                      className="px-6 py-3 bg-[#064E3B] text-white text-xs font-bold rounded-2xl shadow-md hover:bg-[#065F46] transition-all"
                    >
                      Começar a Comprar
                    </button>
                  </div>
                ) : (
                  <>
                    {/* CRITICAL DELIVERY FEE HIGHLIGHT CARD */}
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50/70 p-5 rounded-3xl border border-amber-200/80 shadow-sm">
                      <div className="flex items-center gap-2 mb-2 text-amber-900 font-bold text-xs uppercase tracking-wider font-mono">
                        <Truck className="w-4 h-4 text-amber-600" />
                        <span>Regra Crítica de Frete Cumulativo:</span>
                      </div>
                      <p className="text-xs text-amber-950 font-medium leading-relaxed mb-3">
                        Cada item soma sua taxa de entrega individual multiplicada pela quantidade no carrinho:
                      </p>

                      <div className="space-y-1.5 bg-white/90 p-3 rounded-2xl border border-amber-200/60 text-[11px] font-mono">
                        {cartItems.map((item, idx) => {
                          const fee = item.product.deliveryFee || 2.00;
                          const totalItemFee = fee * item.quantity;
                          return (
                            <div key={idx} className="flex items-center justify-between text-stone-700">
                              <span className="truncate pr-2">
                                {item.quantity}x {item.product.name.split('/')[0]} (R$ {fee.toFixed(2).replace('.', ',')}/un)
                              </span>
                              <span className="font-bold text-amber-700 shrink-0">
                                + R$ {totalItemFee.toFixed(2).replace('.', ',')}
                              </span>
                            </div>
                          );
                        })}
                        <div className="border-t border-amber-200/80 pt-1.5 mt-1.5 flex items-center justify-between font-bold text-stone-900">
                          <span>Total Frete Acumulado:</span>
                          <span className="text-amber-700">R$ {cumulativeDeliveryFee.toFixed(2).replace('.', ',')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stores & Items Breakdown */}
                    <div className="space-y-5">
                      {Object.entries(itemsByStore).map(([storeId, { store, items }]) => (
                        <div key={storeId} className="bg-white rounded-3xl p-5 border border-[#E8E2D5] shadow-sm">
                          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E8E2D5]">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{store.logo}</span>
                              <span className="font-display font-bold text-sm text-stone-900">{store.name}</span>
                            </div>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                              {store.deliveryTimeMinutes} min entrega
                            </span>
                          </div>

                          <div className="space-y-3.5">
                            {items.map((item) => {
                              const itemPrice = item.product.prices[store.id];
                              const itemDeliveryFee = item.product.deliveryFee || 2.00;
                              const itemTotalDeliveryFee = itemDeliveryFee * item.quantity;

                              return (
                                <div key={item.product.id} className="flex items-start justify-between gap-3 text-xs">
                                  <div className="flex items-start gap-2.5">
                                    <span className="text-2xl mt-0.5">{item.product.image}</span>
                                    <div>
                                      <h4 className="font-bold text-stone-900 line-clamp-1">{item.product.name}</h4>
                                      <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                                        R$ {itemPrice.toFixed(2).replace('.', ',')} cada
                                      </div>
                                      <div className="text-[10px] text-amber-800 font-mono mt-0.5">
                                        Frete Cumulativo ({item.quantity}x R$ {itemDeliveryFee.toFixed(2).replace('.', ',')}):{' '}
                                        <strong className="text-amber-900 font-bold">R$ {itemTotalDeliveryFee.toFixed(2).replace('.', ',')}</strong>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-1.5 shrink-0 bg-[#FAF8F5] p-1 rounded-xl border border-[#E8E2D5]">
                                    <button
                                      onClick={() => onUpdateQuantity(item.product.id, store.id, item.quantity - 1)}
                                      className="w-6 h-6 rounded-lg bg-white hover:bg-stone-100 flex items-center justify-center text-stone-600 transition-colors shadow-xs"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="font-mono font-bold text-xs w-5 text-center text-stone-900">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => onUpdateQuantity(item.product.id, store.id, item.quantity + 1)}
                                      className="w-6 h-6 rounded-lg bg-white hover:bg-stone-100 flex items-center justify-center text-stone-600 transition-colors shadow-xs"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Delivery & Payment Selection */}
                    <div className="bg-white rounded-3xl p-5 border border-[#E8E2D5] space-y-4 shadow-sm">
                      <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-emerald-600" />
                          <span>Tempo Estimado:</span>
                        </span>
                        <span className="font-mono font-bold text-stone-900">
                          Entrega estimada: {estimatedDeliveryMinutes} minutos
                        </span>
                      </div>

                      <div className="pt-3 border-t border-[#E8E2D5]">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 block mb-2">
                          Forma de Pagamento
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: 'pix', label: 'Pix' },
                            { id: 'card', label: 'Cartão de Crédito' },
                            { id: 'delivery', label: 'Pagar na Entrega' },
                          ].map((method) => (
                            <button
                              key={method.id}
                              onClick={() => setPaymentMethod(method.id)}
                              className={`py-2 px-2.5 rounded-xl text-[11px] font-bold transition-all text-center border ${
                                paymentMethod === method.id
                                  ? 'bg-[#064E3B] text-white border-[#064E3B] shadow-sm'
                                  : 'bg-[#FAF8F5] text-stone-700 border-[#E8E2D5] hover:bg-stone-100'
                              }`}
                            >
                              {method.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Drawer Footer (Digital Receipt Totals) */}
              {cartItems.length > 0 && (
                <div className="p-6 bg-white border-t border-[#E8E2D5] space-y-3">
                  <div className="space-y-1.5 text-xs text-stone-600 font-mono">
                    <div className="flex justify-between">
                      <span>Subtotal dos Produtos:</span>
                      <span className="font-bold text-stone-900">R$ {productsSubtotal.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="flex justify-between text-amber-700 font-semibold">
                      <span>Frete Total Cumulativo:</span>
                      <span className="font-extrabold text-amber-800">+ R$ {cumulativeDeliveryFee.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="border-t border-[#E8E2D5] pt-2 flex justify-between text-sm font-bold text-stone-900 font-display">
                      <span className="text-base">Total do Pedido:</span>
                      <span className="text-emerald-700 text-lg font-mono">R$ {totalGeral.toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={onClearCart}
                      className="p-3 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-colors border border-[#E8E2D5]"
                      title="Limpar Carrinho"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCheckoutSubmit}
                      disabled={isSubmitting}
                      data-cursor="Finalizar"
                      className="flex-1 py-3.5 px-6 bg-gradient-to-r from-[#064E3B] to-[#047857] hover:from-[#065F46] hover:to-[#059669] text-white font-display font-bold text-sm rounded-2xl shadow-lg shadow-emerald-950/20 transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Processando Pedido...</span>
                      ) : (
                        <>
                          <span>Finalizar Pedido</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
