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
import { SIMULATED_ADDRESSES, PRODUCTS, SUPERMARKETS } from './mockData';
import { Sparkles, Scale, Truck, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1: CUSTOMER DASHBOARD (HOME) */}
        {activeTab === 'home' && (
          <>
            {/* Hero Banner com aviso da Regra Crítica de Frete */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-8 md:p-12 mb-10 shadow-2xl">
              <div className="relative z-10 max-w-2xl">
                <span className="bg-orange-500/30 text-orange-200 border border-orange-400/30 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-3">
                  <Truck className="w-3.5 h-3.5 text-amber-300" /> Cálculo de Frete Cumulativo por Item
                </span>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-4">
                  Compare Preços e Calcule o Frete Acumulado dos Itens!
                </h1>
                <p className="text-emerald-100/90 text-sm md:text-base leading-relaxed mb-6 font-medium">
                  Confira em tempo real a somatória das taxas de entrega multiplicadas pelas quantidades no carrinho (ex: 2x Arroz @ R$ 3,00 + 1x Feijão @ R$ 2,50 = <strong className="text-white font-bold">R$ 8,50 de Frete</strong>).
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                  <button
                    onClick={() => setIsLocationModalOpen(true)}
                    className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold rounded-2xl shadow-lg transition-all flex items-center gap-2"
                  >
                    <span>Quais supermercados estão perto de mim?</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-lg transition-all flex items-center gap-2"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Ver Carrinho com Frete Exemplo (R$ 8,50)</span>
                  </button>
                </div>
              </div>

              {/* Decorative Grocery Icons in background */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-9xl opacity-15 select-none hidden lg:block">
                🛒
              </div>
            </div>

            {/* Section 1: Supermarket Stores Cards */}
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

        {/* TAB 2: PRICE COMPARATOR MATRIX */}
        {activeTab === 'comparator' && (
          <div className="py-4 space-y-6">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
                <Scale className="w-3.5 h-3.5" /> Matriz Comparativa Completa
              </span>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                Comparador Transparente de Preços e Fretes
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Análise direta de valores e fretes acumulados entre os 3 supermercados parceiros da sua região.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl">
              <PriceComparatorModal
                isOpen={true}
                onClose={() => setActiveTab('home')}
                selectedProduct={null}
                onAddToCart={handleAddToCart}
              />
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
