import * as React from 'react'
import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps,
} from '@mui/base/Unstable_NumberInput'
import { styled } from '@mui/system'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'

export const QuantityInput = React.forwardRef(function CustomNumberInput(
  props: NumberInputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: <AddIcon fontSize="small" />,
          className: 'increment',
        },
        decrementButton: {
          children: <RemoveIcon fontSize="small" />,
        },
      }}
      aria-label="Quantity Input"
      min={1}
      max={99}
      {...props}
      ref={ref}
    />
  )
})

const StyledInputRoot = styled('div')(
  () => `
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`
)

const StyledInput = styled('input')(
  ({ theme }) => `
  height: 2rem;
  line-height: 1.375;
  border-radius: 4px;
  padding: 8 10px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;
  border: 1px solid ${theme.palette.grey[400]};

  &:hover {
    border-color: ${theme.palette.grey[900]};
  }

  &:focus {
    border-color: ${theme.palette.primary.main};
    border-width: 2px;
  }

  &:focus-visible {
    outline: 0;
  }
`
)

const StyledButton = styled(Button)(
  () => `
  &.increment {
    order: 1;
  }
`
)
