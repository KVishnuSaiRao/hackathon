import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Link,
  useTheme,
} from "@mui/material";

import { useRouter } from "next/router";

const SignInPage = () => {
  const theme = useTheme();
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event:any) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();
    // Perform form validation or API call here
    console.log("Form Submitted:", formData);

    // Example of handling invalid login:
    if (formData.email === "audit@track3d.ai" || formData.password === "Testing@123") {
        router.push('/analytics')
    } 
  };

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {/* Left Section */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Welcome Back!
        </Typography>
        <Typography variant="body1">
          Manage your account and stay connected with our community.
        </Typography>
      </Grid>

      {/* Right Section */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
        }}
      >
        <Box
          component="form"
          sx={{
            width: "100%",
            maxWidth: 400,
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Sign In
          </Typography>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <Link href="#" variant="body2" sx={{ display: "block", marginTop: 1 }}>
            Forgot your password?
          </Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 3, padding: 1 }}
          >
            Sign In
          </Button>
          <Typography
            variant="body2"
            sx={{ marginTop: 2, textAlign: "center" }}
          >
            Don't have an account?{" "}
            <Link href="#" variant="body2">
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignInPage;
