import { action, outputSchema } from "@prismatic-io/spectral";
import { executeXmlRequest, handleSageError } from "../../util";
import { deleteObjectExamplePayload } from "../../examplePayloads";
import { deleteObjectInputs } from "../../inputs";
import { deleteObjectOutputSchema } from "../../outputSchemas";
export const deleteObject = action({
  display: {
    label: "Delete Object",
    description: "Deletes different objects in Sage Intacct.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, object, keys }) => {
    const action = `<delete>
    <object>${object}</object>
    <keys>${keys}</keys>
  </delete>`;
    const responseFromSage = await executeXmlRequest(
      connection,
      action,
      context.debug.enabled,
      { explicitArray: false },
    );
    handleSageError(responseFromSage);
    return {
      data: responseFromSage,
    };
  },
  inputs: deleteObjectInputs,
  examplePayload: deleteObjectExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteObjectOutputSchema,
  }),
  examplePerform: async () => ({ data: deleteObjectExamplePayload.data }),
});
