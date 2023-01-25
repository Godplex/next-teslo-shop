import { Box } from "@mui/material";
import Head from "next/head"
import { FC, PropsWithChildren } from "react";
import { Navbar,SideMenu } from "../ui";

interface Props extends PropsWithChildren {
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
}

export const ShopLayout: FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={pageDescription} />
                <meta name="og:title" content={title} />
                <meta name="og:description" content={pageDescription} />
                {
                    imageFullUrl && (
                        <meta name="og:image" content={imageFullUrl} />
                    )
                }
            </Head>
            <Box component="nav">
                <Navbar />
            </Box>

            <SideMenu/>

            <Box component="main" sx={{ m: '80px auto', maxWidth: '1440px', p: '0px 30px' }}>
                {children}
            </Box>
            <Box component="footer">

            </Box>

        </>
    )
}
