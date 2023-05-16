import * as Icon from '@mui/icons-material'
import {
  Box,
  Button,
  CardMedia,
  Input,
  Paper,
  Skeleton,
  SxProps,
  Theme,
  Typography,
} from '@mui/material'
import { CSSProperties, useEffect, useState } from 'react'
import { CartItem } from '../../data'
import { useCart } from '../contexts/CartContext'

interface Props {
  cartItem: CartItem
}

function CheckoutCard({ cartItem }: Props) {
  const { increaseProductToCart, decreaseProductFromCart, deleteProductFromCart } = useCart()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Activates skeleton while image is loading or does not load
  const handleLoad = () => {
    setLoading(false)
    setError(false)
  }

  const handleError = () => {
    setLoading(false)
    setError(true)
  }

  // inputValue state stores the value of the input field.
  const [inputValue, setInputValue] = useState<string>(cartItem.quantity.toString())
  const [deletedInputValue, setDeletedInputValue] = useState<string>(''.toString())

  // useEffect syncs inputValue with cartItem.quantity.
  useEffect(() => {
    setInputValue(cartItem.quantity.toString())
  }, [cartItem.quantity])

  // Added handleQuantityChange to update inputValue when the user types in the input field
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = event.target.value
    const thisInputValue = parseInt(newInputValue)
    if (isNaN(thisInputValue) || thisInputValue < 1) {
      setDeletedInputValue(inputValue)
    }
    setInputValue(newInputValue)
  }

  // Added handleQuantityBlur to update the cart when the input field loses focus
  const handleQuantityBlur = () => {
    const newQuantity = parseInt(inputValue)
    if (isNaN(newQuantity) || newQuantity < 1) {
      setInputValue(deletedInputValue)
      const oldQuantity = parseInt(deletedInputValue)
      increaseProductToCart(cartItem, oldQuantity - cartItem.quantity)
    } else {
      increaseProductToCart(cartItem, newQuantity - cartItem.quantity)
    }
  }

  return (
    <Paper elevation={3} sx={{ borderRadius: '0.8rem' }}>
      {/* Right side container */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }} data-cy='cart-item'>
        {/* Image */}
        <Box sx={leftContainerSx}>
          <Box sx={imageBoxStyleSx}>
            <Skeleton
              variant='rounded'
              animation='wave'
              sx={loading || error ? skeletonSx : { display: 'none' }}
            />
            <CardMedia
              sx={loading || error ? { display: 'none' } : {}}
              component='img'
              image={cartItem.image}
              alt={cartItem.title}
              onLoad={handleLoad}
              onError={handleError}
            />
          </Box>

          {/* Info box */}
          <Box sx={{ ml: 2 }}>
            <Typography data-cy='product-title' variant='h3' sx={mediaFontSizeStyleSx}>
              {cartItem.title}
            </Typography>
            <Typography
              variant='body2'
              color='secondary.dark'
              data-cy='product-price'
              sx={descriptionTextStyleSx}
            >
              ${cartItem.price} &nbsp; {'|'} &nbsp; {cartItem.color} &nbsp; {'|'} &nbsp;{' '}
              {cartItem.size}
            </Typography>
            <Typography data-cy='product-price' variant='body2' sx={productTotalStyleSx}>
              Total: ${cartItem.price * cartItem.quantity}
            </Typography>
          </Box>
        </Box>

        {/* Right side container */}

        <Box sx={rightContainerSx}>
          {/* Quantity container */}
          <Box sx={quantityBoxStyleSx}>
            <Button
              data-cy='decrease-quantity-button'
              variant='contained'
              color='secondary'
              sx={changeQuantityBtnStyleSx}
              onClick={() => {
                decreaseProductFromCart(cartItem.id, cartItem.quantity - 1)
              }}
            >
              <Typography variant='body2' sx={{ fontWeight: '800' }}>
                -
              </Typography>
            </Button>
            <Input
              color='primary'
              type='number'
              data-cy='product-quantity'
              sx={quantityStyleSx}
              value={inputValue}
              onChange={handleQuantityChange}
              onBlur={handleQuantityBlur}
              inputProps={{
                style: {
                  textAlign: 'center',
                },
                min: 1,
              }}
            />
            <Button
              data-cy='increase-quantity-button'
              variant='contained'
              color='secondary'
              sx={changeQuantityBtnStyleSx}
              onClick={() => {
                increaseProductToCart(cartItem, 1)
              }}
            >
              <Typography variant='body2' sx={{ fontWeight: '800' }}>
                +
              </Typography>
            </Button>
          </Box>

          {/* Delete button */}

          <Box sx={deleteButtonSx}>
            <Typography>
              <Icon.DeleteOutline
                onClick={() => {
                  deleteProductFromCart(cartItem)
                }}
                color='error'
                sx={{ fontSize: '2rem' }}
              />
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}

/* ----------------------
       CSS STYLING
---------------------- */

// Containers

export const rightContainerSx: SxProps<Theme> = theme => ({
  display: 'flex',
  mr: 3,
  height: '100&',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column-reverse',
  },
})

export const leftContainerSx: SxProps<Theme> = theme => ({
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
})

export const productCardStyleSx: SxProps<Theme> = theme => ({
  display: 'flex',
  maxHeight: '100px',
  [theme.breakpoints.up('md')]: { maxHeight: '150px' },
})

// Image related

const skeletonSx: SxProps<Theme> = theme => ({
  width: '100%',
  height: '100%',
})

export const imageBoxStyleSx: SxProps<Theme> = theme => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '7rem',
  minHeight: '7rem',
  maxWidth: '7rem',
  maxHeight: '7rem',
  mx: 4,
  my: 2,
  [theme.breakpoints.down('md')]: {
    minWidth: '5rem',
    minHeight: '5rem',
    maxWidth: '5rem',
    maxHeight: '5rem',
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: '7rem',
    minHeight: '7rem',
    maxWidth: '7rem',
    maxHeight: '7rem',
    mb: 1,
    mx: 2,
  },
})

export const cardImgStyle: CSSProperties = {
  height: '100%',
  width: '100%',
  objectFit: 'contain',
  borderRadius: '0.8rem',
}

// Button related

export const quantityBoxStyleSx: SxProps<Theme> = theme => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  mr: '11.95rem',
  pl: 1,
  [theme.breakpoints.down('md')]: { mr: 0, mb: '1rem' },
  [theme.breakpoints.down('sm')]: { flexGrow: 1, maxHeight: '3rem' },
})

export const quantityStyleSx: SxProps<Theme> = theme => ({
  fontWeight: '800',
  fontSize: '1.2rem',
  width: '2.8rem',
  px: 0,
  '& input': {
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
    },
    '&::-moz-inner-spin-button, &::-moz-outer-spin-button': {
      '-moz-appearance': 'none',
    },
    '&[type=number]': {
      '-moz-appearance': 'textfield',
    },
  },

  [theme.breakpoints.up('md')]: { fontSize: '1.4rem' },
})

const changeQuantityBtnStyleSx: SxProps<Theme> = theme => ({
  width: '1.4rem',
  height: '1.4rem',
  p: 0,
  m: 1,
  minWidth: 0,
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    width: '1.6rem',
    height: '1.6rem',
    m: 1.4,
  },
})

const deleteButtonSx: SxProps<Theme> = theme => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  cursor: 'pointer',
  [theme.breakpoints.down('md')]: {
    mt: 1,
    justifyContent: 'right',
  },
  [theme.breakpoints.down('sm')]: {
    alignItems: 'flex-start',
    mt: 3,
  },
})

// Text

export const mediaFontSizeStyleSx: SxProps<Theme> = theme => ({
  fontSize: '2rem',
  mt: 2,
  maxWidth: '17rem',
  overflowWrap: 'break-word',
  [theme.breakpoints.down('md')]: { fontSize: '1.4rem', mt: 1.7 },
  [theme.breakpoints.down('sm')]: { maxWidth: '15rem', mt: 1 },
  '@media (max-width: 450px)': {
    maxWidth: '12rem',
  },
  '@media (max-width: 400px)': {
    maxWidth: '8rem',
  },
})

export const descriptionTextStyleSx: SxProps<Theme> = theme => ({
  fontWeight: '700',
  fontSize: '1rem',
  mb: 3.2,
  [theme.breakpoints.down('md')]: { fontSize: '0.8rem', mb: 2 },
  [theme.breakpoints.down('sm')]: { mb: 0.6 },
})

export const productTotalStyleSx: SxProps<Theme> = theme => ({
  fontSize: '1rem',
  fontWeight: '800',
  pb: 2,
  [theme.breakpoints.up('md')]: { fontSize: '1.2rem' },
  [theme.breakpoints.down('sm')]: { py: 2 },
})

export default CheckoutCard
