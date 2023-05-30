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

  const getProducts = useCallback(async () => {
    const response = await fetch('/api/product');
    const data = await response.json();
    setProducts(data);
    console.log('procucts:', data);
  }, []);

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
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
}
