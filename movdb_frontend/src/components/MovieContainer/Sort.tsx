import React, {useEffect, useState} from "react";
import {createStyles, makeStyles, Theme, Typography} from "@material-ui/core";
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
import {SORT, SORT_DIRECTION} from "../../queries";

type Sort = "rating" | "original_title" | "runtime" | "release_date";
type SortDirection = "ASC" | "DESC";
type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

interface Props {
    width: Breakpoint;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sort: {
            padding: theme.spacing(2),
            margin: 0,
            boxSizing: "border-box",
            width: "100%",
            "&.MuiGrid-container": {
                margin: 0
            }
        },
        chip: {
            marginRight: theme.spacing(1),
            "&:last-child": {
                marginRight: 0
            }
        }
    })
);

function Sort(props: Props): JSX.Element {
    const classes = useStyles();

    const client = useApolloClient();

    const [sort, setSort] = useState<Sort>("rating");
    const [sortDirection, setSortDirection] = useState<SortDirection>("DESC");

    useEffect(() => {
        console.log("Write to cache:", sort);

        client.cache.writeQuery({
            query: SORT,
            data: {
                sort: {sort: sort}
            }
        });
    }, [sort]);

    useEffect(() => {
        console.log("Write to cache:", sortDirection);

        client.cache.writeQuery({
            query: SORT_DIRECTION,
            data: {
                sortDirection: {sortDirection: sortDirection}
            }
        });
    }, [sortDirection]);

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
        <Grid container className={classes.sort} justify="space-between" alignItems="center" spacing={2}>
            <Grid item>
                <Grid container justify="flex-start" alignItems="center" spacing={1}>
                    <Grid item>
                        <Typography variant="button" color="initial">
                            Sort by:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Chip
                            label="Rating"
                            size={isWidthUp("sm", props.width) ? "medium" : "small"}
                            className={classes.chip}
                            color="secondary"
                            icon={<StarBorderRounded fontSize="small" />}
                            onClick={() => handleSortByClick("rating")}
                            variant={sort !== "rating" ? "outlined" : "default"}
                            clickable={sort !== "rating"}
                        />
                        <Chip
                            label="Title"
                            size={isWidthUp("sm", props.width) ? "medium" : "small"}
                            className={classes.chip}
                            color="secondary"
                            icon={<SortByAlphaRounded fontSize="small" />}
                            onClick={() => handleSortByClick("original_title")}
                            variant={sort !== "original_title" ? "outlined" : "default"}
                            clickable={sort !== "original_title"}
                        />
                        <Chip
                            label="Runtime"
                            size={isWidthUp("sm", props.width) ? "medium" : "small"}
                            className={classes.chip}
                            color="secondary"
                            icon={<AlarmRounded fontSize="small" />}
                            onClick={() => handleSortByClick("runtime")}
                            variant={sort !== "runtime" ? "outlined" : "default"}
                            clickable={sort !== "runtime"}
                        />
                        <Chip
                            label="Release Date"
                            size={isWidthUp("sm", props.width) ? "medium" : "small"}
                            className={classes.chip}
                            color="secondary"
                            icon={<EventRounded fontSize="small" />}
                            onClick={() => handleSortByClick("release_date")}
                            variant={sort !== "release_date" ? "outlined" : "default"}
                            clickable={sort !== "release_date"}
                        />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item>
                <Chip
                    label="ASC"
                    size="small"
                    className={classes.chip}
                    color="primary"
                    icon={<ArrowUpwardRounded fontSize="small" />}
                    onClick={() => handleSortDirectionClick("ASC")}
                    variant={sortDirection !== "ASC" ? "outlined" : "default"}
                    clickable={sortDirection !== "ASC"}
                />
                <Chip
                    label="DESC"
                    size="small"
                    className={classes.chip}
                    color="primary"
                    icon={<ArrowDownwardRounded fontSize="small" />}
                    onClick={() => handleSortDirectionClick("DESC")}
                    variant={sortDirection !== "DESC" ? "outlined" : "default"}
                    clickable={sortDirection !== "DESC"}
                />
            </Grid>
        </Grid>
    );
}

export default withWidth()(Sort);
