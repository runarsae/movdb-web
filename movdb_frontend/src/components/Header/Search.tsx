import React from "react";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase/InputBase";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Paper from "@material-ui/core/Paper/Paper";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        search: {
            position: "relative",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            margin: "auto",
            width: "100%",
            maxWidth: "600px",
            gridArea: "search"
        },
        input: {
            position: "relative",
            width: "100%",
            marginLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        },
        searchButton: {
            margin: 5,
            padding: 5,
            marginRight: theme.spacing(1)
        }
    })
);

function Search(): JSX.Element {
    const classes = useStyles();

    return (
        <Paper className={classes.search}>
            <InputBase className={classes.input} placeholder="Search" inputProps={{"aria-label": "search movdb"}} />
            <IconButton type="submit" className={classes.searchButton} aria-label="search">
                <SearchRoundedIcon />
            </IconButton>
        </Paper>
    );
}

export default Search;
