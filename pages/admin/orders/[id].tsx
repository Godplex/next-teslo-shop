import { GetServerSideProps, NextPage } from 'next'
import { Typography, Grid, Card, CardContent, Divider, Box, Chip } from "@mui/material";
import AirplaneTicketOutlined from '@mui/icons-material/AirplaneTicketOutlined';
import CreditCardOffOutlined from '@mui/icons-material/CreditCardOffOutlined';
import CreditScoreOutlined from '@mui/icons-material/CreditScoreOutlined';
import { dbOrders } from '../../../database';
import { CartList, OrderSummary } from '../../../src/components/cart';
import { AdminLayout } from '../../../src/components/layouts';
import { IOrder } from '../../../src/interfaces';
import { countries } from '../../../src/utils';

interface Props {
    order: IOrder
}

const OrderPage: NextPage<Props> = ({ order }) => {

    const { shippingAddress } = order;

    return (
        <AdminLayout
            title='Resumen de la orden'
            subtitle={`OrdenId: ${order._id}`}
            icon={<AirplaneTicketOutlined />}
        >
            {
                order.isPaid
                    ?
                    <Chip sx={{ my: 2 }} label="Orden ya fue pagada" variant="outlined" color="success" icon={<CreditScoreOutlined />} />
                    :
                    <Chip sx={{ my: 2 }} label="Pendiente de pago" variant="outlined" color="error" icon={<CreditCardOffOutlined />} />
            }
            <Grid container className="fadeIn">
                <Grid item xs={12} sm={7}>
                    <CartList products={order.orderItems} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>
                                Resumen ({order.numberOfItems} {order.numberOfItems > 1 ? 'productos' : 'producto'})
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant='subtitle1'>
                                    Direcci??n de entrega
                                </Typography>
                            </Box>
                            <Typography>
                                {shippingAddress.firstName} {shippingAddress.lastName}
                            </Typography>
                            <Typography>
                                {shippingAddress.address} {shippingAddress.address2 ? `, ${shippingAddress.address2}` : ''}
                            </Typography>
                            <Typography>
                                {shippingAddress.city}, {shippingAddress.zip}
                            </Typography>
                            <Typography>
                                {countries.find(({ code }) => shippingAddress.country === code)?.name}
                            </Typography>
                            <Typography>
                                {shippingAddress.phone}
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <OrderSummary
                                orderValues={{
                                    numberOfItems: order.numberOfItems,
                                    subTotal: order.subTotal,
                                    tax: order.tax,
                                    total: order.total,
                                }}
                            />
                            <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                                {
                                    order.isPaid
                                        ?
                                        <Chip sx={{ my: 2 }} label="Orden ya fue pagada" variant="outlined" color="success" icon={<CreditScoreOutlined />} />
                                        :
                                        <Chip sx={{ my: 2 }} label="Pendiente de pago" variant="outlined" color="error" icon={<CreditCardOffOutlined />} />
                                }
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </AdminLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const { id = "" } = query;

    const order = await dbOrders.getOrderById(id.toString());

    if (!order) {
        return {
            redirect: {
                destination: `/admin/orders`,
                permanent: false,
            }
        }
    }

    return {
        props: {
            order
        }
    }
}

export default OrderPage