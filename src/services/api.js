import mockProducts from '../data/mockProducts';

// Modified to use local mock data instead of external API
export const fetchProducts = async () => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    const product = mockProducts.find(product => product.id === parseInt(id));
    
    if (!product) {
      throw new Error('Product not found');
    }
    
    return product;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

export const fetchProductsByCategory = async (category) => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProducts.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    throw error;
  }
};