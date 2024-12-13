import { useState } from 'react'
import {
  useLoaderData,
  useParams,
  useSearchParams,
  MetaFunction,
} from '@remix-run/react'
import { LoaderFunctionArgs } from '@remix-run/node'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Drawer from '@mui/material/Drawer'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import FilterListIcon from '@mui/icons-material/FilterList'
import { SnackbarProvider } from 'notistack'
import { getProducts } from '../helpers/product'
import { BRAND_NAME } from '../helpers/configuration'
import { ProductList } from '../components/ProductList'
import { ProductFilter } from '../components/ProductFilter'

// Meta
export const meta: MetaFunction = ({ params }) => {
  const { category } = params

  return [
    { title: `${BRAND_NAME} | ${category}` },
    {
      name: 'description',
      content: `Shop products in ${category}`,
    },
  ]
}

// Loader
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const minPrice = url.searchParams.get('minPrice') || undefined
  const maxPrice = url.searchParams.get('maxPrice') || undefined
  return await getProducts({ category: params.category, minPrice, maxPrice })
}

export default function ProductListPage() {
  const products = useLoaderData<typeof loader>()
  const params = useParams()
  const [openFilter, setOpenFilter] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const toggleFilter = (isOpen: boolean) => () => {
    setOpenFilter(isOpen)
  }

  const filters = []
  for (const [key, value] of searchParams.entries()) {
    filters.push(
      <Chip
        label={`${key}: ${value}`}
        onDelete={() => handleSearchParamRemoval(key)}
      />
    )
  }

  // Handler
  const handleSearchParamRemoval = (searchParam: string) => {
    searchParams.delete(searchParam)
    setSearchParams(searchParams)
  }

  return (
    <SnackbarProvider maxSnack={5}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          {params.category}
        </Typography>

        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          sx={{ marginLeft: 'auto' }}
          onClick={toggleFilter(true)}
        >
          Filter
        </Button>
        <Drawer open={openFilter} anchor="right" onClose={toggleFilter(false)}>
          <Box sx={{ width: 320, p: 4 }} role="presentation">
            <ProductFilter products={products} onClose={toggleFilter(false)} />
          </Box>
        </Drawer>
      </Box>
      {Boolean(searchParams.size) && (
        <Grid container spacing={1} alignItems="center" marginBottom={2}>
          <Typography variant="h6" component="p">
            Active Filter:
          </Typography>
          {filters}
        </Grid>
      )}

      {products?.length && <ProductList products={products} />}
    </SnackbarProvider>
  )
}
