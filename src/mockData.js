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
    deliveryFee: 2.00,
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
    deliveryFee: 2.00,
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
    deliveryFee: 1.50,
    distanceKm: 2.5,
    minOrder: 35.00,
    isFastest: false,
    isCheapest: true,
    color: 'bg-blue-600',
    bannerGradient: 'from-blue-700 to-indigo-800'
  }
];

// TAXA DE FRETE = MULTIPLICADOR × distância do mercado (km)
const DELIVERY_FEE_MULTIPLIER = 3.5;

// Helper: retorna o frete de um produto para um dado supermercado
// Fórmula: distância (km) do mercado × 3,5
export function getProductDeliveryFee(product, storeId) {
  const store = SUPERMARKETS.find((s) => s.id === storeId);
  if (!store) return 0;
  return parseFloat((store.distanceKm * DELIVERY_FEE_MULTIPLIER).toFixed(2));
}

// Helper: retorna a distância do mercado
export function getStoreDistance(storeId) {
  const store = SUPERMARKETS.find((s) => s.id === storeId);
  return store ? store.distanceKm : 0;
}

export const PRODUCTS = [
  // -------------------------------------------------------------
  // GRÃOS & FARINHAS
  // -------------------------------------------------------------
  {
    id: 'arroz-5kg',
    name: 'Arroz Tipo 1 Tio João / Camil 5kg',
    category: 'Grãos & Farinhas',
    image: '🍚',
    unit: 'Pacote 5kg',
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
    category: 'Grãos & Farinhas',
    image: '🫘',
    unit: 'Pacote 1kg',
    description: 'Feijão novo, caldo encorpado e cozimento rápido.',
    prices: {
      'supermercado-centro': 7.49,
      'super-mais': 7.90,
      'mercado-economico': 6.29
    },
    popular: true
  },
  {
    id: 'feijao-preto-1kg',
    name: 'Feijão Preto Camil / Kicaldo 1kg',
    category: 'Grãos & Farinhas',
    image: '🍲',
    unit: 'Pacote 1kg',
    description: 'Grãos graúdos selecionados, perfeito para feijoada aromática.',
    prices: {
      'supermercado-centro': 7.99,
      'super-mais': 8.40,
      'mercado-economico': 6.89
    },
    popular: false
  },
  {
    id: 'farinha-trigo-1kg',
    name: 'Farinha de Trigo Dona Benta Tradicional 1kg',
    category: 'Grãos & Farinhas',
    image: '🌾',
    unit: 'Pacote 1kg',
    description: 'Farinha de trigo pura sem fermento, ideal para pães, bolos e tortas.',
    prices: {
      'supermercado-centro': 5.49,
      'super-mais': 5.80,
      'mercado-economico': 4.69
    },
    popular: true
  },
  {
    id: 'aveia-flocos-450g',
    name: 'Aveia em Flocos Finos Quaker 450g',
    category: 'Grãos & Farinhas',
    image: '🥣',
    unit: 'Caixa 450g',
    description: 'Rica em fibras e nutrientes para um café da manhã saudável.',
    prices: {
      'supermercado-centro': 6.99,
      'super-mais': 7.40,
      'mercado-economico': 5.90
    },
    popular: false
  },

  // -------------------------------------------------------------
  // HORTIFRÚTI & FEIRA
  // -------------------------------------------------------------
  {
    id: 'banana-prata-1kg',
    name: 'Banana Prata Selecionada 1kg',
    category: 'Hortifrúti & Feira',
    image: '🍌',
    unit: 'Cacho aprox. 1kg',
    description: 'Frutas frescas climatizadas, doces e ricas em potássio.',
    prices: {
      'supermercado-centro': 6.99,
      'super-mais': 7.49,
      'mercado-economico': 5.49
    },
    popular: true
  },
  {
    id: 'maca-gala-1kg',
    name: 'Maçã Gala Nacional 1kg',
    category: 'Hortifrúti & Feira',
    image: '🍎',
    unit: 'Pacote 1kg',
    description: 'Maçãs vermelhas, suculentas e crocantes colhidas no sul do país.',
    prices: {
      'supermercado-centro': 10.90,
      'super-mais': 11.50,
      'mercado-economico': 8.99
    },
    popular: true
  },
  {
    id: 'tomate-italiano-1kg',
    name: 'Tomate Italiano Maduro 1kg',
    category: 'Hortifrúti & Feira',
    image: '🍅',
    unit: 'Kg a granel',
    description: 'Tomates alongados carnudos e firmes, ótimos para saladas e molhos frescos.',
    prices: {
      'supermercado-centro': 7.89,
      'super-mais': 8.30,
      'mercado-economico': 6.49
    },
    popular: true
  },
  {
    id: 'batata-inglesa-1kg',
    name: 'Batata Inglesa Lavada Especial 1kg',
    category: 'Hortifrúti & Feira',
    image: '🥔',
    unit: 'Pacote 1kg',
    description: 'Batatas selecionadas de casca lisa, perfeitas para assar, cozinhar ou fritar.',
    prices: {
      'supermercado-centro': 6.49,
      'super-mais': 6.90,
      'mercado-economico': 4.99
    },
    popular: true
  },
  {
    id: 'cebola-amarela-1kg',
    name: 'Cebola Amarela Nacional 1kg',
    category: 'Hortifrúti & Feira',
    image: '🧅',
    unit: 'Pacote 1kg',
    description: 'Cebolas de alta qualidade e sabor marcante para refogados do dia a dia.',
    prices: {
      'supermercado-centro': 5.90,
      'super-mais': 6.20,
      'mercado-economico': 4.50
    },
    popular: false
  },
  {
    id: 'alface-hidroponica',
    name: 'Alface Crespa Hidropônica 1un',
    category: 'Hortifrúti & Feira',
    image: '🥬',
    unit: 'Unidade fresca',
    description: 'Folhas crocantes cultivadas em água mineral purificada sem agrotóxicos pesados.',
    prices: {
      'supermercado-centro': 3.99,
      'super-mais': 4.29,
      'mercado-economico': 2.99
    },
    popular: false
  },
  {
    id: 'laranja-pera-2kg',
    name: 'Laranja Pera Doce para Suco 2kg',
    category: 'Hortifrúti & Feira',
    image: '🍊',
    unit: 'Saco 2kg',
    description: 'Laranjas ricas em vitamina C com alto rendimento para sucos naturais.',
    prices: {
      'supermercado-centro': 9.80,
      'super-mais': 10.50,
      'mercado-economico': 7.99
    },
    popular: false
  },

  // -------------------------------------------------------------
  // CARNES, AVES & PROTEÍNAS
  // -------------------------------------------------------------
  {
    id: 'ovos-brancos-30un',
    name: 'Ovos Brancos Grandes Mantiqueira / Granja 30un',
    category: 'Carnes & Proteínas',
    image: '🥚',
    unit: 'Cartela 30 ovos',
    description: 'Cartela econômica com 30 ovos frescos inspecionados de altíssima qualidade.',
    prices: {
      'supermercado-centro': 21.90,
      'super-mais': 22.90,
      'mercado-economico': 18.99
    },
    popular: true
  },
  {
    id: 'peito-frango-1kg',
    name: 'Filé de Peito de Frango Seara / Sadia 1kg',
    category: 'Carnes & Proteínas',
    image: '🍗',
    unit: 'Bandeja 1kg',
    description: 'Cortes limpos sem osso e sem pele, congelados individualmente.',
    prices: {
      'supermercado-centro': 19.90,
      'super-mais': 20.90,
      'mercado-economico': 17.49
    },
    popular: true
  },
  {
    id: 'carne-moida-1kg',
    name: 'Carne Moída Patinho Bovino Resfriado 1kg',
    category: 'Carnes & Proteínas',
    image: '🥩',
    unit: 'Bandeja 1kg',
    description: 'Corte magro de patinho de primeira moído no dia, sem excesso de gordura.',
    prices: {
      'supermercado-centro': 38.90,
      'super-mais': 40.50,
      'mercado-economico': 34.90
    },
    popular: true
  },
  {
    id: 'linguica-calabresa-500g',
    name: 'Linguiça Calabresa Defumada Perdigão / Sadia 500g',
    category: 'Carnes & Proteínas',
    image: '🌭',
    unit: 'Pacote 500g',
    description: 'Defumação natural com tempero autêntico e suculência equilibrada.',
    prices: {
      'supermercado-centro': 14.50,
      'super-mais': 15.20,
      'mercado-economico': 12.80
    },
    popular: false
  },
  {
    id: 'file-tilapia-800g',
    name: 'Filé de Tilápia Congelado Copacol / Noronha 800g',
    category: 'Carnes & Proteínas',
    image: '🐟',
    unit: 'Pacote 800g',
    description: 'Filés nobres de tilápia sem espinhas, carne branca, leve e saudável.',
    prices: {
      'supermercado-centro': 36.90,
      'super-mais': 38.00,
      'mercado-economico': 32.50
    },
    popular: false
  },

  // -------------------------------------------------------------
  // LATICÍNIOS & FRIOS
  // -------------------------------------------------------------
  {
    id: 'leite-1l',
    name: 'Leite Integral Parmalat / Italac 1L',
    category: 'Laticínios & Frios',
    image: '🥛',
    unit: 'Caixa 1L',
    description: 'Leite UHT integral fonte de cálcio e vitaminas essenciais.',
    prices: {
      'supermercado-centro': 4.99,
      'super-mais': 5.20,
      'mercado-economico': 4.49
    },
    popular: true
  },
  {
    id: 'mussarela-fatiada-200g',
    name: 'Queijo Mussarela Fatiado Polenghi / Scala 200g',
    category: 'Laticínios & Frios',
    image: '🧀',
    unit: 'Bandeja 200g',
    description: 'Fatias finas com derretimento perfeito para lanches e pizzas.',
    prices: {
      'supermercado-centro': 9.90,
      'super-mais': 10.40,
      'mercado-economico': 8.79
    },
    popular: true
  },
  {
    id: 'presunto-cozido-200g',
    name: 'Presunto Cozido Magro Sadia / Seara 200g',
    category: 'Laticínios & Frios',
    image: '🥓',
    unit: 'Bandeja 200g',
    description: 'Presunto cozido sem capa de gordura, sabor suave e suculento.',
    prices: {
      'supermercado-centro': 7.89,
      'super-mais': 8.29,
      'mercado-economico': 6.99
    },
    popular: true
  },
  {
    id: 'manteiga-sal-200g',
    name: 'Manteiga de Primeira Qualidade com Sal Aviação 200g',
    category: 'Laticínios & Frios',
    image: '🧈',
    unit: 'Pote 200g',
    description: 'Manteiga tradicional brasileira feita de creme de leite puro.',
    prices: {
      'supermercado-centro': 12.90,
      'super-mais': 13.50,
      'mercado-economico': 11.40
    },
    popular: false
  },
  {
    id: 'requeijao-cremoso-200g',
    name: 'Requeijão Cremoso Tradicional Danone / Poços 200g',
    category: 'Laticínios & Frios',
    image: '🥣',
    unit: 'Copo 200g',
    description: 'Textura aveludada inconfundível para passar no pão quentinho.',
    prices: {
      'supermercado-centro': 8.49,
      'super-mais': 8.90,
      'mercado-economico': 7.29
    },
    popular: false
  },
  {
    id: 'leite-condensado-395g',
    name: 'Leite Condensado Semidesnatado Moça / Piracanjuba 395g',
    category: 'Laticínios & Frios',
    image: '🥫',
    unit: 'Lata 395g',
    description: 'O clássico para fazer brigadeiros, pudins e coberturas cremosas.',
    prices: {
      'supermercado-centro': 6.89,
      'super-mais': 7.20,
      'mercado-economico': 5.89
    },
    popular: false
  },

  // -------------------------------------------------------------
  // PADARIA & MATINAIS
  // -------------------------------------------------------------
  {
    id: 'cafe-500g',
    name: 'Café Torrado e Moído Pilão / Melitta 500g',
    category: 'Padaria & Matinais',
    image: '☕',
    unit: 'Pacote 500g',
    description: 'Café forte e encorpado com ponto de torra tradicional equilibrado.',
    prices: {
      'supermercado-centro': 17.80,
      'super-mais': 18.20,
      'mercado-economico': 15.90
    },
    popular: true
  },
  {
    id: 'pao-de-forma-500g',
    name: 'Pão de Forma Tradicional Wickbold / Pullman 500g',
    category: 'Padaria & Matinais',
    image: '🍞',
    unit: 'Pacote 500g',
    description: 'Fatias macias e consistentes para torradas e sanduíches diários.',
    prices: {
      'supermercado-centro': 8.90,
      'super-mais': 9.40,
      'mercado-economico': 7.60
    },
    popular: true
  },
  {
    id: 'achocolatado-400g',
    name: 'Achocolatado em Pó Nescau 2.0 / Toddy 400g',
    category: 'Padaria & Matinais',
    image: '🍫',
    unit: 'Lata 400g',
    description: 'Energia com sabor marcante de cacau e enriquecido com vitaminas.',
    prices: {
      'supermercado-centro': 9.20,
      'super-mais': 9.80,
      'mercado-economico': 7.99
    },
    popular: false
  },
  {
    id: 'biscoito-oreo-144g',
    name: 'Biscoito Recheado Baunilha Oreo / Passatempo 144g',
    category: 'Padaria & Matinais',
    image: '🍪',
    unit: 'Pacote 144g',
    description: 'Casquinha de chocolate crocante com recheio cremoso e marcante.',
    prices: {
      'supermercado-centro': 4.49,
      'super-mais': 4.79,
      'mercado-economico': 3.79
    },
    popular: false
  },

  // -------------------------------------------------------------
  // MERCEARIA, MOLHOS & TEMPEROS
  // -------------------------------------------------------------
  {
    id: 'oleo-soja',
    name: 'Óleo de Soja Liza / Soya 900ml',
    category: 'Mercearia & Molhos',
    image: '🍾',
    unit: 'Garrafa 900ml',
    description: 'Óleo de soja 100% puro e refinado com ômega 3 e vitamina E.',
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
    category: 'Mercearia & Molhos',
    image: '🍬',
    unit: 'Pacote 1kg',
    description: 'Açúcar refinado extra fino e branquinho de rápida dissolução.',
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
    category: 'Mercearia & Molhos',
    image: '🍝',
    unit: 'Pacote 500g',
    description: 'Massa com sêmola de trigo duro selecionado, cozimento al dente.',
    prices: {
      'supermercado-centro': 3.99,
      'super-mais': 4.29,
      'mercado-economico': 3.49
    },
    popular: false
  },
  {
    id: 'azeite-extravirgem-500ml',
    name: 'Azeite de Oliva Extravirgem Gallo / Borges 500ml',
    category: 'Mercearia & Molhos',
    image: '🫒',
    unit: 'Vidro 500ml',
    description: 'Acidez máxima 0.5%, sabor frutado marcante prensado a frio.',
    prices: {
      'supermercado-centro': 42.90,
      'super-mais': 44.50,
      'mercado-economico': 38.90
    },
    popular: true
  },
  {
    id: 'molho-tomate-340g',
    name: 'Molho de Tomate Tradicional Pomarola / Elefante 340g',
    category: 'Mercearia & Molhos',
    image: '🍅',
    unit: 'Sachê 340g',
    description: 'Feito com tomates frescos maduros e temperos naturais finos.',
    prices: {
      'supermercado-centro': 2.89,
      'super-mais': 3.10,
      'mercado-economico': 2.39
    },
    popular: false
  },
  {
    id: 'maionese-hellmanns-500g',
    name: 'Maionese Tradicional Hellmann\'s A Verdadeira 500g',
    category: 'Mercearia & Molhos',
    image: '🫙',
    unit: 'Pote 500g',
    description: 'Cremosidade clássica com ovos de galinhas caipiras e óleos de fazenda.',
    prices: {
      'supermercado-centro': 9.80,
      'super-mais': 10.30,
      'mercado-economico': 8.49
    },
    popular: false
  },
  {
    id: 'atum-solido-170g',
    name: 'Atum Sólido em Óleo Gomes da Costa 170g',
    category: 'Mercearia & Molhos',
    image: '🐟',
    unit: 'Lata 170g',
    description: 'Lombo de atum conservado em óleo comestível, fonte pura de ômega 3.',
    prices: {
      'supermercado-centro': 9.90,
      'super-mais': 10.40,
      'mercado-economico': 8.60
    },
    popular: false
  },

  // -------------------------------------------------------------
  // BEBIDAS
  // -------------------------------------------------------------
  {
    id: 'suco-laranja-1500ml',
    name: 'Suco de Laranja Integral 100% Natural One 1.5L',
    category: 'Bebidas',
    image: '🧃',
    unit: 'Garrafa 1.5L',
    description: 'Sem adição de açúcares ou conservantes, puro néctar da fruta.',
    prices: {
      'supermercado-centro': 14.90,
      'super-mais': 15.50,
      'mercado-economico': 12.99
    },
    popular: true
  },
  {
    id: 'refrigerante-coca-2l',
    name: 'Refrigerante Coca-Cola Sabor Original 2L',
    category: 'Bebidas',
    image: '🥤',
    unit: 'Garrafa Pet 2L',
    description: 'O refrigerante mais famoso do mundo bem gelado para a sua refeição.',
    prices: {
      'supermercado-centro': 9.99,
      'super-mais': 10.49,
      'mercado-economico': 8.79
    },
    popular: true
  },
  {
    id: 'agua-mineral-1500ml',
    name: 'Água Mineral sem Gás Bonafont / Crystal 1.5L',
    category: 'Bebidas',
    image: '💧',
    unit: 'Garrafa 1.5L',
    description: 'Água mineral límpida e purificada de fonte natural preservada.',
    prices: {
      'supermercado-centro': 3.49,
      'super-mais': 3.79,
      'mercado-economico': 2.79
    },
    popular: false
  },

  // -------------------------------------------------------------
  // LIMPEZA & HIGIENE
  // -------------------------------------------------------------
  {
    id: 'detergente-500ml',
    name: 'Detergente Líquido Ypê / Limpol 500ml',
    category: 'Limpeza & Higiene',
    image: '🧴',
    unit: 'Frasco 500ml',
    description: 'Detergente lava-louças com alto poder desengordurante e pH neutro.',
    prices: {
      'supermercado-centro': 2.49,
      'super-mais': 2.69,
      'mercado-economico': 1.99
    },
    popular: false
  },
  {
    id: 'sabao-omo-1600g',
    name: 'Lava Roupas em Pó Omo Lavagem Perfeita 1.6kg',
    category: 'Limpeza & Higiene',
    image: '🧼',
    unit: 'Caixa 1.6kg',
    description: 'Remove as manchas mais difíceis na primeira lavagem sem desbotar tecidos.',
    prices: {
      'supermercado-centro': 24.90,
      'super-mais': 25.90,
      'mercado-economico': 21.50
    },
    popular: true
  },
  {
    id: 'papel-higienico-12un',
    name: 'Papel Higiênico Neve Toque de Seda Folha Dupla 12un',
    category: 'Limpeza & Higiene',
    image: '🧻',
    unit: 'Pacote 12 rolos',
    description: 'Máxima suavidade e absorção com fibras 100% naturais certificadas.',
    prices: {
      'supermercado-centro': 21.50,
      'super-mais': 22.80,
      'mercado-economico': 18.90
    },
    popular: false
  }
];

export const SIMULATED_ADDRESSES = [
  { id: '1', title: 'Seu Endereço Atual', address: 'Av. Brasil, 1500 - Centro', city: 'São Paulo - SP', distanceText: 'Supermercados a menos de 3km' },
  { id: '2', title: 'Trabalho / Escritório', address: 'Rua da Consolação, 800 - Consolação', city: 'São Paulo - SP', distanceText: 'Supermercados a menos de 1.5km' },
  { id: '3', title: 'GPS em tempo real', address: 'Localização GPS (Simulada)', city: 'Bairro Jardim, SP', distanceText: '3 mercados encontrados na sua região' },
];
