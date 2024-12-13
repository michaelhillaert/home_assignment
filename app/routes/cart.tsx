import { useContext } from 'react'
import { MetaFunction, useNavigate } from '@remix-run/react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { CartContext } from '../context/CartContext'
import { CartCard } from '../components/CartItem'
import { BRAND_NAME } from '../helpers/configuration'

// Meta
export const meta: MetaFunction = () => {
  return [
    { title: `${BRAND_NAME} | Cart` },
    {
      name: 'description',
      content: 'View what is in your cart',
    },
  ]
}

export default function Cart() {
  const { cart } = useContext(CartContext)
  const navigate = useNavigate()

  const total = cart?.items?.reduce((acc, curr) => {
    return (acc += curr.quantity * curr.price)
  }, 0)

  const hasCartItems = cart?.items?.length

  return (
    <Box>
      <Typography variant="h2" mb={2}>
        Cart
      </Typography>
      <Button
        variant="text"
        size="small"
        sx={{ my: 2 }}
        startIcon={<KeyboardBackspaceIcon />}
        onClick={() => navigate(-1)}
      >
        Continue shopping
      </Button>

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        flexDirection={{ xs: 'column', md: 'row' }}
        alignItems="top"
      >
        <Grid container spacing={{ xs: 2, md: 3 }} flex={3}>
          {hasCartItems ? (
            cart.items.map((item) => <CartCard key={item.id} {...item} />)
          ) : (
            <Typography variant="body1">
              Currently there are no items in your cart.
            </Typography>
          )}
        </Grid>
        <Box sx={{ flex: 1 }} justifyItems="flex-end">
          <Typography variant="body1" fontWeight="bold">
            Total:{' '}
            <Typography variant="body1" component="span">
              ${total?.toFixed(2) || 0}
            </Typography>
          </Typography>
          <Button variant="contained" sx={{ mt: 2 }} disabled={!hasCartItems}>
            Checkout
          </Button>
        </Box>
      </Grid>
    </Box>
  )
}
