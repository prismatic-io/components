import { action, util } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { createDataSetInputs } from "../../inputs";
import type { CreateDataSetBody } from "../types/CreateDataSetBody";
import { createDataSetExamplePayload } from "../../examplePayloads";

export const createDataSet = action({
  display: {
    label: "Create Data Set",
    description: "Creates a new DataSet in a Domo instance.",
  },
  examplePayload: createDataSetExamplePayload,
  perform: async (
    context,
    { connection, name, description, rows, columns },
  ) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const body: CreateDataSetBody = {
      name,
      description,
      ...(rows.length && { rows: util.types.toNumber(rows) }),
      schema: {
        columns: JSON.parse(columns),
      },
    };
    const { data } = await client.post(`/datasets`, body, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return { data };
  },
  inputs: createDataSetInputs,
});

export default { createDataSet };
