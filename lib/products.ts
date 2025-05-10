import { Decimal } from "decimal.js"

export type Status = "active" | "inactive"

export interface Category {
  categoryId: string
  picture?: string | null
  categoryName: string
  categoryCode?: string | null
  memo?: string | null
  status: Status
  createdAt: Date
  updatedAt: Date
}

export interface Product {
  productId: string
  productName: string
  productCode?: string | null
  categoryId: string
  picture?: string | null
  unit?: string | null
  capacity?: string | null
  sellPrice: Decimal
  costPrice: Decimal
  discountRate: number
  status: Status
  desc?: string | null
  createdAt: Date
  updatedAt: Date
  category?: Category | null
}

// Sample categories based on your schema
export const categories: Category[] = [
  {
    categoryId: "c1",
    categoryName: "Organic",
    categoryCode: "ORG",
    picture: "/placeholder.svg?height=200&width=200",
    status: "active",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
    memo: "Environmentally friendly organic fertilizers",
  },
  {
    categoryId: "c2",
    categoryName: "Synthetic",
    categoryCode: "SYN",
    picture: "/placeholder.svg?height=200&width=200",
    status: "active",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
    memo: "Chemical-based synthetic fertilizers",
  },
  {
    categoryId: "c3",
    categoryName: "Liquid",
    categoryCode: "LIQ",
    picture: "/placeholder.svg?height=200&width=200",
    status: "active",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
    memo: "Water-soluble liquid fertilizers",
  },
  {
    categoryId: "c4",
    categoryName: "Specialty",
    categoryCode: "SPC",
    picture: "/placeholder.svg?height=200&width=200",
    status: "active",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
    memo: "Specialized fertilizers for specific crops",
  },
]

// Sample products based on your schema
export const products: Product[] = [
  {
    productId: "1",
    productName: "GreenGrow Organic All-Purpose",
    productCode: "GG-ORG-001",
    categoryId: "c1",
    picture: "/placeholder.svg?height=400&width=400",
    unit: "kg",
    capacity: "25",
    sellPrice: new Decimal(24.99),
    costPrice: new Decimal(18.5),
    discountRate: 0,
    status: "active",
    desc: "A balanced organic fertilizer suitable for all plants and vegetables. Slow-release formula for long-lasting nutrition.",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-01-15"),
    category: categories[0],
  },
  {
    productId: "2",
    productName: "CropBoost NPK 20-10-10",
    productCode: "CB-SYN-001",
    categoryId: "c2",
    picture: "/placeholder.svg?height=400&width=400",
    unit: "kg",
    capacity: "50",
    sellPrice: new Decimal(19.99),
    costPrice: new Decimal(14.75),
    discountRate: 0,
    status: "active",
    desc: "High-nitrogen formula ideal for leafy vegetables and early growth stages. Fast-acting for quick results.",
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-02-10"),
    category: categories[1],
  },
  {
    productId: "3",
    productName: "RootMaster Liquid Concentrate",
    productCode: "RM-LIQ-001",
    categoryId: "c3",
    picture: "/placeholder.svg?height=400&width=400",
    unit: "L",
    capacity: "5",
    sellPrice: new Decimal(15.99),
    costPrice: new Decimal(10.25),
    discountRate: 0,
    status: "active",
    desc: "Promotes strong root development and improves nutrient uptake. Perfect for transplanting and establishing new plants.",
    createdAt: new Date("2023-03-05"),
    updatedAt: new Date("2023-03-05"),
    category: categories[2],
  },
  {
    productId: "4",
    productName: "FruitMax Bloom Booster",
    productCode: "FM-SPC-001",
    categoryId: "c4",
    picture: "/placeholder.svg?height=400&width=400",
    unit: "kg",
    capacity: "10",
    sellPrice: new Decimal(22.99),
    costPrice: new Decimal(16.5),
    discountRate: 5,
    status: "active",
    desc: "Specially formulated to increase flowering and fruit production. High in phosphorus and potassium.",
    createdAt: new Date("2023-04-20"),
    updatedAt: new Date("2023-04-20"),
    category: categories[3],
  },
  {
    productId: "5",
    productName: "SoilRevive Compost Accelerator",
    productCode: "SR-ORG-001",
    categoryId: "c1",
    picture: "/placeholder.svg?height=400&width=400",
    unit: "kg",
    capacity: "20",
    sellPrice: new Decimal(18.99),
    costPrice: new Decimal(12.75),
    discountRate: 0,
    status: "active",
    desc: "Speeds up composting process and enriches soil with beneficial microorganisms. Improves soil structure and fertility.",
    createdAt: new Date("2023-05-15"),
    updatedAt: new Date("2023-05-15"),
    category: categories[0],
  },
  {
    productId: "6",
    productName: "GrainPro Cereal Crop Formula",
    productCode: "GP-SPC-001",
    categoryId: "c4",
    picture: "/placeholder.svg?height=400&width=400",
    unit: "kg",
    capacity: "25",
    sellPrice: new Decimal(29.99),
    costPrice: new Decimal(22.5),
    discountRate: 0,
    status: "active",
    desc: "Balanced nutrition specifically designed for wheat, corn, and other grain crops. Enhances yield and quality.",
    createdAt: new Date("2023-06-10"),
    updatedAt: new Date("2023-06-10"),
    category: categories[3],
  },
  {
    productId: "7",
    productName: "MicroNutrient Booster",
    productCode: "MN-ORG-001",
    categoryId: "c1",
    picture: "/placeholder.svg?height=400&width=400",
    unit: "kg",
    capacity: "5",
    sellPrice: new Decimal(17.99),
    costPrice: new Decimal(11.25),
    discountRate: 0,
    status: "active",
    desc: "Complete blend of essential micronutrients to prevent deficiencies and improve overall plant health.",
    createdAt: new Date("2023-07-05"),
    updatedAt: new Date("2023-07-05"),
    category: categories[0],
  },
  {
    productId: "8",
    productName: "AquaSol Water-Soluble Fertilizer",
    productCode: "AS-LIQ-001",
    categoryId: "c3",
    picture: "/placeholder.svg?height=400&width=400",
    unit: "kg",
    capacity: "10",
    sellPrice: new Decimal(26.99),
    costPrice: new Decimal(19.75),
    discountRate: 10,
    status: "active",
    desc: "Highly soluble formula for hydroponics, drip irrigation, and foliar application. Quick absorption and no clogging.",
    createdAt: new Date("2023-08-20"),
    updatedAt: new Date("2023-08-20"),
    category: categories[2],
  },
  {
    productId: "9",
    productName: "SlowGrow Controlled Release",
    productCode: "SG-SYN-001",
    categoryId: "c2",
    picture: "/placeholder.svg?height=400&width=400",
    unit: "kg",
    capacity: "15",
    sellPrice: new Decimal(34.99),
    costPrice: new Decimal(25.5),
    discountRate: 0,
    status: "active",
    desc: "Polymer-coated granules for controlled nutrient release over 6 months. Ideal for container plants and perennials.",
    createdAt: new Date("2023-09-15"),
    updatedAt: new Date("2023-09-15"),
    category: categories[1],
  },
]
