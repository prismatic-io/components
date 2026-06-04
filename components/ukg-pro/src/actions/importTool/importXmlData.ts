import { action } from "@prismatic-io/spectral";
import { createBasicAuthClient } from "../../client";
import { importXmlDataExamplePayload } from "../../examplePayloads";
import { importXmlDataInputs } from "../../inputs";







export const importXmlData = action({
  display: {
    label: "Import XML Data",
    description:
      "Submit an encoded XML transaction to the UKG Pro Import Tool for processing employee data imports.",
  },
  inputs: importXmlDataInputs,
  perform: async (context, { connection, xmlTransaction, uniqueFileName }) => {
    const client = createBasicAuthClient(connection, context.debug.enabled);

    const encodedXml = Buffer.from(xmlTransaction as string).toString("base64");

    const { data } = await client.post("/personnel/v1/import-tool", {
      transaction: encodedXml,
      uniqueFileName,
    });

    return { data };
  },
  examplePayload: importXmlDataExamplePayload,
});
