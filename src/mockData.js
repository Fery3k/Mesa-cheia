export const SUPERMARKETS = [
  {
    id: 'supermercado-centro',
    name: 'Supermercado Centro',
    tagline: 'Tradição e Qualidade no Coração da Cidade',
    logo: '🏪',
    badge: 'Mais Tradicional',
    rating: 4.8,
    reviewsCount: 1420,
    deliveryTimeMinutes: 35,
    baseStoreFee: 2.00,
    distanceKm: 1.2,
    minOrder: 30.00,
    isFastest: false,
    isCheapest: false,
    color: 'bg-emerald-600',
    bannerGradient: 'from-emerald-700 to-teal-800'
  },
  {
    id: 'super-mais',
    name: 'SuperMais',
    tagline: 'Entrega Ultrarrápida em até 20 minutos',
    logo: '⚡',
    badge: 'Menor Tempo de Entrega',
    rating: 4.9,
    reviewsCount: 2890,
    deliveryTimeMinutes: 20,
    baseStoreFee: 2.00,
    distanceKm: 0.8,
    minOrder: 25.00,
    isFastest: true,
    isCheapest: false,
    color: 'bg-orange-500',
    bannerGradient: 'from-orange-600 to-amber-600'
  },
  {
    id: 'mercado-economico',
    name: 'Mercado Econômico',
    tagline: 'Onde o seu dinheiro rende muito mais',
    logo: '💰',
    badge: 'Menor Preço Garantido',
    rating: 4.6,
    reviewsCount: 980,
    deliveryTimeMinutes: 40,
    baseStoreFee: 1.50,
    distanceKm: 2.5,
    minOrder: 35.00,
    isFastest: false,
    isCheapest: true,
    color: 'bg-blue-600',
    bannerGradient: 'from-blue-700 to-indigo-800'
  }
];

export const PRODUCTS = [
  {
    id: 'arroz-5kg',
    name: 'Arroz Tipo 1 Tio João / Camil 5kg',
    category: 'Grãos & Cereais',
    image: '🍚',
    unit: 'Pacote 5kg',
    deliveryFee: 3.00, // Regra Crítica: Taxa individual por produto
    description: 'Arroz nobre agulhinha tipo 1, soltinho e macio.',
    prices: {
      'supermercado-centro': 28.90,
      'super-mais': 29.50,
      'mercado-economico': 25.90
    },
    popular: true
  },
  {
    id: 'feijao-1kg',
    name: 'Feijão Carioca Kicaldo 1kg',
    category: 'Grãos & Cereais',
    image: '🫘',
    unit: 'Pacote 1kg',
    deliveryFee: 2.50, // Regra Crítica: Taxa individual por produto
    description: 'Feijão novo, caldo encorpado e cozimento rápido.',
    prices: {
      'supermercado-centro': 7.49,
      'super-mais': 7.90,
      'mercado-economico': 6.29
    },
    popular: true
  },
  {
    id: 'leite-1l',
    name: 'Leite Integral Parmalat / Italac 1L',
    category: 'Laticínios',
    image: '🥛',
    unit: 'Caixa 1L',
    deliveryFee: 1.50, // Regra Crítica: Taxa individual por produto
    description: 'Leite UHT integral fonte de cálcio e vitaminas.',
    prices: {
      'supermercado-centro': 4.99,
      'super-mais': 5.20,
      'mercado-economico': 4.49
    },
    popular: true
  },
  {
    id: 'cafe-500g',
    name: 'Café Torrado e Moído Pilão / Melitta 500g',
    category: 'Matinais',
    image: '☕',
    unit: 'Pacote 500g',
    deliveryFee: 2.00,
    description: 'Café forte e encorpado com torra tradicional.',
    prices: {
      'supermercado-centro': 17.80,
      'super-mais': 18.20,
      'mercado-economico': 15.90
    },
    popular: true
  },
  {
    id: 'oleo-soja',
    name: 'Óleo de Soja Liza / Soya 900ml',
    category: 'Mercearia',
    image: '🍾',
    unit: 'Garrafa 900ml',
    deliveryFee: 1.80,
    description: 'Óleo de soja 100% puro e refinado com ômega 3 e 6.',
    prices: {
      'supermercado-centro': 6.89,
      'super-mais': 7.10,
      'mercado-economico': 5.99
    },
    popular: false
  },
  {
    id: 'acucar-1kg',
    name: 'Açúcar Refinado União 1kg',
    category: 'Mercearia',
    image: '🍬',
    unit: 'Pacote 1kg',
    deliveryFee: 1.50,
    description: 'Açúcar refinado extra fino e branquinho.',
    prices: {
      'supermercado-centro': 4.60,
      'super-mais': 4.80,
      'mercado-economico': 3.99
    },
    popular: false
  },
  {
    id: 'macarrao-500g',
    name: 'Macarrão Espaguete Adria / Barilla 500g',
    category: 'Massa',
    image: '🍝',
    unit: 'Pacote 500g',
    deliveryFee: 1.20,
    description: 'Massa com sêmola de trigo duro, al dente perfeita.',
    prices: {
      'supermercado-centro': 3.99,
      'super-mais': 4.29,
      'mercado-economico': 3.49
    },
    popular: false
  },
  {
    id: 'detergente-500ml',
    name: 'Detergente Líquido Ypê / Limpol 500ml',
    category: 'Limpeza',
    image: '🧴',
    unit: 'Frasco 500ml',
    deliveryFee: 1.00,
    description: 'Detergente lava-louças com alto poder desengordurante.',
    prices: {
      'supermercado-centro': 2.49,
      'super-mais': 2.69,
      'mercado-economico': 1.99
    },
    popular: false
  }
];

export const SIMULATED_ADDRESSES = [
  { id: '1', title: 'Seu Endereço Atual', address: 'Av. Brasil, 1500 - Centro', city: 'São Paulo - SP', distanceText: 'Supermercados a menos de 3km' },
  { id: '2', title: 'Trabalho / Escritório', address: 'Rua da Consolação, 800 - Consolação', city: 'São Paulo - SP', distanceText: 'Supermercados a menos de 1.5km' },
  { id: '3', title: 'GPS em tempo real', address: 'Localização GPS (Simulada)', city: 'Bairro Jardim, SP', distanceText: '3 mercados encontrados na sua região' },
];
