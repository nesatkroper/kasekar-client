"use client";

import Link from "next/link";
import ProductCard from "@/components/product-card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Sprout, Droplets } from "lucide-react";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* Hero Section */}
      <section className='w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background'>
        <div className='container px-4 md:px-6'>
          <div className='grid gap-6 lg:grid-cols-2 lg:gap-12 items-center'>
            <motion.div
              className='flex flex-col justify-center space-y-4'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              <div className='space-y-2'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
                  Grow Better with{" "}
                  <span className='text-green-600 dark:text-green-400'>
                    NatureBoost
                  </span>{" "}
                  Fertilizers
                </h1>
                <p className='max-w-[600px] text-muted-foreground md:text-xl'>
                  Premium organic and synthetic fertilizers for farmers,
                  gardeners, and agricultural professionals.
                </p>
              </div>
              <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                <Link href='/products'>
                  <Button className='bg-green-600 hover:bg-green-700'>
                    Explore Products
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Button>
                </Link>
                <Link href='/about'>
                  <Button variant='outline'>Learn About Us</Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='mx-auto w-full max-w-[500px] aspect-video rounded-xl overflow-hidden shadow-xl'>
              <img
                alt='Fertilizer application in a green field'
                className='object-cover w-full h-full'
                src='/placeholder.svg?height=600&width=800'
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='w-full py-12 md:py-24 lg:py-32'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center justify-center space-y-4 text-center'>
            <div className='space-y-2'>
              <div className='inline-block rounded-lg bg-green-100 px-3 py-1 text-sm dark:bg-green-800'>
                Why Choose Us
              </div>
              <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>
                Sustainable Solutions for Better Growth
              </h2>
              <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Our fertilizers are formulated with the perfect balance of
                nutrients to promote healthy plant growth while respecting the
                environment.
              </p>
            </div>
          </div>
          <div className='mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12'>
            <motion.div
              className='grid gap-1 text-center'
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}>
              <div className='flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mx-auto dark:bg-green-800'>
                <Leaf className='h-10 w-10 text-green-600 dark:text-green-200' />
              </div>
              <h3 className='text-xl font-bold'>Eco-Friendly</h3>
              <p className='text-muted-foreground'>
                Environmentally responsible formulations that minimize
                ecological impact.
              </p>
            </motion.div>
            <motion.div
              className='grid gap-1 text-center'
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}>
              <div className='flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mx-auto dark:bg-green-800'>
                <Sprout className='h-10 w-10 text-green-600 dark:text-green-200' />
              </div>
              <h3 className='text-xl font-bold'>High Efficiency</h3>
              <p className='text-muted-foreground'>
                Optimized nutrient release for maximum plant uptake and growth.
              </p>
            </motion.div>
            <motion.div
              className='grid gap-1 text-center'
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}>
              <div className='flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mx-auto dark:bg-green-800'>
                <Droplets className='h-10 w-10 text-green-600 dark:text-green-200' />
              </div>
              <h3 className='text-xl font-bold'>Water Soluble</h3>
              <p className='text-muted-foreground'>
                Easy application and quick absorption for immediate results.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className='w-full py-12 md:py-24 lg:py-32 bg-muted/50'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center justify-center space-y-4 text-center'>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>
                Featured Products
              </h2>
              <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Discover our most popular fertilizer solutions
              </p>
            </div>
          </div>
          <div className='mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3'>
            {products.slice(0, 3).map((product, index) => (
              <motion.div
                key={product.productId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          <div className='flex justify-center'>
            <Link href='/products'>
              <Button variant='outline' className='gap-1'>
                View All Products
                <ArrowRight className='h-4 w-4' />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className='w-full py-12 md:py-24 lg:py-32'>
        <div className='container px-4 md:px-6'>
          <motion.div
            className='mx-auto max-w-3xl text-center'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>
                Trusted by Farmers Nationwide
              </h2>
              <p className='text-muted-foreground md:text-xl'>
                Hear what our customers have to say about our products
              </p>
            </div>
            <div className='mt-8 space-y-6'>
              <div className='rounded-lg bg-background p-6 shadow-md dark:bg-muted'>
                <p className='mb-4 italic'>
                  "Since switching to NatureBoost fertilizers, my crop yield has
                  increased by 30%. The quality of my produce has also improved
                  significantly."
                </p>
                <div>
                  <p className='font-semibold'>John Doe</p>
                  <p className='text-sm text-muted-foreground'>
                    Organic Farmer, California
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='w-full py-12 md:py-24 lg:py-32 bg-green-600 dark:bg-green-800'>
        <div className='container px-4 md:px-6 text-white'>
          <div className='flex flex-col items-center justify-center space-y-4 text-center'>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>
                Ready to Boost Your Growth?
              </h2>
              <p className='max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-green-100'>
                Contact us today to learn more about our products and how they
                can benefit your crops.
              </p>
            </div>
            <div className='flex flex-col gap-2 min-[400px]:flex-row'>
              <Link href='/contact'>
                <Button className='bg-white text-green-600 hover:bg-green-50'>
                  Contact Us
                </Button>
              </Link>
              <Link href='/products'>
                <Button
                  variant='outline'
                  className='text-white border-white hover:bg-green-700'>
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
