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
import {MOVIE_DATA} from "../../queries";
import Backdrop from "@material-ui/core/Backdrop";
import CardHeader from "@material-ui/core/CardHeader";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Chip from "@material-ui/core/Chip";

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

function MoviePopup(props: Props) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // Movie data
    const [movieData, setMovieData] = useState<Movie>();

    const {data} = useQuery(MOVIE_DATA, {
        variables: {imdb_id: props.movieId}
    });

    useEffect(() => {
        if (data) {
            setMovieData(data.movie);
        }
    }, [data]);

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

    const handleFavorite = () => {};

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

                            <CardContent>
                                <Typography variant="body2">{movieData.overview}</Typography>
                            </CardContent>

                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites" onClick={handleFavorite}>
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
