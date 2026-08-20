import React, { useState } from 'react';
import { ShoppingBag, TrendingDown, Sparkles, Scale, Plus, Truck, Filter } from 'lucide-react';
import { PRODUCTS, SUPERMARKETS } from '../mockData';

export default function ProductCatalog({
  searchQuery,
  selectedStoreId,
  onAddToCart,
  onOpenComparatorModal,
  cartItems
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Grãos & Cereais', 'Laticínios', 'Matinais', 'Mercearia', 'Massa', 'Limpeza'];

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

  return (
    <section className="mb-14">
      
      {/* Catalog Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-orange-100 text-orange-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <TrendingDown className="w-3 h-3" /> Vitrine com Frete Cumulativo por Item
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Catálogo de Produtos Essenciais
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Cada item possui uma taxa de entrega própria. No carrinho, o frete total é a somatória exata de todos os itens acumulados!
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat === 'all' ? 'Todos os Produtos' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Store Filter Banner */}
      {selectedStoreId && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-emerald-600" />
            <span>
              Filtrando produtos do supermercado:{' '}
              <strong className="text-emerald-800">
                {SUPERMARKETS.find((s) => s.id === selectedStoreId)?.name}
              </strong>
            </span>
          </div>
          <button
            onClick={() => onOpenComparatorModal(null)}
            className="text-emerald-700 font-bold hover:underline"
          >
            Ver matriz comparativa completa
          </button>
        </div>
      )}

      {/* Product Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-gray-100 p-8">
          <p className="text-gray-500 text-sm font-medium">Nenhum produto encontrado para "{searchQuery}".</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const { minPrice, store: cheapestStore } = getCheapestStoreInfo(product.prices);

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl p-5 border border-gray-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Image & Category Pill */}
                  <div className="relative mb-4 bg-gray-50 rounded-2xl p-6 flex items-center justify-center h-44 group-hover:bg-emerald-50/50 transition-colors">
                    <span className="text-6xl drop-shadow-md group-hover:scale-110 transition-transform">
                      {product.image}
                    </span>
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-gray-100 shadow-sm">
                      {product.unit}
                    </span>
                    
                    {/* REGRA CRÍTICA: TAXA DE FRETE INDIVIDUAL DESTACADA */}
                    <span className="absolute bottom-3 right-3 bg-orange-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
                      <Truck className="w-3 h-3" />
                      <span>Frete: R$ {product.deliveryFee.toFixed(2).replace('.', ',')}</span>
                    </span>
                  </div>

                  {/* Title & Category */}
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="font-extrabold text-sm text-gray-900 line-clamp-2 my-1 group-hover:text-emerald-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-gray-500 line-clamp-2 mb-2">
                    {product.description}
                  </p>

                  {/* Regra de Negócio Notice */}
                  <div className="flex items-center gap-1.5 text-[10px] text-orange-700 font-semibold bg-orange-50 p-2 rounded-xl border border-orange-100 mb-3">
                    <Truck className="w-3.5 h-3.5 shrink-0 text-orange-600" />
                    <span>Taxa de entrega individual: <strong>R$ {product.deliveryFee.toFixed(2).replace('.', ',')}/un.</strong></span>
                  </div>

                  {/* Price Matrix Preview Component */}
                  <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 space-y-1.5 mb-4">
                    <div className="flex items-center justify-between text-[10px] text-gray-500 font-bold uppercase tracking-wider pb-1 border-b border-gray-200/60">
                      <span>Supermercado</span>
                      <span>Preço Item</span>
                    </div>

                    {SUPERMARKETS.map((store) => {
                      const price = product.prices[store.id];
                      const isCheapestStore = store.id === cheapestStore.id;
                      const qty = getItemQuantityInCart(product.id, store.id);

                      return (
                        <div
                          key={store.id}
                          className={`flex items-center justify-between text-xs py-1 px-1.5 rounded-lg transition-colors ${
                            isCheapestStore
                              ? 'bg-emerald-100/70 font-bold text-emerald-900'
                              : 'text-gray-700'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="text-xs">{store.logo}</span>
                            <span className="truncate text-[11px]">{store.name}</span>
                            {isCheapestStore && (
                              <span className="text-[9px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-extrabold">
                                Menor
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`font-extrabold ${isCheapestStore ? 'text-emerald-700' : 'text-gray-900'}`}>
                              R$ {price.toFixed(2).replace('.', ',')}
                            </span>
                            <button
                              onClick={() => onAddToCart(product, store)}
                              className={`p-1 rounded-full transition-all ${
                                qty > 0
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-white hover:bg-emerald-600 hover:text-white border border-gray-200 text-gray-700'
                              }`}
                              title={`Adicionar do ${store.name}`}
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>

                {/* Card Action Buttons */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => onAddToCart(product, cheapestStore)}
                    className="w-full py-2.5 px-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Adicionar do Mais Barato (R$ {minPrice.toFixed(2).replace('.', ',')})</span>
                  </button>

                  <button
                    onClick={() => onOpenComparatorModal(product)}
                    className="w-full py-1.5 px-3 bg-gray-50 hover:bg-gray-100 text-gray-700 text-[11px] font-semibold rounded-xl transition-all flex items-center justify-center gap-1 border border-gray-200"
                  >
                    <Scale className="w-3.5 h-3.5 text-gray-500" />
                    <span>Comparar frete e economias</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </section>
  );
}
