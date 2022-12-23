import {useState, lazy, Suspense} from "react";
import {auth, logout} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {Box, IconButton, Typography, Container, useTheme, Button} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import useResponsive from "../../utils/hooks/useResponsive";

const LoginForm = lazy(() => import("../../components/Forms/LoginForm"))
const RegisterForm = lazy(() => import("../../components/Forms/RegisterForm"))

const Topbar = () => {
    const [user] = useAuthState(auth);
    const [showLogin, setShowLogin] = useState<boolean>(false)
    const [showRegister, setShowRegister] = useState<boolean>(false)
    const theme = useTheme()

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const xd = useResponsive("up", 1200);
    return (
        <AppBar
            position="sticky"
            sx={{
                background: `${theme.palette.background.default}`,
                boxShadow: "none",
                top: "0",
                display: "flex",
                marginBottom: "50px",
                height: "120px",
                zIndex: "2"
            }}
        >
            <Container maxWidth={false}>
                <Toolbar
                    sx={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 0"}}>
                    <Typography variant="h4" fontWeight="600" textAlign="center">
                        Most Popular
                    </Typography>
                    <InputBase
                        sx={{
                            m: 2,
                            flex: 1,
                            maxWidth: "500px",
                            background: "#1B2028",
                            borderRadius: "10px",
                            padding: "6px 25px",
                            color: "gray",
                        }}
                        placeholder="Search any coin..."
                    />
                    <Box
                        sx={{
                            flexGrow: 0,
                            display: "flex",
                            gap: "15px",
                            alignItems: "center",
                        }}
                    >
                        {user ? (
                            <>
                                <Typography>{user.displayName}</Typography>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                        <Avatar
                                            alt="witam"

                                        />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{mt: "45px"}}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem>
                                        <Typography textAlign="center">Profile</Typography>
                                    </MenuItem>
                                    <MenuItem>
                                        <Typography textAlign="center">Account</Typography>
                                    </MenuItem>
                                    <MenuItem>
                                        <Typography textAlign="center">Settings</Typography>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            logout();
                                            handleCloseUserMenu();
                                        }}
                                    >
                                        <Typography textAlign="center">Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Box>
                                    <Button
                                        variant="outlined"
                                        sx={{fontWeight: "600", textTransform: "none", fontSize: "15px"}}
                                        onClick={() => setShowLogin(!showLogin)}
                                    >
                                        Login
                                    </Button>
                                    {showLogin && <Suspense>
                                        <LoginForm setShowLogin={setShowLogin}/>
                                    </Suspense>}
                                </Box>
                                {xd && <Box>
                                    <Button
                                        variant="contained"
                                        sx={{fontWeight: "600", textTransform: "none", fontSize: "15px"}}
                                        onClick={() => setShowRegister(!showRegister)}
                                    >
                                        Sign-up
                                    </Button>
                                    {showRegister &&
                                        <Suspense>
                                            <RegisterForm setShowRegister={setShowRegister}/>
                                        </Suspense>
                                    }
                                </Box>}

                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Topbar;
