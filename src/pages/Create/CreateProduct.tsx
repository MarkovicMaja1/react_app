import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './CreateProduct.css';
import { Link } from 'react-router-dom';
import { AuthContext, FormData } from '../../context/authContext';
import { z } from 'zod';

const productSchema = z.object({
    productName: z.string().nonempty('Productname is required'),
    manufacturer: z.object({
      name: z.string().min(1, 'Manufacturer is required') // Koristi minLength umesto nonempty
  }),  
    price: z.string().regex(/^\d+$/, { message: 'Must be a number' }).nonempty('Price is required'),
    expiryDate: z.date().min(new Date(), { message: 'Expiry Date is required' })
});

export type Product = z.infer<typeof productSchema>;

const CreateProduct: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Product>();
    const navigate = useNavigate();
    const { createProduct } = useContext(AuthContext) || {};

    const getId = (): number => {
        return Math.floor(Math.random() * 1000);
    };

    const onSubmit = async (data: Product) => {
      try {
          data.expiryDate = new Date(data.expiryDate);
  
          const currentDate = new Date();
          if (data.expiryDate <= currentDate) {
              throw new Error('Expiry Date must be in the future');
          }
  
          const validatedData = productSchema.parse(data);

          if (createProduct) {
              const productData: Partial<FormData> = {
                  productName: validatedData.productName,
                  manufacturer: validatedData.manufacturer,
                  price: parseInt(validatedData.price),
                  expiryDate: validatedData.expiryDate,
                  id: getId()
              };
              await createProduct(productData);
              navigate('/productview');
          } else {
              console.error('createProduct is not defined');
          }
      } catch (err) {
          console.error('Validation error:',err as Error);
      }
  };
  
    return (
        <div className='box'>
            <div className='box-create'>
                <div className='box-form'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='input-wrapper'>
                            <input
                                type='text'
                                placeholder='Productname'
                                className='form-control'
                                {...register('productName')}
                            />
                            {errors.productName && <div className='error-message'>{errors.productName.message}</div>}
                        </div>

                        <div className='input-wrapper'>
                            <input
                                type='text'
                                placeholder='Manufacturer'
                                className='form-control'
                                {...register('manufacturer.name')}
                            />
                            {errors.manufacturer?.name && <div className='error-message'>{errors.manufacturer.name.message}</div>}
                        </div>

                        <div className='input-wrapper'>
                            <input
                                type='text'
                                placeholder='Price'
                                className='form-control'
                                {...register('price')}
                            />
                            {errors.price && <div className='error-message'>{errors.price.message}</div>}
                        </div>

                        <div className='input-wrapper'>
                            <input
                                type='date'
                                placeholder='Expiry Date'
                                className='form-control'
                                {...register('expiryDate')}
                            />
                            {errors.expiryDate && <div className='error-message'>{errors.expiryDate.message}</div>}
                        </div>

                        <button type='submit' className='btn-create'>Create Product</button>
                        <Link to='/productview' className='btn-back'> Back </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
