import React from "react";
import Movie from "./Movie";
import {makeStyles, Theme, createStyles} from "@material-ui/core/styles";
import {useQuery} from "@apollo/client";
import {MOVIE} from "../../queries";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            height: "calc(100% - 132px)",
            marginTop: "132px",
            [theme.breakpoints.up("sm")]: {
                marginTop: "80px",
                height: "calc(100% - 80px)"
            }
        }
    })
);

export default function MovieContainer() {
    const classes = useStyles();

    const {loading, data} = useQuery(MOVIE);

    let movies = [];

    const startPath = "https://image.tmdb.org/t/p/w400/";

    if (data) {
        for (let index = 0; index < 20; index++) {
            let currentMovie = data.movies[index];
            movies.push(
                <Movie
                    key={currentMovie.imdb_id}
                    imdbID={currentMovie.imdb_id}
                    rating={currentMovie.rating}
                    title={currentMovie.original_title}
                    backgroundImage={startPath + currentMovie.poster_path}
                />
            );
        }
    }

    return <div className={classes.root}>{movies}</div>;
}
