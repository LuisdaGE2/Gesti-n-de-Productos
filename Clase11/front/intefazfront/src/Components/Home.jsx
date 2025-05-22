import { Container, Typography, Box } from "@mui/material";

const Home = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        pt: 30, // padding top para separarlo del borde superior
      }}
    >
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Typography variant="h3" component="h1" gutterBottom color="primary">
          Hola Mundo
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
