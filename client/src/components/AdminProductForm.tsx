import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Input,
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
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Product } from '../../data';
import { useProducts } from '../contexts/ProductsContext';

/* ----------------------
      YUP VALIDATION
---------------------- */

const adminFormSchema = Yup.object().shape({
  name: Yup.string()
    .required('Please write a product title')
    .min(
      2,
      'The title you have given us it too short. Please give us a name of minimum 2 characters.'
    ),
  price: Yup.number()
    .required('Please enter a price for your product.')
    .min(2, 'The price you have given is to low. We need to go profit.'),
  size: Yup.string().required('Please enter a size for your product.'),
  color: Yup.string()
    .required('Please enter a color for your product.')
    .min(
      1,
      'The name of the color you have given us it too short. Please give us a name of minimum 5 characters.'
    ),
  image: Yup.string().required(),
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
  inStock: Yup.number().required('Please enter a number of products in stock.'),
  category: Yup.array(),
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
  const navigate = useNavigate();
  const { products, getProducts } = useProducts();

  const formik = useFormik<adminFormValues>({
    validationSchema: adminFormSchema,
    initialValues: product || {
      image: '',
      name: '',
      description: '',
      price: 0,
      details: [],
      size: '',
      color: '',
      inStock: 0,
      category: [],
    },
    onSubmit: async values => {
      const details = [
        values.details1,
        values.details2,
        values.details3,
      ].filter(d => d !== '');
      const productData = {
        ...values, // Takes all the values of the form
        details: details, // sets details into whatever those 3 was combined
      };
      if (product) {
        try {
          const response = await fetch(`/api/product/update/${product._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
          });
          if (!response.ok) throw new Error('Something went wrong');
          const data = await response.json();
          enqueueSnackbar('Your product has been updated', {
            variant: 'success',
          });
          getProducts();
          navigate('/admin');
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          const response = await fetch('/api/product/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
          });
          if (!response.ok) throw new Error('Something went wrong');

          const data = await response.json();
          enqueueSnackbar('Your product has been added', {
            variant: 'success',
          });
          getProducts();
          navigate('/admin');
          onSave();
        } catch (error) {
          console.error(error);
        }
      }
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
              {product ? `Editing "${product.name}"` : 'Add new product'}
            </Typography>
            <Box sx={{ flexGrow: 1, margin: '1rem' }}>
              <input type='file' accept='image/*' onChange={handleFileChange} />
            </Box>
            <form data-cy='product-form' onSubmit={formik.handleSubmit}>
              <Typography
                sx={{ ml: '0.2rem', mt: '0.4rem', mb: '1rem' }}
                variant='body2'
                gutterBottom
              >
                {product ? `ID: "${product._id}"` : ''}
              </Typography>

              {imageUploaded ? (
                <>
                  <Typography>Image successfully uploaded! ✔</Typography>
                </>
              ) : (
                <></>
              )}

              <TextField
                fullWidth
                name='name'
                id='name'
                label='Product name'
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                margin='normal'
                inputProps={{
                  'data-cy': 'product-title',
                  style: { fontFamily: 'Lora' },
                }}
                FormHelperTextProps={
                  { 'data-cy': 'product-name-error' } as never
                }
              />

              <TextField
                fullWidth
                name='price'
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

              <Box sx={{ mt: 2, ml: 1.7, mb: '0.6rem' }}>
                <FormControl>
                  <FormLabel id='demo-radio-buttons-group-label'>
                    Size
                  </FormLabel>
                  <RadioGroup
                    name='size'
                    id='size'
                    row
                    aria-labelledby='demo-radio-buttons-group-label'
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

              <TextField
                fullWidth
                name='color'
                id='color'
                label='Hat color'
                value={formik.values.color}
                onChange={formik.handleChange}
                error={formik.touched.color && Boolean(formik.errors.color)}
                helperText={formik.touched.color && formik.errors.color}
                margin='normal'
              />
              <TextField
                fullWidth
                name='description'
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

              <TextField
                fullWidth
                name='details1'
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

              <TextField
                fullWidth
                name='details2'
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

              <TextField
                fullWidth
                name='details3'
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

              <Box sx={{ mt: 1, ml: 1.7, mb: '1rem' }}>
                <FormControl>
                  <FormLabel id='demo-radio-buttons-group-label'>
                    In stock
                  </FormLabel>
                  <Input
                    name='inStock'
                    id='inStock'
                    value={formik.values.inStock}
                    onChange={formik.handleChange}
                    fullWidth
                    type='number'
                  />
                </FormControl>

                <FormGroup>
                  <FormLabel>Categories</FormLabel>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name='hats'
                        checked={formik.values.category?.includes('Hats')}
                        onChange={() => {
                          if (formik.values.category?.includes('Hats')) {
                            formik.setFieldValue(
                              'category',
                              formik.values.category?.filter(
                                category => category !== 'Hats'
                              )
                            );
                          }
                          if (formik.values.category !== undefined) {
                            formik.setFieldValue('category', [
                              ...formik.values.category,
                              'Hats',
                            ]);
                          }
                        }}
                      />
                    }
                    label='Hats'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name='coat'
                        checked={formik.values.category?.includes('Coats')}
                        onChange={() => {
                          if (formik.values.category?.includes('Coats')) {
                            formik.setFieldValue(
                              'category',
                              formik.values.category?.filter(
                                category => category !== 'Coats'
                              )
                            );
                          }
                          if (formik.values.category !== undefined) {
                            formik.setFieldValue('category', [
                              ...formik.values.category,
                              'Coats',
                            ]);
                          }
                        }}
                      />
                    }
                    label='Coats'
                  />
                </FormGroup>
              </Box>

              <Box sx={buttonContainer}>
                <Button
                  sx={editBtnSx}
                  color='primary'
                  variant='contained'
                  type='submit'
                >
                  {product ? `Edit "${product.name}"` : 'Add product'}
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
