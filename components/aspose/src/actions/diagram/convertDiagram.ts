import { action } from "@prismatic-io/spectral";
import { getAsposeClient } from "../../client";
import { convertDiagramExamplePayload } from "../../examplePayloads";
import { connection, diagramName, fileContent } from "../../inputs";

export const convertDiagram = action({
  display: {
    label: "Convert Diagram",
    description:
      "Converts document from the request's content to the specified format.",
  },
  inputs: {
    connection,
    fileContent,
    fileName: {
      ...diagramName,
      label: "File Name",
      comments: "Download Document Name",
    },
  },
  perform: async (context, { connection, fileContent, fileName }) => {
    const client = await getAsposeClient(connection, context.debug.enabled);

    const { data } = await client.put(
      `/diagram/${fileName}/convert`,
      fileContent,
    );

    return { data };
  },
  examplePayload: convertDiagramExamplePayload,
});
