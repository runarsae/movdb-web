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
        },
        movieContainer: {
            position: "relative",
            display: "flex",
            flexWrap: "wrap",
            marginTop: -150,
            justifyContent: "center",
            paddingTop: 140,
            background: "rgba(0,0,0, 0)",
            backgroundImage: "linear-gradient(rgba(0,0,0, 0), rgba(0,0,0,1) 15%)",
            [theme.breakpoints.down("lg")]: {
                backgroundImage: "linear-gradient(rgba(0,0,0, 0), rgba(0,0,0,1) 13%)"
            },
            [theme.breakpoints.down(920)]: {
                backgroundImage: "linear-gradient(rgba(0,0,0, 0) 2%, rgba(0,0,0,1) 11%)"
            },
            [theme.breakpoints.down(740)]: {
                backgroundImage: "linear-gradient(rgba(0,0,0, 0) 2%, rgba(0,0,0,1) 8%)"
            },
            [theme.breakpoints.down(560)]: {
                backgroundImage: "linear-gradient(rgba(0,0,0, 0) 4%, rgba(0,0,0,1) 6%)"
            },
            [theme.breakpoints.down(380)]: {
                backgroundImage: "linear-gradient(rgba(0,0,0, 0) 2.5%, rgba(0,0,0,1) 3%)"
            },
        },
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
    )
}
