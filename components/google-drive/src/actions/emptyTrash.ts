import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs";

export const emptyTrash = action({
  display: {
    label: "Empty Trash",
    description: "Empty the trash of deleted files",
  },
  perform: async (_context, { connection }) => {
    const drive = createClient(connection);
    const { data } = await drive.files.emptyTrash();

    return {
      data,
    };
  },
  inputs: { connection },
});

export default emptyTrash;
