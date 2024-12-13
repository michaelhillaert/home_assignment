import { useContext } from 'react'
import { useLoaderData, MetaFunction } from '@remix-run/react'
import { LoaderFunctionArgs } from '@remix-run/node'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'
import Rating from '@mui/material/Rating'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Typography } from '@mui/material'

import { Product } from '../types'
import { BRAND_NAME } from '../helpers/configuration'
import { getProduct } from '../helpers/product'
import { CartContext } from '../context/CartContext'

// Meta
export const meta: MetaFunction = ({ data }) => {
  const { title, description } = data as Product

  return [
    { title: `${BRAND_NAME} | ${title}` },
    {
      name: 'description',
      content: description,
    },
  ]
}

// Loader
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { productId } = params || {}
  return await getProduct(productId || '')
}

export default function ProductDetailsPage() {
  const product = useLoaderData<typeof loader>()
  const { addToCart } = useContext(CartContext)

  const addToCartHandler = () => {
    addToCart(product)
  }

  return (
    <Box>
      <Button
        variant="text"
        size="small"
        sx={{ mb: 4 }}
        startIcon={<KeyboardBackspaceIcon />}
        href={`/categories/${product.category}`}
      >
        Back to category
      </Button>
      <Grid
        container
        spacing={{ xs: 4, md: 8 }}
        columns={{ xs: 12, sm: 12, md: 12 }}
        flexDirection={{ xs: 'column', sm: 'row' }}
      >
        <Box flex={4}>
          <img src={product.image} alt={product.title} width="100%" />
        </Box>
        <Box flex={8}>
          <Typography variant="h2" marginBottom={1}>
            {product.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating
              name={`rating-${product.id}`}
              value={product.rating.rate}
              precision={0.1}
              readOnly
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.rating.rate})
            </Typography>
          </Box>
          <Typography variant="body1" marginBottom={2}>
            {product.description}
          </Typography>
          <Typography variant="h3" component="p" sx={{ mb: 4 }}>
            ${product.price.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={addToCartHandler}
            sx={{ flexShrink: 0 }}
          >
            Add to cart
          </Button>
        </Box>
      </Grid>
    </Box>
  )
}
