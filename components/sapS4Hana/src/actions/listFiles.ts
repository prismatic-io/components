import { action, input, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getSapClient } from "../client";
import { connectionInput, filter, inlinecount } from "../inputs";

export const listFilesSelect = input({
  label: "Select",
  type: "string",
  comments: "Select property to be returned",
  required: false,
  model: [
    { label: "PackageName", value: "PackageName" },
    { label: "FileName", value: "FileName" },
    { label: "ObjectName", value: "ObjectName" },
    { label: "Scenario", value: "Scenario" },
    { label: "FileSize", value: "FileSize" },
  ],
  clean: util.types.toString,
});

export const listFiles = action({
  display: {
    label: "List Files",
    description: "Retrieves list of prepared files, based on specific filter conditions.",
  },
  perform: async (_context, { connectionInput, filter, inlinecount, select }) => {
    const selectArray = select ? select.split(",") : [];

    const headers = {
      Accept: "application/json",
    };
    const client = getSapClient(connectionInput, headers);
    try {
      const { data } = await client.get(
        `/sap/opu/odata/sap/API_CDR_FILE_DOWNLOAD_SRV/ListFiles?${
          filter.length ? `$filter=${filter}&` : ""
        }${inlinecount.length ? `$inlinecount=${inlinecount}&` : ""}${
          selectArray.length ? `$select=${selectArray.join(",")}&` : ""
        }`,
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    connectionInput,
    filter: { ...filter, required: true },
    inlinecount,
    select: listFilesSelect,
  },
});
