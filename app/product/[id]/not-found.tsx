import Link from "next/link"
import { PackageX } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProductNotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center">
      <PackageX className="h-24 w-24 text-muted-foreground mb-6" />
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Product Not Found</h1>
      <p className="mt-4 text-muted-foreground max-w-md mx-auto">
        We couldn't find the product you're looking for. It may have been removed or the URL might be incorrect.
      </p>
      <div className="mt-8">
        <Button asChild className="bg-green-600 hover:bg-green-700">
          <Link href="/products">Browse All Products</Link>
        </Button>
      </div>
    </div>
  )
}
