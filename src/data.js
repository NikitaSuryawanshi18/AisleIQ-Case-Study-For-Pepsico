export const TIERS = {
  CLASSIC: 'Classic',
  BETTER: 'Better-For-You',
  FUNCTIONAL: 'Functional',
};

export const TIER_DEFINITIONS = [
  {
    tier: 'Classic',
    color: 'var(--classic)',
    bg: 'var(--classic-bg)',
    definition: 'Traditional indulgent snacks with no specific health positioning. Examples: Doritos Nacho Cheese, Cheetos Crunchy, Lay\'s Classic. These SKUs drive the majority of PepsiCo\'s current revenue but are facing structural volume decline as consumers shift toward healthier options.',
  },
  {
    tier: 'Better-For-You',
    color: 'var(--invest)',
    bg: 'var(--invest-bg)',
    definition: 'Snacks that are healthier than classic alternatives but without a specific functional health claim. Think cleaner ingredients, less sodium, whole grain, or baked instead of fried. Examples: SunChips Harvest Cheddar, PopCorners, Stacy\'s Pita Chips, Simply Doritos. Growing fast as consumers seek permissible indulgence.',
  },
  {
    tier: 'Functional',
    color: 'var(--functional)',
    bg: 'var(--functional-bg)',
    definition: 'Purpose-built snacks targeting a specific health benefit such as high protein, high fiber, or gut health support. Examples: Doritos Protein (10g protein), SunChips Fiber (6g fiber), Quaker Protein Granola Bars, Siete Grain-Free Chips, Bare Apple Chips. Fastest-growing tier and highest margin potential.',
  },
];

export const FORMATS = ['Single-Serve', 'Family-Size', 'Bulk', 'Bundle'];

export const PROFILE_DIMS = {
  budget: { label: 'Budget Sensitivity', options: ['Low', 'Medium', 'High'] },
  health: { label: 'Health Consciousness', options: ['Low', 'Medium', 'High'] },
  functional: { label: 'Functional Need', options: ['None', 'Protein', 'Fiber', 'Clean Label', 'Low Sodium'] },
  format: { label: 'Purchase Format', options: ['Single-Serve', 'Family-Size', 'Bulk', 'Bundle'] },
};

export const PACK_ACTIONS = {
  EXPAND: { label: 'Expand Formats', color: 'var(--invest)', bg: 'var(--invest-bg)', desc: 'This SKU is available in too few formats for its consumer base. Adding formats would unlock new purchase occasions.' },
  REPRICE: { label: 'Reprice', color: 'var(--watch)', bg: 'var(--watch-bg)', desc: 'Current price-per-oz is misaligned with the target consumer\'s willingness to pay. A price adjustment would improve conversion.' },
  REPOSITION: { label: 'Reposition Format', color: 'var(--functional)', bg: 'var(--functional-bg)', desc: 'The best-fit format for this SKU\'s core consumer is underweighted. Distribution and marketing should shift toward the recommended format.' },
  MAINTAIN: { label: 'Maintain', color: 'var(--text-2)', bg: 'var(--surface2)', desc: 'Pack format and price architecture are well matched to the target consumer. No immediate action needed.' },
};

const RAW_SKUS = [
  // CLASSIC
  {
    id: 'C01', name: 'Doritos Nacho Cheese', brand: 'Doritos', tier: TIERS.CLASSIC,
    healthScore: 22, proteinG: 2, fiberG: 1, sodium: 210, artificial: true, cleanLabel: false,
    demandTrend: 'declining', consumerShiftRisk: 'high',
    formats: ['Single-Serve', 'Family-Size', 'Bulk'],
    bestFormats: ['Single-Serve'],
    currentPricePerOz: { 'Single-Serve': 0.89, 'Family-Size': 0.35, 'Bulk': 0.28 },
    recommendedPricePerOz: { 'Single-Serve': 0.89, 'Family-Size': 0.30, 'Bulk': 0.24 },
    packAction: 'REPOSITION',
    packActionNote: 'Single-serve is the only defensible format as consumers shift away from bulk indulgent snacking. Reduce family and bulk distribution investment and protect single-serve impulse presence.',
    budgetFit: ['Low', 'Medium', 'High'], healthFit: ['Low'], functionalFit: ['None'],
    quarterlyRevenue: [42.0, 41.2, 40.1, 38.9, 37.5, 36.2],
    insight: 'Doritos Nacho Cheese remains the highest-volume classic SKU but faces structural headwinds. Five consecutive quarters of volume decline reflect the broader consumer shift away from indulgent snacking. Single-serve format is the most defensible — impulse occasions remain strong. Recommend protecting single-serve while actively developing Doritos Protein to retain brand equity in a health-conscious context.',
  },
  {
    id: 'C02', name: 'Cheetos Crunchy', brand: 'Cheetos', tier: TIERS.CLASSIC,
    healthScore: 18, proteinG: 2, fiberG: 0, sodium: 250, artificial: true, cleanLabel: false,
    demandTrend: 'declining', consumerShiftRisk: 'high',
    formats: ['Single-Serve', 'Family-Size', 'Bulk'],
    bestFormats: ['Single-Serve'],
    currentPricePerOz: { 'Single-Serve': 0.92, 'Family-Size': 0.33, 'Bulk': 0.26 },
    recommendedPricePerOz: { 'Single-Serve': 0.85, 'Family-Size': 0.28, 'Bulk': 0.22 },
    packAction: 'REPRICE',
    packActionNote: 'Family and bulk formats are overpriced relative to declining consumer demand. A price reduction in larger formats may slow volume erosion while single-serve pricing holds.',
    budgetFit: ['Low', 'Medium', 'High'], healthFit: ['Low'], functionalFit: ['None'],
    quarterlyRevenue: [31.0, 30.2, 29.1, 28.0, 26.8, 25.5],
    insight: 'Cheetos Crunchy is losing relevance fastest among consumers under 35. The brand\'s playful identity gives some resilience in impulse formats but family and bulk formats are seeing the sharpest declines. Recommend aggressive single-serve focus and investment in Cheetos Simply to retain brand loyalists shifting toward better-for-you options.',
  },
  {
    id: 'C03', name: "Lay's Classic", brand: "Lay's", tier: TIERS.CLASSIC,
    healthScore: 28, proteinG: 2, fiberG: 1, sodium: 180, artificial: false, cleanLabel: true,
    demandTrend: 'stable', consumerShiftRisk: 'medium',
    formats: ['Single-Serve', 'Family-Size', 'Bulk', 'Bundle'],
    bestFormats: ['Family-Size', 'Bundle'],
    currentPricePerOz: { 'Single-Serve': 0.85, 'Family-Size': 0.32, 'Bulk': 0.25, 'Bundle': 0.29 },
    recommendedPricePerOz: { 'Single-Serve': 0.85, 'Family-Size': 0.32, 'Bulk': 0.25, 'Bundle': 0.29 },
    packAction: 'MAINTAIN',
    packActionNote: "Lay's Classic has the cleanest label in the classic tier and a well-balanced format mix. Bundle on e-commerce is showing the strongest growth signal. No price changes needed.",
    budgetFit: ['Low', 'Medium', 'High'], healthFit: ['Low', 'Medium'], functionalFit: ['None', 'Clean Label'],
    quarterlyRevenue: [38.0, 38.2, 37.9, 38.1, 37.8, 38.0],
    insight: "Lay's Classic is the most resilient classic SKU — clean ingredient label gives it a defensible position even among moderately health-conscious consumers. Bundle format on e-commerce is growing. Recommend maintaining investment and leaning into the clean label positioning more aggressively.",
  },
  {
    id: 'C04', name: 'Fritos Original', brand: 'Fritos', tier: TIERS.CLASSIC,
    healthScore: 20, proteinG: 2, fiberG: 1, sodium: 170, artificial: false, cleanLabel: true,
    demandTrend: 'declining', consumerShiftRisk: 'high',
    formats: ['Single-Serve', 'Family-Size'],
    bestFormats: ['Single-Serve'],
    currentPricePerOz: { 'Single-Serve': 0.88, 'Family-Size': 0.34 },
    recommendedPricePerOz: { 'Single-Serve': 0.80, 'Family-Size': 0.28 },
    packAction: 'REPRICE',
    packActionNote: 'Declining volumes with limited format options. Price reduction across both formats may slow erosion. Single-serve is the priority format — consider discontinuing family size to reduce complexity.',
    budgetFit: ['Low', 'Medium'], healthFit: ['Low'], functionalFit: ['None'],
    quarterlyRevenue: [14.0, 13.5, 13.0, 12.4, 11.8, 11.2],
    insight: 'Fritos Original has a clean three-ingredient label but lacks brand muscle to compete in a crowded classic segment. Declining volumes with no clear growth lever. Recommend limiting SKU investment and monitoring for divestment candidacy in the next planning cycle.',
  },
  {
    id: 'C05', name: 'Ruffles Original', brand: 'Ruffles', tier: TIERS.CLASSIC,
    healthScore: 24, proteinG: 2, fiberG: 1, sodium: 160, artificial: false, cleanLabel: true,
    demandTrend: 'stable', consumerShiftRisk: 'medium',
    formats: ['Single-Serve', 'Family-Size', 'Bulk'],
    bestFormats: ['Family-Size'],
    currentPricePerOz: { 'Single-Serve': 0.86, 'Family-Size': 0.33, 'Bulk': 0.26 },
    recommendedPricePerOz: { 'Single-Serve': 0.86, 'Family-Size': 0.33, 'Bulk': 0.26 },
    packAction: 'MAINTAIN',
    packActionNote: 'Ruffles holds steady in family sharing occasions. Clean label and strong brand recognition support current format and pricing. No immediate changes needed.',
    budgetFit: ['Low', 'Medium', 'High'], healthFit: ['Low', 'Medium'], functionalFit: ['None', 'Clean Label'],
    quarterlyRevenue: [18.0, 17.9, 18.1, 17.8, 18.0, 17.9],
    insight: 'Ruffles holds steady in family sharing, benefiting from clean label and strong brand recognition. The family-size format is its strongest performer. Maintain at current investment levels while exploring a Ruffles Simply variant.',
  },

  // BETTER-FOR-YOU
  {
    id: 'B01', name: 'Simply Doritos', brand: 'Doritos', tier: TIERS.BETTER,
    healthScore: 58, proteinG: 3, fiberG: 2, sodium: 130, artificial: false, cleanLabel: true,
    demandTrend: 'growing', consumerShiftRisk: 'low',
    formats: ['Single-Serve', 'Family-Size'],
    bestFormats: ['Single-Serve', 'Family-Size'],
    currentPricePerOz: { 'Single-Serve': 1.10, 'Family-Size': 0.52 },
    recommendedPricePerOz: { 'Single-Serve': 1.10, 'Family-Size': 0.52 },
    packAction: 'EXPAND',
    packActionNote: 'Simply Doritos is missing a bundle format on e-commerce — a high-growth channel for health-conscious shoppers doing planned purchases. Adding a bundle would capture incremental revenue from the fastest-growing consumer segment.',
    budgetFit: ['Low', 'Medium'], healthFit: ['Medium', 'High'], functionalFit: ['None', 'Clean Label'],
    quarterlyRevenue: [8.0, 9.2, 10.5, 12.0, 13.8, 15.5],
    insight: 'Simply Doritos is PepsiCo\'s most credible bridge between classic and health-conscious snacking. Clean label, no artificial ingredients, and strong Doritos brand equity driving trial. Recommend significant investment in distribution expansion and adding a bundle format for e-commerce.',
  },
  {
    id: 'B02', name: 'SunChips Harvest Cheddar', brand: 'SunChips', tier: TIERS.BETTER,
    healthScore: 62, proteinG: 3, fiberG: 3, sodium: 140, artificial: false, cleanLabel: true,
    demandTrend: 'growing', consumerShiftRisk: 'low',
    formats: ['Single-Serve', 'Family-Size', 'Bundle'],
    bestFormats: ['Family-Size', 'Bundle'],
    currentPricePerOz: { 'Single-Serve': 1.05, 'Family-Size': 0.48, 'Bundle': 0.44 },
    recommendedPricePerOz: { 'Single-Serve': 1.05, 'Family-Size': 0.48, 'Bundle': 0.44 },
    packAction: 'MAINTAIN',
    packActionNote: 'Format mix is well balanced for the health-conscious consumer. Bundle on e-commerce is growing strongly among millennial households. Pricing is well calibrated.',
    budgetFit: ['Low', 'Medium'], healthFit: ['Medium', 'High'], functionalFit: ['None', 'Fiber', 'Clean Label'],
    quarterlyRevenue: [12.0, 12.8, 13.9, 15.0, 16.4, 17.8],
    insight: 'SunChips Harvest Cheddar is one of PepsiCo\'s most credible better-for-you success stories — whole grain, good fiber, clean label. Bundle format on e-commerce is particularly strong among millennial households. Recommend investing in new flavor variants and expanding bundle offering.',
  },
  {
    id: 'B03', name: "Stacy's Pita Chips Sea Salt", brand: "Stacy's", tier: TIERS.BETTER,
    healthScore: 65, proteinG: 3, fiberG: 1, sodium: 115, artificial: false, cleanLabel: true,
    demandTrend: 'growing', consumerShiftRisk: 'low',
    formats: ['Single-Serve', 'Family-Size', 'Bundle'],
    bestFormats: ['Family-Size', 'Bundle'],
    currentPricePerOz: { 'Single-Serve': 1.15, 'Family-Size': 0.55, 'Bundle': 0.50 },
    recommendedPricePerOz: { 'Single-Serve': 1.15, 'Family-Size': 0.55, 'Bundle': 0.50 },
    packAction: 'EXPAND',
    packActionNote: "Stacy's is missing a bulk format for club stores — an underserved channel for this SKU's premium health-conscious consumer who stock-loads. Adding bulk would expand the addressable consumer base.",
    budgetFit: ['Low', 'Medium'], healthFit: ['Medium', 'High'], functionalFit: ['None', 'Clean Label', 'Low Sodium'],
    quarterlyRevenue: [9.5, 10.4, 11.5, 12.8, 14.2, 15.8],
    insight: "Stacy's Pita Chips has carved a strong position among health-conscious consumers. Bundle format on e-commerce is the fastest-growing channel. Recommend premium bundle investment and pairing with dips for higher basket value.",
  },
  {
    id: 'B04', name: 'Off The Eaten Path Veggie Crisps', brand: 'Off The Eaten Path', tier: TIERS.BETTER,
    healthScore: 70, proteinG: 4, fiberG: 3, sodium: 105, artificial: false, cleanLabel: true,
    demandTrend: 'growing', consumerShiftRisk: 'low',
    formats: ['Single-Serve', 'Family-Size'],
    bestFormats: ['Single-Serve', 'Family-Size'],
    currentPricePerOz: { 'Single-Serve': 1.25, 'Family-Size': 0.60 },
    recommendedPricePerOz: { 'Single-Serve': 1.25, 'Family-Size': 0.60 },
    packAction: 'EXPAND',
    packActionNote: 'Off The Eaten Path is under-distributed relative to its health score and growth rate. Adding bundle and bulk formats would accelerate household penetration. The primary barrier is low brand awareness, not consumer demand.',
    budgetFit: ['Low'], healthFit: ['High'], functionalFit: ['Fiber', 'Clean Label', 'Low Sodium'],
    quarterlyRevenue: [4.0, 4.8, 5.8, 7.0, 8.5, 10.2],
    insight: 'Off The Eaten Path is one of PepsiCo\'s highest health-scoring better-for-you snacks — strong fiber, clean label, low sodium. Rapid revenue growth from a smaller base. Currently under-distributed relative to its potential. Recommend expanding single-serve distribution in health-focused grocery and convenience channels.',
  },
  {
    id: 'B05', name: 'PopCorners Sea Salt', brand: 'PopCorners', tier: TIERS.BETTER,
    healthScore: 60, proteinG: 2, fiberG: 1, sodium: 95, artificial: false, cleanLabel: true,
    demandTrend: 'growing', consumerShiftRisk: 'low',
    formats: ['Single-Serve', 'Family-Size', 'Bulk', 'Bundle'],
    bestFormats: ['Single-Serve', 'Bundle'],
    currentPricePerOz: { 'Single-Serve': 1.08, 'Family-Size': 0.50, 'Bulk': 0.40, 'Bundle': 0.46 },
    recommendedPricePerOz: { 'Single-Serve': 1.08, 'Family-Size': 0.50, 'Bulk': 0.40, 'Bundle': 0.46 },
    packAction: 'MAINTAIN',
    packActionNote: 'PopCorners has the strongest format coverage in the better-for-you tier. Pricing is well calibrated across all formats. Focus should be on marketing investment, not pack changes.',
    budgetFit: ['Low', 'Medium'], healthFit: ['Medium', 'High'], functionalFit: ['None', 'Clean Label', 'Low Sodium'],
    quarterlyRevenue: [10.0, 11.5, 13.2, 15.0, 17.1, 19.5],
    insight: 'PopCorners has been one of PepsiCo\'s fastest-growing better-for-you snacks. Available across all four pack formats with strong performance in single-serve and bundle. Recommend continued investment and exploring protein-enhanced variants.',
  },
  {
    id: 'B06', name: 'Smartfood White Cheddar Popcorn', brand: 'Smartfood', tier: TIERS.BETTER,
    healthScore: 55, proteinG: 3, fiberG: 2, sodium: 150, artificial: false, cleanLabel: true,
    demandTrend: 'stable', consumerShiftRisk: 'low',
    formats: ['Single-Serve', 'Family-Size', 'Bulk'],
    bestFormats: ['Family-Size', 'Bulk'],
    currentPricePerOz: { 'Single-Serve': 1.00, 'Family-Size': 0.45, 'Bulk': 0.36 },
    recommendedPricePerOz: { 'Single-Serve': 1.00, 'Family-Size': 0.45, 'Bulk': 0.36 },
    packAction: 'EXPAND',
    packActionNote: 'Smartfood is missing a bundle format — a gap given its strong performance in family and bulk. An e-commerce bundle would capture the planned-purchase health-conscious consumer who currently cannot easily buy Smartfood online.',
    budgetFit: ['Low', 'Medium', 'High'], healthFit: ['Medium', 'High'], functionalFit: ['None', 'Clean Label'],
    quarterlyRevenue: [15.0, 15.2, 15.5, 15.3, 15.6, 15.8],
    insight: 'Smartfood is a steady performer with strong household penetration. The brand lacks a specific functional claim which limits its upside with the most health-conscious consumers. Recommend maintaining current investment and exploring a Smartfood Fiber Pop extension.',
  },
  {
    id: 'B07', name: 'Siete Grain-Free Tortilla Chips', brand: 'Siete', tier: TIERS.BETTER,
    healthScore: 72, proteinG: 2, fiberG: 2, sodium: 90, artificial: false, cleanLabel: true,
    demandTrend: 'growing', consumerShiftRisk: 'low',
    formats: ['Single-Serve', 'Family-Size', 'Bundle'],
    bestFormats: ['Family-Size', 'Bundle'],
    currentPricePerOz: { 'Single-Serve': 1.50, 'Family-Size': 0.80, 'Bundle': 0.72 },
    recommendedPricePerOz: { 'Single-Serve': 1.50, 'Family-Size': 0.80, 'Bundle': 0.72 },
    packAction: 'EXPAND',
    packActionNote: 'Siete is missing bulk format for club stores — a key channel for premium health brands. Bulk distribution at Costco and Sam\'s Club would significantly expand household penetration.',
    budgetFit: ['Low'], healthFit: ['High'], functionalFit: ['Clean Label', 'Low Sodium'],
    quarterlyRevenue: [5.0, 6.5, 8.5, 11.0, 14.0, 17.5],
    insight: 'Siete is one of PepsiCo\'s most premium better-for-you snacks — grain-free, clean label, low sodium, deeply resonant with paleo and Whole30 consumers. Rapid revenue growth. Recommend aggressive distribution expansion in natural and specialty grocery while managing the brand\'s independent identity.',
  },

  // FUNCTIONAL
  {
    id: 'F01', name: 'Doritos Protein Nacho Cheese', brand: 'Doritos', tier: TIERS.FUNCTIONAL,
    healthScore: 75, proteinG: 10, fiberG: 2, sodium: 190, artificial: false, cleanLabel: false,
    demandTrend: 'growing', consumerShiftRisk: 'low',
    formats: ['Single-Serve', 'Family-Size'],
    bestFormats: ['Single-Serve', 'Family-Size'],
    currentPricePerOz: { 'Single-Serve': 1.30, 'Family-Size': 0.65 },
    recommendedPricePerOz: { 'Single-Serve': 1.30, 'Family-Size': 0.65 },
    packAction: 'EXPAND',
    packActionNote: 'Doritos Protein is PepsiCo\'s most strategically important new launch and is only in two formats. Adding a bulk format for gym-channel and club store distribution would significantly expand reach to the core protein-seeking consumer.',
    budgetFit: ['Low', 'Medium'], healthFit: ['Medium', 'High'], functionalFit: ['Protein'],
    quarterlyRevenue: [2.0, 4.5, 8.0, 12.5, 17.0, 22.0],
    insight: 'Doritos Protein is PepsiCo\'s most strategically important new launch — combining iconic brand equity with 10g of protein. Early velocity is exceptionally strong. This SKU has the potential to become the best-performing functional snack in the portfolio within 18 months. Recommend aggressive investment and prioritizing gym-adjacent and health-focused retail channels.',
  },
  {
    id: 'F02', name: 'SunChips Fiber Original', brand: 'SunChips', tier: TIERS.FUNCTIONAL,
    healthScore: 72, proteinG: 3, fiberG: 6, sodium: 120, artificial: false, cleanLabel: true,
    demandTrend: 'growing', consumerShiftRisk: 'low',
    formats: ['Single-Serve', 'Family-Size'],
    bestFormats: ['Family-Size'],
    currentPricePerOz: { 'Single-Serve': 1.20, 'Family-Size': 0.58 },
    recommendedPricePerOz: { 'Single-Serve': 1.15, 'Family-Size': 0.58 },
    packAction: 'REPRICE',
    packActionNote: 'Single-serve is slightly overpriced relative to the family-size value gap. A modest reduction in single-serve price would drive trial among fiber-seeking consumers who are new to the SKU.',
    budgetFit: ['Low', 'Medium'], healthFit: ['High'], functionalFit: ['Fiber', 'Clean Label'],
    quarterlyRevenue: [3.0, 4.2, 5.8, 7.5, 9.5, 11.8],
    insight: 'SunChips Fiber addresses the growing gut health and fiber need state — 6g of fiber per serving is genuinely differentiated. Growing velocity in health-focused grocery channels. Recommend investing in gut health positioning and partnering with registered dietitians for credible content marketing.',
  },
  {
    id: 'F03', name: 'Smartfood Fiber Pop', brand: 'Smartfood', tier: TIERS.FUNCTIONAL,
    healthScore: 68, proteinG: 2, fiberG: 5, sodium: 100, artificial: false, cleanLabel: true,
    demandTrend: 'growing', consumerShiftRisk: 'low',
    formats: ['Single-Serve', 'Family-Size'],
    bestFormats: ['Single-Serve'],
    currentPricePerOz: { 'Single-Serve': 1.18, 'Family-Size': 0.55 },
    recommendedPricePerOz: { 'Single-Serve': 1.18, 'Family-Size': 0.55 },
    packAction: 'MAINTAIN',
    packActionNote: 'Format mix is appropriate for a new functional launch. Single-serve is driving trial effectively. Maintain current format and pricing while building brand awareness for the fiber positioning.',
    budgetFit: ['Low', 'Medium'], healthFit: ['Medium', 'High'], functionalFit: ['Fiber', 'Clean Label'],
    quarterlyRevenue: [2.5, 3.5, 4.8, 6.2, 7.8, 9.5],
    insight: 'Smartfood Fiber Pop is a strong functional extension — clean label with 5g fiber and low sodium. Single-serve is the strongest format, driven by lunchbox and on-the-go occasions. Recommend investment in single-serve distribution and GLP-1 consumer messaging around satiety.',
  },
  {
    id: 'F04', name: 'Quaker Protein Granola Bars', brand: 'Quaker', tier: TIERS.FUNCTIONAL,
    healthScore: 78, proteinG: 10, fiberG: 4, sodium: 115, artificial: false, cleanLabel: true,
    demandTrend: 'growing', consumerShiftRisk: 'low',
    formats: ['Single-Serve', 'Bundle', 'Bulk'],
    bestFormats: ['Bundle', 'Bulk'],
    currentPricePerOz: { 'Single-Serve': 1.40, 'Bundle': 0.60, 'Bulk': 0.52 },
    recommendedPricePerOz: { 'Single-Serve': 1.40, 'Bundle': 0.60, 'Bulk': 0.52 },
    packAction: 'MAINTAIN',
    packActionNote: 'Bundle and bulk formats are performing strongly with health-conscious consumers. Pricing is well calibrated. The opportunity is in distribution expansion, not format or price changes.',
    budgetFit: ['Low', 'Medium'], healthFit: ['High'], functionalFit: ['Protein', 'Fiber', 'Clean Label'],
    quarterlyRevenue: [8.0, 9.5, 11.2, 13.0, 15.2, 17.5],
    insight: 'Quaker Protein Granola Bars is one of the highest health-scoring functional SKUs in PepsiCo\'s portfolio — 10g protein, 4g fiber, clean label. Strong performance among GLP-1 users. Recommend aggressive investment and expanding into workplace and gym channel distribution.',
  },
  {
    id: 'F05', name: 'Bare Apple Chips Cinnamon', brand: 'Bare', tier: TIERS.FUNCTIONAL,
    healthScore: 85, proteinG: 1, fiberG: 3, sodium: 0, artificial: false, cleanLabel: true,
    demandTrend: 'growing', consumerShiftRisk: 'low',
    formats: ['Single-Serve', 'Family-Size', 'Bundle'],
    bestFormats: ['Single-Serve', 'Bundle'],
    currentPricePerOz: { 'Single-Serve': 1.60, 'Family-Size': 0.85, 'Bundle': 0.76 },
    recommendedPricePerOz: { 'Single-Serve': 1.55, 'Family-Size': 0.80, 'Bundle': 0.72 },
    packAction: 'REPRICE',
    packActionNote: "Bare's premium price point is limiting trial among health-conscious but budget-sensitive consumers. A modest price reduction would expand the addressable market without damaging the brand's premium positioning.",
    budgetFit: ['Low'], healthFit: ['High'], functionalFit: ['Fiber', 'Clean Label', 'Low Sodium'],
    quarterlyRevenue: [3.5, 4.2, 5.2, 6.5, 8.0, 9.8],
    insight: 'Bare Apple Chips is the cleanest SKU in PepsiCo\'s entire snack portfolio — zero sodium, no artificial ingredients, single-ingredient ethos. Highest health score of any SKU. Particularly resonant with GLP-1 users and parents. Under-distributed relative to health positioning.',
  },
  {
    id: 'F06', name: 'Sabra Classic Hummus Snack Pack', brand: 'Sabra', tier: TIERS.FUNCTIONAL,
    healthScore: 80, proteinG: 5, fiberG: 3, sodium: 130, artificial: false, cleanLabel: true,
    demandTrend: 'growing', consumerShiftRisk: 'low',
    formats: ['Single-Serve', 'Bundle'],
    bestFormats: ['Single-Serve', 'Bundle'],
    currentPricePerOz: { 'Single-Serve': 1.45, 'Bundle': 0.68 },
    recommendedPricePerOz: { 'Single-Serve': 1.45, 'Bundle': 0.68 },
    packAction: 'EXPAND',
    packActionNote: "Sabra Snack Pack pairs naturally with Stacy's Pita Chips — a bundle combining both SKUs would create a high-value e-commerce product that neither brand can achieve alone. This cross-portfolio bundle is a unique PepsiCo advantage.",
    budgetFit: ['Low', 'Medium'], healthFit: ['High'], functionalFit: ['Protein', 'Fiber', 'Clean Label'],
    quarterlyRevenue: [6.0, 7.2, 8.8, 10.5, 12.5, 14.8],
    insight: "Sabra Hummus Snack Pack is a strong protein and fiber performer with a clean ingredient label. The single-serve format is ideal for on-the-go occasions and pairs well with Stacy's Pita Chips. Recommend investing in a Sabra + Stacy's bundle combination for a higher basket value e-commerce play.",
  },
];

export function computeProfileMatch(sku, profile) {
  let score = 0;
  const healthMap = { Low: [0, 35], Medium: [36, 65], High: [66, 100] };
  const [hMin, hMax] = healthMap[profile.health] || [0, 100];
  if (sku.healthScore >= hMin && sku.healthScore <= hMax) score += 30;
  else if (Math.abs(sku.healthScore - (hMin + hMax) / 2) < 20) score += 15;
  if (sku.budgetFit.includes(profile.budget)) score += 25;
  if (profile.functional === 'None') score += 20;
  else if (sku.functionalFit.includes(profile.functional)) score += 20;
  if (sku.formats.includes(profile.format)) score += 15;
  if (sku.bestFormats.includes(profile.format)) score += 10;
  return Math.min(100, score);
}

export function getMatchLabel(score) {
  if (score >= 75) return 'Strong Match';
  if (score >= 50) return 'Good Match';
  if (score >= 30) return 'Partial Match';
  return 'Poor Match';
}

export function getMatchColor(score) {
  if (score >= 75) return { color: 'var(--invest)', bg: 'var(--invest-bg)' };
  if (score >= 50) return { color: 'var(--maintain)', bg: 'var(--maintain-bg)' };
  if (score >= 30) return { color: 'var(--watch)', bg: 'var(--watch-bg)' };
  return { color: 'var(--divest)', bg: 'var(--divest-bg)' };
}

export function getTierColor(tier) {
  if (tier === TIERS.CLASSIC) return { color: 'var(--classic)', bg: 'var(--classic-bg)' };
  if (tier === TIERS.BETTER) return { color: 'var(--invest)', bg: 'var(--invest-bg)' };
  if (tier === TIERS.FUNCTIONAL) return { color: 'var(--functional)', bg: 'var(--functional-bg)' };
  return { color: 'var(--text-2)', bg: 'var(--surface2)' };
}

export function healthColor(score) {
  if (score >= 70) return 'var(--invest)';
  if (score >= 50) return 'var(--functional)';
  if (score >= 30) return 'var(--watch)';
  return 'var(--divest)';
}

export const GAP_DATA = [
  { segment: 'Budget + Classic', coverage: 95, label: 'Well Served', color: 'var(--invest)', soWhat: 'PepsiCo dominates here. No action needed — protect market share and pricing discipline.' },
  { segment: 'Budget + Healthy', coverage: 45, label: 'Underserved', color: 'var(--watch)', soWhat: 'Budget-conscious consumers who want healthier options have very few PepsiCo choices. Simply Doritos and SunChips come closest but are priced too high for this segment. This is a distribution and pricing opportunity, not a product gap.' },
  { segment: 'Medium Budget + Protein', coverage: 60, label: 'Growing', color: 'var(--maintain)', soWhat: 'Doritos Protein is filling this gap but is still early-stage. Distribution expansion into convenience and grocery channels is the immediate priority.' },
  { segment: 'Medium Budget + Fiber', coverage: 55, label: 'Developing', color: 'var(--watch)', soWhat: 'SunChips Fiber and Smartfood Fiber Pop are the current answer — but both need wider distribution and stronger consumer awareness around the fiber benefit.' },
  { segment: 'High Health + Premium', coverage: 70, label: 'Strong', color: 'var(--invest)', soWhat: 'Siete, Bare, and Sabra serve this segment well. Continued investment in distribution and awareness will consolidate the position. No new product development needed here.' },
  { segment: 'GLP-1 / Functional', coverage: 35, label: 'Critical Gap', color: 'var(--divest)', soWhat: 'No PepsiCo SKU directly targets the GLP-1 consumer — high protein, high fiber, small-serve, satiety-focused. This is the single biggest innovation white space in the portfolio and the fastest-growing consumer segment in snacking.' },
  { segment: 'Clean Label + Value', coverage: 40, label: 'Critical Gap', color: 'var(--divest)', soWhat: "Budget-sensitive consumers who also want clean label ingredients have almost no PepsiCo option. Lay's Classic is the closest but is not marketed for this positioning. This gap is growing as more consumers read ingredient labels but cannot afford premium pricing." },
  { segment: 'Single-Serve + Protein', coverage: 50, label: 'Developing', color: 'var(--watch)', soWhat: 'Doritos Protein exists in single-serve but distribution is limited to select markets. The grab-and-go protein snack occasion is growing rapidly — convenience channel expansion is the urgent next step.' },
];

export const ALL_SKUS = RAW_SKUS;
