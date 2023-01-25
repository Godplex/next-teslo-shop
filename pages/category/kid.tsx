import { Typography } from '@mui/material';
import { ShopLayout } from '../../src/components/layouts';
import { ProductList } from '../../src/components/products';
import { FullScreenLoading } from '../../src/components/ui';
import { useProducts } from '../../src/hooks';

const KidsPage = () => {

    const { products, isLoading } = useProducts(`/products?gender=kid`);

    return (
        <ShopLayout title="Teslo-Shop - Kids" pageDescription="Encuentra los mejores productos de Teslo para niños.">
            <Typography variant="h1" component="h1">Niños</Typography>
            <Typography variant="h2" sx={{ mb: 1 }}>Productos para niños</Typography>
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

export default KidsPage