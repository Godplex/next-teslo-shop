import { ShopLayout } from "../src/components/layouts"
import { Box, Typography } from '@mui/material';

const NotFoundPage = () => {
  return (
    <>
      <ShopLayout
        title="Page not found"
        pageDescription="No hay nada que mostrara aqui."
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="calc(100vh - 200px)"
          sx={{ flexDirection: { xs: 'column', md: 'row' } }}
        >
          <Typography variant="h1" component="h1" fontSize="80" fontWeight="200">
            404 |
          </Typography>
          <Typography marginLeft={2}>
            No encontramos ningúna pagina aquí.
          </Typography>
        </Box>
      </ShopLayout>
    </>
  )
}

export default NotFoundPage;