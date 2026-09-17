export interface SendGridError {
  message: string;
  response?: {
    body?: {
      errors?: {
        message: string;
      }[];
    };
  };
}
