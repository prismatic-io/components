import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { createStreamInputs } from "../../inputs";
import type { CreateStreamBody } from "../types/CreateStreamBody";
import { createStreamExamplePayload } from "../../examplePayloads";

export const createStream = action({
  display: {
    label: "Create Stream",
    description: "Creates a new stream and its associated DataSet in Domo.",
  },
  examplePayload: createStreamExamplePayload,
  perform: async (
    context,
    {
      connection,
      dataSet,
      updateMethod,
      name,
      description,
      columns,
      updateMethodBody,
    },
  ) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    let dataSetParams = "";
    dataSet.forEach((param: string, index: number) => {
      if (index > 0) dataSetParams += "&";
      dataSetParams += `dataSet=${param}`;
    });

    const columnsArray = JSON.parse(columns);
    const hasBodyDataSet =
      name.length ||
      description.length ||
      columnsArray.length ||
      updateMethodBody.length;
    const body: CreateStreamBody = {
      ...(hasBodyDataSet && {
        dataSet: {
          ...(name.length && { name }),
          ...(description.length && { description }),
          ...(columnsArray.length && { schema: { columns: columnsArray } }),
          ...(updateMethodBody.length && { updateMethod: updateMethodBody }),
        },
      }),
    };
    const { data } = await client.post(
      `/streams?${dataSetParams}
    ${updateMethod.length ? `&updateMethod=${updateMethod}` : ""}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    return { data };
  },
  inputs: createStreamInputs,
});

export default { createStream };
