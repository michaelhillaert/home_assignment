import { Product, ProductRefinements } from '../types'
import { STORE_API_URL } from './configuration'

export async function getProducts({
  category,
  minPrice,
  maxPrice,
}: ProductRefinements): Promise<Product[]> {
  let productsURL = `${STORE_API_URL}/products`

  if (category) productsURL += `/category/${category}`

  try {
    const response = await fetch(productsURL)
    let data = await response.json()

    // Filter products by min and max prices, if provided
    if (minPrice)
      data = data.filter(({ price }: Product) => price >= Number(minPrice))
    if (maxPrice)
      data = data.filter(({ price }: Product) => price <= Number(maxPrice))

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw error
    }
  }
}

export async function getProduct(productId: string): Promise<Product> {
  const productURL = `${STORE_API_URL}/products/${productId}`

  try {
    const response = await fetch(productURL)
    const data = await response.json()

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw error
    }
  }
}
