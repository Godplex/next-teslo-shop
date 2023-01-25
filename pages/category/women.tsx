import { Typography } from '@mui/material';
import { ShopLayout } from '../../src/components/layouts';
import { ProductList } from '../../src/components/products';
import { FullScreenLoading } from '../../src/components/ui';
import { useProducts } from '../../src/hooks';

const WomenPage = () => {

    const { products, isLoading } = useProducts(`/products?gender=women`);

    return (
        <ShopLayout title="Teslo-Shop - Women" pageDescription="Encuentra los mejores productos de Teslo para mujeres.">
            <Typography variant="h1" component="h1">Mujeres</Typography>
            <Typography variant="h2" sx={{ mb: 1 }}>Productos para mujeres</Typography>
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

export default WomenPage