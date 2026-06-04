import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, formId, operations } from "../../inputs";
import { genericUpdateResponse } from "../../examplePayloads/general";
import { updateFormInput } from "./../../exampleInputs/forms";
import { OPERATIONS_APPLIED } from "../../constants";

export const updateForm = action({
  display: {
    label: "Update Form",
    description: "Update a form.",
  },
  inputs: {
    id: formId,
    operations: {
      ...operations,
      example: JSON.stringify(updateFormInput, null, 2),
    },
    connection,
  },
  perform: async (context, { connection, id, operations }) => {
    const client = createClient(connection, context.debug.enabled);

    await client.patch(`/forms/${id}`, operations);
    return {
      data: {
        message: OPERATIONS_APPLIED,
      },
    };
  },
  examplePayload: {
    data: genericUpdateResponse,
  },
});
