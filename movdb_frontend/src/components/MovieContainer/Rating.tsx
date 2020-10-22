import React from "react";
import "./Rating.css";

interface Props {
    rating: number;
}

export default function Rating(props: Props) {
    let value: string = "cl" + Math.round(props.rating).toString();
    let spec: string = "spec";
    return <div className={`${value} ${spec}`}>{props.rating}</div>;
}
