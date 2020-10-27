import React, {useEffect, useState} from "react";
import Movie from "./Movie";
import TopMovie from "./TopMovie";
import {makeStyles, Theme, createStyles} from "@material-ui/core/styles";
import {useQuery} from "@apollo/client";
import {MENU_VALUES, SORT, SORT_DIRECTION, SEARCH, MOVIES} from "../../queries";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import InfiniteScroll from "react-infinite-scroller";

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

interface Options {
    menuValues: {
        genres: [string];
        productionCountries: [string];
        releaseDateInterval: Interval;
        runtimeInterval: Interval;
    };
    search: string;
    sort: string;
    sortDirection: string;
}

interface Filter {
    genres: [string];
    production_countries: [string];
    release_date: Interval;
    runtime: Interval;
}

interface MoviesQueryParameters {
    search: string;
    sortBy: string;
    sortDirection: string;
    filter: Filter;
    page: number;
    pageSize: number;
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
        movieContainer: {
            position: "relative",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center"
        },
        paddingTop: {
            paddingTop: "20px"
        },
        feedback: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: "200px",
            width: "100%"
        },
        hr: {
            width: "100%",
            padding: "0 20px",
            margin: 0,
            boxSizing: "border-box",
            maxWidth: "300px",
            color: "grey",
            backgroundColor: "grey",
            height: "1px",
            border: "none"
        },
        logo: {
            width: "50px",
            height: "50px"
        },
        results: {
            margin: "10px"
        }
    })
);

export default function MovieContainer() {
    const classes = useStyles();

    const [variables, setVariables] = useState<MoviesQueryParameters>();
    const [movies, setMovies] = useState<Array<Movie>>([]);

    const [queryCount, setQueryCount] = useState<number>(0);

    const [pageCount, setPageCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [pageLoaded, setPageLoaded] = useState<boolean>(false);

    // Get filter, search and sort values from cache
    // Called automatically when cache is updated
    const {data: menuValuesData} = useQuery(MENU_VALUES);
    const {data: searchData} = useQuery(SEARCH);
    const {data: sortData} = useQuery(SORT);
    const {data: sortDirectionData} = useQuery(SORT_DIRECTION);

    const [options, setOptions] = useState<Options>();

    const PAGE_SIZE = 20;

    // Scroll to top when page unloads, so that the user starts at the top when the page is reloaded
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        // Wait till all values are recieved
        if (menuValuesData && searchData && sortData && sortDirectionData) {
            // Reset currentPage, pageCount and movies array if any of the dependent values are changed
            setCurrentPage(1);
            setPageCount(0);
            setMovies([]);

            setQueryCount((prevQueryCount) => prevQueryCount + 1);

            setOptions({
                menuValues: menuValuesData.menuValues,
                search: searchData.search,
                sort: sortData.sort,
                sortDirection: sortDirectionData.sortDirection
            });
        }
    }, [menuValuesData, searchData, sortData, sortDirectionData]);

    // If options or currentPage changes, update the variables used in the query
    useEffect(() => {
        if (options) {
            setVariables({
                search: options.search,
                sortBy: options.sort,
                sortDirection: options.sortDirection,
                filter: {
                    genres: options.menuValues.genres,
                    production_countries: options.menuValues.productionCountries,
                    release_date: options.menuValues.releaseDateInterval,
                    runtime: options.menuValues.runtimeInterval
                },
                page: currentPage,
                pageSize: PAGE_SIZE
            });
        }
    }, [options, currentPage]);

    // Fetch movies based on variables
    // Called on mount and when variables are changed
    const {data: moviesData, loading: queryLoading} = useQuery(MOVIES, {
        variables: variables
    });

    const posterBaseURL = "https://image.tmdb.org/t/p/w400/";

    // On fetch, concatenate already fetched movies with the newly fetched ones
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

            setMovies((prevMovies) => prevMovies.concat(moviesArray));
            setPageCount(moviesData.movies.pageCount);
            setPageLoaded(true);
        }
    }, [moviesData]);

    // Increase current page by 1
    const nextPage = () => {
        if (pageLoaded) {
            setPageLoaded(false);
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <div className={classes.root}>
            {
                // Hide top movie after first query
                queryCount <= 1 && <TopMovie />
            }

            {movies && movies.length !== 0 ? (
                // Movies
                <InfiniteScroll
                    pageStart={0}
                    loadMore={nextPage}
                    hasMore={currentPage < pageCount}
                    loader={
                        <div className={classes.feedback} key={0}>
                            <CircularProgress />
                        </div>
                    }
                >
                    <div className={`${classes.movieContainer} ${queryCount <= 1 ? "" : classes.paddingTop}`}>
                        {movies}
                    </div>
                </InfiniteScroll>
            ) : moviesData && moviesData.movies.movies.length === 0 ? (
                // No results
                <div className={classes.feedback}>
                    <Typography variant="body1" color="error">
                        NO RESULTS
                    </Typography>
                </div>
            ) : (
                // Loading
                <div className={classes.feedback}>
                    <CircularProgress />
                </div>
            )}

            {!queryLoading && pageLoaded && currentPage === pageCount && (
                // End of results
                <div className={classes.feedback}>
                    <hr className={classes.hr} />
                    <Typography variant="overline" color="primary" className={classes.results}>
                        {movies.length} {movies.length === 1 ? "RESULT" : "RESULTS"}
                    </Typography>
                </div>
            )}
        </div>
    );
}
