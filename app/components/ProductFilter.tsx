import { useEffect, useState } from 'react'
import { Form, useSearchParams } from '@remix-run/react'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import { Product } from '../types'

type ProductFilterProps = {
  products: Product[]
  onClose: () => void
}

export function ProductFilter({ products, onClose }: ProductFilterProps) {
  const [min, max] = products.reduce(
    (arr, curr) => {
      return [
        curr.price < arr[0] ? curr.price : arr[0],
        curr.price > arr[1] ? curr.price : arr[1],
      ]
    },
    [products[0].price, products[0].price]
  )
  const [value, setValue] = useState<Array<number>>([min, max])
  const [searchParams] = useSearchParams()

  const marks = [
    {
      value: min,
      label: `$${min.toFixed(2)}`,
    },
    {
      value: max,
      label: `$${max.toFixed(2)}`,
    },
  ]

  // Effects
  useEffect(() => {
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')

    setValue([
      minPrice ? Number(minPrice) : min,
      maxPrice ? Number(maxPrice) : max,
    ])
  }, [searchParams])

  // Handler
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  return (
    <>
      <Typography gutterBottom variant="h5" component="h3" marginBottom={1}>
        Filter
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="h6" component="h4" marginBottom={1}>
        Price
      </Typography>
      <Slider
        getAriaLabel={() => 'Price range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        name="price"
        min={min}
        max={max}
        marks={marks}
      />
      <Form method="get">
        <input type="hidden" name="minPrice" value={value[0]} />
        <input type="hidden" name="maxPrice" value={value[1]} />
        <Button
          variant="contained"
          color="primary"
          sx={{ flexShrink: 0, mt: 2 }}
          onClick={onClose}
          type="submit"
          fullWidth
        >
          Show products
        </Button>
      </Form>
    </>
  )
}
