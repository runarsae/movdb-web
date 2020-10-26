import React, {useEffect, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import withWidth, {isWidthUp} from "@material-ui/core/withWidth";
import {useApolloClient} from "@apollo/client";
import Grid from "@material-ui/core/Grid/Grid";
import Chip from "@material-ui/core/Chip/Chip";
import {
    EventRounded,
    SortByAlphaRounded,
    StarBorderRounded,
    AlarmRounded,
    ArrowUpwardRounded,
    ArrowDownwardRounded
} from "@material-ui/icons";
import ScrollContainer from "react-indiana-drag-scroll";
import {SORT, SORT_DIRECTION} from "../../queries";

type Sort = "rating" | "original_title" | "runtime" | "release_date";
type SortDirection = "ASC" | "DESC";
type Breakpoint = "xs" | "sm" | "mr" | "md" | "lg" | "xl";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sort: {
            padding: theme.spacing(2),
            margin: 0,
            boxSizing: "border-box",
            width: "100%",
            "& .MuiGrid-item": {
                width: "100%"
            },
            position: "fixed",
            zIndex: 20,
            backgroundColor: "white",
            WebkitBoxShadow: "0px 4px 10px 0px rgba(0,0,0,0.40)",
            MozBoxShadow: "0px 4px 10px 0px rgba(0,0,0,0.40)",
            boxShadow: "0px 4px 10px 0px rgba(0,0,0,0.40)",
            transition: "top 0.25s"
        },
        visible: {
            top: "125px",
            [theme.breakpoints.up("sm")]: {
                top: "80px"
            }
        },
        notVisible: {
            top: 0
        },
        sortContainer: {
            display: "flex",
            flexWrap: "nowrap",
            width: "auto",
            padding: theme.spacing(1)
        },
        chip: {
            marginRight: theme.spacing(1),
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            "&:last-child": {
                marginRight: 0
            }
        }
    })
);

interface Props {
    width: Breakpoint;
    visible: boolean;
}

function Sort(props: Props): JSX.Element {
    const classes = useStyles();

    const client = useApolloClient();

    const [sort, setSort] = useState<Sort>("rating");
    const [sortDirection, setSortDirection] = useState<SortDirection>("DESC");

    useEffect(() => {
        client.cache.writeQuery({
            query: SORT,
            data: {
                sort: sort
            }
        });
    }, [sort, client.cache]);

    useEffect(() => {
        client.cache.writeQuery({
            query: SORT_DIRECTION,
            data: {
                sortDirection: sortDirection
            }
        });
    }, [sortDirection, client.cache]);

    const handleSortByClick = (newSort: Sort) => {
        if (newSort !== sort) {
            setSort(newSort);
        }
    };

    const handleSortDirectionClick = (newSortDirection: SortDirection) => {
        if (newSortDirection !== sortDirection) {
            setSortDirection(newSortDirection);
        }
    };

    return (
        <Grid
            container
            className={`${classes.sort} ${props.visible ? classes.visible : classes.notVisible}`}
            justify="space-between"
            alignItems="center"
            spacing={2}
        >
            <ScrollContainer vertical={false} className={classes.sortContainer}>
                <Chip
                    label="Rating"
                    size={isWidthUp("sm", props.width) ? "medium" : "small"}
                    className={classes.chip}
                    color={sort === "rating" ? "secondary" : "default"}
                    icon={<StarBorderRounded fontSize="small" />}
                    onClick={() => handleSortByClick("rating")}
                    clickable={sort !== "rating"}
                />
                <Chip
                    label="Title"
                    size={isWidthUp("sm", props.width) ? "medium" : "small"}
                    className={classes.chip}
                    color={sort === "original_title" ? "secondary" : "default"}
                    icon={<SortByAlphaRounded fontSize="small" />}
                    onClick={() => handleSortByClick("original_title")}
                    clickable={sort !== "original_title"}
                />
                <Chip
                    label="Runtime"
                    size={isWidthUp("sm", props.width) ? "medium" : "small"}
                    className={classes.chip}
                    color={sort === "runtime" ? "secondary" : "default"}
                    icon={<AlarmRounded fontSize="small" />}
                    onClick={() => handleSortByClick("runtime")}
                    clickable={sort !== "runtime"}
                />
                <Chip
                    label="Release Date"
                    size={isWidthUp("sm", props.width) ? "medium" : "small"}
                    className={classes.chip}
                    color={sort === "release_date" ? "secondary" : "default"}
                    icon={<EventRounded fontSize="small" />}
                    onClick={() => handleSortByClick("release_date")}
                    clickable={sort !== "release_date"}
                />
            </ScrollContainer>

            <ScrollContainer vertical={false} className={classes.sortContainer}>
                <Chip
                    label="ASC"
                    size="small"
                    className={classes.chip}
                    color={sortDirection === "ASC" ? "primary" : "default"}
                    icon={<ArrowUpwardRounded fontSize="small" />}
                    onClick={() => handleSortDirectionClick("ASC")}
                    clickable={sortDirection !== "ASC"}
                />
                <Chip
                    label="DESC"
                    size="small"
                    className={classes.chip}
                    color={sortDirection === "DESC" ? "primary" : "default"}
                    icon={<ArrowDownwardRounded fontSize="small" />}
                    onClick={() => handleSortDirectionClick("DESC")}
                    clickable={sortDirection !== "DESC"}
                />
            </ScrollContainer>
        </Grid>
    );
}

export default withWidth()(Sort);
