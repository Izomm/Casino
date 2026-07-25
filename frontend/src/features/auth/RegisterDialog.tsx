import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Alert } from "@mui/material";
import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "../../store";
import { registerStart, clearError } from "./AuthSlice";
import Close from "../../components/close";

import { registerFailure, registerSuccess } from "./AuthSlice";

import { authApi } from "../../api/auth";

const FormActions = styled.div`
  margin-top: 1rem;
  text-align: right;
`;

interface FormData {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

interface RegisterFormData {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

const RegisterDialog = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();
  const error = useAppSelector((state) => state.auth.error);
  const loading = useAppSelector((state) => state.auth.loading);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setError("root", { type: "manual", message: error });
    }
  }, [error, setError]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(clearError());
  };

  const onSubmit = async (data: RegisterFormData) => {
    dispatch(registerStart());

    try {
      // ✅ Map to API expected format
      const user = await authApi.register({
        username: data.username,
        email: data.email,
        password: data.password1, // password1 → password
      });
      dispatch(registerSuccess(user));
      handleClose();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Registration failed";
      dispatch(registerFailure(errorMessage));
    }
  };
  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpen}
        data-testid="open-register-btn"
        sx={{
          bgcolor: "#f1f2f7",
          ml: 1,
          color: "#434449",
          "&:hover": {
            bgcolor: "#e2e3e6",
          },
        }}
      >
        Register
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        keepMounted={false}
        aria-labelledby="register-dialog-title"
        maxWidth="xs"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            padding: "2rem 1.5rem",
          },
        }}
      >
        <Close onClose={handleClose} />

        <DialogTitle id="register-dialog-title">Register</DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            {error && (
              <Alert severity="error" sx={{ mb: 1.5 }}>
                {error}
              </Alert>
            )}

            <TextField
              autoFocus
              margin="dense"
              label="Username"
              variant="outlined"
              fullWidth
              {...register("username", { required: "This field is required" })}
              helperText={errors.username?.message}
              error={Boolean(errors.username)}
            />

            <TextField
              margin="dense"
              label="Email"
              variant="outlined"
              fullWidth
              {...register("email")}
              helperText={errors.email?.message}
              error={Boolean(errors.email)}
            />

            <TextField
              margin="dense"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              {...register("password1", { required: "This field is required" })}
              helperText={errors.password1?.message}
              error={Boolean(errors.password1)}
            />

            <TextField
              margin="dense"
              label="Confirm Password"
              variant="outlined"
              type="password"
              fullWidth
              {...register("password2", { required: "This field is required" })}
              helperText={errors.password2?.message}
              error={Boolean(errors.password2)}
            />

            <FormActions>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
                data-testid="submit-register-btn"
              >
                {loading ? "Registering..." : "Register"}
              </Button>
            </FormActions>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export default RegisterDialog;
