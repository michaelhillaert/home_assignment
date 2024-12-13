import { STORE_API_URL } from './configuration'

export async function getCategories(): Promise<string[]> {
  const categoriesURL = `${STORE_API_URL}/products/categories`

  try {
    const response = await fetch(categoriesURL)
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
