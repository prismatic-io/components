import { action } from "@prismatic-io/spectral";
import { parse as parseXlsx } from "node-xlsx";
import axios from "axios";
import {
  checkDownloadQueryParam,
  downloadFileFromSharepoint,
  isSharePointUrl,
  validateFileParsable,
} from "../helpers";
import { fileUrl } from "../inputs/general";

export const parse = action({
  display: {
    label: "Read from URL",
    description:
      "Parses an xlsx file from a URL endpoint and outputs an array of worksheets.",
  },
  perform: async (_context, { fileUrl }) => {
    let fileData: Buffer;
    if (isSharePointUrl(fileUrl)) {
      fileUrl = checkDownloadQueryParam(fileUrl);
      fileData = await downloadFileFromSharepoint(fileUrl);
    } else {
      const response = await axios.get<Buffer>(fileUrl, {
        responseType: "arraybuffer",
      });
      fileData = response.data;
    }
    const { data: bufferData } = validateFileParsable(fileData);
    const data = await Promise.resolve(
      parseXlsx(bufferData as unknown as ArrayBuffer),
    );

    return {
      data,
    };
  },
  inputs: {
    fileUrl,
  },
});
