import { Box, Button, FormControl, Grid, MenuItem, NoSsr, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ShopLayout } from '../../src/components/layouts';
import { CartContext } from '../../src/context';
import { countries } from '../../src/utils';

type FormData = {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    zip: string;
    city: string;
    country: string;
    phone: string;
};

const getAddressFromCookies = (): FormData => {
    return {
        firstName: Cookies.get("firstName") || '',
        lastName: Cookies.get("lastName") || '',
        address: Cookies.get("address") || '',
        address2: Cookies.get("address2") || '',
        zip: Cookies.get("zip") || '',
        city: Cookies.get("city") || '',
        country: Cookies.get("country") || countries[0].code,
        phone: Cookies.get("phone") || '',
    }
}

const AddressPage = () => {

    const router = useRouter();
    const { updateAddress } = useContext(CartContext);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        defaultValues: {
            firstName: '',
            lastName: '',
            address: '',
            address2: '',
            zip: '',
            city: '',
            country: countries[0].code,
            phone: '',
        }
    });

    useEffect(() => {
        reset(getAddressFromCookies())
    }, [reset])


    const onSubmitAddress: SubmitHandler<FormData> = async (formData) => {
        updateAddress(formData);
        router.push('/checkout/summary');

    }

    return (
        <ShopLayout title="Dirección" pageDescription="Confirmar dirección del destino." >
            <Typography variant="h1" component="h1">
                Dirección
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmitAddress)} noValidate>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Nombre"
                            variant='filled'
                            fullWidth
                            {...register("firstName", {
                                required: "Este campo es requerido.",
                            })}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Apellido"
                            variant='filled'
                            fullWidth
                            {...register("lastName", {
                                required: "Este campo es requerido.",
                            })}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Dirección"
                            variant='filled'
                            fullWidth
                            {...register("address", {
                                required: "Este campo es requerido.",
                            })}
                            error={!!errors.address}
                            helperText={errors.address?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Dirección 2"
                            variant='filled'
                            fullWidth
                            {...register("address2")}
                            error={!!errors.address2}
                            helperText={errors.address2?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Codigo postal"
                            variant='filled'
                            fullWidth
                            {...register("zip", {
                                required: "Este campo es requerido.",
                            })}
                            error={!!errors.zip}
                            helperText={errors.zip?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Ciudad"
                            variant='filled'
                            fullWidth
                            {...register("city", {
                                required: "Este campo es requerido.",
                            })}
                            error={!!errors.city}
                            helperText={errors.city?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl
                            fullWidth
                        >
                            <NoSsr>
                                <TextField
                                    select
                                    variant='filled'
                                    label="Pais"
                                    {...register("country", {
                                        required: "Este campo es requerido.",
                                    })}
                                    error={!!errors.city}
                                    defaultValue={Cookies.get('country') || countries[0].code}
                                    helperText={errors.city?.message}
                                >
                                    {
                                        countries.map((country) => (
                                            <MenuItem key={country.code} value={country.code}>{country.name}</MenuItem>
                                        ))
                                    }
                                </TextField>
                            </NoSsr>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Telefono"
                            variant='filled'
                            fullWidth
                            {...register("phone", {
                                required: "Este campo es requerido.",
                            })}
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
                    <Button type="submit" color='secondary' className='circular-btn' size="large">
                        Revisar pedido
                    </Button>
                </Box>
            </Box>
        </ShopLayout>
    )
}

export default AddressPage