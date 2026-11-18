import React, { useState } from 'react';
import Header from './components/Header';
import LocationModal from './components/LocationModal';
import SupermarketList from './components/SupermarketList';
import ProductCatalog from './components/ProductCatalog';
import PriceComparatorModal from './components/PriceComparatorModal';
import CartDrawer from './components/CartDrawer';
import OrderTrackerModal from './components/OrderTrackerModal';
import RegistrationTabs from './components/RegistrationTabs';
import Footer from './components/Footer';
import EditorialMarquee from './components/EditorialMarquee';
import CustomCursor from './components/CustomCursor';
import { SIMULATED_ADDRESSES, PRODUCTS, SUPERMARKETS } from './mockData';
import { Sparkles, Scale, Truck, ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function App() {
  // App Navigation & Tabs State
  const [activeTab, setActiveTab] = useState('home');

  // Location Simulation State
  const [selectedAddress, setSelectedAddress] = useState(SIMULATED_ADDRESSES[0]);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedStoreId, setSelectedStoreId] = useState(null);

  // Cart State - PRE-POPULADO COM O EXEMPLO EXATO DO ESCOPO:
  // 2x Arroz (taxa R$ 3.00 cada = R$ 6.00) + 1x Feijão (taxa R$ 2.50) => Total Frete Cumulativo = R$ 8.50
  const [cartItems, setCartItems] = useState([
    {
      product: PRODUCTS.find((p) => p.id === 'arroz-5kg') || PRODUCTS[0], // Arroz (Frete R$ 3,00)
      store: SUPERMARKETS[0], // Supermercado Centro
      quantity: 2
    },
    {
      product: PRODUCTS.find((p) => p.id === 'feijao-1kg') || PRODUCTS[1], // Feijão (Frete R$ 2,50)
      store: SUPERMARKETS[0], // Supermercado Centro
      quantity: 1
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Price Comparator Modal State
  const [isComparatorOpen, setIsComparatorOpen] = useState(false);
  const [selectedComparatorProduct, setSelectedComparatorProduct] = useState(null);

  // Order Tracker Wizard of Oz State
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // Cart Handlers
  const handleAddToCart = (product, store) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.store.id === store.id
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [...prevItems, { product, store, quantity: 1 }];
      }
    });

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId, storeId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId, storeId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId && item.store.id === storeId
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveItem = (productId, storeId) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.product.id === productId && item.store.id === storeId)
      )
    );
  };

  const handleConfirmOrder = (orderInfo) => {
    setOrderDetails(orderInfo);
    setIsCartOpen(false);
    setCartItems([]);
    setIsOrderTrackerOpen(true);
  };

  const handleOpenComparatorModal = (product = null) => {
    setSelectedComparatorProduct(product);
    setIsComparatorOpen(true);
  };

  // Cart Totals
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.product.prices[item.store.id] * item.quantity,
    0
  );
  const cumulativeDeliveryFee = cartItems.reduce(
    (sum, item) => sum + (item.product.deliveryFee || 2.00) * item.quantity,
    0
  );
  const cartTotal = cartSubtotal + cumulativeDeliveryFee;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-emerald-600 selection:text-white relative">
      
      {/* Awwwards Smooth Magnetic Custom Cursor */}
      <CustomCursor />

      {/* Top Header Navbar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedAddress={selectedAddress}
        openLocationModal={() => setIsLocationModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartCount}
        cartTotal={cartTotal}
        openCartDrawer={() => setIsCartOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* TAB 1: CUSTOMER DASHBOARD (HOME) */}
        {activeTab === 'home' && (
          <>
            {/* Editorial Hero Banner com aviso da Regra Crítica de Frete */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-[2.5rem] bg-[#064E3B] text-white p-8 sm:p-12 md:p-16 mb-8 shadow-2xl border border-emerald-800"
            >
              {/* Radial gradient background highlights */}
              <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute left-1/3 -bottom-20 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl">
                
                {/* Live Feature Tag */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-mono font-bold uppercase tracking-wider mb-6 backdrop-blur-md">
                  <Truck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Cálculo de Frete Cumulativo por Item</span>
                </div>

                {/* Hero Editorial Headline */}
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black tracking-tight leading-[1.08] mb-6 text-[#F4EFEA]">
                  Compare Preços e Calcule o Frete Acumulado dos Itens!
                </h1>

                {/* Subtitle with exact business logic emphasis */}
                <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed mb-8 font-medium max-w-2xl">
                  Confira em tempo real a somatória das taxas de entrega multiplicadas pelas quantidades no carrinho (ex: 2x Arroz @ R$ 3,00 + 1x Feijão @ R$ 2,50 = <strong className="text-white font-bold underline decoration-amber-400 decoration-2 underline-offset-4">R$ 8,50 de Frete</strong>).
                </p>

                {/* Hero Action CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 text-xs sm:text-sm font-bold">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setIsLocationModalOpen(true)}
                    data-cursor="Localizar"
                    className="px-6 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-extrabold rounded-2xl shadow-lg shadow-emerald-950/30 transition-all flex items-center gap-2.5"
                  >
                    <span>Quais supermercados estão perto de mim?</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setIsCartOpen(true)}
                    data-cursor="Ver Frete"
                    className="px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-2xl shadow-lg shadow-amber-950/20 transition-all flex items-center gap-2 border border-amber-400/30"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Ver Carrinho com Frete Exemplo (R$ 8,50)</span>
                  </motion.button>
                </div>
              </div>

              {/* Decorative Subtle Background Graphics */}
              <div className="absolute right-8 bottom-6 text-9xl opacity-10 select-none hidden lg:block transform rotate-6">
                🛒
              </div>
            </motion.div>

            {/* Live Editorial Marquee Ticker */}
            <EditorialMarquee />

            {/* Section 1: Supermarket Stores Cards (Bento) */}
            <SupermarketList
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              selectedStoreId={selectedStoreId}
              setSelectedStoreId={setSelectedStoreId}
            />

            {/* Section 2: Products Showcase with Price & Delivery Fee Comparison */}
            <ProductCatalog
              searchQuery={searchQuery}
              selectedStoreId={selectedStoreId}
              onAddToCart={handleAddToCart}
              onOpenComparatorModal={handleOpenComparatorModal}
              cartItems={cartItems}
            />
          </>
        )}

        {/* TAB 2: PRICE COMPARATOR MATRIX (DEDICATED FULL PAGE VIEW) */}
        {activeTab === 'comparator' && (
          <div className="py-4 space-y-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="bg-emerald-950 text-emerald-300 font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-3 border border-emerald-800">
                <Scale className="w-3.5 h-3.5 text-amber-300" /> Matriz Comparativa Completa
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-stone-900 tracking-tight">
                Comparador Transparente de Preços e Fretes
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-2 leading-relaxed">
                Análise direta de valores e fretes acumulados entre os 3 supermercados parceiros da sua região.
              </p>
            </div>

            {/* Embedded Live Matrix View */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D5] shadow-bento space-y-6">
              
              <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200/80 text-xs text-amber-950 flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block font-bold text-amber-900 text-sm mb-1 font-display">Regra de Cálculo de Frete:</strong>
                  Cada produto traz sua própria taxa de entrega associada (ex: Arroz = R$ 3,00; Feijão = R$ 2,50). No carrinho, as taxas são <strong>somadas multiplicadas pelas quantidades selecionadas</strong>.
                </div>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-[#E8E2D5] bg-white">
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
                    {PRODUCTS.map((product) => {
                      const itemDeliveryFee = product.deliveryFee || 2.00;
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
                                  <span>Frete: R$ {itemDeliveryFee.toFixed(2).replace('.', ',')} /un</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {SUPERMARKETS.map((store) => {
                            const price = product.prices[store.id];
                            const isLowest = price === minP;

                            return (
                              <td key={store.id} className="p-4 sm:p-5">
                                <div className={`p-3.5 rounded-2xl border transition-all ${
                                  isLowest 
                                    ? 'bg-emerald-50/80 border-emerald-300' 
                                    : 'bg-[#FAF8F5] border-[#E8E2D5]'
                                }`}>
                                  <div className="flex items-baseline justify-between mb-2">
                                    <span className={`font-mono text-base font-extrabold ${isLowest ? 'text-emerald-800' : 'text-stone-900'}`}>
                                      R$ {price.toFixed(2).replace('.', ',')}
                                    </span>
                                    {isLowest && (
                                      <span className="bg-emerald-700 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                                        Menor Preço
                                      </span>
                                    )}
                                  </div>

                                  <button
                                    onClick={() => handleAddToCart(product, store)}
                                    data-cursor="Adicionar"
                                    className={`w-full py-1.5 px-2.5 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all ${
                                      isLowest
                                        ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
                                        : 'bg-white hover:bg-stone-200 text-stone-700 border border-[#E8E2D5]'
                                    }`}
                                  >
                                    <Sparkles className="w-3 h-3" />
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

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/80 text-xs text-emerald-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    <strong>Dica Mesa Cheia:</strong> O frete total do seu pedido acumula o valor de entrega de cada unidade adicionada ao carrinho.
                  </span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: REGISTRATION PORTALS (CLIENTS, STORES, DRIVERS) */}
        {activeTab === 'registration' && (
          <RegistrationTabs />
        )}

      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Modals & Drawers */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        selectedAddress={selectedAddress}
        onSelectAddress={setSelectedAddress}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
        onConfirmOrder={handleConfirmOrder}
      />

      <PriceComparatorModal
        isOpen={isComparatorOpen}
        onClose={() => setIsComparatorOpen(false)}
        selectedProduct={selectedComparatorProduct}
        onAddToCart={handleAddToCart}
      />

      <OrderTrackerModal
        isOpen={isOrderTrackerOpen}
        onClose={() => setIsOrderTrackerOpen(false)}
        orderDetails={orderDetails}
      />

    </div>
  );
}
