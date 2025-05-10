"use client"

import { motion } from "framer-motion"
import { Award, Users, Leaf, Factory } from "lucide-react"

export default function AboutPage() {
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
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About NatureBoost</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Learn about our company's mission, values, and commitment to sustainable agriculture.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">Our Story</h2>
                <p className="text-muted-foreground md:text-lg">
                  Founded in 2005, NatureBoost began with a simple mission: to create fertilizers that maximize crop
                  yields while minimizing environmental impact. Our founder, a third-generation farmer, experienced
                  firsthand the challenges of balancing productivity with sustainability.
                </p>
                <p className="text-muted-foreground md:text-lg">
                  After years of research and development, we launched our first line of eco-friendly fertilizers.
                  Today, we're proud to serve farmers across the country with innovative solutions that nourish both
                  crops and the planet.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto w-full max-w-[500px] aspect-video rounded-xl overflow-hidden shadow-xl"
            >
              <img
                alt="NatureBoost company headquarters"
                className="object-cover w-full h-full"
                src="/placeholder.svg?height=600&width=800"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Values</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                The principles that guide everything we do
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              className="flex flex-col items-center space-y-2 border rounded-lg p-4 bg-background"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Leaf className="h-10 w-10 text-green-600" />
              <h3 className="text-xl font-bold">Sustainability</h3>
              <p className="text-center text-muted-foreground">We create products that work in harmony with nature.</p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center space-y-2 border rounded-lg p-4 bg-background"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Award className="h-10 w-10 text-green-600" />
              <h3 className="text-xl font-bold">Quality</h3>
              <p className="text-center text-muted-foreground">
                We never compromise on the effectiveness of our products.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center space-y-2 border rounded-lg p-4 bg-background"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Factory className="h-10 w-10 text-green-600" />
              <h3 className="text-xl font-bold">Innovation</h3>
              <p className="text-center text-muted-foreground">
                We continuously research and develop better solutions.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center space-y-2 border rounded-lg p-4 bg-background"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Users className="h-10 w-10 text-green-600" />
              <h3 className="text-xl font-bold">Community</h3>
              <p className="text-center text-muted-foreground">We support the farmers who feed our world.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mx-auto w-full max-w-[500px] aspect-video rounded-xl overflow-hidden shadow-xl order-2 lg:order-1"
            >
              <img
                alt="NatureBoost research facility"
                className="object-cover w-full h-full"
                src="/placeholder.svg?height=600&width=800"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">Our Commitment</h2>
                <p className="text-muted-foreground md:text-lg">
                  At NatureBoost, we're committed to supporting sustainable agriculture through innovative fertilizer
                  solutions. We invest heavily in research and development to create products that deliver exceptional
                  results while minimizing environmental impact.
                </p>
                <p className="text-muted-foreground md:text-lg">
                  We also provide education and support to help farmers implement best practices for soil health and
                  crop management. Our team of agronomists works directly with customers to develop customized
                  fertilization plans based on soil tests and crop requirements.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
