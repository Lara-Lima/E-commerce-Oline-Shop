export const API_FAKE_STORE = "https://fakestoreapi.com/products";

export const allProducts = async () => {
  try {
    const response = await fetch(API_FAKE_STORE);
    const products = await response.json();
    console.log("products", products);
    return products;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const getNumberAllProducts = async () => {
  const products = await allProducts();
  return products.length;
};
