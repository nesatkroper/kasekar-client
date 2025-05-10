"use client"

import { motion } from "framer-motion"
import { ArrowRight, Tag, Package2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/products"
import { formatCurrency } from "@/lib/utils"

export default function ProductCard({ product }: { product: Product }) {
  // Calculate discounted price if there's a discount
  const discountedPrice = product.discountRate > 0 ? product.sellPrice.mul(1 - product.discountRate / 100) : null

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.picture || "/placeholder.svg?height=400&width=400"}
            alt={product.productName}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
          {product.category && (
            <Badge className="absolute top-2 right-2 bg-green-600">{product.category.categoryName}</Badge>
          )}
          {product.discountRate > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500">{product.discountRate}% OFF</Badge>
          )}
        </div>
        <CardContent className="p-4 flex-grow">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">{product.productName}</h3>
            {product.productCode && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Tag className="h-3 w-3 mr-1" />
                <span>Code: {product.productCode}</span>
              </div>
            )}
            <p className="text-sm text-muted-foreground line-clamp-2">{product.desc}</p>

            {(product.unit || product.capacity) && (
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Package2 className="h-3 w-3 mr-1" />
                <span>
                  {product.capacity} {product.unit}
                </span>
              </div>
            )}

            <div className="mt-2 flex items-end">
              {discountedPrice ? (
                <div className="flex flex-col">
                  <span className="text-sm line-through text-muted-foreground">
                    {formatCurrency(product.sellPrice)}
                  </span>
                  <span className="font-bold text-lg text-red-600">{formatCurrency(discountedPrice)}</span>
                </div>
              ) : (
                <span className="font-bold text-lg">{formatCurrency(product.sellPrice)}</span>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between mt-auto">
          <Button variant="outline" size="sm">
            Details
          </Button>
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            Add to Cart
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
