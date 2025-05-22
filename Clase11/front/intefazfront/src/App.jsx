import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, Box } from "@mui/material";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box
          sx={{
            width: 500, // Puedes ajustar este valor si quieres más ancho
            maxWidth: "95vw",
            height: 700, // Puedes ajustar este valor si quieres más alto/bajo
            maxHeight: "90vh",
            background: "rgba(255,255,255,0.95)",
            borderRadius: "24px",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: 3,
            overflow: "auto",
          }}
        >
          <Navbar />
          <Box
            sx={{
              flex: 1,
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Box>
          <ToastContainer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
