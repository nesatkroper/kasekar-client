"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ShoppingCart, Package2, Tag, Info, Truck, Clock } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { products } from "@/lib/products"
import { formatCurrency } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.productId === params.id)
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    notFound()
  }

  // Calculate discounted price if there's a discount
  const discountedPrice = product.discountRate > 0 ? product.sellPrice.mul(1 - product.discountRate / 100) : null

  const finalPrice = discountedPrice || product.sellPrice

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value > 0) {
      setQuantity(value)
    }
  }

  const handleAddToCart = () => {
    // This would be implemented with your cart functionality
    console.log(`Adding ${quantity} of ${product.productName} to cart`)
    // You could show a toast notification here
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container px-4 py-8 md:py-12">
        <Link
          href="/products"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-square overflow-hidden rounded-lg border bg-muted">
              <img
                src={product.picture || "/placeholder.svg?height=600&width=600"}
                alt={product.productName}
                className="object-cover w-full h-full"
              />
            </div>
            {product.discountRate > 0 && (
              <Badge className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-sm">
                {product.discountRate}% OFF
              </Badge>
            )}
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="space-y-4">
              <div>
                {product.category && (
                  <Badge variant="outline" className="mb-2">
                    {product.category.categoryName}
                  </Badge>
                )}
                <h1 className="text-3xl font-bold">{product.productName}</h1>
                {product.productCode && (
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Tag className="h-4 w-4 mr-1" />
                    <span>Product Code: {product.productCode}</span>
                  </div>
                )}
              </div>

              <div className="flex items-baseline">
                {discountedPrice ? (
                  <>
                    <span className="text-3xl font-bold text-red-600 mr-2">{formatCurrency(discountedPrice)}</span>
                    <span className="text-lg line-through text-muted-foreground">
                      {formatCurrency(product.sellPrice)}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold">{formatCurrency(product.sellPrice)}</span>
                )}
              </div>

              <p className="text-muted-foreground">{product.desc}</p>

              <div className="grid grid-cols-2 gap-4">
                {(product.unit || product.capacity) && (
                  <div className="flex items-center text-sm">
                    <Package2 className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>
                      Size: {product.capacity} {product.unit}
                    </span>
                  </div>
                )}
                <div className="flex items-center text-sm">
                  <Info className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Status: {product.status === "active" ? "In Stock" : "Out of Stock"}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Truck className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Free shipping over $50</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Usually ships in 1-2 business days</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mt-6">
                <div className="w-24">
                  <Input type="number" min="1" value={quantity} onChange={handleQuantityChange} />
                </div>
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={handleAddToCart}
                  disabled={product.status !== "active"}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>

            <Tabs defaultValue="details" className="mt-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="application">Application</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="pt-4">
                <div className="space-y-4">
                  <h3 className="font-medium">Product Details</h3>
                  <p className="text-sm text-muted-foreground">
                    {product.desc || "No detailed description available for this product."}
                  </p>
                  {product.category?.memo && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium">Category Information</h4>
                      <p className="text-sm text-muted-foreground mt-1">{product.category.memo}</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="application" className="pt-4">
                <div className="space-y-4">
                  <h3 className="font-medium">Application Instructions</h3>
                  <p className="text-sm text-muted-foreground">
                    For best results, apply this fertilizer according to soil test recommendations. General application
                    rates are 2-4 kg per 100 square meters for established plants. Water thoroughly after application.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="shipping" className="pt-4">
                <div className="space-y-4">
                  <h3 className="font-medium">Shipping Information</h3>
                  <p className="text-sm text-muted-foreground">
                    We ship to all 50 states. Orders are typically processed within 1-2 business days. Free shipping on
                    orders over $50. For expedited shipping options, please contact customer service.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
