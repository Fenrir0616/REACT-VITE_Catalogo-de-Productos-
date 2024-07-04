import { create } from "zustand";

import { productos as initialProductsFromData } from './data';

const getLocalStorageProducts = () => {
  const products = localStorage.getItem('products');
  return products ? JSON.parse(products) : [];
};

const setLocalStorageProducts = (products) => {
  localStorage.setItem('products', JSON.stringify(products));
};

const useStore = create((set) => ({
  products: [],
  initializeProducts: () => {
    const localStorageProducts = getLocalStorageProducts();
    // Evitar duplicados combinando productos iniciales y locales
    const combinedProducts = [
      ...initialProductsFromData,
      ...localStorageProducts.filter(localProduct =>
        !initialProductsFromData.some(initProduct => initProduct.id === localProduct.id)
      ),
    ];
    set({ products: combinedProducts });
    setLocalStorageProducts(combinedProducts);
  },
  setProducts: (newProducts) => {
    setLocalStorageProducts(newProducts);
    set({ products: newProducts });
  },
  addProduct: (product) => set((state) => {
    const newProducts = [...state.products, product];
    setLocalStorageProducts(newProducts);
    return { products: newProducts };
  }),
  editProduct: (updatedProduct) => set((state) => {
    const newProducts = state.products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setLocalStorageProducts(newProducts);
    return { products: newProducts };
  }),
  deleteProduct: (productId) => set((state) => {
    const newProducts = state.products.filter(product => product.id !== productId);
    setLocalStorageProducts(newProducts);
    return { products: newProducts };
  }),
}));

export default useStore;