import { useEffect, useRef, useState } from 'react'
import { useNavigate } from '@remix-run/react'
import CircularProgress from '@mui/material/CircularProgress'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import SearchIcon from '@mui/icons-material/Search'

import { Product } from '../types'
import { STORE_API_URL } from '../helpers/configuration'
import { useClickOutside } from '../hooks/useClickOutside'

export function Search() {
  const [shouldShowSearchResults, setShouldShowSearchResults] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearchResultsLoading, setIsSearchResultsLoading] = useState(false)
  const [error, setError] = useState(null)

  const searchResultBoxRef = useRef(null)

  const { hasClickedOutside, resetClickedOutside } =
    useClickOutside(searchResultBoxRef)
  const navigate = useNavigate()

  const resetSearch = () => {
    setSearchResults([])
    setSearchQuery('')
    resetClickedOutside()
    setShouldShowSearchResults(false)
  }

  // Effects
  useEffect(() => {
    if (searchQuery === '') resetSearch()

    const productsUrl = `${STORE_API_URL}/products/`

    // Fetch the products
    const getProducts = async () => {
      setIsSearchResultsLoading(true)

      const response = await fetch(productsUrl)
      const data = await response.json()

      if (response.ok) {
        const filteredData = data.filter((item: Product) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setSearchResults(filteredData)
      } else {
        setError(data)
      }

      setIsSearchResultsLoading(false)
    }

    if (searchQuery.length) getProducts()
  }, [searchQuery])

  useEffect(() => {
    // React to click outside state
    if (hasClickedOutside) {
      setShouldShowSearchResults(false)
      resetClickedOutside()
    }

    // React to search loading state
    if (isSearchResultsLoading) {
      setShouldShowSearchResults(true)
    }
  }, [hasClickedOutside, isSearchResultsLoading, resetClickedOutside])

  // Handler
  const handleSearchResultClick = (productId: string) => {
    navigate(`/products/${productId}`)
    resetSearch()
  }

  return (
    <>
      <TextField
        id="outlined-search"
        placeholder="Search products..."
        type="search"
        size="small"
        slotProps={{
          input: {
            endAdornment: <SearchIcon />,
          },
        }}
        value={searchQuery}
        onChange={(event) => {
          setSearchQuery(event.target.value)
        }}
      />
      {shouldShowSearchResults && (
        <Paper
          sx={{
            position: 'absolute',
            top: 'calc(100% + .5rem)',
            right: 0,
            width: { xs: '100%', md: 'auto' },
            minHeight: 200,
            minWidth: 320,
          }}
          ref={searchResultBoxRef}
        >
          {isSearchResultsLoading && (
            <CircularProgress
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                margin: 'auto',
              }}
            />
          )}
          {error
            ? error
            : !isSearchResultsLoading &&
              searchResults?.map((product: Product) => (
                <MenuItem
                  key={product.id}
                  onClick={() => handleSearchResultClick(product.id)}
                >
                  {`${product.title.substring(0, 30)}...`}
                </MenuItem>
              ))}
        </Paper>
      )}
    </>
  )
}
