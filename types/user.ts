export type User = {
  ID: string;
  firstName?: string;
  lastName?: string;
  email: string | null;
  savedProperties?: number[];
  allowsNotifications: boolean;
  pushToken?: string;
  sessionID?: string;
  accessToken: string;
  refreshToken: string;
};
