import { useContext, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from "@mui/material";
import ClearOutlined from '@mui/icons-material/ClearOutlined';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import { CartContext, UIContext } from "../../context";

export const Navbar = () => {

    const { asPath, push } = useRouter();

    const { toggleSideMenu } = useContext(UIContext);
    const { numberOfItems } = useContext(CartContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return;

        push(`/search/${searchTerm}`);

    }

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
                <Box className="fadeIn" sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}>
                    <NextLink href="/category/men" passHref legacyBehavior>
                        <Link>
                            <Button color={asPath === "/category/men" ? 'primary' : 'info'}>
                                Hombres
                            </Button>
                        </Link>
                    </NextLink>
                    <NextLink href="/category/women" passHref legacyBehavior>
                        <Link>
                            <Button color={asPath === "/category/women" ? 'primary' : 'info'}>
                                Mujeres
                            </Button>
                        </Link>
                    </NextLink>
                    <NextLink href="/category/kid" passHref legacyBehavior>
                        <Link>
                            <Button color={asPath === "/category/kid" ? 'primary' : 'info'}>
                                Ni??os
                            </Button>
                        </Link>
                    </NextLink>
                </Box>
                <Box flex={1} />
                {
                    isSearchVisible
                        ? (
                            <Input
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                className="fadeIn"
                                autoFocus
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                                type='text'
                                placeholder="Buscar..."
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setIsSearchVisible(false)}
                                            className="fadeIn"
                                        >
                                            <ClearOutlined />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        )
                        : (
                            <IconButton sx={{ display: { xs: 'none', sm: 'flex' } }} onClick={() => setIsSearchVisible(true)}>
                                <SearchOutlined />
                            </IconButton>
                        )
                }
                <IconButton sx={{ display: { xs: 'flex', sm: 'none' } }} onClick={toggleSideMenu}>
                    <SearchOutlined />
                </IconButton>
                <NextLink href="/cart" passHref legacyBehavior>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={numberOfItems > 9 ? '+9' : numberOfItems} color="secondary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>
                <Button onClick={toggleSideMenu}>
                    Men??
                </Button>
            </Toolbar>
        </AppBar >
    )
}
