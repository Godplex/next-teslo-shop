import { AppBar, Toolbar, Typography, Box, Button, Link } from "@mui/material"
import NextLink from "next/link"
import { useContext } from "react";
import { UIContext } from "../../context";

export const AdminNavbar = () => {

    const { toggleSideMenu } = useContext(UIContext);

    return (
        <AppBar>
            <Toolbar>
                <NextLink href="/" passHref legacyBehavior>
                    <Link display="flex" alignItems="center">
                        <Typography variant="h6">
                            Teslo |
                        </Typography>
                        <Typography sx={{ ml: 0.5 }}>
                            shop
                        </Typography>
                    </Link>
                </NextLink>
                <Box flex={1} />
                <Button onClick={toggleSideMenu}>
                    Menú
                </Button>
            </Toolbar>
        </AppBar >
    )
}
