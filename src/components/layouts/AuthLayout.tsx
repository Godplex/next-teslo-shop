import { Box } from "@mui/material"
import Head from "next/head"
import { FC, PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
    title: string
}

export const AuthLayout: FC<Props> = ({ title, children }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Box component="main">
                <Box display="flex" justifyContent="center" alignItems="center" height="calc(100vh - 200px)">
                    {children}
                </Box>
            </Box>
        </>
    )
}
