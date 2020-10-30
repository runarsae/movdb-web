import React from "react";
import "./Rating.css";

interface Props {
    rating: number;
}

// Display rating number with background color based on how high rating it is
export default function Rating(props: Props) {
    let value: string = "cl" + Math.round(props.rating).toString();
    let spec: string = "spec";

    return <div className={`${value} ${spec}`}>{props.rating.toFixed(1)}</div>;
}
