import { useContext, useState } from 'react'
import { Link, useNavigate } from '@remix-run/react'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Drawer from '@mui/material/Drawer'
import MenuIcon from '@mui/icons-material/Menu'
import PersonIcon from '@mui/icons-material/Person'
import { Typography } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

import { FakeStoreApiContext } from '../context/FakeStoreApiContext'
import { CartContext } from '../context/CartContext'
import { BRAND_NAME } from '../helpers/configuration'
import { Search } from './Search'

export function Header() {
  const [openMenu, setOpenMenu] = useState(false)
  const { categories } = useContext(FakeStoreApiContext)
  const { cart } = useContext(CartContext)
  const navigate = useNavigate()

  const toggleDrawer = (isOpen: boolean) => () => {
    setOpenMenu(isOpen)
  }

  // Handler
  const handleAccountMenuClick = () => {
    console.log('handleAccountMenuClick')
  }

  const handleCartClick = () => {
    navigate('/cart')
  }

  const handleMenuClick = (category: string) => {
    setOpenMenu(false)
    navigate(`/categories/${category}`)
  }

  return (
    <AppBar
      enableColorOnDark
      sx={{
        boxShadow: 0,
        background: 'none',
        backgroundImage: 'none',
        position: 'relative',
        borderBottom: '1px solid',
        borderColor: 'divider',
        marginBottom: 4,
      }}
    >
      <Toolbar
        variant="dense"
        disableGutters
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          py: 1,
          px: 0,
        }}
      >
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography
              variant="h2"
              component="h1"
              color="primary"
              sx={{ mr: 4, letterSpacing: '.1em' }}
            >
              {BRAND_NAME}
            </Typography>
          </Link>
          <Box sx={{ display: { xs: 'none', lg: 'flex' } }}>
            {categories?.map((category) => (
              <Button
                key={category}
                href={`/categories/${category}`}
                sx={{
                  m: 1,
                  display: 'inline-block',
                  color: 'grey.800',
                }}
              >
                {category}
              </Button>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'flex' },
            gap: 2,
            alignItems: 'center',
          }}
        >
          <Search />
          <IconButton
            size="small"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleAccountMenuClick}
            color="primary"
          >
            <PersonIcon />
          </IconButton>
          <IconButton
            size="small"
            aria-label="cart of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleCartClick}
            color="primary"
          >
            <Badge color="warning" badgeContent={cart?.items?.length}>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton
            aria-label="Menu button"
            onClick={toggleDrawer(true)}
            sx={{ display: { lg: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="top"
            open={openMenu}
            onClose={toggleDrawer(false)}
            PaperProps={{
              sx: {
                top: 'var(--template-frame-height, 0px)',
              },
            }}
          >
            <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <IconButton onClick={toggleDrawer(false)}>
                  <CloseRoundedIcon />
                </IconButton>
              </Box>

              {categories?.map((category) => (
                <MenuItem
                  key={category}
                  onClick={() => handleMenuClick(category)}
                >
                  {category}
                </MenuItem>
              ))}
              <Divider sx={{ my: 3 }} />
              <MenuItem>
                <Button color="primary" variant="outlined" fullWidth>
                  Sign in
                </Button>
              </MenuItem>
            </Box>
          </Drawer>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
