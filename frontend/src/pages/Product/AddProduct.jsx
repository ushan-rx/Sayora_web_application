import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const ProductFormSchema = Yup.object().shape({
  productName: Yup.string()
    .required('Product name is required'),
  description: Yup.string()
    .required('Description is required'),
  stock: Yup.number()
    .typeError("Stock must be a number")
    .positive("Stock must be positive")
    .integer("Stock must be an integer")
    .required('Stock is required'),
  unitPrice: Yup.number()
    .typeError("Unit price must be a number")
    .positive("Unit price must be positive")
    .required('Unit price is required'),
  image: Yup.mixed()
    .required('A file is required'),
});

const AddProduct = () => {
  const initialValues = {
    productName: '',
    description: '',
    stock: '',
    unitPrice: '',
    image: undefined,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append('productName', values.productName);
    formData.append('description', values.description);
    formData.append('stock', values.stock);
    formData.append('unitPrice', values.unitPrice);
    formData.append('image', values.image);

    try {
      const response = await axios.post('http://localhost:5000/addProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      // Handle the response accordingly
    } catch (error) {
      console.error('There was an error!', error);
      // Handle the error accordingly
    }

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ProductFormSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className="flex flex-col p-6 border border-blue-500 rounded shadow-lg max-w-md mx-auto mt-20">
          <h1 className='text-3xl mb-10 text-center'>Add Products</h1>

          <Field name="productName" placeholder="Name" className="mb-2 p-4 border rounded" />
          <ErrorMessage name="productName" component="div" className="text-red-500 text-sm" />

          <Field name="unitPrice" placeholder="Unit Price" className="mb-2 p-4 border rounded" />
          <ErrorMessage name="unitPrice" component="div" className="text-red-500 text-sm" />

          <Field name="stock" placeholder="Stock" className="mb-2 p-4 border rounded" />
          <ErrorMessage name="stock" component="div" className="text-red-500 text-sm" />

          <Field as="textarea" name="description" placeholder="Description" className="mb-2 p-4 border rounded" />
          <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />

          <input name="image" type="file" onChange={(event) => {
            setFieldValue("image", event.currentTarget.files[0]);
          }} className="mb-4" />
          <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />

          <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white p-2 rounded">
            Add
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddProduct;
