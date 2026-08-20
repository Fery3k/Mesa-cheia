import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Clock, ShieldCheck, ArrowRight, Truck, CreditCard, Sparkles, CheckCircle2, Calculator } from 'lucide-react';

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

  if (!isOpen) return null;

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
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gray-900/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-gray-100">
          
          {/* Cart Header */}
          <div className="p-6 bg-gradient-to-r from-emerald-700 to-teal-800 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-md">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Seu Carrinho</h2>
                <p className="text-xs text-emerald-100">
                  {cartItems.length} {cartItems.length === 1 ? 'tipo de produto' : 'tipos de produtos'} selecionados
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <ShoppingBag className="w-10 h-10 opacity-60" />
                </div>
                <h3 className="font-bold text-gray-800 text-base">Seu carrinho está vazio</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Adicione produtos para visualizar a somatória de preços e taxas de entrega cumulativas!
                </p>
              </div>
            ) : (
              <>
                {/* Store Groups */}
                {Object.values(itemsByStore).map(({ store, items }) => (
                  <div key={store.id} className="bg-gray-50/80 rounded-2xl p-4 border border-gray-200/80 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-200/60">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{store.logo}</span>
                        <div>
                          <h4 className="font-extrabold text-xs text-gray-900">{store.name}</h4>
                          <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Entrega em aprox. {store.deliveryTimeMinutes} min
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {items.map((item) => {
                        const itemPrice = item.product.prices[store.id];
                        const itemDeliveryFee = item.product.deliveryFee || 2.00;
                        const itemTotalProductPrice = itemPrice * item.quantity;
                        const itemTotalDeliveryFee = itemDeliveryFee * item.quantity;

                        return (
                          <div key={item.product.id} className="bg-white p-3 rounded-xl border border-gray-100 shadow-2xs space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{item.product.image}</span>
                                <div>
                                  <h5 className="font-bold text-xs text-gray-900 line-clamp-1">
                                    {item.product.name}
                                  </h5>
                                  <div className="text-[11px] space-x-1">
                                    <span className="font-extrabold text-emerald-700">
                                      R$ {itemPrice.toFixed(2).replace('.', ',')}
                                    </span>
                                    <span className="text-gray-400">/un</span>
                                  </div>
                                </div>
                              </div>

                              {/* Quantity buttons */}
                              <div className="flex items-center gap-2">
                                <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                                  <button
                                    onClick={() => onUpdateQuantity(item.product.id, store.id, item.quantity - 1)}
                                    className="p-1 text-gray-600 hover:text-red-600"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="px-2 text-xs font-bold text-gray-800">{item.quantity}</span>
                                  <button
                                    onClick={() => onUpdateQuantity(item.product.id, store.id, item.quantity + 1)}
                                    className="p-1 text-gray-600 hover:text-emerald-600"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>

                                <button
                                  onClick={() => onRemoveItem(item.product.id, store.id)}
                                  className="text-gray-400 hover:text-red-500 p-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* REGRA CRÍTICA: DETALHAMENTO DO FRETE CUMULATIVO DO ITEM */}
                            <div className="bg-orange-50/70 p-2 rounded-lg text-[10px] text-orange-900 flex items-center justify-between border border-orange-100 font-medium">
                              <span className="flex items-center gap-1">
                                <Truck className="w-3 h-3 text-orange-600" />
                                Frete Cumulativo ({item.quantity}x R$ {itemDeliveryFee.toFixed(2).replace('.', ',')}):
                              </span>
                              <strong className="font-bold text-orange-700">
                                R$ {itemTotalDeliveryFee.toFixed(2).replace('.', ',')}
                              </strong>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* DETALHAMENTO DA SOMATÓRIA DAS TAXAS DE ENTREGA (EXIGÊNCIA DO ESCOPO) */}
                <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50/60 rounded-2xl p-4 border border-orange-200 text-xs space-y-3">
                  <div className="flex items-center justify-between font-bold text-orange-900">
                    <span className="flex items-center gap-1.5 text-orange-800 font-extrabold">
                      <Calculator className="w-4 h-4 text-orange-600" /> Detalhamento do Frete Cumulativo
                    </span>
                    <span className="bg-orange-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                      Somatória por Item
                    </span>
                  </div>

                  {/* Somatória discriminada item por item */}
                  <div className="space-y-1.5 pt-2 border-t border-orange-200/80 text-[11px]">
                    {cartItems.map((item) => {
                      const fee = item.product.deliveryFee || 2.00;
                      const totalItemFee = fee * item.quantity;
                      return (
                        <div key={item.product.id + item.store.id} className="flex justify-between text-gray-700">
                          <span className="truncate pr-2">
                            {item.quantity}x {item.product.name.split('/')[0]} (R$ {fee.toFixed(2).replace('.', ',')}/un)
                          </span>
                          <span className="font-semibold text-orange-800 shrink-0">
                            + R$ {totalItemFee.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      );
                    })}

                    <div className="flex justify-between font-extrabold text-orange-900 pt-2 border-t border-orange-200 text-xs">
                      <span>Somatória Total das Taxas de Entrega:</span>
                      <span className="text-orange-700">R$ {cumulativeDeliveryFee.toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-gray-600 font-medium pt-2 border-t border-orange-200/60">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-orange-500" /> Tempo Estimado de Chegada
                    </span>
                    <span className="font-bold text-gray-900">{estimatedDeliveryMinutes} minutos</span>
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="space-y-2">
                  <label className="block text-xs font-extrabold text-gray-800 uppercase tracking-wider">
                    Forma de Pagamento:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPaymentMethod('pix')}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        paymentMethod === 'pix'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>PIX (Instantâneo)</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        paymentMethod === 'card'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5 text-gray-600" />
                      <span>Cartão de Crédito</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Cart Footer - DISCRIMINAÇÃO VISUAL DE CHECKOUT EXIGIDA PELO USUÁRIO */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-gray-50 border-t border-gray-200 space-y-4">
              
              <div className="space-y-2 text-xs">
                {/* 1. Subtotal dos Produtos */}
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Subtotal dos Produtos:</span>
                  <span className="font-bold text-gray-900">R$ {productsSubtotal.toFixed(2).replace('.', ',')}</span>
                </div>

                {/* 2. Detalhamento da Somatória das Taxas de Entrega */}
                <div className="flex justify-between text-orange-700 font-semibold">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" /> Somatória das Taxas de Entrega:
                  </span>
                  <span className="font-extrabold text-orange-800">+ R$ {cumulativeDeliveryFee.toFixed(2).replace('.', ',')}</span>
                </div>

                {/* 3. Valor Total Geral (Produtos + Taxas Somadas) */}
                <div className="flex justify-between font-black text-base text-gray-900 pt-2 border-t border-gray-300">
                  <span>Valor Total Geral:</span>
                  <span className="text-emerald-700 text-lg">R$ {totalGeral.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              {/* Confirm Order Button - Wizard of Oz trigger */}
              <button
                onClick={handleCheckoutSubmit}
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl font-extrabold text-sm shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/40 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Processando Pedido...</span>
                ) : (
                  <>
                    <span>Confirmar Pedido</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
