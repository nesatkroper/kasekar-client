"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Search, Phone, Mail, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { dealers } from "@/lib/dealers"

export default function FindDealerPage() {
  const [region, setRegion] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [filteredDealers, setFilteredDealers] = useState(dealers)

  const handleSearch = () => {
    let results = dealers

    if (region !== "all") {
      results = results.filter((dealer) => dealer.region === region)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (dealer) =>
          dealer.name.toLowerCase().includes(query) ||
          dealer.city.toLowerCase().includes(query) ||
          dealer.address.toLowerCase().includes(query),
      )
    }

    setFilteredDealers(results)
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
              <MapPin className="h-6 w-6 text-green-600 dark:text-green-200" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Find a Dealer</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Locate authorized NatureBoost dealers and distributors in your area
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger id="region">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      <SelectItem value="north">North</SelectItem>
                      <SelectItem value="south">South</SelectItem>
                      <SelectItem value="east">East</SelectItem>
                      <SelectItem value="west">West</SelectItem>
                      <SelectItem value="central">Central</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="flex gap-2">
                    <Input
                      id="search"
                      placeholder="Search by name, city or address"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDealers.length > 0 ? (
              filteredDealers.map((dealer, index) => (
                <motion.div
                  key={dealer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <h3 className="text-lg font-bold">{dealer.name}</h3>
                          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                            {dealer.type}
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                              {dealer.address}, {dealer.city}, {dealer.state} {dealer.zip}
                            </span>
                          </div>
                          <div className="flex">
                            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{dealer.phone}</span>
                          </div>
                          {dealer.email && (
                            <div className="flex">
                              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{dealer.email}</span>
                            </div>
                          )}
                        </div>

                        <div className="pt-2 flex justify-between">
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={`https://maps.google.com/?q=${encodeURIComponent(dealer.address + ", " + dealer.city + ", " + dealer.state)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <MapPin className="h-4 w-4 mr-2" />
                              Directions
                            </a>
                          </Button>

                          {dealer.website && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={dealer.website} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Website
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No dealers found</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2">
                  Try adjusting your search criteria or contact us directly for assistance finding a dealer in your
                  area.
                </p>
                <Button className="mt-4 bg-green-600 hover:bg-green-700" asChild>
                  <a href="/contact">Contact Us</a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
