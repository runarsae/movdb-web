import React from "react";
import Movie from "./Movie";
import {makeStyles, Theme, createStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexWrap: "wrap",
            marginTop: 100
        }
    })
);

export default function MovieContainer() {
    const classes = useStyles();
    const movies = [];
    for (let index = 0; index < 20; index++) {
        movies.push(
            <Movie
                rating={2.3}
                title="Mission impossible"
                backgroundImage="https://image.tmdb.org/t/p/original/l2uHFznAMEAgSV3YsT6uUGIsJQO.jpg"
            />
        );
    }

    return (
        // <Movie
        //     rating={4}
        //     title="Mission impossible"
        //     backgroundImage="https://image.tmdb.org/t/p/original/l2uHFznAMEAgSV3YsT6uUGIsJQO.jpg"
        // />
        // <Movie
        //     rating={4}
        //     title="Mission impossible"
        //     backgroundImage="https://image.tmdb.org/t/p/original/l2uHFznAMEAgSV3YsT6uUGIsJQO.jpg"
        // />
        // <Movie
        //     rating={4}
        //     title="Mission impossible"
        //     backgroundImage="https://image.tmdb.org/t/p/original/l2uHFznAMEAgSV3YsT6uUGIsJQO.jpg"
        // />
        <div className={classes.root}>{movies}</div>
    );
}
