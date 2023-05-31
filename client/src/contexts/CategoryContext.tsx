// import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
// import { Product } from '../../data';

// interface CategoryContextValues {
//     categories: string[];
//     choosenCategory: string;
//     productsByChoosenCategory: Product[];
//     setChoosenCategory: Dispatch<SetStateAction<string>>;
//     setProductsByChoosenCategory: Dispatch<SetStateAction<Product[]>>;
//   }

// const CategoryContext = createContext<CategoryContextValues>(
//   null as any
// );

// export function useCategory() {
//   return useContext(CategoryContext);
// }

// export const CategoryProvider = (props: PropsWithChildren) => {
//   const [categories, setCategories] = useState([]);
//   const [choosenCategory, setChoosenCategory] = useState<string>('all');
//   const [productsByChoosenCategory, setProductsByChoosenCategory] = useState<Product[]>([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('/api/categories');
//         const data = await response.json();
//         setCategories(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // Context provider

//   useEffect(() => {
//     const fetchProductsByCategory = async () => {
//       try {
//         const response = await fetch(
//           `/api/products/category/${choosenCategory}`
//         );
//         const data = await response.json();
//         setProductsByChoosenCategory(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchProductsByCategory();
//   }, [choosenCategory]);

//   // Variables and functions that the context shares
//   return (
//     <CategoryContext.Provider
//       value={{ categories, choosenCategory, productsByChoosenCategory, setChoosenCategory, setProductsByChoosenCategory }}
//     >
//       {props.children}
//     </CategoryContext.Provider>
//   );
// };
