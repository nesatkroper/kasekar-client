"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { HelpCircle, Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { faqs } from "@/lib/faqs"

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredFaqs, setFilteredFaqs] = useState(faqs)

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredFaqs(faqs)
      return
    }

    const query = searchQuery.toLowerCase()
    const results = faqs.filter(
      (faq) => faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query),
    )
    setFilteredFaqs(results)
  }

  const filterByCategory = (category: string) => {
    if (category === "all") {
      setFilteredFaqs(faqs)
      return
    }

    const results = faqs.filter((faq) => faq.category === category)
    setFilteredFaqs(results)
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
              <HelpCircle className="h-6 w-6 text-green-600 dark:text-green-200" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Frequently Asked Questions
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Find answers to common questions about our fertilizers and their application
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="w-full md:w-3/4 mx-auto">
              <div className="mb-8">
                <div className="flex gap-2 mb-6">
                  <Input
                    placeholder="Search FAQs..."
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
                  <TabsList className="w-full grid grid-cols-3 md:grid-cols-6">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="application">Application</TabsTrigger>
                    <TabsTrigger value="storage">Storage</TabsTrigger>
                    <TabsTrigger value="organic">Organic</TabsTrigger>
                    <TabsTrigger value="shipping">Shipping</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <AccordionItem value={faq.id}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent>
                          <div className="prose dark:prose-invert max-w-none">
                            <p>{faq.answer}</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <HelpCircle className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No FAQs found</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2">
                    We couldn't find any FAQs matching your search. Try different keywords or browse by category.
                  </p>
                  <Button
                    className="mt-4"
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setFilteredFaqs(faqs)
                    }}
                  >
                    Clear Search
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              If you couldn't find the answer you were looking for, our team is here to help. Contact us directly and
              we'll get back to you as soon as possible.
            </p>
            <Button className="bg-green-600 hover:bg-green-700" asChild>
              <a href="/contact">Contact Our Support Team</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
