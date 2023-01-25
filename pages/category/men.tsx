import { Typography } from '@mui/material';
import { ShopLayout } from '../../src/components/layouts';
import { ProductList } from '../../src/components/products';
import { FullScreenLoading } from '../../src/components/ui';
import { useProducts } from '../../src/hooks';

const MenPage = () => {

    const { products, isLoading } = useProducts(`/products?gender=men`);

    return (
        <ShopLayout title="Teslo-Shop - Men" pageDescription="Encuentra los mejores productos de Teslo para hombres.">
            <Typography variant="h1" component="h1">Hombres</Typography>
            <Typography variant="h2" sx={{ mb: 1 }}>Productos para hombres</Typography>
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

export default MenPage