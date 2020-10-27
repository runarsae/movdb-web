import React from "react";
import Search from "./Search";
import UserButton from "./UserButton";

import {createStyles, makeStyles, Theme} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton/IconButton";
import TuneRoundedIcon from "@material-ui/icons/TuneRounded";
import {MENU_OPEN} from "../../queries";
import {useApolloClient} from "@apollo/client";
import Sort from "./Sort";
import ImportExportRoundedIcon from "@material-ui/icons/ImportExportRounded";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.light,
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2)
        },
        toolbar: {
            display: "grid",
            gridTemplateColumns: "1fr auto auto auto",
            gridTemplateAreas: `"logo userbutton sortButton menubutton" 
                                "search search search search"`,
            gap: "8px",
            [theme.breakpoints.up("sm")]: {
                gridTemplateColumns: "auto 1fr auto auto auto",
                gridTemplateAreas: `"logo search userbutton sortButton menubutton"`
            }
        },
        logo: {
            gridArea: "logo",
            [theme.breakpoints.up("sm")]: {
                paddingRight: "8px"
            }
        },
        menuButton: {
            gridArea: "menubutton"
        },
        sortButton: {
            girdArea: "sortButton"
        }
    })
);

function Header(): JSX.Element {
    const classes = useStyles();
    const [sortVisible, toggleSort] = React.useState<boolean>(false);
    const client = useApolloClient();

    const toggleMenu = () => {
        client.cache.writeQuery({
            query: MENU_OPEN,
            data: {
                menuOpen: true
            }
        });
    };

    const handleSortVisibility = () => {
        toggleSort(!sortVisible);
    };

    return (
        <div>
            <AppBar className={classes.header}>
                <Toolbar variant="dense" className={classes.toolbar}>
                    <Typography className={classes.logo} variant="h5" color="initial">
                        MovDB
                    </Typography>

                    <Search />

                    <UserButton />

                    <IconButton
                        onClick={handleSortVisibility}
                        aria-label="sorting"
                        color="inherit"
                        className={classes.sortButton}
                    >
                        <ImportExportRoundedIcon />
                    </IconButton>

                    <IconButton
                        className={classes.menuButton}
                        onClick={() => toggleMenu()}
                        aria-label="filtering"
                        color="inherit"
                    >
                        <TuneRoundedIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Sort visible={sortVisible} />
        </div>
    );
}

export default Header;
