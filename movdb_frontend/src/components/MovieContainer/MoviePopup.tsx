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
import {MOVIE_DATA, LIKES, CURRENT_USER, LIKE} from "../../queries";
import Backdrop from "@material-ui/core/Backdrop";
import CardHeader from "@material-ui/core/CardHeader";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Chip from "@material-ui/core/Chip";
import {useMutation} from "@apollo/client";
import {colors} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import Alert from "@material-ui/lab/Alert/Alert";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: "800px",
            width: "100%",
            backgroundColor: theme.palette.primary.light,
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

// The component takes the id of the movie, and then query the information using this id
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
}

interface MovieLikes {
    hasLiked: boolean;
    likesCount: number;
}

function MoviePopup(props: Props) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(props.open);
    const {data: userData} = useQuery(CURRENT_USER);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // Movie data
    const [movieData, setMovieData] = useState<Movie>();

    const {data} = useQuery(MOVIE_DATA, {
        variables: {imdb_id: props.movieId},
        skip: !props.movieId
    });

    const [movieLikes, setLikeData] = useState<MovieLikes>();

    const {data: likeData} = useQuery(LIKES, {
        variables: {imdb_id: props.movieId}
    });

    const [snackOpen, setSnackOpen] = React.useState(false);
    const snackHandleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackOpen(false);
    };

    const snackHandleClick = () => {
        setSnackOpen(true);
    };

    useEffect(() => {
        if (data) {
            setMovieData(data.movie);
        }
        if (likeData) {
            setLikeData(likeData.likes);
        }
    }, [data, likeData]);

    const [like, {called, loading, data: response, error}] = useMutation(LIKE, {
        onError: (error) => {
            console.log(error);
        },
        onCompleted: (response) => {
            if (response.createLike && movieLikes) {
                setLikeData({hasLiked: false, likesCount: movieLikes.likesCount - 1});
            } else if (movieLikes) {
                setLikeData({hasLiked: true, likesCount: movieLikes.likesCount + 1});
            }
        }
    });

    const handleFavorite = () => {
        if (movieLikes && userData.currentUser != null) {
            like({variables: {imdb_id: props.movieId, username: userData.currentUser.username}});
        } else {
            snackHandleClick();
        }
    };
    useEffect(() => {
        if (props.open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
    }, [props.open]);

    const handleClose = () => {
        if (props.open) {
            props.handlePopupClose();
            setExpanded(false);
        }
    };

    return (
        <div>
            {movieData && (
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
                                    color={movieLikes?.hasLiked ? "secondary" : "default"}
                                    aria-label="add to favorites"
                                    onClick={handleFavorite}
                                >
                                    {movieLikes?.likesCount}
                                    <FavoriteIcon />
                                </IconButton>

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
                                <Snackbar open={snackOpen} autoHideDuration={2000} onClose={snackHandleClose}>
                                    <Alert onClose={snackHandleClose} severity="info">
                                        Log in to favorite movies.
                                    </Alert>
                                </Snackbar>
                            </CardActions>

                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography>
                                        <b>Runtime:</b> {movieData.runtime} min
                                    </Typography>

                                    <Typography>
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
