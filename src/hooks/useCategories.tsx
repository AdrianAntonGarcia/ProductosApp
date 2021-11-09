import {useState, useEffect} from 'react';
import cafeApi from '../api/cafeApi';
import {CategoriesResponse, Categoria} from '../interfaces/categoriesInterface';

export const useCategories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Categoria[]>([]);

  const getCategories = async () => {
    const {
      data: {categorias},
    } = await cafeApi.get<CategoriesResponse>('/categorias');
    setCategories(categorias);
    setIsLoading(false);
  };
  useEffect(() => {
    getCategories();
  }, []);
  return {categories, isLoading};
};
