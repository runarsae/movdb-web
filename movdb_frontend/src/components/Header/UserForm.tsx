import React, {useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton/IconButton";
import {CloseRounded} from "@material-ui/icons";
import LoginForm from "./LoginForm";
import {UserFormCloseEvent} from "./UserButton";
import RegisterForm from "./RegisterForm";

export type FormTypes = "login" | "register";

interface Props {
    open: boolean;
    handleUserFormClose: (e: UserFormCloseEvent) => void;
}

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        closeButton: {
            position: "absolute",
            right: theme.spacing(2),
            top: theme.spacing(2)
        },
        dialogTitle: {
            paddingBottom: theme.spacing(2)
        },
        dialogContent: {
            paddingTop: 0,
            paddingBottom: 0
        },
        formElement: {
            paddingBottom: theme.spacing(1),
            "&:last-child": {
                paddingBottom: 0
            }
        },
        textFieldIcon: {
            paddingTop: "10px",
            paddingRight: theme.spacing(2)
        },
        actionButtons: {
            padding: theme.spacing(2)
        },
        underline: {
            "&:hover:not(.Mui-disabled):before": {
                borderBottom: "1px solid rgba(0, 0, 0, 0.42)"
            }
        }
    })
);

function UserForm(props: Props): JSX.Element {
    const classes = useStyles();

    const [form, setForm] = useState<FormTypes>("login");

    return (
        <Dialog
            open={props.open}
            onClose={() => {
                props.handleUserFormClose(null);
                setForm("login");
            }}
        >
            <IconButton
                aria-label="close"
                className={classes.closeButton}
                size="small"
                onClick={() => {
                    props.handleUserFormClose(null);
                    setForm("login");
                }}
            >
                <CloseRounded />
            </IconButton>

            {props.open && form === "login" && (
                <LoginForm
                    handleUserFormClose={(e: UserFormCloseEvent) => props.handleUserFormClose(e)}
                    handleFormChange={(form: FormTypes) => setForm(form)}
                />
            )}

            {props.open && form === "register" && (
                <RegisterForm
                    handleUserFormClose={(e: UserFormCloseEvent) => props.handleUserFormClose(e)}
                    handleFormChange={(form: FormTypes) => setForm(form)}
                />
            )}
        </Dialog>
    );
}

export default UserForm;
