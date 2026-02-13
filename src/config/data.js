// Карта категорий
const categoryMap = {
  'smartphones': 'smartphones',
  'laptops': 'laptops', 
  'fragrances': 'fragrances',
  'skincare': 'skincare',
  'groceries': 'groceries',
  'home-decoration': 'home-decoration',
  'furniture': 'furniture',
  'tops': 'tops',
  'womens-dresses': 'womens-dresses',
  'womens-shoes': 'womens-shoes',
  'mens-shirts': 'mens-shirts',
  'mens-shoes': 'mens-shoes',
  'mens-watches': 'mens-watches',
  'womens-watches': 'womens-watches',
  'womens-bags': 'womens-bags',
  'womens-jewellery': 'womens-jewellery',
  'sunglasses': 'sunglasses',
  'automotive': 'automotive',
  'motorcycle': 'motorcycle',
  'lighting': 'lighting'
};

export const mockProducts = [
  {
    id: 1,
    title: "iPhone 9",
    price: 549,
    description: "An apple mobile which is nothing like apple",
    category: "smartphones",
    thumbnail: "/images/1_0.webp",
    images: [
      "/images/1_0.webp"
    ],
    rating: 4.69,
    stock: 94,
    brand: "Apple",
    discountPercentage: 12.96,
    published: true
  },
  {
    id: 2,
    title: "iPhone X",
    price: 899,
    description: "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology",
    category: "smartphones",
    thumbnail: "/images/2_0.webp",
    images: [
      "/images/2_0.webp"
    ],
    rating: 4.44,
    stock: 34,
    brand: "Apple",
    discountPercentage: 17.94,
    published: true
  },
  {
    id: 3,
    title: "Samsung Universe 9",
    price: 1249,
    description: "Samsung's new variant which goes beyond Galaxy to the Universe",
    category: "smartphones",
    thumbnail: "/images/3_0.webp",
    images: [
      "/images/3_0.webp"
    ],
    rating: 4.09,
    stock: 36,
    brand: "Samsung",
    discountPercentage: 15.46,
    published: true
  },
  {
    id: 4,
    title: "OPPOF19",
    price: 280,
    description: "OPPO F19 is officially announced on April 2021.",
    category: "smartphones",
    thumbnail: "/images/4_0.webp",
    images: [
      "/images/4_0.webp"
    ],
    rating: 4.3,
    stock: 123,
    brand: "OPPO",
    discountPercentage: 17.91,
    published: true
  },
  {
    id: 5,
    title: "Huawei P30",
    price: 499,
    description: "Huawei's re-badged P30 Pro New Edition was officially unveiled yesterday",
    category: "smartphones",
    thumbnail: "/images/5_0.webp",
    images: [
      "/images/5_0.webp"
    ],
    rating: 4.09,
    stock: 32,
    brand: "Huawei",
    discountPercentage: 10.58,
    published: true
  },
  {
    id: 6,
    title: "MacBook Pro",
    price: 1749,
    description: "MacBook Pro 2021 with mini-LED display may launch between September, November",
    category: "laptops",
    thumbnail: "/images/6_0.webp",
    images: [
      "/images/6_0.webp",
      "/images/6_1.webp",
      "/images/6_2.webp"
    ],
    rating: 4.57,
    stock: 83,
    brand: "Apple",
    discountPercentage: 11.02,
    published: true
  },
  {
    id: 7,
    title: "Samsung Galaxy Book",
    price: 1499,
    description: "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
    category: "laptops",
    thumbnail: "/images/7_0.webp",
    images: [
      "/images/7_0.webp",
      "/images/7_1.webp",
      "/images/7_2.webp"
    ],
    rating: 4.25,
    stock: 50,
    brand: "Samsung",
    discountPercentage: 4.15,
    published: true
  },
  {
    id: 8,
    title: "Microsoft Surface Laptop 4",
    price: 1499,
    description: "Style and speed. Stand out on HD video calls backed by Studio Mics.",
    category: "laptops",
    thumbnail: "/images/8_0.webp",
    images: [
      "/images/8_0.webp",
      "/images/8_1.webp",
      "/images/8_2.webp"
    ],
    rating: 4.43,
    stock: 68,
    brand: "Microsoft Surface",
    discountPercentage: 10.23,
    published: true
  },
  {
    id: 9,
    title: "Infinix INBOOK",
    price: 1099,
    description: "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
    category: "laptops",
    thumbnail: "/images/9_0.webp",
    images: [
      "/images/9_0.webp",
      "/images/9_1.webp",
      "/images/9_2.webp"
    ],
    rating: 4.54,
    stock: 96,
    brand: "Infinix",
    discountPercentage: 11.83,
    published: true
  },
  {
    id: 10,
    title: "HP Pavilion 15-DK1056WM",
    price: 1099,
    description: "HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, NVIDIA GeForce GTX 1650 4GB, Win10",
    category: "laptops",
    thumbnail: "/images/10_0.webp",
    images: [
      "/images/10_0.webp",
      "/images/10_1.webp",
      "/images/10_2.webp"
    ],
    rating: 4.43,
    stock: 89,
    brand: "HP Pavilion",
    discountPercentage: 6.18,
    published: true
  },
  {
    id: 11,
    title: "Perfume Oil",
    price: 13,
    description: "Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil",
    category: "fragrances",
    thumbnail: "/images/11_0.webp",
    images: [
      "/images/11_0.webp",
      "/images/11_1.webp",
      "/images/11_2.webp"
    ],
    rating: 4.26,
    stock: 65,
    brand: "Impression of Acqua Di Gio",
    discountPercentage: 8.4,
    published: true
  },
  {
    id: 12,
    title: "Brown Perfume",
    price: 40,
    description: "Royal_Mirage Sport Brown Perfume for Men & Women - 120ml",
    category: "fragrances",
    thumbnail: "/images/12_0.webp",
    images: [
      "/images/12_0.webp",
      "/images/12_1.webp",
      "/images/12_2.webp"
    ],
    rating: 4.0,
    stock: 52,
    brand: "Royal_Mirage",
    discountPercentage: 15.66,
    published: true
  },
  {
    id: 13,
    title: "Fog Scent Xpressio Perfume",
    price: 13,
    description: "Product details of Best Fog Scent Xpressio Perfume 100ml For Men cool long lasting perfumes for Men",
    category: "fragrances",
    thumbnail: "/images/13_0.webp",
    images: [
      "/images/13_0.webp",
      "/images/13_1.webp",
      "/images/13_2.webp"
    ],
    rating: 4.59,
    stock: 61,
    brand: "Fog Scent Xpressio",
    discountPercentage: 8.14,
    published: true
  },
  {
    id: 14,
    title: "Non-Alcoholic Concentrated Perfume Oil",
    price: 120,
    description: "Original Al Munakh® by Mahal Al Musk | Our Impression of Climate | 6ml Non-Alcoholic Concentrated Perfume Oil",
    category: "fragrances",
    thumbnail: "/images/14_0.webp",
    images: [
      "/images/14_0.webp",
      "/images/14_1.webp",
      "/images/14_2.webp"
    ],
    rating: 4.21,
    stock: 114,
    brand: "Al Munakh",
    discountPercentage: 15.6,
    published: true
  },
  {
    id: 15,
    title: "Eau De Perfume Spray",
    price: 30,
    description: "Genuine  Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality",
    category: "fragrances",
    thumbnail: "/images/15_0.webp",
    images: [
      "/images/15_0.webp",
      "/images/15_1.webp",
      "/images/15_2.webp"
    ],
    rating: 4.7,
    stock: 105,
    brand: "Lord - Al-Rehab",
    discountPercentage: 10.99,
    published: true
  },
  {
    id: 16,
    title: "Hyaluronic Acid Serum",
    price: 19,
    description: "L'OrÃ©al Paris introduces Hyaluron Expert Replumping Serum formulated with 1.5% Hyaluronic Acid",
    category: "skincare",
    thumbnail: "/images/16_0.webp",
    images: [
      "/images/16_0.webp"
    ],
    rating: 4.83,
    stock: 110,
    brand: "L'Oreal Paris",
    discountPercentage: 13.31,
    published: true
  },
  {
    id: 17,
    title: "Tree Oil 30ml",
    price: 12,
    description: "Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria,",
    category: "skincare",
    thumbnail: "/images/17_0.webp",
    images: [
      "/images/17_0.webp"
    ],
    rating: 4.52,
    stock: 78,
    brand: "Hemani Tea",
    discountPercentage: 4.09,
    published: true
  },
  {
    id: 18,
    title: "Oil Free Moisturizer 100ml",
    price: 40,
    description: "Dermive Oil Free Moisturizer with SPF 20 is specifically formulated with ceramides, hyaluronic acid & sunscreen.",
    category: "skincare",
    thumbnail: "/images/18_0.webp",
    images: [
      "/images/18_0.webp"
    ],
    rating: 4.56,
    stock: 88,
    brand: "Dermive",
    discountPercentage: 13.1,
    published: true
  },
  {
    id: 19,
    title: "Skin Beauty Serum.",
    price: 46,
    description: "Product name: rorec collagen hyaluronic acid white face serum riceNet weight: 15 m",
    category: "skincare",
    thumbnail: "/images/19_0.webp",
    images: [
      "/images/19_0.webp",
      "/images/19_1.webp"
    ],
    rating: 4.42,
    stock: 54,
    brand: "ROREC White Rice",
    discountPercentage: 10.68,
    published: true
  },
  {
    id: 20,
    title: "Freckle Treatment Cream- 15gm",
    price: 70,
    description: "Fair & Clear is Pakistan's only pure Freckle cream which helpsfade Freckles, Darkspots and pigments.",
    category: "skincare",
    thumbnail: "/images/20_0.webp",
    images: [
      "/images/20_0.webp"
    ],
    rating: 4.06,
    stock: 140,
    brand: "Fair & Clear",
    discountPercentage: 16.99,
    published: true
  },
  {
    id: 21,
    title: "Daal Masoor 500 grams",
    price: 20,
    description: "Fine quality Branded Product Keep in a cool and dry place",
    category: "groceries",
    thumbnail: "/images/21_0.webp",
    images: [
      "/images/21_0.webp"
    ],
    rating: 4.44,
    stock: 133,
    brand: "Saaf & Khaas",
    discountPercentage: 4.81,
    published: true
  },
  {
    id: 22,
    title: "Elbow Macaroni - 400 gm",
    price: 14,
    description: "Product details of Bake Parlor Big Elbow Macaroni - 400 gm",
    category: "groceries",
    thumbnail: "/images/22_0.webp",
    images: [
      "/images/22_0.webp"
    ],
    rating: 4.57,
    stock: 146,
    brand: "Bake Parlor Big",
    discountPercentage: 15.58,
    published: true
  },
  {
    id: 23,
    title: "Orange Essence Food Flavou",
    price: 14,
    description: "Specifications of Orange Essence Food Flavour For Cakes and Baking Food Item",
    category: "groceries",
    thumbnail: "/images/23_0.webp",
    images: [
      "/images/23_0.webp"
    ],
    rating: 4.85,
    stock: 26,
    brand: "Baking Food Items",
    discountPercentage: 8.04,
    published: true
  },
  {
    id: 24,
    title: "cereals muesli fruit nuts",
    price: 46,
    description: "original fauji cereal muesli 250gm box pack original fauji cereals muesli fruit nuts flakes breakfast cereal break fast faujicereals cerels cerel foji fouji",
    category: "groceries",
    thumbnail: "/images/24_0.webp",
    images: [
      "/images/24_0.webp"
    ],
    rating: 4.94,
    stock: 113,
    brand: "fauji",
    discountPercentage: 16.8,
    published: true
  },
  {
    id: 25,
    title: "Gulab Powder 50 Gram",
    price: 70,
    description: "Dry Rose Flower Powder Gulab Powder 50 Gram • Treats Wounds",
    category: "groceries",
    thumbnail: "/images/25_0.webp",
    images: [
      "/images/25_0.webp"
    ],
    rating: 4.87,
    stock: 47,
    brand: "Dry Rose",
    discountPercentage: 13.58,
    published: true
  },
  {
    id: 26,
    title: "Plant Hanger For Home",
    price: 41,
    description: "Boho Decor Plant Hanger For Home Wall Decoration Macrame Wall Hanging Shelf",
    category: "home-decoration",
    thumbnail: "/images/26_0.webp",
    images: [
      "/images/26_0.webp"
    ],
    rating: 4.08,
    stock: 131,
    brand: "Boho Decor",
    discountPercentage: 17.86,
    published: true
  },
  {
    id: 27,
    title: "Flying Wooden Bird",
    price: 51,
    description: "Package Include 6 Birds with Adhesive Tape Shape: 3D Shaped Wooden Birds Material: Wooden MDF, Laminated 3.5mm",
    category: "home-decoration",
    thumbnail: "/images/27_0.webp",
    images: [
      "/images/27_0.webp"
    ],
    rating: 4.41,
    stock: 17,
    brand: "Flying Wooden",
    discountPercentage: 15.58,
    published: true
  },
  {
    id: 28,
    title: "3D Embellishment Art Lamp",
    price: 20,
    description: "3D led lamp sticker Wall sticker 3d wall art light on/off button  cell operated (included)",
    category: "home-decoration",
    thumbnail: "/images/28_0.webp",
    images: [
      "/images/28_0.webp",
      "/images/28_1.webp",
      "/images/28_2.webp",
      "/images/28_3.webp"
    ],
    rating: 4.82,
    stock: 54,
    brand: "LED Lights",
    discountPercentage: 16.49,
    published: true
  },
  {
    id: 29,
    title: "Handcraft Chinese style",
    price: 60,
    description: "Handcraft Chinese style art luxury palace hotel villa mansion home decor ceramic vase with brass fruit plate",
    category: "home-decoration",
    thumbnail: "/images/29_0.webp",
    images: [
      "/images/29_0.webp"
    ],
    rating: 4.44,
    stock: 7,
    brand: "luxury palace",
    discountPercentage: 15.34,
    published: true
  },
  {
    id: 30,
    title: "Key Holder",
    price: 30,
    description: "Attractive DesignMetallic materialFour key hooksReliable & DurablePremium Quality",
    category: "home-decoration",
    thumbnail: "/images/30_0.webp",
    images: [
      "/images/30_0.webp"
    ],
    rating: 4.92,
    stock: 54,
    brand: "Golden",
    discountPercentage: 2.92,
    published: true
  }
];

export const mockCategories = [
  { slug: "smartphones", name: "Smartphones" },
  { slug: "laptops", name: "Laptops" },
  { slug: "fragrances", name: "Fragrances" },
  { slug: "skincare", name: "Skincare" },
  { slug: "groceries", name: "Groceries" },
  { slug: "home-decoration", name: "Home Decoration" },
  { slug: "furniture", name: "Furniture" },
  { slug: "tops", name: "Tops" },
  { slug: "womens-dresses", name: "Women's Dresses" },
  { slug: "womens-shoes", name: "Women's Shoes" },
  { slug: "mens-shirts", name: "Men's Shirts" },
  { slug: "mens-shoes", name: "Men's Shoes" },
  { slug: "mens-watches", name: "Men's Watches" },
  { slug: "womens-watches", name: "Women's Watches" },
  { slug: "womens-bags", name: "Women's Bags" },
  { slug: "womens-jewellery", name: "Women's Jewellery" },
  { slug: "sunglasses", name: "Sunglasses" },
  { slug: "automotive", name: "Automotive" },
  { slug: "motorcycle", name: "Motorcycle" },
  { slug: "lighting", name: "Lighting" }
];