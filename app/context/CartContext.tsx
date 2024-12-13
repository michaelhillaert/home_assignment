import { createContext, useReducer, useEffect, useRef, ReactNode } from 'react'
import { Cart, CartItem, Product } from '../types'

type CartContextValues = {
  addToCart: (product: Product, quantity?: number) => void
  cart: Cart
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
}

const SET_INITIAL_CART_STATE = 'SET_INITIAL_CART_STATE'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const MAX_ITEM_COUNT = 99

const defaultValues = {
  addToCart: () => {},
  cart: {
    items: [],
    total: 0,
  },
  removeFromCart: () => {},
  updateQuantity: () => {},
}

export const CartContext = createContext<CartContextValues>(defaultValues)

const isInCart = (cartItemIndex: number) =>
  cartItemIndex != null && cartItemIndex !== -1

const getcartItemIndexByProductId = (
  cartItems: CartItem[],
  productId: string
) => cartItems?.findIndex((item) => item.id === productId)

function reducer(state, action) {
  switch (action.type) {
    case SET_INITIAL_CART_STATE: {
      return action.payload
    }
    case ADD_TO_CART: {
      // Cases that need to be handled:
      //
      // 1) item exists already, quantity is provided
      // 2) item exists already, quantity is not provided
      // 3) item does not already exist, quantity is provided
      // 4) item does not already exist, quantity is not provided
      const { product, quantity } = action
      const cartItemIndex = getcartItemIndexByProductId(state.items, product.id)

      // Cases 1 and 2
      if (isInCart(cartItemIndex)) {
        state.items[cartItemIndex].quantity += quantity || 1

        return {
          ...state,
        }
      }

      // Cases 3 and 4
      return {
        ...state,
        items: [
          ...(state.items || []),
          { ...product, quantity: quantity || 1 },
        ],
      }
    }
    case REMOVE_FROM_CART: {
      const { productId } = action
      const cartItemIndex = getcartItemIndexByProductId(state.items, productId)

      if (!isInCart(cartItemIndex)) return state

      state.items.splice(cartItemIndex, 1)

      return {
        ...state,
      }
    }
    case UPDATE_QUANTITY: {
      const { productId, quantity } = action
      const cartItemIndex = getcartItemIndexByProductId(state.items, productId)

      if (!isInCart(cartItemIndex)) return state

      // Set new quantity
      if (quantity > 0 && quantity <= MAX_ITEM_COUNT)
        state.items[cartItemIndex].quantity = quantity

      return {
        ...state,
      }
    }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {})
  const isFirstUpdate = useRef(true)

  // We want to push a potentially existing cart into the state
  // to be able to use it throughout the application
  useEffect(() => {
    dispatch({
      type: SET_INITIAL_CART_STATE,
      payload: JSON.parse(localStorage.getItem('cart') || '""'),
    })
  }, [])

  // When ever the state changes we want to persist it
  // to not loose any information in case of a page refresh
  useEffect(() => {
    // We do not want/need to write the already existing
    // content immediately back into the local storage
    if (isFirstUpdate.current) {
      isFirstUpdate.current = false
      return
    }

    localStorage.setItem('cart', JSON.stringify(state))
  }, [state])

  const addToCart = (product: Product, quantity?: number) =>
    dispatch({ type: ADD_TO_CART, product, quantity })
  const removeFromCart = (productId: string) =>
    dispatch({ type: REMOVE_FROM_CART, productId })
  const updateQuantity = (productId: string, quantity: number) =>
    dispatch({ type: UPDATE_QUANTITY, productId, quantity })

  return (
    <CartContext.Provider
      value={{ cart: state, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  )
}
