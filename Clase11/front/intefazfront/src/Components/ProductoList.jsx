// src/components/ProductoList.js
//npm install @mui/material @emotion/react @emotion/styled
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import ProductoService from "../Services/ServiceProduct";

const ProductoList = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    ProductoService.getProductos()
      .then((res) => {
        setProductos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Hubo un problema al obtener los productos");
        setLoading(false);
      });
  }, []);

  // Función para eliminar producto
  const handleDelete = (id) => {
    ProductoService.deleteProducto(id)
      .then(() => {
        setProductos(productos.filter((producto) => producto.id !== id));
        setSnackbar({
          open: true,
          message: "Producto eliminado",
          severity: "success",
        });
      })
      .catch((err) => {
        setSnackbar({
          open: true,
          message: "Error eliminando producto",
          severity: "error",
        });
      });
  };

  // Función para abrir el modal de edición
  const handleEditOpen = (product) => {
    setCurrentProduct(product);
    setIsDialogOpen(true);
  };

  // Función para cerrar el modal de edición
  const handleEditClose = () => {
    setIsDialogOpen(false);
    setCurrentProduct(null);
  };

  // Función para manejar cambios en el formulario de edición
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  // Función para guardar los cambios de edición
  const handleEditSubmit = () => {
    ProductoService.updateProducto(currentProduct.id, currentProduct)
      .then(() => {
        setProductos(
          productos.map((product) =>
            product.id === currentProduct.id ? currentProduct : product
          )
        );
        setSnackbar({
          open: true,
          message: "Producto actualizado",
          severity: "success",
        });
        handleEditClose();
      })
      .catch((err) => {
        setSnackbar({
          open: true,
          message: "Error actualizando producto",
          severity: "error",
        });
      });
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Productos
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {error && <Alert severity="error">{error}</Alert>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.nombre}</TableCell>
                <TableCell>{p.precio}</TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditOpen(p)}
                    style={{ marginRight: "10px" }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(p.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal de Edición */}
      {currentProduct && (
        <Dialog open={isDialogOpen} onClose={handleEditClose}>
          <DialogTitle>Editar Producto</DialogTitle>
          <DialogContent>
            <TextField
              label="Nombre"
              name="nombre"
              value={currentProduct.nombre}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Precio"
              name="precio"
              type="number"
              value={currentProduct.precio}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Stock"
              name="stock"
              type="number"
              value={currentProduct.stock}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleEditSubmit} color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductoList;
