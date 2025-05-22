import axios from 'axios';

const API_URL = 'http://localhost:8080/api/productos';

const getProductos = () => axios.get(API_URL);
const deleteProducto = (id) => axios.delete(`${API_URL}/${id}`);
const updateProducto = (id, producto) => axios.put(`${API_URL}/${id}`, producto);

export default { getProductos, deleteProducto, updateProducto };
