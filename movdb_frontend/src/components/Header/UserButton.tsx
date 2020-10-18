import React, {useRef, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton/IconButton";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import UserForm from "./UserForm";
import {useQuery, useApolloClient} from "@apollo/client";
import {CURRENT_USER} from "../../queries";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import Alert from "@material-ui/lab/Alert/Alert";

export type UserFormCloseEvent = "login" | "register" | null;

type AlertType = "login" | "logout" | "register" | null;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        userButton: {
            gridArea: "userbutton",
            marginLeft: theme.spacing(1)
        }
    })
);

function UserButton(): JSX.Element {
    const classes = useStyles();
    const client = useApolloClient();

    const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
    const [userFormOpen, setUserFormOpen] = useState<boolean>(false);

    const userButtonRef = useRef(null);

    const {data, refetch} = useQuery(CURRENT_USER);

    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<AlertType>(null);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleLogoutButtonClick = () => {
        localStorage.clear();
        client.resetStore();
        setUserMenuOpen(false);
        setAlertType("logout");
        setSnackbarOpen(true);
    };

    const handleUserFormClose = (e: UserFormCloseEvent) => {
        setUserFormOpen(false);
        if (e && (e === "login" || e === "register")) {
            if (e === "login") {
                refetch();
            }
            setAlertType(e);
            setSnackbarOpen(true);
        }
    };

    return (
        <div>
            {data && data.currentUser ? (
                <div>
                    <IconButton
                        ref={userButtonRef}
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className={classes.userButton}
                        aria-label="account"
                        color="inherit"
                        disableRipple
                    >
                        <AccountCircleIcon />
                    </IconButton>

                    <Menu
                        anchorEl={userButtonRef.current}
                        getContentAnchorEl={null}
                        anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                        transformOrigin={{vertical: "top", horizontal: "center"}}
                        open={userMenuOpen}
                        onClose={() => setUserMenuOpen(false)}
                        disableAutoFocusItem
                    >
                        <MenuItem onClick={() => null}>
                            Profile (<b>{data.currentUser.username}</b>)
                        </MenuItem>
                        <MenuItem onClick={handleLogoutButtonClick}>Log out</MenuItem>
                    </Menu>
                </div>
            ) : (
                <div>
                    <IconButton
                        onClick={() => setUserFormOpen(!userFormOpen)}
                        className={classes.userButton}
                        aria-label="log in"
                        color="inherit"
                    >
                        <ExitToAppRoundedIcon />
                    </IconButton>

                    <UserForm
                        open={userFormOpen}
                        handleUserFormClose={(e: UserFormCloseEvent) => handleUserFormClose(e)}
                    />
                </div>
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
            >
                <Alert onClose={handleSnackbarClose} severity={alertType === "login" ? "success" : "info"}>
                    {data && data.currentUser && alertType === "login" ? (
                        <span>
                            Login successful. Welcome, <b>{data.currentUser.username}</b>!
                        </span>
                    ) : alertType === "logout" ? (
                        <span>Logout successful. See you soon!</span>
                    ) : alertType === "register" ? (
                        <span>Registration complete. You can now log in.</span>
                    ) : (
                        ""
                    )}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default UserButton;
