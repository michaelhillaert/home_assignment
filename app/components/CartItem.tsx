import { useContext } from 'react'
import { useNavigate } from '@remix-run/react'
import { CartItem } from '../types'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  styled,
} from '@mui/material'
import { CartContext } from '../context/CartContext'
import { QuantityInput } from '../components/QuantityInput'

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  transition: 'transform 0.2s',

  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}))

export function CartCard({ quantity, ...product }: CartItem) {
  // Hooks
  const navigate = useNavigate()
  const { removeFromCart, updateQuantity } = useContext(CartContext)

  // Handlers
  const handleNavigation = () => {
    navigate(`/products/${product.id}`)
  }

  const handleQuantityChange = (_: void, value: number) => {
    updateQuantity(product.id, value)
  }

  return (
    <StyledCard>
      <CardActionArea sx={{ alignSelf: 'flex-start', width: '150px' }}>
        <CardMedia
          component="img"
          height="100"
          width="100"
          image={product.image}
          alt={product.title}
          sx={{ objectFit: 'contain', padding: '1rem' }}
          onClick={handleNavigation}
        />
      </CardActionArea>
      <CardContent sx={{ flex: 1, px: 4, py: 2 }}>
        <Typography gutterBottom variant="h5" component="h3">
          {product.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          ${product.price.toFixed(2)}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
            alignItems: 'center',
          }}
        >
          <QuantityInput value={quantity} onChange={handleQuantityChange} />
          <Button
            variant="text"
            color="primary"
            size="small"
            onClick={() => removeFromCart(product.id)}
            sx={{ marginLeft: 'auto' }}
          >
            Remove item
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
  )
}
