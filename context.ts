import { createContext } from "react";

import { User } from "./types/user";

export const AuthContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({
  user: {
    ID: 12,
    firstName: "Saif",
    lastName: "Mohamed",
    email: "saifmohamed.dev@gmail.com",
    allowsNotifications: true,
    accessToken: "12361263",
    refreshToken: "138765123",
  },
  setUser: (user: User | null) => {},
});

export const LoadingContext = createContext<{
  loading: boolean;
  setLoading: (loading: boolean) => void;
}>({
  loading: false,
  setLoading: (loading: boolean) => {},
});
