"use client";
import { Box, Typography, Input, Button, Divider, Link } from "@mui/joy";
import Image from "next/image";
import Logo from "@/public/catchuplogo.svg";
import Google from "@/public/companies/google.svg";
import { useState } from "react";
import { register } from "@/api/auth.api";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await register({ name, email, password });
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "background.body",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "background.surface",
          p: 6,
          borderRadius: "32px",
          width: "100%",
          maxWidth: "460px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Image src={Logo} alt="CatchUp" width={140} height={50} />

        <Typography
          level="body-md"
          sx={{
            color: "text.primary",
            fontWeight: "bold",
            mt: 1,
            fontSize: "1.1rem",
          }}
        >
          Sign Up
        </Typography>

        <Button
          variant="plain"
          sx={{
            bgcolor: "primary.100",
            color: "black",
            width: "100%",
            borderRadius: "32px",
            height: "56px",
            "&:hover": { bgcolor: "primary.200" },
            display: "flex",
            gap: 1.5,
            mt: 1,
          }}
        >
          <Image src={Google} alt="Google logo" height={24} width={24} />
          <Typography sx={{ color: "black", fontWeight: "bold" }}>
            Sign up with Google
          </Typography>
        </Button>

        <Divider
          sx={{
            width: "100%",
            my: 1,
            "--Divider-childPosition": "50%",
            "&::before, &::after": { borderColor: "divider" },
          }}
        >
          <Typography
            level="body-xs"
            sx={{ color: "text.primary", fontWeight: "bold", px: 1 }}
          >
            OR
          </Typography>
        </Divider>

        <form
          onSubmit={handleSignUp}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <Input
            placeholder="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{
              bgcolor: "transparent",
              border: "1px solid",
              borderColor: "neutral.500",
              borderRadius: "32px",
              color: "text.primary",
              height: "56px",
              px: 3,
              "--Input-placeholderOpacity": 0.5,
              "&:focus-within": {
                borderColor: "text.primary",
                "--Input-focusedHighlight": "transparent",
              },
            }}
          />
          <Input
            placeholder="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              bgcolor: "transparent",
              border: "1px solid",
              borderColor: "neutral.500",
              borderRadius: "32px",
              color: "text.primary",
              height: "56px",
              px: 3,
              "--Input-placeholderOpacity": 0.5,
              "&:focus-within": {
                borderColor: "text.primary",
                "--Input-focusedHighlight": "transparent",
              },
            }}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              bgcolor: "transparent",
              border: "1px solid",
              borderColor: "neutral.500",
              borderRadius: "32px",
              color: "text.primary",
              height: "56px",
              px: 3,
              "--Input-placeholderOpacity": 0.5,
              "&:focus-within": {
                borderColor: "text.primary",
                "--Input-focusedHighlight": "transparent",
              },
            }}
          />

          {error && (
            <Typography
              level="body-xs"
              color="danger"
              sx={{ textAlign: "center" }}
            >
              {error}
            </Typography>
          )}

          {success && (
            <Typography
              level="body-xs"
              color="success"
              sx={{ textAlign: "center" }}
            >
              Registration successful! Redirecting to login...
            </Typography>
          )}

          <Button
            type="submit"
            loading={loading}
            sx={{
              bgcolor: "primary.100",
              color: "black",
              width: "100%",
              borderRadius: "32px",
              height: "56px",
              "&:hover": { bgcolor: "primary.200" },
              mt: 1,
            }}
          >
            <Typography sx={{ color: "black", fontWeight: "bold" }}>
              Continue
            </Typography>
          </Button>
        </form>

        <Link
          href="/login"
          sx={{
            color: "text.primary",
            fontWeight: "bold",
            textDecoration: "underline",
            mt: 1,
            "&:hover": { color: "text.secondary" },
          }}
        >
          Already have an account? Login
        </Link>
      </Box>
    </Box>
  );
};

export default SignUp;
