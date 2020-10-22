import React from "react";
import {makeStyles, Theme, createStyles} from "@material-ui/core/styles";
import Rating from "./Rating";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";

interface Props {
    backgroundImage: string;
    title: string;
    rating: number;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 150,
            height: 225,
            margin: 15
        },
        media: {
            width: 150,
            height: 225,
            objectFit: "contain"
        }
    })
);

export default function RecipeReviewCard(props: Props) {
    const classes = useStyles();

    return (
        <div>
            <Card raised={true} className={classes.root}>
                <CardActionArea>
                    <CardMedia className={classes.media} image={props.backgroundImage} title={props.title} />
                    <Rating rating={props.rating} />
                </CardActionArea>
            </Card>
        </div>
    );
}
