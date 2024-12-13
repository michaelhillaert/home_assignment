import { useContext } from 'react'
import { useNavigate } from '@remix-run/react'
import { Product } from '../types'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Rating,
  Typography,
  styled,
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useSnackbar } from 'notistack'
import { CartContext } from '../context/CartContext'

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}))

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: 'auto',
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}))

export function ProductCard(product: Product) {
  const navigate = useNavigate()
  const { addToCart } = useContext(CartContext)
  const { enqueueSnackbar } = useSnackbar()

  // Handler
  const handleAddToCart = (product: Product) => {
    addToCart(product)
    enqueueSnackbar(`Added "${product.title.substring(0, 20)}..." to cart.`, {
      variant: 'success',
    })
  }
  const handleNavigation = () => {
    navigate(`/products/${product.id}`)
  }

  return (
    <StyledCard>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={product.image}
          alt={product.title}
          sx={{ objectFit: 'contain', padding: '1rem' }}
          onClick={handleNavigation}
        />
      </CardActionArea>
      <CardContent
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Typography gutterBottom variant="h5" component="h2">
          {product.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
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
        <Typography variant="body1" sx={{ mb: 2 }}>
          ${product.price.toFixed(2)}
        </Typography>
        <StyledButton
          variant="contained"
          startIcon={<ShoppingCartIcon />}
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </StyledButton>
      </CardContent>
    </StyledCard>
  )
}
