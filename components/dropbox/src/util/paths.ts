import { util } from "@prismatic-io/spectral";
export const pathBasename = (path: string): string =>
  path.split("/").filter(Boolean).pop() ?? "";
export const validatePath = (path: unknown): void => {
  const filePath = util.types.toString(path);
  if (!filePath.startsWith("/")) {
    throw new Error(
      `Dropbox requires all file paths to start with a leading "/". The file path "${filePath}" does not start with a "/".`,
    );
  }
};
