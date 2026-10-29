import { action } from "@prismatic-io/spectral";
import { getAsposeClient } from "../../client";
import { getDiagramExamplePayload } from "../../examplePayloads";
import { connection, diagramName, folderPath, format } from "../../inputs";

export const getDiagram = action({
  display: {
    label: "Get Diagram",
    description: "Exports the document into the specified format.",
  },
  inputs: {
    connection,
    diagramName,
    format,
    folder: {
      ...folderPath,
      required: false,
      label: "Folder Path",
      comments: "The folder path where original diagram is located.",
    },
  },
  perform: async (context, { connection, diagramName, format, folder }) => {
    const client = await getAsposeClient(connection, context.debug.enabled);

    const { data } = await client.get(`/diagram/${diagramName}`, {
      params: {
        format: format || undefined,
        folder: folder || undefined,
      },
    });

    return { data };
  },
  examplePayload: getDiagramExamplePayload,
});
