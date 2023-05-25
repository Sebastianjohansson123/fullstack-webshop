import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Product } from '../../data';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

// Interface
interface ProductsContextValue {
  databaseProducts: Product[];
  setDatabaseProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  products: Product[];
  getProducts: () => void;
}
// Context provider
export function ProductsProvider(props: PropsWithChildren) {
  const useProducts = () => useContext(ProductsContext);
  const [products, setProducts] = useState<Product[]>([]);

  // Context setup
  const ProductsContext = createContext<ProductsContextValue>(null as never);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const response = await fetch('http://localhost:3001/products');
    const data = await response.json();
    setProducts(data);
    console.log(products);
  }

  // Local storage hook
  const [databaseProducts, setDatabaseProducts] = useLocalStorageState<
    Product[]
  >(products, 'products');

  // Variables and functions that the context shares
  return (
    <ProductsContext.Provider
      value={{
        databaseProducts,
        setDatabaseProducts,
        products,
        getProducts,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
}
