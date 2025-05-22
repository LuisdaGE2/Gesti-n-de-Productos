import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" color="default" elevation={2}>
      <Toolbar
        sx={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 2,
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            mb: 1,
            color: "#1976d2",
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          Gestión de Productos
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            color="primary"
            variant="contained"
            component={RouterLink}
            to="/"
          >
            Home
          </Button>
          <Button
            color="primary"
            variant="contained"
            component={RouterLink}
            to="/about"
          >
            About
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
