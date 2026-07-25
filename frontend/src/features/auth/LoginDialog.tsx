import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store";
import { loginStart, loginSuccess, loginFailure } from "./AuthSlice";
import { authApi } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Alert,
  Grow,
} from "@mui/material";
import Close from "../../components/close";
import styled from "@emotion/styled";

interface FormData {
  username: string;
  password: string;
}

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const LoginDialog = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (data: FormData) => {
    dispatch(loginStart());
    try {
      const user = await authApi.login(data);
      dispatch(loginSuccess(user));
      handleClose();
      navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || err.message;
        dispatch(loginFailure(message));
      } else if (err instanceof Error) {
        dispatch(loginFailure(err.message));
      } else {
        dispatch(loginFailure("Login failed"));
      }
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        data-testid="open-login-btn"
      >
        Login
      </Button>
      // ✅ Cleanest - use sx on Dialog
      <Dialog
        open={open}
        onClose={handleClose}
        keepMounted={false}
        aria-labelledby="login-dialog-title"
        maxWidth="xs"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            padding: "2rem 1.5rem",
            borderRadius: 2,
          },
        }}
      >
        <Close onClose={handleClose} />

        <DialogTitle id="login-dialog-title">Login</DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            {error && (
              <Grow in timeout={100}>
                <Alert severity="error" sx={{ marginBottom: "0.75rem" }}>
                  {error}
                </Alert>
              </Grow>
            )}

            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Username"
              variant="outlined"
              fullWidth
              {...register("username", { required: "This field is required" })}
              helperText={errors.username?.message}
              error={Boolean(errors.username)}
            />

            <TextField
              margin="dense"
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              {...register("password", { required: "This field is required" })}
              helperText={errors.password?.message}
              error={Boolean(errors.password)}
            />

            <FormActions>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
                data-testid="submit-login-btn"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </FormActions>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export default LoginDialog;
