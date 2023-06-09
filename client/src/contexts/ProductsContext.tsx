import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Product } from '../../data';

// Interface
interface ProductsContextValue {
  products: Product[];
  getProducts: () => void;
  choosenCategory: string;
  setChoosenCategory: React.Dispatch<React.SetStateAction<string>>;
  deleteProduct: (id: string) => void;
}
// Context setup
const ProductsContext = createContext<ProductsContextValue>(null as never);

//hook to use the products context
export function useProducts() {
  return useContext(ProductsContext);
}

// Context provider
export function ProductsProvider(props: PropsWithChildren) {
  const [products, setProducts] = useState<[]>([]);
  const [choosenCategory, setChoosenCategory] = useState<string>('');

  const getProducts = useCallback(async () => {
    const response = await fetch('/api/product');
    const data = await response.json();
    setProducts(data);
  }, []);

  const getProductsByCategory = useCallback(async () => {
    if (choosenCategory === 'allCategories') {
      getProducts();
      return;
    }
    const response = await fetch(`/api/product/${choosenCategory}`);
    const data = await response.json();
    setProducts(data);
  }, []);

  const deleteProduct = async (id: string) => {
    await fetch(`/api/product/delete/${id}`, {
      method: 'DELETE',
    });
    getProducts();
  };

  useEffect(() => {
    getProductsByCategory();
  }, [choosenCategory, getProductsByCategory]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // Local storage hook

  // Variables and functions that the context shares
  return (
    <ProductsContext.Provider
      value={{
        products,
        getProducts,
        choosenCategory,
        setChoosenCategory,
        deleteProduct,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
}
