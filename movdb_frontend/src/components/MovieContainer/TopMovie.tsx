import React, {useState} from "react";
import {makeStyles, Theme, createStyles} from "@material-ui/core/styles";
import "./TopMovie.css"
import VolumeOffRoundedIcon from '@material-ui/icons/VolumeOffRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import {MOVIE} from "../../queries";
import { useQuery } from "@apollo/client";


interface Props{
    link: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: 20
        },
        mute: {
            position:"absolute",
            zIndex:999,
            bottom: 80,
            right: 80
        },
    })
);




export default function TopMovie(props: Props) {
    const [muted, SetMute] = useState<boolean>(true);
    const classes = useStyles();
    
    function onClickHandler(){
        muted?SetMute(false):SetMute(true);
    }
    const {data} = useQuery(MOVIE, {
        variables: { search: "Thor: Ragnarok" }});
    
    return(
        <div style={{position:"relative"}}>
            <VolumeOffRoundedIcon onClick={onClickHandler} className={classes.mute} fontSize={"large"} style={{ color: "white", display: muted?"block":"none" }} />
            <VolumeUpRoundedIcon onClick={onClickHandler} className={classes.mute} fontSize={"large"} style={{ color: "white", display: muted?"none":"block" }} />
            <video autoPlay muted={muted} loop>
                <source type="video/mp4" src="thor.mp4"/>
            </video>
            {/* {data?data.movies[0].rating:"loading"} */}
            <div className="title">{data?data.movies[0].original_title:"loading"}</div>
        </div>
        )

}
