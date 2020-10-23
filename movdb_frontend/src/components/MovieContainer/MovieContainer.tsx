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
            marginTop: 100
        }
    })
);

export default function MovieContainer() {
    const {data} = useQuery(MOVIE);
    let movies = [];
    const startPath = "https://image.tmdb.org/t/p/original/";
    if (data) {
        console.log(data);

        for (let index = 0; index < 20; index++) {
            let currentMovie = data.movies[index];
            movies.push(
                <Movie
                    rating={currentMovie.rating}
                    title={currentMovie.original_title}
                    backgroundImage={startPath + currentMovie.poster_path}
                />
            );
        }
    }
    const classes = useStyles();

    return <div className={classes.root}>{movies}</div>;
}
