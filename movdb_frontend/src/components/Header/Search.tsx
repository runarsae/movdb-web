import React, {useEffect, useState} from "react";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase/InputBase";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Paper from "@material-ui/core/Paper/Paper";
import {useApolloClient} from "@apollo/client";
import {SEARCH} from "../../queries";

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
    const client = useApolloClient();

    const classes = useStyles();

    const [search, setSearch] = useState<string>();

    useEffect(() => {
        // Write default value ("") to cache
        client.cache.writeQuery({
            query: SEARCH,
            data: {
                search: ""
            }
        });
    }, [client.cache]);

    // On submit, blur input field and write the search text to cache
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        (document.activeElement! as HTMLElement).blur();

        client.cache.writeQuery({
            query: SEARCH,
            data: {
                search: search
            }
        });
    };

    // On search input change, update search value state
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    return (
        <Paper className={classes.search}>
            <form onSubmit={handleSubmit}>
                <InputBase
                    className={classes.input}
                    placeholder="Search"
                    inputProps={{"aria-label": "search movdb"}}
                    onChange={handleChange}
                    endAdornment={
                        <IconButton type="submit" className={classes.searchButton} aria-label="search">
                            <SearchRoundedIcon />
                        </IconButton>
                    }
                />
            </form>
        </Paper>
    );
}

export default Search;
