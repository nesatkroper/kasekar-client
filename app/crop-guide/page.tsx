"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sprout, Search, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { cropGuides } from "@/lib/crop-guides"

export default function CropGuidePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredGuides, setFilteredGuides] = useState(cropGuides)

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredGuides(cropGuides)
      return
    }

    const query = searchQuery.toLowerCase()
    const results = cropGuides.filter(
      (guide) =>
        guide.name.toLowerCase().includes(query) ||
        guide.description.toLowerCase().includes(query) ||
        guide.category.toLowerCase().includes(query),
    )
    setFilteredGuides(results)
  }

  const filterByCategory = (category: string) => {
    if (category === "all") {
      setFilteredGuides(cropGuides)
      return
    }

    const results = cropGuides.filter((guide) => guide.category === category)
    setFilteredGuides(results)
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
              <Sprout className="h-6 w-6 text-green-600 dark:text-green-200" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Crop Growing Guides</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Expert advice on growing various crops and optimizing fertilizer application
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <div className="flex gap-2 mb-6">
              <Input
                placeholder="Search crops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>

            <Tabs defaultValue="all" onValueChange={filterByCategory}>
              <TabsList className="w-full grid grid-cols-2 md:grid-cols-5">
                <TabsTrigger value="all">All Crops</TabsTrigger>
                <TabsTrigger value="vegetables">Vegetables</TabsTrigger>
                <TabsTrigger value="fruits">Fruits</TabsTrigger>
                <TabsTrigger value="grains">Grains</TabsTrigger>
                <TabsTrigger value="specialty">Specialty</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {filteredGuides.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredGuides.map((guide, index) => (
                <motion.div
                  key={guide.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={guide.image || "/placeholder.svg?height=400&width=600"}
                        alt={guide.name}
                        className="object-cover w-full h-full"
                      />
                      <Badge className="absolute top-2 right-2 bg-green-600">{guide.category}</Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle>{guide.name}</CardTitle>
                      <CardDescription>{guide.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2 flex-grow">
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium">Growing Season:</span>
                          <span className="text-sm text-muted-foreground ml-2">{guide.growingSeason}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Soil pH:</span>
                          <span className="text-sm text-muted-foreground ml-2">{guide.soilPH}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Fertilizer Needs:</span>
                          <span className="text-sm text-muted-foreground ml-2">{guide.fertilizerNeeds}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                        <a href={`/crop-guide/${guide.id}`}>
                          View Full Guide
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Sprout className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No crop guides found</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2">
                We couldn't find any crop guides matching your search. Try different keywords or browse by category.
              </p>
              <Button
                className="mt-4"
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setFilteredGuides(cropGuides)
                }}
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
