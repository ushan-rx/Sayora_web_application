import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";


// Schema for form validation
const ProductFormSchema = Yup.object().shape({
  productName: Yup.string()
  .matches(/^[A-Za-z\s]+$/, 'Product name should contain only characters')
  .typeError("product name must be characters")
  .required("Product name is required"),
  description: Yup.string().required("Description is required"),
  stock: Yup.number()
    .typeError("Stock must be a number")
    .positive("Stock must be positive")
    .integer("Stock must be an integer")
    .required("Stock is required"),
  unitPrice: Yup.number()
    .typeError("Unit price must be a number")
    .positive("Unit price must be positive")
    .required("Unit price is required"),
  image: Yup.mixed(), // You might want to handle image updates differently
});

const UpdateProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [productId, setProductId] = useState(location.state.productId || "");
  const [initialValues, setInitialValues] = useState({
    productName: "",
    description: "",
    stock: "",
    unitPrice: "",
  });

  useEffect(() => {
    // Fetch the existing product data to populate the form
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getProduct/${productId}`
        );
        setInitialValues({
          productName: response.data.productName,
          description: response.data.description,
          stock: response.data.stock,
          unitPrice: response.data.unitPrice
        });
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("productName", values.productName);
    formData.append("description", values.description);
    formData.append("stock", values.stock);
    formData.append("unitPrice", values.unitPrice);

    const data = {
        productName: values.productName, 
        description : values.description, 
        stock : values.stock, 
        unitPrice : values.unitPrice
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/updateProduct/${productId}`,
        data);
      console.log(response.data);
      alert('Product updated successfully!!!')
      navigate("/staff/product/viewproduct");
    } catch (error) {
      console.error("There was an error updating the product:", error);
    }

    setSubmitting(false);
  };
  
  // Function to navigate back to the products page
  const handleBack = () => {
    navigate('/staff/Product/viewProduct');
  };

  return (
    <div className='w-full'>
     
      <div className='h-[80vh] overflow-auto scrollbar-thin'>
        <Formik
          initialValues={initialValues}
          validationSchema={ProductFormSchema}
          onSubmit={handleSubmit}
          enableReinitialize // This is important when initial values depend on async data
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="flex flex-col p-6 border border-blue-500 rounded shadow-lg max-w-lg mx-auto mt-10">
              <h1 className="text-3xl m-4  text-center">Update Products</h1>

              <Field
                name="productName"
                placeholder="Product Name"
                className="mb-2 p-2 border rounded"
              />
              <ErrorMessage
                name="productName"
                component="div"
                className="text-red-500 text-sm"
              />

              <Field
                name="unitPrice"
                placeholder="Unit Price"
                className="mb-2 p-2 border rounded"
                type="number"
              />
              <ErrorMessage
                name="unitPrice"
                component="div"
                className="text-red-500 text-sm"
              />

              <Field
                name="stock"
                placeholder="Stock"
                className="mb-2 p-2 border rounded"
                type="number"
              />
              <ErrorMessage
                name="stock"
                component="div"
                className="text-red-500 text-sm"
              />

              <Field
                as="textarea"
                name="description"
                placeholder="Description"
                rows="6"
                className="mb-2 p-2 border rounded"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />

              {/* 
              <input
                name="image"
                type="file"
                onChange={(event) => {
                  setFieldValue("image", event.currentTarget.files[0]);
                }}
                className="mb-4"
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500 text-sm"
              /> */}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition-colors duration-300 ease-in-out"
              >
                Update Product
              </button>
            </Form>
          )}
        </Formik>
        </div>
      </div>
  );
};
export default UpdateProduct;
