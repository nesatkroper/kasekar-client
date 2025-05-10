"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ProductCard from "@/components/product-card"
import { products, categories, type Product } from "@/lib/products"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [showDiscount, setShowDiscount] = useState(false)

  const handleSearch = () => {
    applyFilters(searchQuery, selectedCategories, showDiscount)
  }

  const handleCategoryChange = (categoryId: string) => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId]

    setSelectedCategories(updatedCategories)
    applyFilters(searchQuery, updatedCategories, showDiscount)
  }

  const handleDiscountChange = (checked: boolean) => {
    setShowDiscount(checked)
    applyFilters(searchQuery, selectedCategories, checked)
  }

  const applyFilters = (query: string, categories: string[], discountOnly: boolean) => {
    let result = [...products]

    // Apply search query filter
    if (query) {
      const lowercaseQuery = query.toLowerCase()
      result = result.filter(
        (product) =>
          product.productName.toLowerCase().includes(lowercaseQuery) ||
          product.desc?.toLowerCase().includes(lowercaseQuery) ||
          product.productCode?.toLowerCase().includes(lowercaseQuery),
      )
    }

    // Apply category filter
    if (categories.length > 0) {
      result = result.filter((product) => categories.includes(product.categoryId))
    }

    // Apply discount filter
    if (discountOnly) {
      result = result.filter((product) => product.discountRate > 0)
    }

    setFilteredProducts(result)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Products</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Explore our complete range of high-quality fertilizers designed for various crops and growing
                conditions.
              </p>
            </div>
            <div className="w-full max-w-md flex gap-2">
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            {/* Filters */}
            <div className="w-full md:w-64 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Filters</h3>
                <Filter className="h-4 w-4" />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.categoryId} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category.categoryId}`}
                        checked={selectedCategories.includes(category.categoryId)}
                        onCheckedChange={() => handleCategoryChange(category.categoryId)}
                      />
                      <Label htmlFor={`category-${category.categoryId}`}>{category.categoryName}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Special Offers</h4>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="discount"
                    checked={showDiscount}
                    onCheckedChange={(checked) => handleDiscountChange(checked as boolean)}
                  />
                  <Label htmlFor="discount">Discounted Items</Label>
                </div>
              </div>

              <Separator />

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategories([])
                  setShowDiscount(false)
                  setFilteredProducts(products)
                }}
              >
                Clear Filters
              </Button>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.productId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No products found</h3>
                  <p className="text-muted-foreground mt-2 max-w-md">
                    We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
