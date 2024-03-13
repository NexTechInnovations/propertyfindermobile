import { createContext } from "react";

import { User } from "./types/user";

export const AuthContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({
  user: {
    ID: "",
    firstName: "",
    lastName: "",
    email: "",
    allowsNotifications: true,
    accessToken: "",
    refreshToken: "",
    savedProperties: [4517185],
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
