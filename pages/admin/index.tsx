import { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import useSWR from 'swr';
import { SummaryTile } from '../../src/components/admin';
import { AdminLayout } from '../../src/components/layouts';
import { DashboardSummaryResponse } from '../../src/interfaces';
import AccessTimeOutlined from '@mui/icons-material/AccessTimeOutlined';
import AttachMoneyOutlined from '@mui/icons-material/AttachMoneyOutlined';
import CancelPresentationOutlined from '@mui/icons-material/CancelPresentationOutlined';
import CategoryOutlined from '@mui/icons-material/CategoryOutlined';
import CreditCardOffOutlined from '@mui/icons-material/CreditCardOffOutlined';
import CreditCardOutlined from '@mui/icons-material/CreditCardOutlined';
import DashboardOutlined from '@mui/icons-material/DashboardOutlined';
import GroupOutlined from '@mui/icons-material/GroupOutlined';
import ProductionQuantityLimitsOutlined from '@mui/icons-material/ProductionQuantityLimitsOutlined';

const DashboardPage = () => {

    const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
        refreshInterval: 30 * 1000
    });

    const [refreshIn, setRefreshIn] = useState(30);

    useEffect(() => {
        const interval = setInterval(() => {
            console.log('Tick');
            setRefreshIn(refreshIn => refreshIn > 0 ? refreshIn - 1 : 30);
        }, 1000);

        return () => clearInterval(interval);
    }, [])


    if (!error && !data) {
        return <></>;
    }

    if (error) {
        return <Typography>Error al cargar la información</Typography>;
    }

    const {
        numberOrders,
        paidOrders,
        notPaidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
    } = data!;

    return (
        <AdminLayout
            title="Dashboard"
            subtitle='Estadisticas generales'
            icon={<DashboardOutlined />}
        >
            <Grid container spacing={2}>
                <SummaryTile
                    title={`${numberOrders}`}
                    subtitle="Ordenes totales"
                    icon={<CreditCardOutlined color="secondary" sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={`${paidOrders}`}
                    subtitle="Ordenes pagadas"
                    icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={`${notPaidOrders}`}
                    subtitle="Ordenes pendientes"
                    icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={`${numberOfClients}`}
                    subtitle="Clientes"
                    icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={`${numberOfProducts}`}
                    subtitle="Productos"
                    icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={`${productsWithNoInventory}`}
                    subtitle="Sin existencias"
                    icon={<CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={`${lowInventory}`}
                    subtitle="Bajo inventario"
                    icon={<ProductionQuantityLimitsOutlined color="warning" sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={`${refreshIn}`}
                    subtitle="Actualizacion en:"
                    icon={<AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />}
                />
            </Grid>
        </AdminLayout>
    )
}

export default DashboardPage