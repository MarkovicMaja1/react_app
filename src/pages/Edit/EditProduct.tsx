import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import './EditProduct.css';
import { AuthContext, FormData } from '../../context/authContext';
import { format, startOfDay } from 'date-fns';
import { useNavigate } from 'react-router';

const EditProduct: React.FC = () => {
  const [product, setProduct] = useState<FormData | null>(null);
  const [newValues, setNewValues] = useState<Partial<FormData>>({}); 
  const { id } = useParams<{ id?: string }>(); 

  const { fetchProductDetails, updateProducts } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (fetchProductDetails && id) {
        const data = await fetchProductDetails(id);
        if (Array.isArray(data) && data.length > 0) {
          const firstProduct = data[0]; 
          setProduct(firstProduct); 
          setNewValues(firstProduct);  
        } else {
          setProduct(null); 
        }
      }
    };
    fetchData();
  }, [fetchProductDetails, id]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewValues(prevState => ({ ...prevState, [name]: value })); 
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (updateProducts && id) {
      updateProducts(id, newValues);
      navigate('/productview');
    }
  };
  
  return (
    <div className='box'>
      <div className='box-create'>
        <div className='box-create-1'> 
          {product ? (
            <form onSubmit={handleSubmitForm}>
              <input 
                type='text' 
                defaultValue={product.productName} 
                className='form-control' 
                name='productname' 
                onChange={handleInputChange} 
              />
              <input 
                type='text' 
                defaultValue={product.name} 
                className='form-control' 
                name='name' 
                onChange={handleInputChange}
              />
              <input 
                type='text' 
                defaultValue={product.price.toString()} 
                className='form-control' 
                name='price' 
                onChange={handleInputChange} 
              />
              <input 
                type='text' 
                defaultValue={product.expiryDate ? format(startOfDay(new Date(product.expiryDate)), 'dd-MM-yyyy') : "N/A"} 
                name='expirydate' 
                className='form-control'
                onChange={handleInputChange} 
              />
              <button className='btn-create' type='submit'>Save Changes</button>
              <Link to='/productview' className='btn-back'>
                Back
              </Link>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
