import React, {useEffect, useState} from "react";
import Movie from "./Movie";
import {makeStyles, Theme, createStyles} from "@material-ui/core/styles";
import {useQuery} from "@apollo/client";
import {MENU_VALUES, SORT, SORT_DIRECTION, SEARCH, MOVIES} from "../../queries";
import Sort from "./Sort";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

interface Movie {
    imdb_id: string;
    original_title: string;
    rating: number;
    poster_path: string;
}

interface Interval {
    start: number;
    end: number;
}

interface Filter {
    genres: [string];
    production_countries: [string];
    release_date: Interval;
    runtime: Interval;
}

interface MoviesQueryParameters {
    search: string;
    sortBy?: string;
    sortDirection?: string;
    filter: Filter;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: "calc(100% - 132px)",
            marginTop: "132px",
            [theme.breakpoints.up("sm")]: {
                marginTop: "80px",
                height: "calc(100% - 80px)"
            }
        },
        movies: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center"
        },
        feedback: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "200px"
        }
    })
);

export default function MovieContainer() {
    const classes = useStyles();

    const [variables, setVariables] = useState<MoviesQueryParameters>();
    const [movies, setMovies] = useState<Array<Movie>>();

    const {data: menuValuesData} = useQuery(MENU_VALUES);
    const {data: searchData} = useQuery(SEARCH);
    const {data: sortData} = useQuery(SORT);
    const {data: sortDirectionData} = useQuery(SORT_DIRECTION);

    useEffect(() => {
        const newVariables = {
            ...(searchData && {search: searchData.search}),
            ...(sortData && {sortBy: sortData.sort}),
            ...(sortDirectionData &&
                sortDirectionData.sortDirection !== "" && {sortDirection: sortDirectionData.sortDirection}),
            ...(menuValuesData && {
                filter: {
                    ...(menuValuesData.menuValues.genres && {genres: menuValuesData.menuValues.genres}),
                    ...(menuValuesData.menuValues.productionCountries && {
                        production_countries: menuValuesData.menuValues.productionCountries
                    }),
                    ...(menuValuesData.menuValues.releaseDateInterval && {
                        release_date: menuValuesData.menuValues.releaseDateInterval
                    }),
                    ...(menuValuesData.menuValues.runtimeInterval && {
                        runtime: menuValuesData.menuValues.runtimeInterval
                    })
                }
            })
        };

        setVariables(newVariables);
    }, [menuValuesData, searchData, sortData, sortDirectionData]);

    const {data: moviesData, loading} = useQuery(MOVIES, {
        variables: variables,
        skip: !(menuValuesData && searchData && sortData && sortDirectionData)
    });

    const posterBaseURL = "https://image.tmdb.org/t/p/w400/";

    useEffect(() => {
        if (moviesData) {
            const moviesArray = moviesData.movies.movies.map((movie: Movie) => (
                <Movie
                    key={movie.imdb_id}
                    imdbID={movie.imdb_id}
                    rating={movie.rating}
                    title={movie.original_title}
                    backgroundImage={posterBaseURL + movie.poster_path}
                />
            ));

            setMovies(moviesArray);
        }
    }, [moviesData]);

    return (
        <div className={classes.root}>
            <Sort />

            {moviesData && movies && !loading && movies.length !== 0 ? (
                // Movies
                <div className={classes.movies}>{movies}</div>
            ) : moviesData && movies && !loading && movies.length === 0 ? (
                // No results
                <div className={classes.feedback}>
                    <Typography variant="h6" color="secondary">
                        No results
                    </Typography>
                </div>
            ) : (
                // Loading
                <div className={classes.feedback}>
                    <CircularProgress />
                </div>
            )}
        </div>
    );
}
