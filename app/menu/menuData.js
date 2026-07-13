// English menu — translated from the current German Speisekarte (Sommerkarte 2026).
export const sharing = {
  eyebrow: 'Signature · Sharing Menu',
  h2: ['Four courses. ', 'One evening.'],
  lead:
    'Our sharing menu for two. Katsu sando of Duroc pork to start, a lobster roll in between, Taste Your Filet Deluxe as the main — 4×100g of all four breeds. And then: The Lime.',
  courses: [
    { num: 'I', name: 'Katsu Sando – Duroc', desc: 'Panko · shokupan · tonkatsu · mustard miso' },
    { num: 'II', name: 'Lobster Roll', desc: 'Lobster salad · yuzu mayo · crispy asparagus · tobiko' },
    { num: 'III', name: 'Taste Your Filet Deluxe', desc: '4×100g · Simmental · Chianina · Angus · Wagyu' },
    { num: 'IV', name: 'The Lime', desc: 'White chocolate cream · financier · champagne sorbet' },
  ],
  priceLabel: 'from 2 people',
  price: '90',
  priceUnit: '€ per person',
};

export const sections = [
  {
    eyebrow: 'Chapter I',
    h2: ['Starter & ', 'Appetizer.'],
    intro:
      'Where it all begins. From Galician conservas to Chianina beef tartare and carpaccio with winter truffle — the stage for the evening.',
    groups: [
      {
        subcat: 'Conservas Deluxe',
        items: [
          { img: '/menu/p04395.jpg', name: 'Small Sardines in Olive Oil', price: '13.00 €', sub: 'Sardinillas · Galicia · 115g', desc: 'Finest sardinillas from Galicia in premium olive oil.' },
          { img: '/menu/p04408.jpg', name: 'Marinated Mussels', price: '13.00 €', sub: 'Mejillón · Galicia · 110g', desc: 'In a spicy tomato broth.' },
          { img: '/menu/p04413.jpg', name: 'Small Scallops Galician Style', price: '22.00 €', sub: 'Viera · Galicia · 110g', desc: 'In a delicate paprika broth.' },
          { img: '/menu/p04422.jpg', name: 'Codesa Anchovies from Cantabria', price: '27.00 €', sub: 'Limitada / Black Edition · 55g', desc: '7–10 medium-sized fillets of award-winning, hand-filleted quality, preserved in extra virgin olive oil.' },
          { img: null, name: 'Served with all conservas', price: '', sub: '', desc: 'Sourdough bread · yuzu miso butter' },
        ],
      },
      {
        subcat: 'Appetizer',
        items: [
          { img: '/menu/p04295.jpg', name: 'House Bread', price: '12.00 €', sub: '', desc: 'Sylt sourdough · rosemary focaccia · olive ciabatta · Maldon sea salt · Nekeas olive oil · 25-year PX balsamic · yuzu miso butter.' },
          { img: '/img/Neo_Gerichte_by_SelinaGargiullo-00517.jpg', name: 'Beef Tartare', price: '100g · 28.00 € / 150g · 36.00 €', sub: 'Chianina IGP beef “Summer Style”', desc: 'Granny Smith · celery · marinated radish · green gazpacho · wild herb salad.' },
          { img: '/img/Neo_Gerichte_by_SelinaGargiullo-00382.jpg', name: 'Octopus Carpaccio', price: '27.00 €', sub: '', desc: 'Black aioli · piment d’Espelette · baked piquillo pepper tartare · green & red mojo sauce · capers · Kalamata olives · basil.' },
          { img: '/menu/p03468.jpg', name: 'Beef Fillet Carpaccio', price: '26.00 €', sub: '', desc: 'Ponzu vinaigrette · mango chili relish · jalapeño · baby spinach · mushrooms · spring onion · kalamansi mayo.' },
        ],
      },
      {
        subcat: 'Young Greens',
        items: [
          { img: '/menu/p04001.jpg', name: 'Burrata di Bufala Mallorquin Vibes', price: '25.00 €', sub: '', desc: 'Colourful tomatoes · fennel · orange marmalade from Sóller · olive oil · caramelised almonds · basil · olives · pickled onions · jalapeño · aged aceto.' },
          { img: '/menu/p04558.jpg', name: 'Caesar Salad', price: 'small · 16.00 € / large · 19.00 €', sub: '', desc: 'Romaine lettuce · Parmesan dressing · fried capers · croutons · tomatoes.' },
          { img: null, name: 'Upgrade Your Caesar', price: '', sub: '', desc: 'Grilled wild-caught prawn 5.00 each · tempura prawn 5.00 each · beef fillet strips 18.00 · crispy chicken 12.00' },
        ],
      },
    ],
  },
  {
    eyebrow: 'Chapter II',
    h2: ['Sushi & ', 'More.'],
    intro:
      'Californian sushi the way we see it. Salmon trout from Forellenhof Lenz, bluefin tuna, hamachi from Völklingen — as sashimi, tataki, ceviche and family style.',
    groups: [
      {
        subcat: 'Signature',
        items: [
          { img: '/menu/p04848.jpg', name: 'The NEO Tower', price: '59.00 € p.p.', sub: 'price per person', desc: 'Sashimi variation · nigiri · inside-out roll · crispy futomaki · panko prawn · crispy spicy tuna mochi · daikon · wakame · chili cucumber salad · ponzu.' },
        ],
      },
      {
        subcat: 'Raw & More',
        items: [
          { img: '/img/Neo_Gerichte_by_SelinaGargiullo-00565.jpg', name: 'Sashimi Selection', price: '65.00 €', sub: '', desc: 'Salmon trout from Forellenhof Lenz · bluefin tuna · scallop · hamachi from Völklingen · beetroot-cured salmon · chili cucumber salad · wakame · lobster salad.' },
          { img: '/menu/p04925.jpg', name: 'Ceviche Raw Hamachi Völklingen', price: '32.00 €', sub: '', desc: 'Yuzu leche · kumquat · jalapeño · brown butter · pickled red onion · chives.' },
          { img: '/img/Neo_Gerichte_by_SelinaGargiullo-00822.jpg', name: 'Tuna Tataki', price: '29.00 €', sub: '', desc: 'Seared bluefin tuna · black truffle soy reduction · raw marinated mushrooms · freshly shaved black truffle · chives · Granny Smith · togarashi.' },
          { img: '/menu/p03421.jpg', name: 'Katsu Sando – Duroc', price: '22.00 €', sub: '', desc: 'Crispy panko Duroc loin · shokupan toasted in brown butter · tonkatsu sauce · mustard miso cream · pickled red onion · pointed cabbage · chives · chili cucumber salad.' },
          { img: '/menu/p03491.jpg', name: 'Edamame', price: '10.50 € / 12.50 € / 14.50 €', sub: 'Plain · Black Aioli · Truffle', desc: 'Japanese soybeans · brown butter · sea salt · harissa mayo / black aioli · sesame · togarashi · soy reduction / truffle · truffle cream.' },
        ],
      },
    ],
  },
  {
    eyebrow: 'Chapter III',
    h2: ['Sushi ', 'Rolls.'],
    intro:
      'Hand-rolled to order. Inside-out rolls and crispy futomaki — from all-veggie to the flambéed signature roll with lobster and wagyu.',
    groups: [
      {
        subcat: 'Inside Out Rolls',
        items: [
          { img: '/menu/p03549.jpg', name: 'Mrs. Green (vegetarian)', price: '22.00 €', sub: '', desc: 'Green asparagus · cucumber · edamame cream cheese · yuzu mayo · black sesame · avocado.' },
          { img: '/menu/p03638.jpg', name: 'T N T', price: '30.00 €', sub: '', desc: 'Bluefin tuna (tartare & sashimi) · avocado · harissa mayo · jalapeño · sesame · coriander.' },
          { img: '/img/Neo_Gerichte_by_SelinaGargiullo-00652.jpg', name: 'Völklingen Hamachi Smoke Roll', price: '29.00 €', sub: '', desc: 'Hamachi sashimi · green asparagus · grilled mayo · daikon · spring onion · black sesame · soy mirin glaze.' },
          { img: '/menu/p03632.jpg', name: 'Salmon²', price: '27.00 €', sub: '', desc: 'Salmon trout from Forellenhof Lenz · aji verde · cucumber · Granny Smith chutney · edamame cream cheese · salmon roe · chives.' },
          { img: '/img/Neo_Gerichte_by_SelinaGargiullo-00600.jpg', name: 'Lobster Roll', price: '35.00 €', sub: '', desc: 'Lobster salad · yuzu mayo · crispy asparagus · avocado · lobster bisque glaze · black tobiko · chives.' },
          { img: '/menu/sig-surfturf.jpg', name: 'Surf’n Turf NEO Signature', price: '29.00 €', sub: '', desc: 'Beef fillet · crispy wild-caught prawn · avocado · truffle cream · black truffle · Parmesan · chives.' },
        ],
      },
      {
        subcat: 'Crispy Futomaki Rolls',
        items: [
          { img: '/menu/p04069.jpg', name: 'Crispy Green', price: '24.00 €', sub: '', desc: 'Teriyaki tofu · avocado · green asparagus · edamame cream · harissa mayo · black sesame.' },
          { img: '/menu/p04061.jpg', name: 'Crispy Lobster', price: '35.00 €', sub: '', desc: 'Lobster · avocado · cucumber · truffle cream · spring onion · black tobiko · lobster bisque glaze.' },
          { img: '/menu/p04065.jpg', name: 'Crispy Chicken', price: '26.00 €', sub: '', desc: 'Teriyaki chicken · teriyaki mayo · avocado · crispy onions · green asparagus.' },
          { img: '/menu/p04068.jpg', name: 'Crispy Tuna', price: '28.00 €', sub: '', desc: 'Tuna tartare · asparagus · avocado · chili · aji verde.' },
        ],
      },
      {
        subcat: 'Limited Signature',
        items: [
          { img: '/menu/sharing.jpg', name: 'Wagyu Japan A4 Roll', price: '48.00 €', sub: '', desc: 'Japanese Wagyu A4 Akune Gold · daikon · black sesame · black truffle sauce · cucumber · chives · fleur de sel · lightly torched.' },
        ],
      },
    ],
  },
  {
    eyebrow: 'Chapter IV',
    h2: ['Maki & ', 'More.'],
    intro: 'Classic and pared back — freshly rolled, six pieces. The easiest way to taste your way through the sea.',
    groups: [
      {
        subcat: 'Maki',
        items: [
          { img: '/img/E60A8677-Bearbeitet-scaled-e1719227896937.jpg', name: 'Salmon', price: '7.00 €', sub: '', desc: '' },
          { img: null, name: 'Salmon & Avocado', price: '8.00 €', sub: '', desc: '' },
          { img: null, name: 'Tuna', price: '8.00 €', sub: '', desc: '' },
          { img: null, name: 'Avocado', price: '6.00 €', sub: '', desc: '' },
          { img: null, name: 'Cucumber', price: '5.00 €', sub: '', desc: '' },
          { img: null, name: 'Cucumber & Cream Cheese', price: '6.00 €', sub: '', desc: '' },
          { img: null, name: 'Tamago', price: '6.00 €', sub: '', desc: '' },
        ],
      },
    ],
  },
  {
    eyebrow: 'Chapter V',
    h2: ['Bowls', '.'],
    intro: 'Sushi rice as the base, the best of sea and kitchen on top. The fastest way to eat your way through half of NEO.',
    groups: [
      {
        subcat: 'Signature Bowl',
        items: [
          { img: '/menu/p04684.jpg', name: 'Happy Bowl', price: '38.00 €', sub: '', desc: 'Sushi rice · salmon trout · bluefin tuna · teriyaki chicken · panko prawn · avocado · edamame · daikon · mango chili relish · salmon roe · aji verde · sesame · teriyaki mayo.' },
        ],
      },
    ],
  },
  {
    eyebrow: 'Chapter VI',
    h2: ['Main ', 'Course.'],
    intro:
      'Fish from the fjords, lobster from Brittany, Galician chestnut-fed pork — and a vegetarian answer to everything.',
    groups: [
      {
        subcat: 'Fish',
        items: [
          { img: '/menu/p04151.jpg', name: 'Breton Monkfish & Wild-Caught Prawn', price: '48.00 €', sub: '', desc: 'Red curry shellfish sauce · sesame spinach · miso corn cream · fried rice with furikake · chili · sesame · tamago · coriander.' },
          { img: '/menu/p04636.jpg', name: 'Grilled Salmon Trout Fillet', price: '42.00 €', sub: 'Forellenhof Lenz', desc: 'Sauce béarnaise · grilled lettuce heart · crispy bacon · panko crunch · yuzu mayo · tomato chutney · Parmesan · pickled red onions.' },
          { img: null, name: 'Lobster & Linguine', price: '55.00 €', sub: '', desc: 'Lobster · lobster bisque · linguine · peas · flat-leaf parsley · lemon zest · chili · spring onion.' },
        ],
      },
      {
        subcat: 'Pork',
        items: [
          { img: '/menu/p04443.jpg', name: 'Spare Ribs', price: '38.00 €', sub: 'Galician chestnut-fed pork', desc: 'Black BBQ glaze · miso corn cream · chili cucumber salad · chili · spring onion · coriander · sesame.' },
          { img: '/menu/p04619.jpg', name: 'Duroc Pork Chop', price: '34.00 €', sub: '', desc: 'Port wine jus · black aioli cream · grilled vegetables: pointed peppers · green asparagus · aubergine · courgette · vine tomatoes · pine nuts.' },
        ],
      },
      {
        subcat: 'Vegetarian',
        items: [
          { img: null, name: 'Miso Aubergine', price: '27.00 €', sub: '', desc: 'Crispy miso aubergine · fried rice with furikake · sesame spinach · yuzu mayo.' },
          { img: '/menu/p04029.jpg', name: 'Truffle Ravioli', price: '28.00 €', sub: '', desc: 'In brown butter · creamy spinach · tomatoes · Parmesan.' },
        ],
      },
    ],
  },
  {
    eyebrow: 'Chapter VII',
    h2: ['Beef & ', 'Filet.'],
    intro:
      'Four breeds, three sizes. From Pomeranian Simmental to Tuscan Chianina to Japanese Wagyu — dry-aged for 3–4 weeks on the bone.',
    groups: [
      {
        subcat: 'Taste Your Filet',
        items: [
          { img: '/menu/p03689.jpg', name: 'Taste Your Filet', price: '79.00 €', sub: '3 × 100g', desc: 'Black Angus Galicia · Chianina IGP Tuscany · Pomeranian Simmental.' },
          { img: '/menu/p03753.jpg', name: 'Taste Your Filet Deluxe', price: '115.00 €', sub: 'NEO Signature · 4 × 100g', desc: 'Black Angus Galicia · Chianina IGP Tuscany · Pomeranian Simmental · Wagyu Galicia.' },
          { img: null, name: 'Taste Your Filet Deluxe Hoch²', price: '165.00 €', sub: '', desc: 'Plus 100g Japanese Wagyu A4.' },
          { img: null, name: 'Served with all fillets', price: '', sub: '', desc: 'Port wine jus · sauce béarnaise · grilled vegetables (pointed peppers · green asparagus · aubergine · courgette · vine tomatoes · pine nuts · black aioli cream).' },
        ],
      },
      {
        subcat: 'Steak',
        items: [
          { img: '/menu/p03759.jpg', name: 'Japan A4', price: '100g · 65.00 €', sub: 'Akune Gold · Kagoshima · roast beef', desc: '' },
          { img: '/menu/p03694.jpg', name: 'Rump Steak', price: '350g · 55.00 €', sub: 'Pomeranian Simmental · NEO selection Yumshaki', desc: 'Finest marbling.' },
          { img: '/menu/p03700.jpg', name: 'Entrecôte', price: '350g · 69.00 €', sub: 'Pomeranian Simmental · NEO selection Yumshaki', desc: 'Finest marbling.' },
          { img: '/menu/p03782.jpg', name: 'Dry Aged Rump Steak', price: '350g · 55.00 €', sub: 'Galicia · Black Angus · Nosa Terra · dry-aged 3–4 weeks', desc: '' },
          { img: '/menu/p03692.jpg', name: 'Dry Aged Entrecôte', price: '350g · 69.00 €', sub: 'Galicia · Black Angus · Nosa Terra · dry-aged 3–4 weeks', desc: '' },
          { img: null, name: 'Served with all steaks', price: '', sub: '', desc: 'Yuzu miso butter · grilled lettuce heart · crispy bacon · panko crunch · yuzu mayo · tomato chutney · Parmesan · pickled red onions.' },
        ],
      },
      {
        subcat: 'Dry Aged & Bone · from 600g · price per 100g',
        items: [
          { img: null, name: 'Black Angus', price: 'Chop 12.00 · T-Bone 14.00 · Porterhouse 16.00 €', sub: 'dry-aged 3–4 weeks', desc: 'British origin, raised in Spain — the perfect balance of fine marbling and a robust body.' },
          { img: null, name: 'Wagyu', price: 'Chop 18.00 · T-Bone 20.00 · Porterhouse 22.00 €', sub: 'dry-aged 3–4 weeks', desc: 'Japanese origin, raised by our partner in Spain — a staple for every meat lover.' },
          { img: null, name: 'Rubia Gallega', price: 'Chop 16.00 · T-Bone 17.00 · Porterhouse 19.00 €', sub: 'dry-aged 3–4 weeks', desc: 'Cream-coloured fat, pronounced meatiness, deep red colour and moderate marbling.' },
          { img: null, name: 'Chianina', price: 'Chop 16.00 · T-Bone 17.00 · Porterhouse 19.00 €', sub: 'dry-aged 3–4 weeks', desc: 'Bistecca alla Fiorentina — the “white giants of Italy”, one of the oldest and noblest cattle breeds in the world.' },
        ],
      },
    ],
  },
  {
    eyebrow: 'Chapter VIII',
    h2: ['Sides & ', 'Sauces.'],
    intro: 'Truffle fries, Hasselback potato, grilled vegetables — and sauces that make the difference.',
    groups: [
      {
        subcat: 'Fries, Potatoes & More',
        items: [
          { img: '/menu/p04345.jpg', name: 'French Fries', price: '6.00 €', sub: '', desc: '' },
          { img: '/menu/p04351.jpg', name: 'Fries & Parmesan', price: '8.00 €', sub: '', desc: '' },
          { img: '/menu/p04358.jpg', name: 'Fries & Truffle', price: '10.00 €', sub: '', desc: '' },
          { img: '/menu/p04314.jpg', name: 'Fries Deluxe', price: '12.00 €', sub: 'Parmesan · truffle', desc: '' },
          { img: '/menu/p04375.jpg', name: 'Sweet Potato Fries', price: '10.00 €', sub: '& guacamole', desc: '' },
          { img: '/menu/p03678.jpg', name: 'Fried Rice with Furikake', price: '6.00 €', sub: '', desc: 'Chili · sesame · tamago · coriander.' },
          { img: '/menu/p04137.jpg', name: 'Linguine Tossed in Butter', price: '8.00 €', sub: '', desc: '' },
          { img: null, name: 'Hasselback Potato', price: '9.00 €', sub: 'with truffle cream', desc: '' },
        ],
      },
      {
        subcat: 'Greens',
        items: [
          { img: '/img/Neo_Gerichte_by_SelinaGargiullo-00633.jpg', name: 'Grilled Lettuce Heart', price: '8.00 €', sub: '', desc: 'Crispy bacon · panko crunch · yuzu mayo · tomato chutney · Parmesan · pickled red onions.' },
          { img: '/img/Neo_Gerichte_by_SelinaGargiullo-00357.jpg', name: 'Sesame Spinach', price: '8.00 €', sub: '', desc: '' },
          { img: '/img/Neo_Gerichte_by_SelinaGargiullo-00946.jpg', name: 'Grilled Vegetables', price: '8.00 €', sub: '', desc: 'Pointed peppers · green asparagus · aubergine · courgette · vine tomatoes · pine nuts · black aioli cream.' },
          { img: null, name: 'Crispy Miso Aubergine', price: '8.00 €', sub: '', desc: '' },
        ],
      },
      {
        subcat: 'Sauces & Dips',
        items: [
          { img: null, name: 'Port Wine Jus', price: '8.00 €', sub: '', desc: '' },
          { img: null, name: 'Sauce Béarnaise', price: '8.00 €', sub: '', desc: '' },
          { img: null, name: 'Truffle Mayo / Harissa Mayo', price: '4.00 € each', sub: '', desc: '' },
        ],
      },
    ],
  },
  {
    eyebrow: 'Chapter IX',
    h2: ['Sweets & ', 'Desserts.'],
    intro: 'The final course. Crème brûlée, The Lime, a molten caramel core — the sweet finale.',
    groups: [
      {
        subcat: 'Sweets & Desserts',
        items: [
          { img: null, name: 'Lemongrass Crème Brûlée', price: '16.00 €', sub: '', desc: 'Lemongrass · mango · kaffir lime · caramelised almonds · coconut sorbet.' },
          { img: null, name: 'The Lime', price: '27.00 €', sub: '', desc: 'Vanilla white chocolate cream · lime financier · lime mint core · marinated strawberries · champagne sorbet.' },
          { img: '/menu/p04654.jpg', name: 'Chocolate Cake', price: '18.00 €', sub: '15–20 min preparation time', desc: 'Molten caramel core · dark chocolate · grilled pineapple · Tasmanian pepper.' },
        ],
      },
    ],
  },
];
