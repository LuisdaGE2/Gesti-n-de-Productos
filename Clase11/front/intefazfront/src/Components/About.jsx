import { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import axios from "axios";

const About = () => {
  const [productos, setProductos] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    stock: "",
    precio: "",
  });

  const fetchProductos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/productos");
      setProductos(response.data);
    } catch (error) {
      toast.error("Error al cargar los productos");
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleOpen = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        nombre: product.nombre,
        stock: product.stock,
        precio: product.precio,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        nombre: "",
        stock: "",
        precio: "",
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProduct(null);
    setFormData({
      nombre: "",
      stock: "",
      precio: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await axios.put(
          `http://localhost:8080/api/productos/${editingProduct.id}`,
          formData
        );
        toast.success("Producto actualizado exitosamente");
      } else {
        await axios.post("http://localhost:8080/api/productos", formData);
        toast.success("Producto agregado exitosamente");
      }
      handleClose();
      fetchProductos();
    } catch (error) {
      toast.error("Error al guardar el producto");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await axios.delete(`http://localhost:8080/api/productos/${id}`);
        toast.success("Producto eliminado exitosamente");
        fetchProductos();
      } catch (error) {
        toast.error("Error al eliminar el producto");
      }
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 2, // Sin margen superior
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", // Pegado arriba
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Agregar Producto
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((producto) => (
              <TableRow key={producto.id}>
                <TableCell>{producto.nombre}</TableCell>
                <TableCell>{producto.stock}</TableCell>
                <TableCell>${producto.precio}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleOpen(producto)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(producto.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingProduct ? "Editar Producto" : "Agregar Producto"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nombre"
              fullWidth
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
              required
            />
            <TextField
              margin="dense"
              label="Stock"
              type="number"
              fullWidth
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
              required
            />
            <TextField
              margin="dense"
              label="Precio"
              type="number"
              fullWidth
              value={formData.precio}
              onChange={(e) =>
                setFormData({ ...formData, precio: e.target.value })
              }
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit" variant="contained" color="primary">
              {editingProduct ? "Actualizar" : "Agregar"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default About;
