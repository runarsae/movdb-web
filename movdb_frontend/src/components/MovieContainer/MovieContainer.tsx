import React from "react";
import Movie from "./Movie";
import TopMovie from "./TopMovie";
import {makeStyles, Theme, createStyles} from "@material-ui/core/styles";
import {useQuery} from "@apollo/client";
import {MOVIE} from "../../queries";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: "relative",
            background: "black"
        },
        movieContainer: {
            position: "relative",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center"
        }
    })
);

export default function MovieContainer() {
    const {data} = useQuery(MOVIE);
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
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TopMovie link={"https://www.youtube.com/watch?v=k55FYtqtXXU&html5=True"} />
            <div className={classes.movieContainer}>{movies}</div>
        </div>
    );
}
