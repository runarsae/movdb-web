import React, {useState} from "react";
import {makeStyles, Theme, createStyles} from "@material-ui/core/styles";
import VolumeOffRoundedIcon from "@material-ui/icons/VolumeOffRounded";
import VolumeUpRoundedIcon from "@material-ui/icons/VolumeUpRounded";
import {MOVIE_DATA} from "../../queries";
import {useQuery} from "@apollo/client";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: 20
        },
        mute: {
            position: "absolute",
            zIndex: 999,
            bottom: "10%",
            right: 30,
            cursor: "pointer",
            [theme.breakpoints.up("md")]: {
                right: 100,
                bottom: "20%"
            }
        },
        title: {
            color: "#ffffff",
            position: "absolute",
            fontSize: "x-large",
            bottom: "10%",
            left: 30,
            zIndex: 999,
            maxWidth: "calc(100% - 105px)",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "100%",
            overflow: "hidden",
            [theme.breakpoints.up("md")]: {
                maxWidth: "calc(100% - 245px)",
                left: 100,
                bottom: "20%",
                fontSize: "xx-large"
            }
        },
        video: {
            height: "auto",
            width: "100%"
        },
        overlay: {
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            // Gradient from top to bottom: Transparent down to 75%, fade to black from 75% to 100%
            background: "linear-gradient(transparent 75%, black 100%)"
        }
    })
);

export default function TopMovie() {
    const [muted, SetMute] = useState<boolean>(true);
    const classes = useStyles();

    function onClickHandler() {
        muted ? SetMute(false) : SetMute(true);
    }
    const {data} = useQuery(MOVIE_DATA, {
        variables: {imdb_id: "tt3501632"}
    });

    return (
        <div style={{position: "relative"}}>
            <VolumeOffRoundedIcon
                onClick={onClickHandler}
                className={classes.mute}
                fontSize={"large"}
                style={{color: "white", display: muted ? "block" : "none"}}
            />

            <VolumeUpRoundedIcon
                onClick={onClickHandler}
                className={classes.mute}
                fontSize={"large"}
                style={{color: "white", display: muted ? "none" : "block"}}
            />

            <video autoPlay muted={muted} loop className={classes.video}>
                <source type="video/mp4" src="thor.mp4" />
            </video>

            <div className={classes.title}>{data ? data.movie.original_title : "Loading.."}</div>

            <div className={classes.overlay}></div>
        </div>
    );
}
