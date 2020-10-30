import React, {useEffect, useState} from "react";
import {makeStyles, Theme, createStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {useQuery} from "@apollo/client";
import {MOVIE_DATA, LIKES, LIKE, CURRENT_USER} from "../../queries";
import Backdrop from "@material-ui/core/Backdrop";
import CardHeader from "@material-ui/core/CardHeader";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Chip from "@material-ui/core/Chip";
import {useMutation} from "@apollo/client";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import Alert from "@material-ui/lab/Alert/Alert";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: "800px",
            width: "100%",
            backgroundColor: theme.palette.background.paper,
            transition: "all 0.25s"
        },
        media: {
            width: "100%",
            height: "50vh",
            minHeight: "300px",
            border: "none"
        },
        expand: {
            transform: "rotate(0deg)",
            marginLeft: "auto",
            transition: theme.transitions.create("transform", {
                duration: theme.transitions.duration.shortest
            })
        },
        padder: {
            padding: theme.spacing(2)
        },
        expandOpen: {
            transform: "rotate(180deg)"
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: "#fff",
            alignItems: "flex-start",
            overflowY: "auto"
        },
        chipGroup: {
            display: "block",
            marginTop: theme.spacing(1)
        },
        chip: {
            margin: 2
        }
    })
);

interface Props {
    movieId: string;
    open: boolean;
    handlePopupClose: () => void;
}
interface ProductionCountry {
    name: string;
}

interface Movie {
    original_title: string;
    overview: string;
    genres: string[];
    production_countries: [ProductionCountry];
    production_companies: [string];
    release_date: Date;
    runtime: number;
    trailer: string;
    rating: number;
}

function MoviePopup(props: Props) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    // Show more/less information in the popup
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // Get current user (check if logged in)
    const {data: userData, refetch: refetchUser} = useQuery(CURRENT_USER);

    const [movieData, setMovieData] = useState<Movie>();

    // Get movie data for the given movie id (prop)
    const {data} = useQuery(MOVIE_DATA, {
        variables: {imdb_id: props.movieId},
        skip: !props.movieId
    });

    // When movie data is fetched, store it internally
    useEffect(() => {
        if (data) {
            setMovieData(data.movie);
        }
    }, [data]);

    const [hasLiked, setHasLiked] = useState<boolean>();
    const [likesCount, setLikesCount] = useState<number>();

    // Get the likes for the given movie id (prop)
    const {data: likeData, refetch} = useQuery(LIKES, {
        variables: {imdb_id: props.movieId},
        skip: !props.movieId
    });

    // When likes data is fetched, store it internally
    useEffect(() => {
        if (likeData) {
            setHasLiked(likeData.likes.hasLiked);
            setLikesCount(likeData.likes.likesCount);
        }
    }, [likeData]);

    const [snackOpen, setSnackOpen] = useState(false);

    const snackHandleClick = () => {
        setSnackOpen(true);
    };

    // Like/unlike the given movie
    const [like, {data: likeResponse}] = useMutation(LIKE, {
        variables: {imdb_id: props.movieId}
    });

    // When like/unlike completed, refetch likes for given movie
    useEffect(() => {
        refetch();
    }, [likeResponse, refetch]);

    // On like button click, call the like mutation, else show snackbar
    const handleFavorite = () => {
        if (userData && userData.currentUser) {
            like();
        } else {
            snackHandleClick();
        }
    };

    // When popup opens refetch current user (check if logged in or not) and hide body scroll bar
    useEffect(() => {
        if (props.open) {
            refetchUser();
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
    }, [props.open, refetchUser]);

    const handleClose = () => {
        if (props.open) {
            props.handlePopupClose();
            setExpanded(false);
        }
    };

    return (
        <div>
            {movieData && (likesCount === 0 || likesCount) && (
                <Backdrop className={classes.backdrop} open={props.open} onClick={handleClose}>
                    <div className={classes.padder}>
                        <Card className={classes.root} onClick={(e) => e.stopPropagation()}>
                            <CardHeader
                                title={movieData.original_title}
                                subheader={new Date(movieData.release_date).toDateString()}
                                action={
                                    <IconButton aria-label="close" onClick={handleClose}>
                                        <CloseIcon />
                                    </IconButton>
                                }
                            />
                            {props.open && (
                                <CardMedia
                                    className={classes.media}
                                    component={"iframe"}
                                    src={
                                        "https://www.youtube.com/embed/" +
                                        movieData.trailer +
                                        "?mute=1&autoplay=1&playlist=" +
                                        movieData.trailer +
                                        "&loop=1"
                                    }
                                />
                            )}

                            <CardContent>
                                <Typography variant="body2">{movieData.overview}</Typography>
                            </CardContent>

                            <CardActions disableSpacing>
                                <IconButton
                                    color={userData && userData.currentUser && hasLiked ? "primary" : "default"}
                                    aria-label="add to favorites"
                                    onClick={handleFavorite}
                                >
                                    <FavoriteIcon />
                                </IconButton>
                                <span id="likesCount">{likesCount}</span>

                                <IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expanded
                                    })}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                                <Snackbar
                                    open={snackOpen}
                                    autoHideDuration={6000}
                                    anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                                    onClose={() => setSnackOpen(false)}
                                >
                                    <Alert onClose={() => setSnackOpen(false)} severity="info">
                                        Log in to favorite movies.
                                    </Alert>
                                </Snackbar>
                            </CardActions>

                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography variant="body2" paragraph>
                                        <b>Rating:</b> {movieData.rating}
                                    </Typography>

                                    <Typography variant="body2" paragraph>
                                        <b>Runtime:</b> <span id="runtime">{movieData.runtime}</span> min
                                    </Typography>

                                    <Typography variant="body2" paragraph>
                                        <b>
                                            Production
                                            {movieData.production_companies.length > 1 ? " companies: " : " company: "}
                                        </b>
                                        {movieData.production_companies.join(", ")}
                                    </Typography>

                                    <div className={classes.chipGroup}>
                                        {movieData.production_countries.map((list) => (
                                            <Chip
                                                key={list.name}
                                                label={list.name}
                                                className={classes.chip}
                                                color="primary"
                                            />
                                        ))}
                                    </div>

                                    <div className={classes.chipGroup}>
                                        {movieData.genres.map((genre) => (
                                            <Chip
                                                key={genre}
                                                label={genre}
                                                className={classes.chip}
                                                color="secondary"
                                            />
                                        ))}
                                    </div>
                                </CardContent>
                            </Collapse>
                        </Card>
                    </div>
                </Backdrop>
            )}
        </div>
    );
}

export default MoviePopup;
