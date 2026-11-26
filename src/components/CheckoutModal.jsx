import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShieldCheck,
  CreditCard,
  QrCode,
  Banknote,
  Truck,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  Tag,
  Lock,
  User,
  Phone,
  FileText,
  ShoppingBag,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getProductDeliveryFee, getStoreDistance } from '../mockData';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  selectedAddress,
  onConfirmOrder,
  onBackToCart
}) {
  // Step in checkout: 'info' | 'payment' | 'review'
  const [step, setStep] = useState('payment');

  // Customer identification & address details
  const [customerInfo, setCustomerInfo] = useState({
    name: 'Letícia de Oliveira',
    phone: '(11) 98765-4321',
    cpf: '123.456.789-00',
    number: '1500',
    complement: 'Apto 42 - Bloco B',
    reference: 'Próximo à padaria central'
  });

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('pix'); // 'pix' | 'credit' | 'debit' | 'delivery'
  const [pixCopied, setPixCopied] = useState(false);
  const [cardData, setCardData] = useState({
    number: '•••• •••• •••• 4242',
    name: 'LETICIA OLIVEIRA',
    expiry: '12/28',
    cvv: '123',
    installments: '1'
  });
  const [deliveryPaymentOption, setDeliveryPaymentOption] = useState('card_machine'); // 'card_machine' | 'cash'
  const [needChange, setNeedChange] = useState('');

  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  // Submission State
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

  // Subtotal Products
  const productsSubtotal = cartItems.reduce(
    (sum, item) => sum + item.product.prices[item.store.id] * item.quantity,
    0
  );

  // Cumulative Delivery Fee: Distância (km) × 3,5 × Quantidade
  const cumulativeDeliveryFee = cartItems.reduce((sum, item) => {
    const itemDeliveryFee = getProductDeliveryFee(item.product, item.store.id);
    return sum + itemDeliveryFee * item.quantity;
  }, 0);

  // Discount calculation
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      discountAmount = (productsSubtotal * appliedCoupon.value) / 100;
    } else if (appliedCoupon.type === 'fixed') {
      discountAmount = Math.min(appliedCoupon.value, productsSubtotal);
    }
  }

  // Pix instant discount (3% discount on products)
  const pixDiscount = paymentMethod === 'pix' ? productsSubtotal * 0.03 : 0;
  const totalDiscount = discountAmount + pixDiscount;

  // Final Total
  const totalFinal = Math.max(0, productsSubtotal + cumulativeDeliveryFee - totalDiscount);

  // Coupon apply handler
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const clean = couponCode.trim().toUpperCase();

    if (!clean) return;

    if (clean === 'MESACHEIA10') {
      setAppliedCoupon({ code: clean, type: 'percent', value: 10, label: '10% de desconto nos produtos' });
    } else if (clean === 'BEMVINDO') {
      setAppliedCoupon({ code: clean, type: 'fixed', value: 5.0, label: 'R$ 5,00 de desconto' });
    } else {
      setCouponError('Cupom inválido ou expirado. Tente "MESACHEIA10" ou "BEMVINDO"');
    }
  };

  const handleCopyPix = () => {
    const simulatedKey = '00020126580014br.gov.bcb.pix0136mesacheia-leticia-trabalho-pix-20265204000053039865802BR5920MESA CHEIA DELIVERY6009SAO PAULO62070503***6304E2B1';
    navigator.clipboard?.writeText(simulatedKey);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2500);
  };

  const handleFinalizeOrder = () => {
    setIsSubmitting(true);

    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }

    setTimeout(() => {
      setIsSubmitting(false);
      onConfirmOrder({
        cartItems,
        customerInfo,
        address: `${selectedAddress?.address || 'Av. Brasil, 1500'}, Nº ${customerInfo.number} - ${customerInfo.complement}`,
        subtotal: productsSubtotal,
        deliveryFee: cumulativeDeliveryFee,
        discount: totalDiscount,
        total: totalFinal,
        paymentMethod,
        paymentDetails:
          paymentMethod === 'pix'
            ? 'Pix Instantâneo'
            : paymentMethod === 'credit'
            ? `Cartão de Crédito final ${cardData.number.slice(-4)} (${cardData.installments}x)`
            : paymentMethod === 'debit'
            ? 'Cartão de Débito'
            : deliveryPaymentOption === 'cash'
            ? `Dinheiro na Entrega (Troco: ${needChange ? 'para R$ ' + needChange : 'Não precisa'})`
            : 'Maquininha de Cartão na Entrega'
      });
    }, 1000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0B201A]/70 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative bg-[#FAF8F5] rounded-[2rem] max-w-5xl w-full max-h-[94vh] overflow-hidden shadow-2xl border border-[#E8E2D5] flex flex-col z-10"
        >
          {/* Top Bar Header */}
          <div className="bg-[#0B201A] px-6 py-5 text-white flex items-center justify-between border-b border-emerald-950">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-800/60 border border-emerald-600/40 flex items-center justify-center text-emerald-300">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display font-black text-lg sm:text-xl text-[#F4EFEA]">
                    Checkout Seguro
                  </h2>
                  <span className="bg-emerald-900 text-emerald-300 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 border border-emerald-700/50">
                    <Lock className="w-3 h-3 text-emerald-400" /> 256-bit SSL
                  </span>
                </div>
                <p className="text-xs text-stone-400 mt-0.5">
                  Mesa Cheia • Finalize sua compra com entrega rápida
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              data-cursor="Fechar"
              className="p-2 rounded-full text-stone-400 hover:text-white bg-white/10 hover:bg-white/20 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main 2-Column Grid Body */}
          <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* LEFT COLUMN: Customer Data, Delivery & Payment (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-[#E8E2D5]">
              
              {/* Section 1: Endereço de Entrega */}
              <div className="bg-white p-5 rounded-3xl border border-[#E8E2D5] shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <h3 className="font-display font-bold text-sm text-stone-900">
                      Endereço de Entrega
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                    GPS Confirmado
                  </span>
                </div>

                <div className="text-xs text-stone-700 space-y-1 bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#E8E2D5]">
                  <p className="font-bold text-stone-900">
                    {selectedAddress?.address || 'Av. Brasil, 1500 - Centro'}
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-[#E8E2D5]">
                    <div>
                      <label className="text-[10px] text-stone-500 font-mono block">Número</label>
                      <input
                        type="text"
                        value={customerInfo.number}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, number: e.target.value })}
                        className="w-full text-xs font-semibold bg-white border border-[#E8E2D5] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-600"
                        placeholder="Ex: 1500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-stone-500 font-mono block">Complemento</label>
                      <input
                        type="text"
                        value={customerInfo.complement}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, complement: e.target.value })}
                        className="w-full text-xs font-semibold bg-white border border-[#E8E2D5] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-600"
                        placeholder="Apto, Bloco..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Dados do Cliente */}
              <div className="bg-white p-5 rounded-3xl border border-[#E8E2D5] shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                    <User className="w-4 h-4" />
                  </div>
                  <h3 className="font-display font-bold text-sm text-stone-900">
                    Dados de Identificação
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[10px] text-stone-500 font-mono block mb-1">Nome Completo</label>
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      className="w-full text-xs font-semibold bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-stone-500 font-mono block mb-1">WhatsApp / Telefone</label>
                    <input
                      type="text"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="w-full text-xs font-semibold bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Forma de Pagamento */}
              <div className="bg-white p-5 rounded-3xl border border-[#E8E2D5] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <h3 className="font-display font-bold text-sm text-stone-900">
                      Forma de Pagamento
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    Pix tem 3% OFF
                  </span>
                </div>

                {/* Payment Method Selector Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'pix', label: 'Pix', icon: QrCode, badge: '3% OFF' },
                    { id: 'credit', label: 'Crédito', icon: CreditCard, badge: 'Até 3x' },
                    { id: 'debit', label: 'Débito', icon: CreditCard, badge: null },
                    { id: 'delivery', label: 'Na Entrega', icon: Banknote, badge: null },
                  ].map((method) => {
                    const Icon = method.icon;
                    const isSelected = paymentMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-3 rounded-2xl border text-center transition-all relative flex flex-col items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#064E3B] text-white border-[#064E3B] shadow-md shadow-emerald-950/20'
                            : 'bg-[#FAF8F5] text-stone-700 border-[#E8E2D5] hover:bg-stone-100'
                        }`}
                      >
                        {method.badge && (
                          <span className={`absolute -top-1.5 right-1 text-[8px] font-mono font-extrabold px-1.5 py-0.2 rounded-full uppercase ${
                            isSelected ? 'bg-amber-400 text-stone-900' : 'bg-emerald-600 text-white'
                          }`}>
                            {method.badge}
                          </span>
                        )}
                        <Icon className="w-4 h-4" />
                        <span className="text-xs font-bold font-display">{method.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Subview 1: Pix Experience */}
                {paymentMethod === 'pix' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-20 bg-white p-2 rounded-xl border border-emerald-300 shadow-sm flex items-center justify-center text-4xl shrink-0">
                        📱
                      </div>
                      <div className="text-xs text-stone-700 space-y-1">
                        <div className="font-bold text-emerald-950 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                          <span>QR Code Pix Dinâmico Gerado</span>
                        </div>
                        <p className="text-[11px] text-stone-600 leading-tight">
                          Aprovação imediata em segundos. Seu pedido vai para separação assim que confirmado.
                        </p>
                        <p className="text-[10px] font-mono text-emerald-800 font-bold">
                          Desconto aplicado: -R$ {pixDiscount.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleCopyPix}
                      className="w-full py-2 px-3 bg-white hover:bg-emerald-100 text-emerald-900 font-mono text-xs font-bold rounded-xl border border-emerald-300 flex items-center justify-center gap-2 transition-all shadow-xs"
                    >
                      {pixCopied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>Código Pix Copiado com Sucesso!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-emerald-700" />
                          <span>Copiar Código Pix Copia e Cola</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                )}

                {/* Subview 2: Cartão de Crédito / Débito */}
                {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D5] space-y-3 text-xs"
                  >
                    <div>
                      <label className="text-[10px] text-stone-500 font-mono block mb-1">Número do Cartão</label>
                      <input
                        type="text"
                        value={cardData.number}
                        onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                        className="w-full text-xs font-mono font-semibold bg-white border border-[#E8E2D5] rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-600"
                        placeholder="0000 0000 0000 0000"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-stone-500 font-mono block mb-1">Nome Impresso</label>
                        <input
                          type="text"
                          value={cardData.name}
                          onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                          className="w-full text-xs font-semibold bg-white border border-[#E8E2D5] rounded-xl px-3 py-2 uppercase focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-stone-500 font-mono block mb-1">Validade</label>
                          <input
                            type="text"
                            value={cardData.expiry}
                            onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                            className="w-full text-xs font-mono text-center font-semibold bg-white border border-[#E8E2D5] rounded-xl px-2 py-2 focus:outline-none focus:border-emerald-600"
                            placeholder="MM/AA"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-stone-500 font-mono block mb-1">CVV</label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardData.cvv}
                            onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                            className="w-full text-xs font-mono text-center font-semibold bg-white border border-[#E8E2D5] rounded-xl px-2 py-2 focus:outline-none focus:border-emerald-600"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>

                    {paymentMethod === 'credit' && (
                      <div>
                        <label className="text-[10px] text-stone-500 font-mono block mb-1">Parcelamento</label>
                        <select
                          value={cardData.installments}
                          onChange={(e) => setCardData({ ...cardData, installments: e.target.value })}
                          className="w-full text-xs font-semibold bg-white border border-[#E8E2D5] rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-600"
                        >
                          <option value="1">1x de R$ {totalFinal.toFixed(2).replace('.', ',')} (sem juros)</option>
                          <option value="2">2x de R$ {(totalFinal / 2).toFixed(2).replace('.', ',')} (sem juros)</option>
                          <option value="3">3x de R$ {(totalFinal / 3).toFixed(2).replace('.', ',')} (sem juros)</option>
                        </select>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Subview 3: Na Entrega */}
                {paymentMethod === 'delivery' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D5] space-y-3 text-xs"
                  >
                    <div className="flex gap-2">
                      <button
                        onClick={() => setDeliveryPaymentOption('card_machine')}
                        className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                          deliveryPaymentOption === 'card_machine'
                            ? 'bg-emerald-700 text-white border-emerald-700'
                            : 'bg-white text-stone-700 border-[#E8E2D5]'
                        }`}
                      >
                        Maquininha (Crédito/Débito)
                      </button>
                      <button
                        onClick={() => setDeliveryPaymentOption('cash')}
                        className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                          deliveryPaymentOption === 'cash'
                            ? 'bg-emerald-700 text-white border-emerald-700'
                            : 'bg-white text-stone-700 border-[#E8E2D5]'
                        }`}
                      >
                        Dinheiro
                      </button>
                    </div>

                    {deliveryPaymentOption === 'cash' && (
                      <div>
                        <label className="text-[10px] text-stone-500 font-mono block mb-1">
                          Precisa de troco para quanto? (Deixe em branco se tiver o valor exato)
                        </label>
                        <input
                          type="text"
                          value={needChange}
                          onChange={(e) => setNeedChange(e.target.value)}
                          className="w-full text-xs font-mono font-semibold bg-white border border-[#E8E2D5] rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-600"
                          placeholder="Ex: 50,00 ou 100,00"
                        />
                      </div>
                    )}
                  </motion.div>
                )}

              </div>

            </div>

            {/* RIGHT COLUMN: Order Summary & Action (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-[#F4EFEA]/80 flex flex-col justify-between space-y-6">
              
              <div className="space-y-5">
                
                {/* Order Items Review */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display font-bold text-sm text-stone-900">
                      Itens do Pedido ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
                    </h3>
                    <button
                      onClick={onBackToCart}
                      className="text-xs text-emerald-800 font-bold hover:underline"
                    >
                      Editar carrinho
                    </button>
                  </div>

                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                    {Object.entries(itemsByStore).map(([storeId, { store, items }]) => (
                      <div key={storeId} className="bg-white p-3.5 rounded-2xl border border-[#E8E2D5] space-y-2 text-xs">
                        <div className="flex items-center justify-between pb-1.5 border-b border-[#E8E2D5]">
                          <span className="font-bold text-stone-900 flex items-center gap-1.5">
                            <span>{store.logo}</span>
                            <span>{store.name}</span>
                          </span>
                          <span className="text-[10px] font-mono text-stone-500">
                            {store.distanceKm} km ({store.deliveryTimeMinutes} min)
                          </span>
                        </div>

                        {items.map((item) => {
                          const itemFee = getProductDeliveryFee(item.product, store.id);
                          return (
                            <div key={item.product.id} className="flex justify-between items-center text-[11px]">
                              <span className="truncate pr-2 text-stone-700">
                                {item.quantity}x {item.product.name.split('/')[0]}
                              </span>
                              <div className="text-right shrink-0">
                                <span className="font-mono font-bold text-stone-900 block">
                                  R$ {(item.product.prices[store.id] * item.quantity).toFixed(2).replace('.', ',')}
                                </span>
                                <span className="text-[9px] font-mono text-amber-700 block">
                                  + frete R$ {(itemFee * item.quantity).toFixed(2).replace('.', ',')}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cupom de Desconto */}
                <div className="bg-white p-3.5 rounded-2xl border border-[#E8E2D5]">
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Cupom: MESACHEIA10"
                        className="w-full pl-8 pr-2 py-2 text-xs uppercase font-mono font-bold bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-all"
                    >
                      Aplicar
                    </button>
                  </form>

                  {appliedCoupon && (
                    <div className="mt-2 text-[11px] text-emerald-800 font-semibold flex items-center justify-between bg-emerald-50 px-2.5 py-1 rounded-lg">
                      <span>✓ Cupom {appliedCoupon.code} aplicado: {appliedCoupon.label}</span>
                      <button
                        type="button"
                        onClick={() => setAppliedCoupon(null)}
                        className="text-stone-400 hover:text-stone-700 text-xs"
                      >
                        ×
                      </button>
                    </div>
                  )}

                  {couponError && (
                    <p className="mt-1.5 text-[10px] text-red-600 font-medium">
                      {couponError}
                    </p>
                  )}
                </div>

                {/* Totals Breakdown */}
                <div className="bg-white p-4 rounded-2xl border border-[#E8E2D5] space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal dos Produtos:</span>
                    <span className="font-semibold text-stone-900">
                      R$ {productsSubtotal.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <div className="flex justify-between text-amber-800">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-amber-600" />
                      <span>Frete Total (Distância × 3,5):</span>
                    </span>
                    <span className="font-bold">
                      + R$ {cumulativeDeliveryFee.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  {totalDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Descontos Totais:</span>
                      <span>- R$ {totalDiscount.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}

                  <div className="border-t border-[#E8E2D5] pt-2 flex justify-between text-base font-bold text-stone-900 font-display">
                    <span>Total a Pagar:</span>
                    <span className="text-emerald-800 text-xl font-mono">
                      R$ {totalFinal.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleFinalizeOrder}
                  disabled={isSubmitting}
                  data-cursor="Pagar"
                  className="w-full py-4 px-6 bg-gradient-to-r from-[#064E3B] to-[#047857] hover:from-[#065F46] hover:to-[#059669] text-white font-display font-extrabold text-sm sm:text-base rounded-2xl shadow-xl shadow-emerald-950/20 transition-all flex items-center justify-center gap-2 border border-emerald-600/30"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processando Pagamento...
                    </span>
                  ) : (
                    <>
                      <span>Confirmar Pedido & Pagar</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 text-xs text-stone-500 hover:text-stone-800 font-medium transition-colors"
                >
                  Continuar Comprando
                </button>
              </div>

            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
