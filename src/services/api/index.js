const API = process.env.API_URL;

const endPoints = {
  parking: {
    getCar: (id) => `${API}/${id}/`,
    addCar: `${API}`,
    updateCar: (id) => `${API}/${id}/`,
    deleteCar: (id) => `${API}/${id}/`,
    /*allProducts: `${API}/api/${VERSION}/products/`,
    getProducts: (limit, offset) => `${API}/api/${VERSION}/products?limit=${limit}&offset=${offset}`,
    addProducts: `${API}/api/${VERSION}/products`,
     */
  },
};

export default endPoints;