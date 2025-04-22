// lib/apiErrorHandler.ts
import { AxiosError } from "axios";
import { HTTP_STATUS } from "@/constants/http"; // Import the HTTP status constants
const handleApiError = (error: unknown): string => {
  const axiosError = error as AxiosError;

  if (axiosError.response) {
    // Server responded with a status other than 200
    const status = axiosError.response.status;
    switch (status) {
      case HTTP_STATUS.BAD_REQUEST:
        return 'The requested resource could not be found.';
      case HTTP_STATUS.UNAUTHORIZED:
        return 'An internal server error occurred. Please try again later.';
      default:
        return `An error occurred: ${status}. Please try again later.`;
    }
  } else if (axiosError.request) {
    // No response was received
    return 'No response received from the server. Please check your network connection.';
  } else {
    // Other errors
    return `Error: ${axiosError.message || 'An unknown error occurred.'}`;
  }
};

export default handleApiError;