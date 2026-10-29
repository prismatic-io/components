export interface OneDriveError {
  response: {
    data: { error: { code: string; message: string } };
    status: string;
  };
  code: string;
}
