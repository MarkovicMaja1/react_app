import React, { useContext, useEffect, useState } from 'react';
import './ProductsView.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext, FormData } from '../../context/authContext';
import { format, startOfDay } from 'date-fns';

const ProductsView: React.FC = () => {
  const { fetchAllProducts, deleteProduct } = useContext(AuthContext) || {};
  const navigate = useNavigate();
  const [Products, setProducts] = useState<FormData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        if (fetchAllProducts) {
            try {
                const data = await fetchAllProducts();
                if (Array.isArray(data)) {
                    setProducts(data); 
                } else {
                    console.error("Invalid data received:", data);
                }
            } catch (error) {
                console.error("The error occurred while fetching the data:", error);
            }
        }
    };
    fetchData();
}, [fetchAllProducts]);

  const handleDelete = async (id: number) => {
    try {
      if (typeof deleteProduct === 'function') {
        await deleteProduct(id);
        setProducts(prevState => prevState.filter(product => product.id !== id));
      }
    } catch (error) {
      console.error('The error occurred while deleting:', error);
    }
  };

  const handleViewDetails = (productId: number) => {
    navigate(`/edit/${productId}`);
  };

  return (
    <div className='box'>
      <div className='box-table'>
        <div className='buttons'>
          <Link to='/create' className='btn-create'>
            Create New Product
          </Link>
        </div>
        <div className='table-container'>
          <table className='tables'>
            <thead className="table-titles">
              <tr>
                <th>Name of product</th>
                <th>Manufacturer</th>
                <th>Price</th>
                <th>Expiry date</th>
              </tr>
            </thead>
            <tbody>
              {Products.map((product, i) => (
                <tr key={i}>
                  <td>{product.productName}</td>
                  <td>{product.name}</td>
                  <td>{product.price}€</td>
                  <td>{product.expiryDate ? format(startOfDay(new Date(product.expiryDate)), 'dd-MM-yyyy') : "N/A"}</td>
                  <td>
                    <button className='btn-details' onClick={() => handleViewDetails(product.id)}> Edit </button>
                  </td>
                  <td>
                    <button className='btn-logout' onClick={() => handleDelete(product.id)}> Delete </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
