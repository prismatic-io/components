import { action } from "@prismatic-io/spectral";
import { file } from "../inputs/general";
import { parse } from "node-xlsx";

export const parseBuffer = action({
  display: {
    label: "Read from Buffer",
    description:
      "Parses an xlsx file from a buffer and outputs an array of worksheets.",
  },
  perform: async (_context, { file }) => {
    const { data: bufferData } = file;
    const data = await Promise.resolve(
      parse(bufferData as unknown as ArrayBuffer),
    );
    return {
      data,
    };
  },
  inputs: { file },
});
