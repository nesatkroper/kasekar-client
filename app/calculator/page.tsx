"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CalculatorPage() {
  const [area, setArea] = useState<number>(0)
  const [unit, setUnit] = useState<string>("hectare")
  const [cropType, setCropType] = useState<string>("vegetables")
  const [soilType, setSoilType] = useState<string>("loamy")
  const [results, setResults] = useState<any>(null)

  const calculateFertilizer = () => {
    // These are example calculation rates - in a real app, these would be more sophisticated
    const baseRates = {
      vegetables: { nitrogen: 120, phosphorus: 60, potassium: 80 },
      fruits: { nitrogen: 100, phosphorus: 80, potassium: 100 },
      grains: { nitrogen: 140, phosphorus: 70, potassium: 60 },
      ornamentals: { nitrogen: 80, phosphorus: 40, potassium: 60 },
    }

    const soilFactors = {
      sandy: { nitrogen: 1.2, phosphorus: 1.0, potassium: 1.2 },
      loamy: { nitrogen: 1.0, phosphorus: 1.0, potassium: 1.0 },
      clay: { nitrogen: 0.8, phosphorus: 1.2, potassium: 0.9 },
      peaty: { nitrogen: 0.7, phosphorus: 1.3, potassium: 1.1 },
    }

    // Convert area to hectares for calculation
    let areaInHectares = area
    if (unit === "acre") {
      areaInHectares = area * 0.4047
    } else if (unit === "sqm") {
      areaInHectares = area / 10000
    }

    // Calculate fertilizer needs
    const baseRate = baseRates[cropType as keyof typeof baseRates]
    const soilFactor = soilFactors[soilType as keyof typeof soilFactors]

    const nitrogen = Math.round(baseRate.nitrogen * soilFactor.nitrogen * areaInHectares)
    const phosphorus = Math.round(baseRate.phosphorus * soilFactor.phosphorus * areaInHectares)
    const potassium = Math.round(baseRate.potassium * soilFactor.potassium * areaInHectares)

    // Calculate recommended products
    const recommendedProducts = []

    if (cropType === "vegetables") {
      recommendedProducts.push({
        name: "GreenGrow Organic All-Purpose",
        amount: Math.round(nitrogen / 5),
        id: "1",
      })
    } else if (cropType === "fruits") {
      recommendedProducts.push({
        name: "FruitMax Bloom Booster",
        amount: Math.round(phosphorus / 4),
        id: "4",
      })
    } else if (cropType === "grains") {
      recommendedProducts.push({
        name: "GrainPro Cereal Crop Formula",
        amount: Math.round(nitrogen / 6),
        id: "6",
      })
    }

    // Add a general recommendation
    recommendedProducts.push({
      name: "MicroNutrient Booster",
      amount: Math.round(areaInHectares * 10),
      id: "7",
    })

    setResults({
      nutrients: { nitrogen, phosphorus, potassium },
      recommendedProducts,
    })
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
            <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full dark:bg-green-800">
              <Calculator className="h-6 w-6 text-green-600 dark:text-green-200" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Fertilizer Calculator</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Calculate the optimal fertilizer amounts for your crops based on area, crop type, and soil conditions.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Enter Your Details</CardTitle>
                  <CardDescription>
                    Provide information about your land and crops to get personalized fertilizer recommendations.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="area">Land Area</Label>
                    <div className="flex gap-2">
                      <Input
                        id="area"
                        type="number"
                        placeholder="Enter area"
                        onChange={(e) => setArea(Number.parseFloat(e.target.value) || 0)}
                      />
                      <Select value={unit} onValueChange={setUnit}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hectare">Hectare</SelectItem>
                          <SelectItem value="acre">Acre</SelectItem>
                          <SelectItem value="sqm">Square Meter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="crop-type">Crop Type</Label>
                    <Select value={cropType} onValueChange={setCropType}>
                      <SelectTrigger id="crop-type">
                        <SelectValue placeholder="Select crop type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vegetables">Vegetables</SelectItem>
                        <SelectItem value="fruits">Fruits</SelectItem>
                        <SelectItem value="grains">Grains</SelectItem>
                        <SelectItem value="ornamentals">Ornamentals</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="soil-type">Soil Type</Label>
                    <Select value={soilType} onValueChange={setSoilType}>
                      <SelectTrigger id="soil-type">
                        <SelectValue placeholder="Select soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sandy">Sandy</SelectItem>
                        <SelectItem value="loamy">Loamy</SelectItem>
                        <SelectItem value="clay">Clay</SelectItem>
                        <SelectItem value="peaty">Peaty</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={calculateFertilizer}
                    disabled={!area}
                  >
                    Calculate Recommendations
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {results ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Your Fertilizer Recommendations</CardTitle>
                    <CardDescription>
                      Based on your {area} {unit}
                      {area === 1 ? "" : "s"} of {cropType} with {soilType} soil
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="nutrients">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="nutrients">Nutrient Needs</TabsTrigger>
                        <TabsTrigger value="products">Recommended Products</TabsTrigger>
                      </TabsList>
                      <TabsContent value="nutrients" className="space-y-4 pt-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg dark:bg-green-900/20">
                            <span className="text-sm font-medium text-muted-foreground">Nitrogen (N)</span>
                            <span className="text-2xl font-bold text-green-600">{results.nutrients.nitrogen}</span>
                            <span className="text-xs text-muted-foreground">kg</span>
                          </div>
                          <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg dark:bg-blue-900/20">
                            <span className="text-sm font-medium text-muted-foreground">Phosphorus (P)</span>
                            <span className="text-2xl font-bold text-blue-600">{results.nutrients.phosphorus}</span>
                            <span className="text-xs text-muted-foreground">kg</span>
                          </div>
                          <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg dark:bg-purple-900/20">
                            <span className="text-sm font-medium text-muted-foreground">Potassium (K)</span>
                            <span className="text-2xl font-bold text-purple-600">{results.nutrients.potassium}</span>
                            <span className="text-xs text-muted-foreground">kg</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-4">
                          These values represent the total nutrient requirements for your crop over the growing season.
                          Actual application rates may vary based on soil tests and specific crop varieties.
                        </p>
                      </TabsContent>
                      <TabsContent value="products" className="pt-4">
                        <div className="space-y-4">
                          {results.recommendedProducts.map((product: any, index: number) => (
                            <div key={index} className="flex items-center justify-between border-b pb-4">
                              <div>
                                <h4 className="font-medium">{product.name}</h4>
                                <p className="text-sm text-muted-foreground">Recommended amount: {product.amount} kg</p>
                              </div>
                              <Button variant="outline" size="sm" asChild>
                                <a href={`/products#${product.id}`}>View Product</a>
                              </Button>
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-6">
                          These recommendations are based on general guidelines. For precise recommendations, we suggest
                          conducting a soil test or consulting with our agronomists.
                        </p>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center space-y-4 p-8 border border-dashed rounded-lg">
                    <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                      <Calculator className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">Your Results Will Appear Here</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Enter your land details and click calculate to receive personalized fertilizer recommendations for
                      your crops.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
