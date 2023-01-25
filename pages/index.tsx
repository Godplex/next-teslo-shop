import { Typography } from '@mui/material';
import { ShopLayout } from '../src/components/layouts';
import { ProductList } from '../src/components/products';
import { FullScreenLoading } from '../src/components/ui';
import { useProducts } from '../src/hooks';

export default function HomePage() {

  const { products, isLoading } = useProducts("/products");

  return (
    <ShopLayout title="Teslo-Shop - Home" pageDescription="Encuentra los mejores productos de Teslo aquí">
      <Typography variant="h1" component="h1">Tienda</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>Todos los productos</Typography>
      {
        isLoading
          ?
          <FullScreenLoading />
          :
          <ProductList products={products} />
      }
    </ShopLayout>
  )
}
