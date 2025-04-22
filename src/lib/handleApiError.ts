// lib/apiErrorHandler.ts

const handleApiError = (error: any): string => {
    if (error.response) {
      // Server responded with a status other than 200
      const status = error.response.status;
      switch (status) {
        case 404:
          return 'The requested resource could not be found.';
        case 500:
          return 'An internal server error occurred. Please try again later.';
        default:
          return `An error occurred: ${status}. Please try again later.`;
      }
    } else if (error.request) {
      // No response was received
      return 'No response received from the server. Please check your network connection.';
    } else {
      // Other errors
      return `Error: ${error.message || 'An unknown error occurred.'}`;
    }
};

export default handleApiError;