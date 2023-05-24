import * as Icon from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  SxProps,
  TextField,
  Theme,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { Product, generateId } from '../../data';
import { useProducts } from '../contexts/ProductsContext';

/* ----------------------
      YUP VALIDATION
---------------------- */

// type YupProduct = Record<keyof Omit<Product, 'id'>, Yup.AnySchema>;

const adminFormSchema = Yup.object().shape({
  title: Yup.string()
    .required('Please write a product title')
    .min(
      2,
      'The title you have given us it too short. Please give us a name of minimum 2 characters.'
    ),
  price: Yup.number()
    .required('Please enter a price for your product.')
    .min(2, 'The price you have given is to low. We need to go profit.'),
  size: Yup.string(),
  // .required('Please enter a size for your product.')
  color: Yup.string()
    // .required('Please enter a color for your product.')
    .min(
      1,
      'The name of the color you have given us it too short. Please give us a name of minimum 5 characters.'
    ),
  image: Yup.string()
    .matches(
      /\.(png|jpg|jpeg)$/,
      'The URL you have given us is not valid. Valid image formats are ".png", ".jpg", or "jpeg".'
    )
    .required('Please enter an image-URL for your product.'),
  description: Yup.string()
    .required('Please write a long product description.')
    .min(
      5,
      'The description you have given us it too short. Please give us a name of minimum 5 characters.'
    ),
  details1: Yup.string().min(
    3,
    'The detail you have given us it too short. Please give us a detail of minimum 3 characters.'
  ),
  details2: Yup.string().min(
    3,
    'The detail you have given us it too short. Please give us a detail of minimum 3 characters.'
  ),
  details3: Yup.string().min(
    3,
    'The detail you have given us it too short. Please give us a detail of minimum 3 characters.'
  ),
  inStock: Yup.string(),
});

/* ----------------------
         FORMIK
---------------------- */

type adminFormValues = Yup.InferType<typeof adminFormSchema>;

interface Props {
  product?: Product;
  onSave: () => void;
}

function AdminProductForm({ onSave, product }: Props) {
  const [imageUploaded, setImageUploaded] = useState<boolean>(false);
  const { databaseProducts, setDatabaseProducts } = useProducts();

  const formik = useFormik<adminFormValues>({
    validationSchema: adminFormSchema,
    initialValues: product || {
      id: '',
      image: '',
      title: '',
      description: '',
      price: 0,
      details1: '',
      details2: '',
      details3: '',
      size: '',
      color: '',
      inStock: 'true',
    },
    onSubmit: values => {
      if (product) {
        const updatedProduct: Product = {
          id: product.id,
          image: values.image,
          title: values.title,
          description: values.description,
          price: values.price,
          details1: values.details1 as string,
          details2: values.details2 as string,
          details3: values.details3 as string,
          size: values.size as string,
          color: values.color as string,
          inStock: values.inStock as string,
        };

        const productIndex = databaseProducts.findIndex(
          p => p.id === product?.id
        );

        const updatedDatabaseProducts = [
          ...databaseProducts.slice(0, productIndex),
          updatedProduct,
          ...databaseProducts.slice(productIndex + 1),
        ];

        // Updates product
        setDatabaseProducts(updatedDatabaseProducts);
      } else {
        // Generates new ID
        const newId = generateId();

        // Adds new product
        const newProduct: Product = {
          id: newId,
          image: values.image,
          title: values.title,
          description: values.description,
          price: values.price,
          details1: values.details1 as string,
          details2: values.details2 as string,
          details3: values.details3 as string,
          size: values.size as string,
          color: values.color as string,
          inStock: values.inStock as string,
        };
        setDatabaseProducts([...databaseProducts, newProduct]);
      }

      // Closes form
      onSave();
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length <= 0) {
      return;
    }

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/images', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Something went wrong');

      const data = await response.json();
      console.log('answer from post image:', data);
      formik.setFieldValue('image', data);
      setImageUploaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  /* --------------------------
       ADMIN FORM COMPONENT
  -------------------------- */

  return (
    <>
      <Container>
        <Paper elevation={3}>
          <Container sx={formContainer}>
            <Typography sx={fontStyle} variant='h3'>
              {product ? `Editing "${product.title}"` : 'Add new product'}
            </Typography>
            {/* <Box sx={{ flexGrow: 1, margin: '1rem' }}>
              <input type='file' accept='image/*' onChange={handleFileChange} />
            </Box> */}
            <form data-cy='product-form' onSubmit={formik.handleSubmit}>
              {/* Header */}
              <Typography
                sx={{ ml: '0.2rem', mt: '0.4rem', mb: '1rem' }}
                variant='body2'
                gutterBottom
              >
                {product ? `ID: "${product.id}"` : ''}
              </Typography>

              {/* Image */}
              {imageUploaded ? (
                <>
                  <Typography>
                    Image successfully uploaded!{' '}
                    <Icon.Check style={{ color: 'green' }} />
                  </Typography>
                </>
              ) : (
                <TextField
                  fullWidth
                  id='image'
                  // label='Product title'
                  value={formik.values.title}
                  // onChange={formik.handleChange}
                  onChange={handleFileChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                  margin='normal'
                  type='file'
                  inputProps={{
                    'data-cy': 'product-title',
                    style: { fontFamily: 'Lora' },
                  }}
                  FormHelperTextProps={
                    { 'data-cy': 'product-title-error' } as never
                  }
                />
              )}

              {/* Title */}
              <TextField
                fullWidth
                id='title'
                label='Product title'
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                margin='normal'
                inputProps={{
                  'data-cy': 'product-title',
                  style: { fontFamily: 'Lora' },
                }}
                FormHelperTextProps={
                  { 'data-cy': 'product-title-error' } as never
                }
              />

              {/* Price */}
              <TextField
                fullWidth
                id='price'
                label='Product price'
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                margin='normal'
                inputProps={{
                  'data-cy': 'product-price',
                  style: { fontFamily: 'Lora' },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>$</InputAdornment>
                  ),
                }}
                FormHelperTextProps={
                  { 'data-cy': 'product-price-error' } as never
                }
              />

              {/* Size */}
              <Box sx={{ mt: 2, ml: 1.7, mb: '0.6rem' }}>
                <FormControl>
                  <FormLabel id='demo-radio-buttons-group-label'>
                    Size
                  </FormLabel>
                  <RadioGroup
                    id='size'
                    row
                    aria-labelledby='demo-radio-buttons-group-label'
                    name='inStock'
                    value={formik.values.size}
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel
                      name='size'
                      value={'XS'}
                      control={<Radio />}
                      label='XS'
                    />
                    <FormControlLabel
                      name='size'
                      value={'S'}
                      control={<Radio />}
                      label='S'
                    />
                    <FormControlLabel
                      name='size'
                      value={'M'}
                      control={<Radio />}
                      label='M'
                    />
                    <FormControlLabel
                      name='size'
                      value={'L'}
                      control={<Radio />}
                      label='L'
                    />
                    <FormControlLabel
                      name='size'
                      value={'XL'}
                      control={<Radio />}
                      label='XL'
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              {/* Color */}
              <TextField
                fullWidth
                id='color'
                label='Hat color'
                value={formik.values.color}
                onChange={formik.handleChange}
                error={formik.touched.color && Boolean(formik.errors.color)}
                helperText={formik.touched.color && formik.errors.color}
                margin='normal'
              />

              {/* Image */}
              <TextField
                fullWidth
                id='image'
                label='Image (URL)'
                value={formik.values.image}
                onChange={formik.handleChange}
                error={formik.touched.image && Boolean(formik.errors.image)}
                helperText={formik.touched.image && formik.errors.image}
                margin='normal'
                inputProps={{
                  'data-cy': 'product-image',
                  style: { fontFamily: 'Lora' },
                }}
                FormHelperTextProps={
                  { 'data-cy': 'product-image-error' } as never
                }
              />

              {/* Description */}
              <TextField
                fullWidth
                id='description'
                label='Product description'
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                margin='normal'
                inputProps={{
                  'data-cy': 'product-description',
                  style: { fontFamily: 'Lora' },
                }}
                FormHelperTextProps={
                  { 'data-cy': 'product-description-error' } as never
                }
              />

              {/* Detail 1 */}
              <TextField
                fullWidth
                id='details1'
                label='Product detail #1 (optional)'
                value={formik.values.details1}
                onChange={formik.handleChange}
                error={
                  formik.touched.details1 && Boolean(formik.errors.details1)
                }
                helperText={formik.touched.details1 && formik.errors.details1}
                margin='normal'
              />

              {/* Detail 2 */}
              <TextField
                fullWidth
                id='details2'
                label='Product detail #2 (optional)'
                value={formik.values.details2}
                onChange={formik.handleChange}
                error={
                  formik.touched.details2 && Boolean(formik.errors.details2)
                }
                helperText={formik.touched.details2 && formik.errors.details2}
                margin='normal'
              />

              {/* Detail 3 */}
              <TextField
                fullWidth
                id='details3'
                label='Product detail #3 (optional)'
                value={formik.values.details3}
                onChange={formik.handleChange}
                error={
                  formik.touched.details3 && Boolean(formik.errors.details3)
                }
                helperText={formik.touched.details3 && formik.errors.details3}
                margin='normal'
              />

              {/* In stock */}
              <Box sx={{ mt: 1, ml: 1.7, mb: '1rem' }}>
                <FormControl>
                  <FormLabel id='demo-radio-buttons-group-label'>
                    In stock
                  </FormLabel>
                  <RadioGroup
                    id='inStock'
                    row
                    aria-labelledby='demo-radio-buttons-group-label'
                    name='inStock'
                    value={formik.values.inStock}
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel
                      name='inStock'
                      value={'true'}
                      control={<Radio />}
                      label='Yes'
                    />
                    <FormControlLabel
                      name='inStock'
                      value={'false'}
                      control={<Radio />}
                      label='No'
                    />
                  </RadioGroup>
                </FormControl>

                {/* Categories */}

                <FormGroup>
                  <FormLabel>Categories</FormLabel>
                  <FormControlLabel control={<Checkbox />} label='Hats' />
                  <FormControlLabel control={<Checkbox />} label='Coats' />
                </FormGroup>
              </Box>

              {/* Buttons */}
              <Box sx={buttonContainer}>
                <Button
                  sx={editBtnSx}
                  color='primary'
                  variant='contained'
                  type='submit'
                >
                  {product ? `Edit "${product.title}"` : 'Add product'}
                </Button>
                <Button
                  sx={closeBtnSx}
                  variant='contained'
                  onClick={onSave}
                  color='error'
                >
                  Close
                </Button>
              </Box>
            </form>
          </Container>
        </Paper>
      </Container>
    </>
  );
}

/* ----------------------
       CSS STYLING
---------------------- */

const formContainer: SxProps<Theme> = theme => ({
  width: '70%',
  paddingTop: '5rem',
  paddingBottom: '4rem',
});

const buttonContainer: SxProps<Theme> = theme => ({
  mt: 3,
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
});

const editBtnSx: SxProps<Theme> = theme => ({
  ml: 3,
  '&:hover': {
    color: 'white',
  },
  [theme.breakpoints.down('sm')]: {
    ml: 0,
    mb: 2,
  },
});
const closeBtnSx: SxProps<Theme> = theme => ({
  ml: 3,
  '&:hover': {
    backgroundColor: 'white',
    color: 'red',
  },
  [theme.breakpoints.down('sm')]: {
    ml: 0,
    mb: 2,
  },
});

const fontStyle: SxProps<Theme> = theme => ({
  [theme.breakpoints.down('md')]: {
    fontSize: '1.9rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.3rem',
  },
});

export default AdminProductForm;
