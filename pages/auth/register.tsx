import { useState, useContext } from 'react';
import NextLink from 'next/link';
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { Box, Grid, Typography, TextField, Button, Link, Chip } from "@mui/material"
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import { AuthLayout } from "../../src/components/layouts"
import { validations } from "../../src/utils";
import { AuthContext } from "../../src/context";

type FormData = {
    name: string;
    email: string;
    password: string;
};

const RegisterPage = () => {

    const router = useRouter();
    const { registerUser } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onRegisterForm: SubmitHandler<FormData> = async ({ name, email, password }) => {
        setShowError(false);

        const { hasError: hasError, message } = await registerUser(name, email, password);

        if (hasError) {
            setShowError(true);
            setErrorMessage(message!);
            setTimeout(() => {
                setShowError(false);
            }, 3000);
            return;
        }

        await signIn('credentials', { email, password })

    }

    return (
        <AuthLayout title="Registrar">
            <Box component="form" onSubmit={handleSubmit(onRegisterForm)} noValidate sx={{ width: 350, p: '10px 20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component="h1">
                            Crear cuenta
                        </Typography>
                        <Chip
                            label="Algo salio mal."
                            color='error'
                            icon={<ErrorOutline />}
                            className="fadeIn"
                            sx={{ display: showError ? 'flex' : 'none' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Nombre completo"
                            type="name"
                            variant='filled'
                            fullWidth
                            {...register("name", {
                                required: "Este campo es requerido.",
                                minLength: {
                                    value: 2,
                                    message: "Minimo 2 caracteres."
                                },
                                maxLength: {
                                    value: 30,
                                    message: "Maximo 30 caracteres."
                                }
                            })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
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
                            Registrar
                        </Button>
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="center">
                        <NextLink href={router.query.p ? `/auth/login?p=${router.query.p}` : `/auth/login`} passHref legacyBehavior>
                            <Link underline='always'>
                                ¿Ya tienes cuenta?
                            </Link>
                        </NextLink>
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

export default RegisterPage