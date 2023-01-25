import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { getSession, signIn, getProviders } from 'next-auth/react';
import { GetServerSideProps } from 'next'
import { Box, Grid, Typography, TextField, Button, Link, Chip, Divider } from '@mui/material';
import { useForm, SubmitHandler } from "react-hook-form";
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import { AuthLayout } from '../../src/components/layouts'
import { validations } from '../../src/utils';

type FormData = {
    email: string;
    password: string;
};

const LoginPage = () => {

    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);

    const [providers, setProviders] = useState<any>({});

    useEffect(() => {
        getProviders().then(prov => {
            setProviders(prov);
        });
    }, [providers])


    const onLoginUser: SubmitHandler<FormData> = async (formData) => {
        setShowError(false);

        /*  const isValidLogin = await loginUser(email, password);
 
         if (!isValidLogin) {
             setShowError(true);
             setTimeout(() => {
                 setShowError(false);
             }, 3000);
             return;
         }
 
         const destination = router.query.p?.toString() || '/';
         router.replace(destination); */
        await signIn('credentials', formData);

    };

    return (
        <AuthLayout title="Ingresar">
            <Box component="form" onSubmit={handleSubmit(onLoginUser)} noValidate sx={{ width: 350, p: '10px 20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component="h1">
                            Iniciar sesión
                        </Typography>
                        <Chip
                            label="No reconocemos ese usuario / contraseña."
                            color='error'
                            icon={<ErrorOutline />}
                            className="fadeIn"
                            sx={{ display: showError ? 'flex' : 'none' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Correo"
                            type="email"
                            variant='filled'
                            fullWidth
                            {...register("email", {
                                required: "Este campo es requerido.",
                                validate: validations.isEmail
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Contraseña"
                            type="password"
                            variant='filled'
                            fullWidth
                            {...register("password", {
                                required: "Este campo es requerido.",
                                minLength: {
                                    value: 8,
                                    message: "Minimo 8 caracteres"
                                }
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type='submit' color="secondary" className='circular-btn' size="large" fullWidth>
                            Ingresar
                        </Button>
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="end">
                        <NextLink href={router.query.p ? `/auth/register?p=${router.query.p}` : `/auth/register`} passHref legacyBehavior>
                            <Link underline='always'>
                                ¿No tienes cuenta?
                            </Link>
                        </NextLink>
                    </Grid>
                    <Grid item xs={12} display="flex" flexDirection="column" justifyContent="end">
                        <Divider sx={{ width: '100%', mb: 2 }} />
                        {
                            Object.values(providers).map((provider: any) => {

                                if (provider.id === "credentials") return (<div key="credentials"></div>)

                                return (
                                    <Button key={provider.id} variant="outlined" fullWidth color='primary' sx={{ mb: 1 }} onClick={() => signIn(provider.id)}>
                                        {provider.name}
                                    </Button>
                                )
                            })
                        }
                    </Grid>
                </Grid>
            </Box>
        </AuthLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const session = await getSession({ req });

    const { p = "/" } = query;

    if (session) {
        return {
            redirect: {
                destination: `${p}`,
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}

export default LoginPage