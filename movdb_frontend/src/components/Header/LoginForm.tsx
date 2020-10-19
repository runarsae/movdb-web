import React, {FormEvent, useState} from "react";
import {useLazyQuery} from "@apollo/client";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField/TextField";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button";
import {PersonRounded, VpnKeyRounded} from "@material-ui/icons";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import {FormTypes, useStyles} from "./UserForm";
import {LOGIN} from "../../queries";
import Box from "@material-ui/core/Box";
import { UserFormCloseEvent } from "./UserButton";

interface Props {
    handleUserFormClose: (e: UserFormCloseEvent) => void;
    handleFormChange: (form: FormTypes) => void;
}

function LoginForm(props: Props): JSX.Element {
    const classes = useStyles();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [submitted, setSubmitted] = useState<boolean>(false);

    const [login, {called, loading, data, error}] = useLazyQuery(LOGIN, {
        onCompleted: (data) => {
            if (data) {
                const token = data.loginUser.token;

                if (token) {
                    localStorage.setItem("token", token);
                    props.handleUserFormClose("login");
                }
            }
        }
    });

    const keyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSubmitted(true);

        if (username.length !== 0 && password.length !== 0) {
            login({variables: {username: username, password: password}});
        }
    };

    return (
        <div>
            <DialogTitle className={classes.dialogTitle}>Log in</DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <form onSubmit={handleSubmit}>
                    <Grid
                        container
                        className={classes.formElement}
                        justify="center"
                        alignItems="flex-start"
                        wrap="nowrap"
                    >
                        <Grid item className={classes.textFieldIcon}>
                            <PersonRounded />
                        </Grid>
                        <Grid item>
                            <TextField
                                placeholder="Username"
                                autoComplete="username"
                                margin="dense"
                                autoFocus
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyDown={keyPress}
                                value={username}
                                error={submitted && username.length === 0 ? true : false}
                                helperText={submitted && username.length === 0 ? "Please enter username." : ""}
                                InputProps={{
                                    classes: {
                                        underline: classes.underline,
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        className={classes.formElement}
                        justify="center"
                        alignItems="flex-start"
                        wrap="nowrap"
                    >
                        <Grid item className={classes.textFieldIcon}>
                            <VpnKeyRounded />
                        </Grid>
                        <Grid item>
                            <TextField
                                placeholder="Password"
                                type="password"
                                margin="dense"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={keyPress}
                                value={password}
                                error={submitted && password.length === 0 ? true : false}
                                helperText={submitted && password.length === 0 ? "Please enter password." : ""}
                                InputProps={{
                                    classes: {
                                        underline: classes.underline,
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>

                    {called && loading && (
                        <Box pt={1}>
                            <LinearProgress />
                        </Box>
                    )}

                    {error && (
                        <Box pt={1}>
                            <Typography variant="caption" color="error" align="center" display="block">
                                {error.message}
                            </Typography>
                        </Box>
                    )}
                </form>
            </DialogContent>
            <DialogActions className={classes.actionButtons}>
                <Button color="secondary" size="small" onClick={() => props.handleFormChange("register")}>
                    Register
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={loading || data ? true : false}
                >
                    Log in
                </Button>
            </DialogActions>
        </div>
    );
}

export default LoginForm;
