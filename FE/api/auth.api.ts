import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "@/types/auth.types";
import { apiFetch } from "./client";

export const register = (data: RegisterRequest) =>
  apiFetch<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const login = (data: LoginRequest) =>
  apiFetch<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
