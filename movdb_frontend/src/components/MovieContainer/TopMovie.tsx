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
            cursor: "pointer",
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
            cursor: "pointer",
            // Gradient from top to bottom: Transparent down to 75%, fade to black from 75% to 100%
            background: "linear-gradient(transparent 75%, #221F1F 100%)"
        }
    })
);

interface Props {
    onClick: (imdbID: string) => void;
}

export default function TopMovie(props: Props) {
    const [muted, SetMute] = useState<boolean>(true);
    const classes = useStyles();

    const IMDB_ID = "tt3501632";

    function volumeHandler() {
        muted ? SetMute(false) : SetMute(true);
    }
    const {data} = useQuery(MOVIE_DATA, {
        variables: {imdb_id: IMDB_ID}
    });

    return (
        <div style={{position: "relative"}}>
            <VolumeOffRoundedIcon
                onClick={volumeHandler}
                className={classes.mute}
                fontSize={"large"}
                style={{color: "white", display: muted ? "block" : "none"}}
            />

            <VolumeUpRoundedIcon
                onClick={volumeHandler}
                className={classes.mute}
                fontSize={"large"}
                style={{color: "white", display: muted ? "none" : "block"}}
            />

            <video autoPlay muted={muted} loop className={classes.video}>
                <source type="video/mp4" src="thor.mp4" />
            </video>

            <div className={classes.title} onClick={() => props.onClick(IMDB_ID)}>
                {data ? data.movie.original_title : "Loading.."}
            </div>

            <div className={classes.overlay} onClick={() => props.onClick(IMDB_ID)}></div>
        </div>
    );
}
