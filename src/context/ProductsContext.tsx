import React, {createContext, useState, useEffect} from 'react';
import {Producto, ProductsResponse} from '../interfaces/productsInterfaces';
import cafeApi from '../api/cafeApi';
import {Alert} from 'react-native';
import {ImagePickerResponse} from 'react-native-image-picker';

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
  uploadImage: (data: ImagePickerResponse, id: string) => Promise<void>; // TODO: Cambiar any
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
  const uploadImage = async (data: ImagePickerResponse, id: string) => {
    try {
      let fileToUpload = {};
      if (data && data.assets && data.assets.length > 0) {
        fileToUpload = {
          uri: data.assets[0].uri!,
          type: data.assets[0].type!,
          name: data.assets[0].fileName!,
        };
      }
      const formData = new FormData();
      formData.append('archivo', fileToUpload);
      const resp = await cafeApi.put(`uploads/productos/${id}`, formData);
      Alert.alert('Imagen subida correctamente');
      await loadProducts();
    } catch (error: any) {
      console.log(error);
      Alert.alert('Error en la subida de la imagen', error.errors[0].msg);
    }
  };

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
