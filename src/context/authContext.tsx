import { createContext, ReactNode, FC } from "react";
import axios, { AxiosInstance } from "axios";
import { formatDate } from './dateUtils';

export interface FormData {
  productName: string;
  manufacturer: IManufacturer;
  price: number;
  id: number;
  expiryDate: Date;
  name: string;
}

export interface IManufacturer {
  name: string;
}

interface AuthContextType {
  fetchAllProducts: () => Promise<FormData[] | void>;
  fetchProductDetails: (id: string) => Promise<FormData | void>;
  createProduct: (productData: Partial<FormData>) => Promise<FormData | void>;
  deleteProduct: (id: number) => Promise<void>;
  updateProducts: (id: string, newValues: Partial<FormData>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

const baseURL = "http://localhost:8800";

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const fetchAllProducts = async () => {
    try {
      const res = await axiosInstance.get<FormData[]>("/allProducts");
      return res.data;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchProductDetails = async (id: string) => {
    try {
      const res = await axiosInstance.get<FormData>(`/update/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const createProduct = async (productData: Partial<FormData>) => {
    try {
      const res = await axiosInstance.post<FormData>("/product", productData);
      return res.data;
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await axiosInstance.delete(`/product/${id}`);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const updateProducts = async (id: string, newValues: Partial<FormData>) => {
    try {
      const formattedExpiryDate = formatDate(newValues.expiryDate);
      const requestData = {
        ...newValues,
        expiryDate: formattedExpiryDate
      };
      await axiosInstance.post(`/updateProduct/${id}`, requestData);
      console.log('Product properties successfully updated');
    } catch (error) {
      console.error("Error updating product properties:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ fetchAllProducts, fetchProductDetails, createProduct, deleteProduct, updateProducts }}>
      {children}
    </AuthContext.Provider>
  );
}
