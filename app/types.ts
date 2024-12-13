export type Product = {
  category: string
  description: string
  id: string
  image: string
  price: number
  rating: {
    count: number
    rate: number
  }
  title: string
}

export type CartItem = Product & {
  quantity: number
}

export type Cart = {
  items: CartItem[]
  total: number
}

export type ProductRefinements = {
  category?: string
  minPrice?: string
  maxPrice?: string
}
