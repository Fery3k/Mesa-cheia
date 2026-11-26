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
import AccessibilityPanel from './components/AccessibilityPanel';
import CheckoutModal from './components/CheckoutModal';
import { SIMULATED_ADDRESSES, PRODUCTS, SUPERMARKETS, getProductDeliveryFee } from './mockData';
import { Sparkles, Scale, Truck, ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck, Zap, MapPin } from 'lucide-react';
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

  // Accessibility Settings State
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    customCursor: false,
    highContrast: false,
    largerText: false,
    reducedMotion: false,
    darkMode: false,
  });

  const handleToggleAccessibility = (key) => {
    setAccessibilitySettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Build CSS classes based on accessibility settings
  const accessibilityClasses = [
    accessibilitySettings.highContrast ? 'a11y-high-contrast' : '',
    accessibilitySettings.largerText ? 'a11y-larger-text' : '',
    accessibilitySettings.reducedMotion ? 'a11y-reduced-motion' : '',
    accessibilitySettings.darkMode ? 'a11y-dark-mode' : '',
  ]
    .filter(Boolean)
    .join(' ');

  // Cart State - PRE-POPULADO COM O EXEMPLO EXATO DO ESCOPO:
  const [cartItems, setCartItems] = useState([
    {
      product: PRODUCTS.find((p) => p.id === 'arroz-5kg') || PRODUCTS[0],
      store: SUPERMARKETS[0], // Supermercado Centro (1.2 km → frete R$ 4,20)
      quantity: 2
    },
    {
      product: PRODUCTS.find((p) => p.id === 'feijao-1kg') || PRODUCTS[1],
      store: SUPERMARKETS[0], // Supermercado Centro (1.2 km → frete R$ 4,20)
      quantity: 1
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

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
    setIsCheckoutOpen(false);
    setCartItems([]);
    setIsOrderTrackerOpen(true);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOpenComparatorModal = (product = null) => {
    setSelectedComparatorProduct(product);
    setIsComparatorOpen(true);
  };

  // Cart Totals — Frete = distância (km) × 3,5 × quantidade
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.product.prices[item.store.id] * item.quantity,
    0
  );
  const cumulativeDeliveryFee = cartItems.reduce(
    (sum, item) => sum + getProductDeliveryFee(item.product, item.store.id) * item.quantity,
    0
  );
  const cartTotal = cartSubtotal + cumulativeDeliveryFee;

  // Exemplo para o hero: frete do Supermercado Centro (1.2 km × 3.5 = R$ 4,20)
  const exampleFee = getProductDeliveryFee(PRODUCTS[0], SUPERMARKETS[0].id);
  const exampleTotal = (exampleFee * 2 + exampleFee * 1).toFixed(2).replace('.', ',');

  return (
    <div className={`min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-emerald-600 selection:text-white relative ${accessibilityClasses}`}>
      
      {/* Awwwards Smooth Magnetic Custom Cursor (controlled by accessibility panel) */}
      <CustomCursor enabled={accessibilitySettings.customCursor} />

      {/* Accessibility Panel (floating button + drawer) */}
      <AccessibilityPanel
        settings={accessibilitySettings}
        onToggle={handleToggleAccessibility}
      />

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
                  <span>Frete = Distância × 3,5 por item</span>
                </div>

                {/* Hero Editorial Headline */}
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black tracking-tight leading-[1.08] mb-6 text-[#F4EFEA]">
                  Compare Preços e Pague o Frete pela Distância!
                </h1>

                {/* Subtitle with exact business logic emphasis */}
                <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed mb-8 font-medium max-w-2xl">
                  O frete de cada mercado é calculado pela <strong className="text-white">distância (km) × 3,5</strong> e multiplicado pela quantidade no carrinho. Quanto mais perto o mercado, menor o frete!
                </p>

                {/* Distance Info Cards */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {SUPERMARKETS.map((store) => {
                    const fee = getProductDeliveryFee(null, store.id);
                    return (
                      <div key={store.id} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-4 py-2.5 text-xs font-mono">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{store.logo}</span>
                          <span className="font-display font-bold text-sm text-white">{store.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-200">
                          <MapPin className="w-3 h-3" />
                          <span>{store.distanceKm} km</span>
                          <span className="text-white/40">→</span>
                          <span className="text-amber-300 font-bold">R$ {fee.toFixed(2).replace('.', ',')} /item</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

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
                    <span>Ver Carrinho com Frete Exemplo (R$ {exampleTotal})</span>
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
                Frete calculado por <strong>distância (km) × 3,5</strong> para cada mercado. Compare valores reais entre os 3 parceiros.
              </p>
            </div>

            {/* Embedded Live Matrix View */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D5] shadow-bento space-y-6">
              
              <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200/80 text-xs text-amber-950 flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block font-bold text-amber-900 text-sm mb-1 font-display">Nova Regra de Frete por Distância:</strong>
                  O frete de cada mercado é calculado pela fórmula: <strong>distância (km) × 3,5</strong>. Sup. Centro (1,2 km) = R$ 4,20 | SuperMais (0,8 km) = R$ 2,80 | Econômico (2,5 km) = R$ 8,75 por item.
                </div>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-[#E8E2D5] bg-white">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#F4EFEA] text-stone-700 font-bold uppercase tracking-wider border-b border-[#E8E2D5] font-mono text-[11px]">
                      <th className="p-4 sm:p-5">Produto</th>
                      {SUPERMARKETS.map((store) => {
                        const fee = getProductDeliveryFee(null, store.id);
                        return (
                          <th key={store.id} className="p-4 sm:p-5 min-w-[200px]">
                            <div className="flex items-center gap-2.5">
                              <span className="text-2xl">{store.logo}</span>
                              <div>
                                <div className="font-display font-extrabold text-sm text-stone-900">{store.name}</div>
                                <div className="text-[10px] text-stone-500 font-medium lowercase">
                                  {store.distanceKm} km • frete R$ {fee.toFixed(2).replace('.', ',')}/item
                                </div>
                              </div>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#E8E2D5]">
                    {PRODUCTS.map((product) => {
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
                              </div>
                            </div>
                          </td>

                          {SUPERMARKETS.map((store) => {
                            const price = product.prices[store.id];
                            const storeDeliveryFee = getProductDeliveryFee(product, store.id);
                            const isLowest = price === minP;

                            return (
                              <td key={store.id} className="p-4 sm:p-5">
                                <div className={`p-3.5 rounded-2xl border transition-all ${
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
                                      <span>Frete ({store.distanceKm} km):</span>
                                    </span>
                                    <span className="font-bold">R$ {storeDeliveryFee.toFixed(2).replace('.', ',')}</span>
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
                    <strong>Dica Mesa Cheia:</strong> O frete é calculado pela distância do mercado (km × 3,5) e multiplicado pela quantidade de cada item no carrinho.
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
        onProceedToCheckout={handleProceedToCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        selectedAddress={selectedAddress}
        onConfirmOrder={handleConfirmOrder}
        onBackToCart={() => {
          setIsCheckoutOpen(false);
          setIsCartOpen(true);
        }}
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
