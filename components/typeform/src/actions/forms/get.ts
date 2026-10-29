import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, formId } from "../../inputs";
import { fetchData } from "../../util";
import { getFormResponse } from "../../examplePayloads/forms";
import type { Form } from "../../interfaces/forms";

export const getForm = action({
  display: {
    label: "Get Form",
    description: "Retrieve a form.",
  },
  inputs: {
    id: formId,
    connection,
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);

    const data = await fetchData<Form>(client, `/forms/${id}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: getFormResponse,
  },
});
