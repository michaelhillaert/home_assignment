import { Grid2 as Grid } from '@mui/material'
import { ProductCard } from '../components/ProductCard'
import { Product } from '../types'

type ProductListProps = {
  products: Product[]
}

export function ProductList({ products }: ProductListProps) {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {products.map((product) => (
        <Grid key={product.id} size={{ xs: 2, sm: 4, md: 4, lg: 3 }}>
          <ProductCard {...product} />
        </Grid>
      ))}
    </Grid>
  )
}
