import React, { useState } from 'react';
import { ShoppingBag, TrendingDown, Sparkles, Scale, Plus, Truck, Filter, Check, ArrowRight } from 'lucide-react';
import { PRODUCTS, SUPERMARKETS, getProductDeliveryFee } from '../mockData';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductCatalog({
  searchQuery,
  selectedStoreId,
  onAddToCart,
  onOpenComparatorModal,
  cartItems
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [addedAnimationId, setAddedAnimationId] = useState(null);

  const categories = [
    'all',
    'Grãos & Farinhas',
    'Hortifrúti & Feira',
    'Carnes & Proteínas',
    'Laticínios & Frios',
    'Padaria & Matinais',
    'Mercearia & Molhos',
    'Bebidas',
    'Limpeza & Higiene'
  ];

  // Filter products by search and category
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Helper to find cheapest store for a product
  const getCheapestStoreInfo = (prices) => {
    let minPrice = Infinity;
    let cheapestStoreId = null;

    Object.entries(prices).forEach(([storeId, price]) => {
      if (price < minPrice) {
        minPrice = price;
        cheapestStoreId = storeId;
      }
    });

    const store = SUPERMARKETS.find((s) => s.id === cheapestStoreId);
    return { minPrice, store };
  };

  // Helper to check if item is in cart
  const getItemQuantityInCart = (productId, storeId) => {
    const found = cartItems.find(
      (item) => item.product.id === productId && item.store.id === storeId
    );
    return found ? found.quantity : 0;
  };

  const handleAddWithFeedback = (product, store) => {
    onAddToCart(product, store);
    const feedbackKey = `${product.id}-${store.id}`;
    setAddedAnimationId(feedbackKey);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1200);
  };

  return (
    <section className="mb-20">
      
      {/* Catalog Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-amber-100 text-amber-900 border border-amber-300/50 font-mono text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5 text-amber-600" />
              Vitrine com Frete Cumulativo por Item
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-stone-900 tracking-tight">
            Catálogo de Produtos Essenciais
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-medium max-w-2xl mt-1.5 leading-relaxed">
            Cada item possui uma taxa de entrega própria. No carrinho, o frete total é a somatória exata de todos os itens acumulados!
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar p-1.5 bg-[#F4EFEA] rounded-full border border-[#E8E2D5]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              data-cursor={cat === 'all' ? 'Ver Todos' : cat}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-stone-900 text-white shadow-sm font-bold'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-white/60'
              }`}
            >
              {cat === 'all' ? 'Todos os Produtos' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Store Filter Banner */}
      {selectedStoreId && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 bg-emerald-50 border border-emerald-200/80 rounded-2xl flex items-center justify-between text-xs"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-600 text-white">
              <Filter className="w-4 h-4" />
            </div>
            <span className="text-stone-700">
              Filtrando produtos do supermercado:{' '}
              <strong className="text-emerald-900 font-bold">
                {SUPERMARKETS.find((s) => s.id === selectedStoreId)?.name}
              </strong>
            </span>
          </div>
          <button
            onClick={() => onOpenComparatorModal(null)}
            data-cursor="Comparar"
            className="text-emerald-800 font-bold hover:text-emerald-950 flex items-center gap-1 group"
          >
            <span>Ver matriz comparativa completa</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>
      )}

      {/* Product Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#E8E2D5] p-8 shadow-bento">
          <p className="text-stone-500 text-sm font-medium">Nenhum produto encontrado para "{searchQuery}".</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, pIndex) => {
            const { minPrice, store: cheapestStore } = getCheapestStoreInfo(product.prices);
            const fees = SUPERMARKETS.map((s) => getProductDeliveryFee(product, s.id));
            const minDeliveryFee = Math.min(...fees);
            const maxDeliveryFee = Math.max(...fees);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: pIndex * 0.05 }}
                className="bg-white rounded-3xl p-5 border border-[#E8E2D5] hover:border-emerald-600/50 hover:shadow-bento-hover transition-all duration-300 flex flex-col justify-between group shadow-bento"
              >
                <div>
                  {/* Top Image Showcase */}
                  <div className="relative mb-4 bg-[#FAF8F5] rounded-2xl p-6 flex items-center justify-center h-44 group-hover:bg-emerald-50/40 transition-colors border border-[#F0ECE4]">
                    <span className="text-6xl drop-shadow-md group-hover:scale-110 transition-transform duration-300">
                      {product.image}
                    </span>
                    
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-stone-700 font-mono text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#E8E2D5] shadow-sm">
                      {product.unit}
                    </span>
                    
                    {/* REGRA CRÍTICA: TAXA DE FRETE INDIVIDUAL DESTACADA POR MERCADO */}
                    <span className="absolute bottom-3 right-3 bg-amber-600 text-white font-mono text-[10px] font-extrabold px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1.5 border border-amber-400/30">
                      <Truck className="w-3 h-3 text-amber-200" />
                      <span>Frete: R$ {minDeliveryFee.toFixed(2).replace('.', ',')} a {maxDeliveryFee.toFixed(2).replace('.', ',')}</span>
                    </span>
                  </div>

                  {/* Title & Category */}
                  <span className="text-[10px] uppercase font-mono font-bold text-stone-400 tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="font-display font-bold text-base text-stone-900 line-clamp-2 my-1 group-hover:text-emerald-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-stone-500 line-clamp-2 mb-3 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Regra de Negócio Notice */}
                  <div className="flex items-center gap-1.5 text-[10px] text-amber-900 font-semibold bg-amber-50/80 p-2.5 rounded-xl border border-amber-200/60 mb-4">
                    <Truck className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                    <span>Frete individual deste item: <strong className="font-mono">R$ {minDeliveryFee.toFixed(2).replace('.', ',')} a R$ {maxDeliveryFee.toFixed(2).replace('.', ',')}/un</strong> (varia por mercado)</span>
                  </div>

                  {/* Price Matrix Comparison by Supermarket */}
                  <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#E8E2D5]/80 space-y-1.5 mb-4">
                    <div className="flex items-center justify-between text-[9px] font-mono font-bold uppercase tracking-wider text-stone-400 pb-1.5 border-b border-[#E8E2D5]">
                      <span>Supermercado</span>
                      <span>Preço & Frete</span>
                    </div>

                    {SUPERMARKETS.map((store) => {
                      const price = product.prices[store.id];
                      const storeFee = getProductDeliveryFee(product, store.id);
                      const isCheapestStore = store.id === cheapestStore.id;
                      const qty = getItemQuantityInCart(product.id, store.id);
                      const feedbackKey = `${product.id}-${store.id}`;
                      const isRecentlyAdded = addedAnimationId === feedbackKey;

                      return (
                        <div
                          key={store.id}
                          className={`flex items-center justify-between text-xs py-1.5 px-2 rounded-xl transition-all ${
                            isCheapestStore
                              ? 'bg-emerald-100/70 font-semibold text-emerald-950 border border-emerald-300/40'
                              : 'text-stone-700 hover:bg-stone-100/60'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="text-xs">{store.logo}</span>
                            <span className="truncate text-[11px]">{store.name}</span>
                            {isCheapestStore && (
                              <span className="text-[8px] bg-emerald-700 text-white px-1.5 py-0.2 rounded font-mono font-extrabold uppercase">
                                Menor
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className="flex flex-col items-end leading-tight">
                              <span className={`font-mono font-bold text-xs ${isCheapestStore ? 'text-emerald-800' : 'text-stone-900'}`}>
                                R$ {price.toFixed(2).replace('.', ',')}
                              </span>
                              <span className="text-[9px] font-mono text-amber-700">
                                frete: R$ {storeFee.toFixed(2).replace('.', ',')}
                              </span>
                            </div>
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              onClick={() => handleAddWithFeedback(product, store)}
                              data-cursor="+1"
                              className={`p-1 rounded-lg transition-all ${
                                isRecentlyAdded
                                  ? 'bg-emerald-600 text-white'
                                  : qty > 0
                                  ? 'bg-emerald-700 text-white'
                                  : 'bg-white hover:bg-emerald-700 hover:text-white border border-[#E8E2D5] text-stone-700'
                              }`}
                              title={`Adicionar do ${store.name}`}
                            >
                              {isRecentlyAdded ? (
                                <Check className="w-3.5 h-3.5" />
                              ) : (
                                <Plus className="w-3.5 h-3.5" />
                              )}
                            </motion.button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>

                {/* Card Action Buttons */}
                <div className="space-y-2 pt-3 border-t border-[#E8E2D5]">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddWithFeedback(product, cheapestStore)}
                    data-cursor="Adicionar"
                    className="w-full py-2.5 px-3 bg-gradient-to-r from-[#064E3B] to-[#047857] hover:from-[#065F46] hover:to-[#059669] text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg shadow-emerald-950/15 transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Adicionar do Mais Barato (R$ {minPrice.toFixed(2).replace('.', ',')})</span>
                  </motion.button>

                  <button
                    onClick={() => onOpenComparatorModal(product)}
                    data-cursor="Comparar"
                    className="w-full py-2 px-3 bg-[#FAF8F5] hover:bg-[#F4EFEA] text-stone-700 text-[11px] font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 border border-[#E8E2D5]"
                  >
                    <Scale className="w-3.5 h-3.5 text-stone-500" />
                    <span>Comparar frete e economias</span>
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>
      )}

    </section>
  );
}
