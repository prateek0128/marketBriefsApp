// utils/authStorage.ts
import { storage } from "./storage";

interface AuthResponseData {
  is_new_user: boolean;
  onboarding_required: boolean;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: any;
  status: string;
  message: string;
}

export const saveAuthTokens = async (responseData: AuthResponseData) => {
  const { access_token, refresh_token, expires_in, user, status, message } =
    responseData;

  const accessTokenExpiry = Math.floor(Date.now() / 1000) + expires_in;
  const refreshTokenExpiry = Math.floor(Date.now() / 1000) + 60 * 24 * 60 * 60;

  await storage.multiSet([
    ["authToken", access_token],
    ["status", status ?? ""],
    ["message", message ?? ""],
    ["user", JSON.stringify(user ?? {})],
    ["onboardingCompleted", String(user.onboarding_completed ?? false)],
    ["tokenExpiry", accessTokenExpiry.toString()],
    ["refreshToken", refresh_token],
    ["refreshTokenExpiry", refreshTokenExpiry.toString()],
  ]);

  return {
    onboardingCompleted: user.onboarding_completed,
    accessToken: access_token,
    refreshToken: refresh_token,
    accessTokenExpiry,
    refreshTokenExpiry,
  };
};
