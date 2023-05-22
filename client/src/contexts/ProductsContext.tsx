import { createContext, PropsWithChildren, useContext } from 'react';
import { Product, products } from '../../data';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

// Interface
interface ProductsContextValue {
  databaseProducts: Product[];
  setDatabaseProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  products: Product[];
}

// Context setup
const ProductsContext = createContext<ProductsContextValue>(null as never);

export const useProducts = () => useContext(ProductsContext);

// Context provider
export function ProductsProvider(props: PropsWithChildren) {
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
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
}
