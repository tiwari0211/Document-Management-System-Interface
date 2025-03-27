import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  Grid,
  Link,
  Divider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }
    setError("");
    alert(`Logged in with ${email}`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #f4f6f9, #eef1f5)",
        padding: 2,
      }}
    >
      <Container component="main" maxWidth="xs">
        <Card
          sx={{
            p: 4,
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          <CardContent>
            <Avatar sx={{ bgcolor: "primary.main", mx: "auto", mb: 2 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Please sign in to continue
            </Typography>

            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: 2 },
                  "& .MuiInputLabel-root": { fontSize: 14 },
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: 2 },
                  "& .MuiInputLabel-root": { fontSize: 14 },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  py: 1.4,
                  fontSize: "16px",
                  textTransform: "none",
                  borderRadius: 2,
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                  "&:hover": { backgroundColor: "primary.dark" },
                }}
              >
                Login
              </Button>

              <Divider sx={{ my: 3 }} />

              <Grid container justifyContent="space-between">
                <Grid>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid>
                  <Link href="#" variant="body2">
                    {"Create an account"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default SignIn;
