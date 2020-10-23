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
import {MOVIE_DATA, MOVIE} from "./queries";
import Backdrop from "@material-ui/core/Backdrop";
import CardHeader from "@material-ui/core/CardHeader";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "50%",
            [theme.breakpoints.down("sm")]: {
                width: "100%",
                top: "132px",
                left: 0
            },
            position: "absolute",
            top: "80px",
            left: "25%",
            backgroundColor: "white",
            transition: "all 0.5s"
        },
        media: {
            height: 0,
            paddingTop: "56.25%" // 16:9
        },
        expand: {
            transform: "rotate(0deg)",
            marginLeft: "auto",
            transition: theme.transitions.create("transform", {
                duration: theme.transitions.duration.shortest
            })
        },
        expandOpen: {
            transform: "rotate(180deg)"
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: "#fff",
            overflowY: "auto"
        }
    })
);

// The component takes the id of the movie, and then queries the information using this id.
interface Props {
    movieId: string;
    open: boolean;
}
interface ProductionCountry {
    name: string;
}

interface Movie {
    original_title: string;
    overview: string;
    genres: string[];
    production_country: [ProductionCountry];
    release_date: string;
    runtime: number;
    trailer: string;
}

function MoviePopup(props: Props) {
    const classes = useStyles();

    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(props.open);

    const handleClose = () => {
        setOpen(false);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // Movie data
    const [movieData, setMovieData] = useState<Movie>();

    const {data} = useQuery(MOVIE_DATA, {
        variables: {imdb_id: "tt0035423"}
    });

    useEffect(() => {
        if (data) {
            setMovieData(data);
        }
    }, [data]);

    const handleFavorite = () => {};

    return (
        <div>
            <Backdrop className={classes.backdrop} open={open}>
                <Card className={classes.root}>
                    <CardHeader
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                        action={
                            <IconButton aria-label="close" onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        }
                    />
                    <CardMedia className={classes.media} component={"iframe"} height={"140"} image={"https://www.youtube.com/embed/TcMBFSGVi1c&t"}/>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            This impressive paella is a perfect party dish and a fun meal to cook together with your
                            guests. Add 1 cup of frozen peas along with the mussels, if you like.
                        </Typography>
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
                            <Typography paragraph>Method:</Typography>
                            <Typography paragraph>
                                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                                minutes.
                            </Typography>
                            <Typography paragraph>
                                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                                heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                                browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                                and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                                pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                                saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                            </Typography>
                            <Typography paragraph>
                                Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                                without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                                medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                                again without stirring, until mussels have opened and rice is just tender, 5 to 7
                                minutes more. (Discard any mussels that don’t open.)
                            </Typography>
                            <Typography>
                                Set aside off of the heat to let rest for 10 minutes, and then serve.
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </Backdrop>
        </div>
    );
}

export default MoviePopup;
