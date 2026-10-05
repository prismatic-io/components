export const createUploadStreamOutputSchema = {
  type: "string" as const,
  format: "uuid",
};
export const writeUploadStreamOutputSchema = {
  type: "null" as const,
};
export const closeUploadStreamOutputSchema = {
  type: "null" as const,
};
