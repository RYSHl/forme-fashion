import { Product } from '../types/product';

export const INITIAL_PRODUCTS: Product[] = [
  // ==========================================
  // T-SHIRTS (8 Products)
  // ==========================================
  {
    id: 'prod-ts-01',
    sku: 'FRM-TSH-001',
    name: 'Heavyweight Boxy Cotton Tee',
    category: 't-shirts',
    subcategory: 'Heavyweight',
    price: 1490,
    originalPrice: 1990,
    description: 'Constructed from a premium 260 GSM combed cotton jersey. Cut in an architectural boxy silhouette with dropped shoulders and a sturdy 1-inch ribbed collar.',
    details: [
      '260 GSM heavyweight single jersey cotton',
      'Dropped shoulder architectural cut',
      'High ribbed crew neckline that retains shape',
      'Pre-shrunk fabric with silicone enzyme wash',
      'Blind hem stitch detailing'
    ],
    composition: '100% Combed Organic Cotton',
    careInstructions: [
      'Machine wash cold (30°C) with similar colors',
      'Do not bleach',
      'Tumble dry low or line dry in shade',
      'Medium heat iron inside out'
    ],
    fit: 'Boxy',
    colors: [
      { name: 'Chalk White', hex: '#F8F8F8' },
      { name: 'Washed Black', hex: '#222222' },
      { name: 'Olive Drab', hex: '#525447' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 24,
    isNew: true,
    isBestseller: true,
    isTrending: true,
    createdAt: '2026-09-15T00:00:00Z',
  },
  {
    id: 'prod-ts-02',
    sku: 'FRM-TSH-002',
    name: 'Relaxed Slub Linen-Blend Tee',
    category: 't-shirts',
    subcategory: 'Linen-Blend',
    price: 1290,
    description: 'An airy, textural tee woven from French linen and breathable cotton slub. Designed for hot climates with natural moisture-wicking and a relaxed drape.',
    details: [
      'Breathable slub textured weave',
      'Slightly scooped crew neck',
      'Fluid relaxed silhouette',
      'Side slit vents at hem for ease of movement'
    ],
    composition: '55% French Linen, 45% Combed Cotton',
    careInstructions: [
      'Gentle machine wash cold',
      'Lay flat to dry to maintain shape',
      'Warm iron if desired'
    ],
    fit: 'Relaxed',
    colors: [
      { name: 'Natural Oatmeal', hex: '#E2DAC8' },
      { name: 'Charcoal', hex: '#333333' },
      { name: 'Sea Salt', hex: '#F0EFEA' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 18,
    isNew: true,
    isBestseller: false,
    createdAt: '2026-10-01T00:00:00Z',
  },
  {
    id: 'prod-ts-03',
    sku: 'FRM-TSH-003',
    name: 'Mercerized Supima Cotton Tee',
    category: 't-shirts',
    subcategory: 'Mercerized',
    price: 1790,
    description: 'Engineered with long-staple Supima cotton treated with a double-mercerization process for subtle luster, silk-like hand feel, and exceptional color vibrancy.',
    details: [
      'Double-mercerized 60/2 Supima yarn',
      'Ultra-fine clean jersey structure',
      'Slim tailored cut ideal under blazers',
      'Twin-needle reinforced seam finishing'
    ],
    composition: '100% Extra-Long Staple Supima Cotton',
    careInstructions: [
      'Delicate wash cold',
      'Do not wring or twist',
      'Steam iron for pristine finish'
    ],
    fit: 'Slim',
    colors: [
      { name: 'Obsidian Black', hex: '#111111' },
      { name: 'Crisp Optical White', hex: '#FFFFFF' },
      { name: 'Deep Navy', hex: '#1A233A' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 30,
    isNew: false,
    isBestseller: true,
    createdAt: '2026-08-10T00:00:00Z',
  },
  {
    id: 'prod-ts-04',
    sku: 'FRM-TSH-004',
    name: 'Vintage Typography Graphic Tee',
    category: 't-shirts',
    subcategory: 'Graphic',
    price: 1590,
    description: 'Understated editorial typography screen-printed in soft water-based ink across an acid-washed heavyweight jersey body.',
    details: [
      'Subtle tonal screenprint: "FORM & SPACE"',
      'Mineral garment-dye wash for subtle highs and lows',
      'Relaxed vintage drape with dropped shoulders',
      'Reinforced shoulder tape'
    ],
    composition: '100% Ring-Spun Cotton (240 GSM)',
    careInstructions: [
      'Wash inside out in cold water',
      'Do not iron directly over print'
    ],
    fit: 'Oversized',
    colors: [
      { name: 'Washed Ash', hex: '#4A4A4A' },
      { name: 'Vintage Ecru', hex: '#ECE8DF' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 12,
    isNew: true,
    isTrending: true,
    createdAt: '2026-10-12T00:00:00Z',
  },
  {
    id: 'prod-ts-05',
    sku: 'FRM-TSH-005',
    name: 'Textured Waffle Short-Sleeve Tee',
    category: 't-shirts',
    subcategory: 'Textured',
    price: 1890,
    originalPrice: 2290,
    description: 'Subtle micro-thermal waffle knit offering three-dimensional depth and year-round breathability. Features clean rib cuffs and hem.',
    details: [
      'Honeycomb thermal knit structure',
      'Relaxed body with bound neckline',
      'Rib-knit cuff detailing'
    ],
    composition: '100% Breathable Cotton',
    careInstructions: ['Machine wash cold, reshape and dry flat'],
    fit: 'Regular',
    colors: [
      { name: 'Desert Sand', hex: '#D2BFA6' },
      { name: 'Slate Gray', hex: '#70747B' },
      { name: 'Ivory', hex: '#F7F5F0' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1618354691438-25bc04584c03?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 15,
    isNew: false,
    isBestseller: false,
    createdAt: '2026-07-20T00:00:00Z',
  },
  {
    id: 'prod-ts-06',
    sku: 'FRM-TSH-006',
    name: 'Minimalist Pocket Detail Tee',
    category: 't-shirts',
    subcategory: 'Basic',
    price: 1390,
    description: 'Clean crewneck featuring a seamless tailored chest patch pocket and bar-tack reinforcements. Cut from medium-weight organic cotton.',
    details: [
      'Single patch pocket with angled corner',
      'Clean 200 GSM organic cotton',
      'Pre-washed for non-shrink durability'
    ],
    composition: '100% Organic Cotton',
    careInstructions: ['Machine wash cold, hang dry'],
    fit: 'Regular',
    colors: [
      { name: 'Sage Green', hex: '#7B897D' },
      { name: 'Pure Black', hex: '#000000' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 22,
    isNew: false,
    isBestseller: true,
    createdAt: '2026-08-05T00:00:00Z',
  },
  {
    id: 'prod-ts-07',
    sku: 'FRM-TSH-007',
    name: 'Oversized Raw-Edge Street Tee',
    category: 't-shirts',
    subcategory: 'Oversized',
    price: 1690,
    description: 'Extravagant streetwear proportions with an open raw-edge hem, exaggerated dropped sleeves, and deep boxy chest measurement.',
    details: [
      'Generously oversized drape',
      'Laser-cut raw hem with anti-unravel stay stitch',
      'Thick 280 GSM dry cotton jersey'
    ],
    composition: '100% Dry Hand Cotton',
    careInstructions: ['Cold wash gentle, line dry in shade'],
    fit: 'Oversized',
    colors: [
      { name: 'Muted Taupe', hex: '#8C8275' },
      { name: 'Chalk White', hex: '#FAF9F6' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 9,
    isNew: true,
    isTrending: true,
    createdAt: '2026-10-18T00:00:00Z',
  },
  {
    id: 'prod-ts-08',
    sku: 'FRM-TSH-008',
    name: 'Essential Ribbed Mock-Neck Tee',
    category: 't-shirts',
    subcategory: 'Mock-Neck',
    price: 1790,
    originalPrice: 2190,
    description: 'A contemporary modern silhouette featuring a 1.5-inch raised mock collar and seamless tubular knit construction.',
    details: [
      'Subtle mock neck standing collar',
      'Fine ribbed micro-modal and cotton blend',
      'Elegant drape that sits flat under jackets'
    ],
    composition: '60% Cotton, 35% Micro-Modal, 5% Elastane',
    careInstructions: ['Machine wash cold, iron low'],
    fit: 'Slim',
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'Cream', hex: '#F4EFE6' },
      { name: 'Espresso', hex: '#3B2F2F' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 14,
    isNew: false,
    isBestseller: false,
    createdAt: '2026-06-12T00:00:00Z',
  },

  // ==========================================
  // SHIRTS (8 Products)
  // ==========================================
  {
    id: 'prod-sh-01',
    sku: 'FRM-SHR-001',
    name: 'Pure European Linen Relaxed Shirt',
    category: 'shirts',
    subcategory: 'Linen',
    price: 2990,
    originalPrice: 3490,
    description: 'Woven from 100% certified Normandy flax. Tailored with a relaxed camp collar, mother-of-pearl buttons, and a straight hem with split side seams.',
    details: [
      '100% Normandy flax linen (175 GSM)',
      'Pre-washed with enzymes for instant broken-in softness',
      'Natural trocas mother-of-pearl buttons',
      'Relaxed straight hem designed to be worn untucked'
    ],
    composition: '100% European Linen',
    careInstructions: [
      'Machine wash cold gentle cycle',
      'Line dry in shade to maintain natural linen texture',
      'Embrace natural rumpling or steam press lightly'
    ],
    fit: 'Relaxed',
    colors: [
      { name: 'Bleached Sand', hex: '#EBE6DC' },
      { name: 'Sky Azure', hex: '#CADAE5' },
      { name: 'Olive Green', hex: '#585C4F' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 20,
    isNew: true,
    isBestseller: true,
    isTrending: true,
    createdAt: '2026-09-20T00:00:00Z',
  },
  {
    id: 'prod-sh-02',
    sku: 'FRM-SHR-002',
    name: 'Structured Poplin Minimalist Shirt',
    category: 'shirts',
    subcategory: 'Formal',
    price: 2490,
    description: 'High-density crisp poplin with a concealed button placket and razor-sharp modern spread collar. Perfect for formal and minimalist tailoring.',
    details: [
      '120s two-ply compact Egyptian cotton poplin',
      'Concealed placket with hidden matte buttons',
      'Removable collar stays included',
      'Clean back yoke without pleats for a minimalist profile'
    ],
    composition: '100% Compact Cotton Poplin',
    careInstructions: [
      'Machine wash 40°C',
      'Warm iron with spray mist for a crisp finish'
    ],
    fit: 'Slim',
    colors: [
      { name: 'Crisp White', hex: '#FFFFFF' },
      { name: 'Midnight Charcoal', hex: '#262626' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1620012253295-c15c429f66bf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 28,
    isNew: false,
    isBestseller: true,
    createdAt: '2026-08-14T00:00:00Z',
  },
  {
    id: 'prod-sh-03',
    sku: 'FRM-SHR-003',
    name: 'Resort Camp-Collar Striped Shirt',
    category: 'shirts',
    subcategory: 'Casual',
    price: 2290,
    description: 'Evoking 1950s Riviera charm with an open Cuban camp collar, tonal vertical awning stripes, and a lightweight viscose-cotton weave.',
    details: [
      'Silky viscose and cotton blend',
      'Cuban convertible collar',
      'Chest patch pocket with pattern matching',
      'Straight cut with side slits'
    ],
    composition: '65% Rayon Viscose, 35% Cotton',
    careInstructions: ['Dry clean or cold hand wash, dry flat'],
    fit: 'Relaxed',
    colors: [
      { name: 'Navy & Ecru Stripe', hex: '#242F40' },
      { name: 'Terracotta Stripe', hex: '#9E5B44' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 16,
    isNew: true,
    isBestseller: false,
    createdAt: '2026-10-05T00:00:00Z',
  },
  {
    id: 'prod-sh-04',
    sku: 'FRM-SHR-004',
    name: 'Japanese Denim Overshirt',
    category: 'shirts',
    subcategory: 'Overshirt',
    price: 3990,
    originalPrice: 4590,
    description: 'Cut from 10.5 oz Kurabo Japanese denim in a medium vintage wash. Built with dual chest patch pockets and heavy copper-finish snap buttons.',
    details: [
      '10.5 oz authentic Japanese twill denim',
      'Heavy-duty metal snap button front',
      'Twin flap utility pockets with hidden pencil slot',
      'Triple-needle chain stitch construction'
    ],
    composition: '100% Kurabo Cotton Denim',
    careInstructions: ['Wash inside out with cold water, hang to dry'],
    fit: 'Oversized',
    colors: [
      { name: 'Mid Vintage Indigo', hex: '#3B597B' },
      { name: 'Washed Black Denim', hex: '#2C2D30' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 10,
    isNew: false,
    isBestseller: true,
    isTrending: true,
    createdAt: '2026-07-28T00:00:00Z',
  },
  {
    id: 'prod-sh-05',
    sku: 'FRM-SHR-005',
    name: 'Heavyweight Flannel Plaid Shirt',
    category: 'shirts',
    subcategory: 'Casual',
    price: 2790,
    description: 'Double-brushed cotton flannel in a muted earth-toned check pattern. Ultra-cozy weight designed for cool evenings and layering.',
    details: [
      'Double-sided brushed cotton for supreme warmth',
      'Custom muted check layout',
      'Curved hemline with reinforced gussets'
    ],
    composition: '100% Brushed Cotton Flannel (220 GSM)',
    careInstructions: ['Machine wash cold, tumble dry low'],
    fit: 'Regular',
    colors: [
      { name: 'Charcoal & Ochre', hex: '#4B493F' },
      { name: 'Forest Green Plaid', hex: '#2D3A2F' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 14,
    isNew: true,
    isBestseller: false,
    createdAt: '2026-10-15T00:00:00Z',
  },
  {
    id: 'prod-sh-06',
    sku: 'FRM-SHR-006',
    name: 'Mandarin Collar Relaxed Shirt',
    category: 'shirts',
    subcategory: 'Linen',
    price: 2690,
    description: 'Clean collarless grandad neck shirt cut in breathable linen blend. The absence of a fold-over collar gives it a modern sculptural feel.',
    details: [
      '1-inch band standing Mandarin collar',
      'Clean French seam finishing throughout',
      'Mother of pearl buttons',
      'Pleated cuffs with double button adjusters'
    ],
    composition: '70% Linen, 30% Cotton',
    careInstructions: ['Gentle cycle, line dry'],
    fit: 'Relaxed',
    colors: [
      { name: 'Off-White', hex: '#F9F8F5' },
      { name: 'Earthy Clay', hex: '#946654' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 19,
    isNew: false,
    isBestseller: true,
    createdAt: '2026-08-30T00:00:00Z',
  },
  {
    id: 'prod-sh-07',
    sku: 'FRM-SHR-007',
    name: 'Architectural Boxy Short-Sleeve Shirt',
    category: 'shirts',
    subcategory: 'Casual',
    price: 2390,
    description: 'Wide, squared-off silhouette with dramatic wide sleeves and clean minimal notch lapels. Ideal for warm weather styling over a tank top.',
    details: [
      'Crisp high-twist cotton poplin',
      'Wide elbow-length sleeve profile',
      'Square patch pocket',
      'Straight hemline'
    ],
    composition: '100% High-Twist Cotton',
    careInstructions: ['Machine wash 30°C, hang dry'],
    fit: 'Oversized',
    colors: [
      { name: 'Chalk White', hex: '#FAF9F8' },
      { name: 'Muted Moss', hex: '#636958' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 22,
    isNew: true,
    isBestseller: false,
    createdAt: '2026-10-10T00:00:00Z',
  },
  {
    id: 'prod-sh-08',
    sku: 'FRM-SHR-008',
    name: 'Fine Twill Minimalist Utility Shirt',
    category: 'shirts',
    subcategory: 'Overshirt',
    price: 3190,
    description: 'Subtle military utility undertones reimagined through a minimalist Scandinavian lens. Features gusseted bellows chest pockets.',
    details: [
      'Fine micro-twill weave with mechanical stretch',
      'Internal pen holder in left chest pocket',
      'Durable corozo nut buttons',
      'Tonal stitching'
    ],
    composition: '98% Cotton, 2% Elastane',
    careInstructions: ['Machine wash warm, iron medium'],
    fit: 'Regular',
    colors: [
      { name: 'Deep Olive', hex: '#484E42' },
      { name: 'Black', hex: '#111111' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1620012253295-c15c429f66bf?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 17,
    isNew: false,
    isBestseller: false,
    createdAt: '2026-06-25T00:00:00Z',
  },

  // ==========================================
  // PANTS (8 Products)
  // ==========================================
  {
    id: 'prod-pa-01',
    sku: 'FRM-PNT-001',
    name: 'Straight Pleated Tailored Trousers',
    category: 'pants',
    subcategory: 'Trousers',
    price: 3990,
    originalPrice: 4690,
    description: 'High-waisted tailored trousers featuring deep single front pleats, an extended tab waistband, and a fluid straight-leg silhouette that drapes gracefully over footwear.',
    details: [
      'Wool-blend twill with natural stretch and wrinkle resistance',
      'Single forward pleats for architectural drape',
      'Hidden tab closure with internal anchor button',
      'Blind hem with 2 inches of let-out allowance',
      'Angled side slash pockets and rear welt pockets'
    ],
    composition: '54% Wool, 44% Recycled Polyester, 2% Elastane',
    careInstructions: [
      'Dry clean recommended',
      'Can be pressed with steam iron using pressing cloth'
    ],
    fit: 'Straight',
    colors: [
      { name: 'Charcoal Melange', hex: '#3B3B3B' },
      { name: 'Warm Taupe', hex: '#877B6F' },
      { name: 'Midnight Black', hex: '#141414' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 18,
    isNew: true,
    isBestseller: true,
    isTrending: true,
    createdAt: '2026-09-18T00:00:00Z',
  },
  {
    id: 'prod-pa-02',
    sku: 'FRM-PNT-002',
    name: 'Relaxed Wide-Leg Cotton Chinos',
    category: 'pants',
    subcategory: 'Chinos',
    price: 2990,
    description: 'Crafted from a 320 GSM washed cotton twill. Generously proportioned through the thigh with a wide, straight leg opening and subtle coin pocket.',
    details: [
      'Heavy-duty washed cotton twill',
      'Mid-to-high rise with wide belt loops',
      'YKK brass zipper fly with genuine horn button',
      'Deep front pockets and buttoned back patch pockets'
    ],
    composition: '100% Combed Cotton Twill',
    careInstructions: ['Machine wash cold, tumble dry low'],
    fit: 'Wide-Leg',
    colors: [
      { name: 'Stone Khaki', hex: '#C2B8A3' },
      { name: 'Faded Black', hex: '#2A2A2A' },
      { name: 'Olive Army', hex: '#4B5320' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 25,
    isNew: true,
    isBestseller: true,
    createdAt: '2026-10-02T00:00:00Z',
  },
  {
    id: 'prod-pa-03',
    sku: 'FRM-PNT-003',
    name: 'Minimalist Utilitarian Cargo Pants',
    category: 'pants',
    subcategory: 'Cargo',
    price: 3490,
    description: 'Modernized cargo pants with streamlined flat-laying side bellows pockets, darted knee articulation, and an adjustable toggle hem cord.',
    details: [
      'Ripstop cotton-nylon weather resistant blend',
      'Flat concealed snap-flap cargo pockets',
      'Articulated knee darts for unrestricted movement',
      'Concealed elastic shock cord ankle adjusters'
    ],
    composition: '75% Cotton, 25% High-Tenacity Nylon',
    careInstructions: ['Machine wash 30°C, hang to dry'],
    fit: 'Relaxed',
    colors: [
      { name: 'Dark Moss', hex: '#3E4438' },
      { name: 'Asphalt Black', hex: '#1C1C1E' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 14,
    isNew: false,
    isBestseller: true,
    isTrending: true,
    createdAt: '2026-08-22T00:00:00Z',
  },
  {
    id: 'prod-pa-04',
    sku: 'FRM-PNT-004',
    name: 'Selvedge Raw Straight Denim Jeans',
    category: 'pants',
    subcategory: 'Jeans',
    price: 4290,
    originalPrice: 4990,
    description: '13.5 oz unwashed Japanese raw selvedge denim woven on vintage shuttle looms with a classic red-line ticker. Develops unique personalized fades over time.',
    details: [
      '13.5 oz Japanese red-line selvedge denim',
      'Classic straight leg cut inspired by 1960s denim',
      'Button fly with custom branded copper donut buttons',
      'Chain-stitched hem and hidden back pocket rivets'
    ],
    composition: '100% Cotton Raw Selvedge Denim',
    careInstructions: [
      'Wear frequently for 6 months before first soak',
      'Cold water hand soak inside out, hang dry only'
    ],
    fit: 'Straight',
    colors: [
      { name: 'Raw Deep Indigo', hex: '#1A2436' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 12,
    isNew: false,
    isBestseller: true,
    createdAt: '2026-07-15T00:00:00Z',
  },
  {
    id: 'prod-pa-05',
    sku: 'FRM-PNT-005',
    name: 'Drawstring Linen-Blend Easy Trousers',
    category: 'pants',
    subcategory: 'Linen',
    price: 2790,
    description: 'Effortless warm-weather trousers featuring an elasticated waistband with internal woven drawstring, faux fly, and a relaxed tapered leg.',
    details: [
      'Linen and cotton blended for structure with coolness',
      'Fully elasticated waistband with herringbone pull cord',
      'Roomy hip with gentle taper toward ankle',
      'Single buttoned rear welt pocket'
    ],
    composition: '60% Linen, 40% Cotton',
    careInstructions: ['Machine wash cold, line dry'],
    fit: 'Relaxed',
    colors: [
      { name: 'Oatmeal Natural', hex: '#DDD6C6' },
      { name: 'Navy Blue', hex: '#1F2A38' },
      { name: 'Olive', hex: '#53564A' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 22,
    isNew: true,
    isBestseller: false,
    createdAt: '2026-10-08T00:00:00Z',
  },
  {
    id: 'prod-pa-06',
    sku: 'FRM-PNT-006',
    name: 'Cropped Tailored Pleat Trousers',
    category: 'pants',
    subcategory: 'Trousers',
    price: 3290,
    description: 'Ankle-grazing length trousers tailored with double reverse pleats and an athletic slim-tapered silhouette. Perfect for showcasing leather loafers and derbies.',
    details: [
      'Pre-cuffed 1.5-inch turned up hems',
      'Double reverse pleats',
      'Slanted side pockets and coin jet pocket'
    ],
    composition: '65% Viscose, 30% Polyester, 5% Spandex',
    careInstructions: ['Dry clean or delicate cycle cold'],
    fit: 'Slim',
    colors: [
      { name: 'Charcoal Grey', hex: '#444444' },
      { name: 'Jet Black', hex: '#0B0B0B' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 15,
    isNew: false,
    isBestseller: false,
    createdAt: '2026-08-01T00:00:00Z',
  },
  {
    id: 'prod-pa-07',
    sku: 'FRM-PNT-007',
    name: 'Heavy Cotton Canvas Carpenter Pants',
    category: 'pants',
    subcategory: 'Cargo',
    price: 3690,
    originalPrice: 4290,
    description: 'Workwear DNA re-engineered. Features reinforced double knee panels, utility tool loops, and durable triple-stitched felled seams.',
    details: [
      '380 GSM heavy duck cotton canvas',
      'Double layer knee panel reinforcements',
      'Functional hammer loop and side utility tool pocket'
    ],
    composition: '100% Heavy Duck Cotton Canvas',
    careInstructions: ['Wash cold with detergent, hang dry'],
    fit: 'Straight',
    colors: [
      { name: 'Tobacco Brown', hex: '#7E5B3C' },
      { name: 'Off-White Canvas', hex: '#ECE7DC' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 11,
    isNew: true,
    isBestseller: false,
    createdAt: '2026-10-14T00:00:00Z',
  },
  {
    id: 'prod-pa-08',
    sku: 'FRM-PNT-008',
    name: 'Relaxed Heavy French Terry Sweatpants',
    category: 'pants',
    subcategory: 'Lounge',
    price: 2490,
    description: 'Heavyweight loopback fleece loungewear designed with clean seam lines, elasticated cuffed hems, and no outer branding for a sleek off-duty aesthetic.',
    details: [
      '400 GSM brushed loopback French Terry',
      'Encased elastic waistband with braided cotton drawstrings',
      'Deep vertical side pockets and single rear patch pocket'
    ],
    composition: '100% Combed Cotton Terry',
    careInstructions: ['Machine wash 30°C, tumble dry low'],
    fit: 'Relaxed',
    colors: [
      { name: 'Heather Grey', hex: '#B8B8B8' },
      { name: 'Washed Black', hex: '#232323' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 31,
    isNew: false,
    isBestseller: true,
    createdAt: '2026-09-01T00:00:00Z',
  },

  // ==========================================
  // HOODIES (8 Products)
  // ==========================================
  {
    id: 'prod-hd-01',
    sku: 'FRM-HOD-001',
    name: '450 GSM Heavyweight Boxy Hoodie',
    category: 'hoodies',
    subcategory: 'Heavyweight',
    price: 3990,
    originalPrice: 4990,
    description: 'Our signature flagship hoodie. Knit from ultra-dense 450 GSM French Terry with double-layered hood construction, seamless kangaroo pocket, and no drawstrings for a stark minimalist look.',
    details: [
      '450 GSM ultra-dense loopback French Terry',
      'Substantial double-layered self-fabric hood that stands upright',
      'Minimalist seamless kangaroo pocket design',
      'Heavy 2x2 ribbing at hem and cuffs with spandex recovery',
      'Garment dyed and pre-shrunk'
    ],
    composition: '100% Organic Heavyweight Cotton',
    careInstructions: [
      'Machine wash cold inside out with like colors',
      'Do not tumble dry — dry flat in shade',
      'Cool iron if necessary'
    ],
    fit: 'Boxy',
    colors: [
      { name: 'Vintage Washed Black', hex: '#262626' },
      { name: 'Chalk Oatmeal', hex: '#EBE5D8' },
      { name: 'Earthy Clay', hex: '#875F4B' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 22,
    isNew: true,
    isBestseller: true,
    isTrending: true,
    createdAt: '2026-09-25T00:00:00Z',
  },
  {
    id: 'prod-hd-02',
    sku: 'FRM-HOD-002',
    name: 'Relaxed Full-Zip French Terry Hoodie',
    category: 'hoodies',
    subcategory: 'Zip-Up',
    price: 3790,
    description: 'Versatile layering piece with a premium dual-way Excella metal zipper, dropped shoulders, and subtle split kangaroo front pockets.',
    details: [
      '380 GSM combed cotton loopback fleece',
      'Two-way matte silver metal front zipper',
      'Deep jersey-lined hood with minimal tonal cord',
      'Reinforced elbow articulation'
    ],
    composition: '100% Combed Cotton',
    careInstructions: ['Wash with zipper closed, cold water, line dry'],
    fit: 'Relaxed',
    colors: [
      { name: 'Charcoal Melange', hex: '#404040' },
      { name: 'Natural Sand', hex: '#D8CFBC' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 17,
    isNew: false,
    isBestseller: true,
    createdAt: '2026-08-19T00:00:00Z',
  },
  {
    id: 'prod-hd-03',
    sku: 'FRM-HOD-003',
    name: 'Half-Zip Stand Collar Sweatshirt',
    category: 'hoodies',
    subcategory: 'Sweatshirt',
    price: 3290,
    description: 'Sporty retro-editorial silhouette featuring a substantial 3-inch ribbed funnel neck, heavy antique silver quarter-zip, and clean side seam welt pockets.',
    details: [
      'Brushed fleece interior with velvet hand feel',
      'High funnel collar for neck coverage',
      'YKK metal half zipper with custom rectangular pull',
      'Concealed side seam pockets instead of front kangaroo pouch'
    ],
    composition: '85% Cotton, 15% Recycled Polyester (360 GSM)',
    careInstructions: ['Machine wash cold, lay flat to dry'],
    fit: 'Regular',
    colors: [
      { name: 'Forest Green', hex: '#263B2B' },
      { name: 'Deep Navy', hex: '#1C2538' },
      { name: 'Bone White', hex: '#F2EDE4' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1614975058789-41316d0e2e98?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 19,
    isNew: true,
    isBestseller: false,
    createdAt: '2026-10-10T00:00:00Z',
  },
  {
    id: 'prod-hd-04',
    sku: 'FRM-HOD-004',
    name: 'Clean Crewneck Raglan Sweatshirt',
    category: 'hoodies',
    subcategory: 'Sweatshirt',
    price: 2790,
    description: 'A timeless athletic staple elevated with raglan sleeve ergonomics, triangular V-insert stitch at the neck, and 350 GSM loopback cotton.',
    details: [
      'Diagonal raglan sleeve construction',
      'Ribbed V-notch insert at front neck',
      'Flatlock anti-chafing seams',
      'Wide ribbed hem band'
    ],
    composition: '100% Ring-Spun Cotton',
    careInstructions: ['Machine wash 30°C, tumble dry low'],
    fit: 'Regular',
    colors: [
      { name: 'Athletic Grey', hex: '#CCCCCC' },
      { name: 'Pitch Black', hex: '#111111' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 26,
    isNew: false,
    isBestseller: true,
    createdAt: '2026-07-12T00:00:00Z',
  },
  {
    id: 'prod-hd-05',
    sku: 'FRM-HOD-005',
    name: 'Washed Vintage Oversized Pullover',
    category: 'hoodies',
    subcategory: 'Oversized',
    price: 3490,
    originalPrice: 4190,
    description: 'Underwent an artisanal enzyme sun-fade wash to give subtle color highlights along seams and edges. Extra roomy draped fit.',
    details: [
      'Enzyme pigment washed for authentic aged patina',
      'Exaggerated drop shoulder fit',
      'Double stitch reinforced cuffs and hem',
      'Super-soft brushed interior'
    ],
    composition: '100% Combed Heavy Cotton (420 GSM)',
    careInstructions: ['Wash cold separately first few washes, hang dry'],
    fit: 'Oversized',
    colors: [
      { name: 'Faded Espresso', hex: '#4A3B32' },
      { name: 'Mineral Slate', hex: '#586069' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 14,
    isNew: true,
    isTrending: true,
    createdAt: '2026-10-16T00:00:00Z',
  },
  {
    id: 'prod-hd-06',
    sku: 'FRM-HOD-006',
    name: 'Essential Brushed Fleece Hoodie',
    category: 'hoodies',
    subcategory: 'Basic',
    price: 2990,
    description: 'Everyday comfort engineered with plush brushed fleece and clean minimalist flat drawstrings with rubberized dipped tips.',
    details: [
      'Plush cloud-soft brushed interior',
      'Flat tonal woven drawstrings with matte dipped aglets',
      'Generous front kangaroo pocket with bartack corners'
    ],
    composition: '80% Organic Cotton, 20% Polyester',
    careInstructions: ['Machine wash warm, tumble dry low'],
    fit: 'Regular',
    colors: [
      { name: 'Ecru Off-White', hex: '#EDE8DF' },
      { name: 'Graphite', hex: '#333333' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 35,
    isNew: false,
    isBestseller: true,
    createdAt: '2026-09-01T00:00:00Z',
  },
  {
    id: 'prod-hd-07',
    sku: 'FRM-HOD-007',
    name: 'Heavy Knit Thermal Textured Hoodie',
    category: 'hoodies',
    subcategory: 'Textured',
    price: 3690,
    description: 'A hybrid between a knit sweater and a hoodie. Features an intricate chunky waffle knit structure with excellent thermal retention.',
    details: [
      'Chunky waffle knit construction',
      'Unstructured drape that moves naturally',
      'Ribbed contour hood opening'
    ],
    composition: '100% Breathable Cotton Yarn',
    careInstructions: ['Hand wash or delicate cycle, dry flat on towel'],
    fit: 'Relaxed',
    colors: [
      { name: 'Oatmeal Heather', hex: '#D6CEBE' },
      { name: 'Dark Olive', hex: '#3E4237' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1614975058789-41316d0e2e98?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 11,
    isNew: true,
    isBestseller: false,
    createdAt: '2026-10-04T00:00:00Z',
  },
  {
    id: 'prod-hd-08',
    sku: 'FRM-HOD-008',
    name: 'Raw Hem Minimalist Boxy Crewneck',
    category: 'hoodies',
    subcategory: 'Sweatshirt',
    price: 2890,
    originalPrice: 3390,
    description: 'Sculptural boxy crewneck sweatshirt featuring a clean cut raw hemline and wide ribbed neckline. Unlined French Terry for warm layering.',
    details: [
      '340 GSM unbrushed loopback cotton',
      'Laser-cut raw lower hem with stay stitch',
      'Dropped shoulder seam line',
      'Clean wide ribbed cuffs'
    ],
    composition: '100% French Terry Cotton',
    careInstructions: ['Wash gentle cold, line dry'],
    fit: 'Boxy',
    colors: [
      { name: 'Dust Taupe', hex: '#8F8479' },
      { name: 'Pure White', hex: '#FFFFFF' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 20,
    isNew: false,
    isBestseller: false,
    createdAt: '2026-08-08T00:00:00Z',
  },
];
