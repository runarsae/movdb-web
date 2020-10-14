import React, {useRef} from "react";
import {createStyles, makeStyles} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton/IconButton";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

const useStyles = makeStyles(() =>
    createStyles({
        userButton: {
            gridArea: "userbutton"
        }
    })
);

function UserButton(): JSX.Element {
    const [userMenuOpen, setUserMenuOpen] = React.useState<boolean>(false);

    const handleAccountButtonClick = () => {
        setUserMenuOpen(!userMenuOpen);
    };

    const handleAccountMenuClose = () => {
        setUserMenuOpen(false);
    };

    const accountButtonRef = useRef(null);

    const classes = useStyles();

    const loggedIn = true;

    if (loggedIn) {
        return (
            <div>
                <IconButton
                    ref={accountButtonRef}
                    onClick={handleAccountButtonClick}
                    className={classes.userButton}
                    aria-label="account"
                    color="inherit"
                >
                    <AccountCircleIcon />
                </IconButton>

                <Menu
                    anchorEl={accountButtonRef.current}
                    getContentAnchorEl={null}
                    anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                    transformOrigin={{vertical: "top", horizontal: "center"}}
                    keepMounted
                    open={userMenuOpen}
                    onClose={handleAccountMenuClose}
                >
                    <MenuItem onClick={handleAccountMenuClose}>Profile</MenuItem>
                    <MenuItem onClick={handleAccountMenuClose}>Logout</MenuItem>
                </Menu>
            </div>
        );
    } else {
        return (
            <IconButton className={classes.userButton} aria-label="log in" color="inherit">
                <ExitToAppRoundedIcon />
            </IconButton>
        );
    }
}

export default UserButton;
