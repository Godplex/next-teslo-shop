import { FC, useState, useContext } from 'react';
import { ShopLayout } from "../../src/components/layouts";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { ProductSlideshow, SizeSelector } from "../../src/components/products";
import { ItemCounter } from "../../src/components/ui";
import { ICartProduct, IProduct, ISize } from "../../src/interfaces";
import { dbProducts } from "../../database";
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router';
import { CartContext } from '../../src/context';

interface Props {
    product: IProduct
}

const ProductPage: FC<Props> = ({ product }) => {

    const router = useRouter();

    const { addProductToCart } = useContext(CartContext);

    const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
        _id: product._id,
        image: product.images[0],
        price: product.price,
        slug: product.slug,
        title: product.title,
        gender: product.gender,
        quantity: 1,
    });

    const selectedSize = (size: ISize) => {
        setTempCartProduct(currentProduct => ({
            ...currentProduct,
            size
        }))
    }

    const onUpdateQuantity = (quantity: number) => {
        setTempCartProduct(currentProduct => ({
            ...currentProduct,
            quantity
        }))
    }

    const onAddProduct = () => {

        if (!tempCartProduct.size) return;

        addProductToCart(tempCartProduct);
        router.push('/cart')
    }

    return (
        <ShopLayout title={product.title} pageDescription={product.description}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                    <ProductSlideshow images={product.images} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Box display="flex" flexDirection='column'>
                        <Typography variant="h1" component="h1">
                            {product.title}
                        </Typography>
                        <Typography variant="subtitle1" component="h2">
                            ${product.price}
                        </Typography>
                        <Box sx={{ my: 2 }}>
                            <Typography variant="subtitle2">
                                Cantidad
                            </Typography>
                            <ItemCounter
                                currentValue={tempCartProduct.quantity}
                                updatedQuantity={onUpdateQuantity}
                                maxValue={product.inStock > 10 ? 10 : product.inStock}
                            />
                            <SizeSelector
                                selectedSize={tempCartProduct.size}
                                sizes={product.sizes}
                                onSelectedSize={selectedSize}
                            />
                        </Box>
                        {
                            product.inStock > 0
                                ? (
                                    <Button
                                        onClick={onAddProduct}
                                        color="secondary"
                                        className="circular-btn"
                                    >
                                        {
                                            tempCartProduct.size
                                                ?
                                                'Agregar al carrito'
                                                :
                                                'Seleccione una talla'
                                        }
                                    </Button>
                                )
                                : (
                                    <Chip label="No hay disponibles." color="error" variant="outlined" />
                                )
                        }
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="subtitle2">
                                Descripci??n
                            </Typography>
                            <Typography variant="body2">
                                {product.description}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const slugs = await dbProducts.getAllProductsSlugs();

    return {
        paths: slugs.map(({ slug }) => ({
            params: { slug },
        })),
        fallback: "blocking"
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug = '' } = params as { slug: string };

    const product = await dbProducts.getProductBySlug(slug);

    if (!product) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            product
        },
        revalidate: 86400
    }
}

export default ProductPage