export interface ApiResponse {
  response_status: number;
  response_message: string;
  response_data:
    | {
        [key: string]: unknown;
        error_message?: string;
      }
    | unknown[];
}
