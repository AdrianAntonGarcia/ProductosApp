import React, {createContext, useState, useEffect} from 'react';
import {Producto, ProductsResponse} from '../interfaces/productsInterfaces';
import cafeApi from '../api/cafeApi';
import {Alert} from 'react-native';

type ProductsContextProps = {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: (categoryId: string, productName: string) => Promise<Producto>;
  updateProduct: (
    categoryId: string,
    productName: string,
    productId: string,
  ) => Promise<void>;
  deleteProduct: (id: string) => Promise<Producto>;
  loadProductById: (id: string) => Promise<Producto>;
  uploadImage: (data: any, id: string) => Promise<void>; // TODO: Cambiar any
};

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({children}: any) => {
  const [products, setProducts] = useState<Producto[]>([]);
  const loadProducts = async () => {
    const {
      data: {productos},
    } = await cafeApi.get<ProductsResponse>('productos?limite=50');
    // setProducts(previousProducts => [...previousProducts, ...productos]);
    setProducts([...productos]);
  };
  const addProduct = async (
    categoryId: string,
    productName: string,
  ): Promise<Producto> => {
    const {data: producto} = await cafeApi.post<Producto>('/productos', {
      nombre: productName,
      categoria: categoryId,
    });
    setProducts([...products, producto]);
    return producto;
  };
  const updateProduct = async (
    categoryId: string,
    productName: string,
    productId: string,
  ) => {
    const {data: producto} = await cafeApi.put<Producto>(
      `/productos/${productId}`,
      {
        nombre: productName,
        categoria: categoryId,
      },
    );
    setProducts(
      products.map(prod => (prod._id === producto._id ? producto : prod)),
    );
  };
  const deleteProduct = async (id: string) => {
    try {
      const {data: producto} = await cafeApi.delete<Producto>(
        `productos/${id}`,
      );
      await loadProducts();
      return producto;
    } catch (error: any) {
      Alert.alert('Error en el borrado', error.errors[0].msg);
      return {} as Producto;
    }
  };
  const loadProductById = async (id: string): Promise<Producto> => {
    const {data: producto} = await cafeApi.get<Producto>(`productos/${id}`);
    return producto;
  };
  const uploadImage = async (data: any, id: string) => {};

  useEffect(() => {
    loadProducts();
  }, []);
  return (
    <ProductsContext.Provider
      value={{
        products,
        loadProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        loadProductById,
        uploadImage,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
