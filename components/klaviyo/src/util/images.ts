export const bufferToDataUri = (buffer: Buffer, mimeType: string): string => {
  const base64String = buffer.toString("base64");
  return `data:${mimeType};base64,${base64String}`;
};
