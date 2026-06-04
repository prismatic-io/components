import { input, util } from "@prismatic-io/spectral";
import {
  cleanString,
  connectionInput,
  cursor,
  fetchAll,
  highlight,
  limit,
  page,
  query,
  sort_dir,
  sortSearch,
  team_id,
} from "./common";





export const fileContent = input({
  label: "File Content",
  type: "data",
  comments: "The binary data of the file to upload.",
  required: true,
  clean: util.types.toData,
});

export const fileName = input({
  label: "File Name",
  placeholder: "Enter file name",
  type: "string",
  required: true,
  comments: "The name to assign to the uploaded file.",
  example: "reports.csv",
  clean: util.types.toString,
});

export const fileTitle = input({
  label: "File Title",
  placeholder: "Enter file title",
  type: "string",
  required: false,
  example: "Monthly Reports",
  comments: "The title of the file as it will appear in the channel.",
  clean: cleanString,
});

export const channels = input({
  label: "Channels",
  placeholder: "Enter channel IDs",
  type: "string",
  required: false,
  example: "C02B0APBKP1, C02B0APBKP2, C02B0APBKP3",
  comments:
    "A comma-separated list of channel IDs that the file will be shared in.",
  clean: cleanString,
});

export const initialComment = input({
  label: "Initial Comment",
  placeholder: "Enter initial comment",
  type: "string",
  required: false,
  example: "Example message",
  comments:
    "The message text introducing the file in the specified channels when uploaded.",
  clean: cleanString,
});

export const thread = input({
  label: "Thread Reply",
  placeholder: "Enter thread timestamp",
  type: "string",
  required: false,
  example: "u830hd230",
  comments:
    "Another message's ts value to upload this file as a reply. Never use a reply's ts value — use the parent instead.",
  clean: cleanString,
});





export const listFilesInputs = {
  connection: connectionInput,
  fetchAll,
  cursor,
};

export const uploadFileInputs = {
  connection: connectionInput,
  fileContent,
  fileName,
  title: fileTitle,
  channels,
  initialComment,
  thread,
};

export const searchFilesInputs = {
  connection: connectionInput,
  query,
  count: {
    ...limit,
    label: "Count",
    comments: "The number of items to return per page.",
  },
  page,
  highlight,
  sort: sortSearch,
  sort_dir,
  team_id,
};
