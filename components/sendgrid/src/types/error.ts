export type SendGridError = {
  message: string;
  response?: { body?: { errors?: { message: string }[] } };
};
