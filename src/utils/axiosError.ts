import { AxiosError } from "axios";

type ApiErrorResponse = {
  status: string;
  message: string;
};

// ✅ Reusable error handler
export const getAxiosErrorMessage = (
  err: unknown,
  fallbackMessage = "Something went wrong"
): string => {
  const axiosErr = err as AxiosError<ApiErrorResponse>;
  return axiosErr.response?.data?.message ?? fallbackMessage;
};
